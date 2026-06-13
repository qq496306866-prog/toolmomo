"use client";

import { useEffect, useRef, useState } from "react";
import type { ImageToolDefinition } from "@/data/imageTools";
import { trackToolEvent } from "@/lib/clientAnalytics";

const MAX_BYTES = 50 * 1024 * 1024;
const MAX_PIXELS = 40_000_000;
const MAX_CANVAS_EDGE = 16_384;
type Output = { blob: Blob; url: string; name: string };

async function loadImage(file: File) {
  const bitmap = await createImageBitmap(file);
  return { bitmap, width: bitmap.width, height: bitmap.height };
}

type LocalImageTool = Extract<ImageToolDefinition, { provider: "local" }>;

function canvasBlob(canvas: HTMLCanvasElement, format: LocalImageTool["outputFormat"], quality: number) {
  const mime = format === "jpg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
  return new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("The browser could not encode this image.")), mime, quality));
}

function sharpenCanvas(context: CanvasRenderingContext2D, width: number, height: number, strength: number) {
  const source = context.getImageData(0, 0, width, height); const output = context.createImageData(width, height); output.data.set(source.data); const mix = Math.min(1, strength / 100); const kernel = [0, -mix, 0, -mix, 1 + 4 * mix, -mix, 0, -mix, 0];
  for (let y = 1; y < height - 1; y += 1) for (let x = 1; x < width - 1; x += 1) for (let channel = 0; channel < 3; channel += 1) { let value = 0; for (let ky = -1; ky <= 1; ky += 1) for (let kx = -1; kx <= 1; kx += 1) value += source.data[((y + ky) * width + x + kx) * 4 + channel] * kernel[(ky + 1) * 3 + kx + 1]; output.data[(y * width + x) * 4 + channel] = Math.max(0, Math.min(255, value)); }
  context.putImageData(output, 0, 0);
}

async function readBasicExif(file: File) {
  if (!/jpe?g/i.test(file.type) && !/\.jpe?g$/i.test(file.name)) return {};
  const view = new DataView(await file.arrayBuffer());
  try {
    let offset = 2;
    while (offset + 4 < view.byteLength) {
      if (view.getUint8(offset) !== 0xff) break;
      const marker = view.getUint8(offset + 1); const length = view.getUint16(offset + 2, false);
      if (marker === 0xe1 && view.getUint32(offset + 4, false) === 0x45786966) {
        const tiff = offset + 10; const little = view.getUint16(tiff, false) === 0x4949; const get16 = (at: number) => view.getUint16(at, little); const get32 = (at: number) => view.getUint32(at, little); const result: Record<string, string | number> = {};
        const readIfd = (start: number) => { const count = get16(start); for (let index = 0; index < count; index += 1) { const entry = start + 2 + index * 12; const tag = get16(entry); const type = get16(entry + 2); const countValue = get32(entry + 4); const valueOffset = type === 2 && countValue > 4 ? tiff + get32(entry + 8) : entry + 8; const label = tag === 0x010f ? "cameraMake" : tag === 0x0110 ? "cameraModel" : tag === 0x0132 ? "dateTime" : tag === 0x0112 ? "orientation" : ""; if (!label) continue; result[label] = type === 2 ? Array.from({ length: Math.max(0, countValue - 1) }, (_, item) => String.fromCharCode(view.getUint8(valueOffset + item))).join("") : get16(valueOffset); } };
        readIfd(tiff + get32(tiff + 4)); return result;
      }
      offset += 2 + length;
    }
  } catch { return {}; }
  return {};
}

export function ImageToolWorkspace({ tool }: { tool: LocalImageTool }) {
  const [files, setFiles] = useState<File[]>([]);
  const [output, setOutput] = useState<Output | null>(null);
  const [message, setMessage] = useState("");
  const [working, setWorking] = useState(false);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(800);
  const [quality, setQuality] = useState(82);
  const [amount, setAmount] = useState(20);
  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");
  const [text, setText] = useState("TOOLMOMO");
  const [color, setColor] = useState("#ff5b34");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => { if (output) URL.revokeObjectURL(output.url); }, [output]);

  const choose = async (list: FileList | null) => {
    if (!list) return;
    const selected = Array.from(list);
    if (!selected.length) return;
    if (selected.reduce((sum, file) => sum + file.size, 0) > MAX_BYTES) { setMessage("Images must be 50 MB or less in total."); return; }
    try {
      const decoded = await Promise.all(selected.map(loadImage));
      const totalPixels = decoded.reduce((sum, image) => sum + image.width * image.height, 0);
      if (totalPixels > MAX_PIXELS || decoded.some((image) => image.width > MAX_CANVAS_EDGE || image.height > MAX_CANVAS_EDGE)) {
        decoded.forEach((image) => image.bitmap.close());
        throw new Error("Decoded images are too large. Use images below 40 megapixels in total and 16,384 pixels per edge.");
      }
      const first = decoded[0];
      setWidth(first.width); setHeight(first.height);
      decoded.forEach((image) => image.bitmap.close());
      setFiles(tool.multiple ? selected : [selected[0]]); setMessage("");
      if (output) URL.revokeObjectURL(output.url); setOutput(null);
    } catch { setMessage("The selected image could not be decoded by this browser."); }
  };

  const run = async () => {
    if (!files.length) { setMessage("Choose an image first."); return; }
    trackToolEvent("tool_start", tool.slug, "image");
    setWorking(true); setMessage("Processing in your browser...");
    try {
      if (tool.operation === "metadata") {
        const image = await loadImage(files[0]);
        const metadata = { name: files[0].name, type: files[0].type || "unknown", bytes: files[0].size, width: image.width, height: image.height, megapixels: Number(((image.width * image.height) / 1_000_000).toFixed(2)), aspectRatio: Number((image.width / image.height).toFixed(4)), lastModified: new Date(files[0].lastModified).toISOString(), ...(await readBasicExif(files[0])) };
        image.bitmap.close();
        const blob = new Blob([JSON.stringify(metadata, null, 2)], { type: "application/json" });
        setOutput({ blob, url: URL.createObjectURL(blob), name: "image-metadata.json" }); setMessage("Metadata is ready."); return;
      }

      const loaded = await Promise.all(files.map(loadImage));
      const first = loaded[0];
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas is not available.");

      if (tool.operation === "combine") {
        canvas.width = direction === "horizontal" ? loaded.reduce((sum, image) => sum + image.width, 0) : Math.max(...loaded.map((image) => image.width));
        canvas.height = direction === "vertical" ? loaded.reduce((sum, image) => sum + image.height, 0) : Math.max(...loaded.map((image) => image.height));
        if (canvas.width > MAX_CANVAS_EDGE || canvas.height > MAX_CANVAS_EDGE || canvas.width * canvas.height > MAX_PIXELS) throw new Error("The combined canvas is too large for safe browser processing.");
        let offset = 0;
        loaded.forEach((image) => { context?.drawImage(image.bitmap, direction === "horizontal" ? offset : 0, direction === "vertical" ? offset : 0); offset += direction === "horizontal" ? image.width : image.height; });
      } else if (tool.operation === "resize") {
        canvas.width = Math.max(1, width); canvas.height = Math.max(1, height); if (canvas.width > MAX_CANVAS_EDGE || canvas.height > MAX_CANVAS_EDGE || canvas.width * canvas.height > MAX_PIXELS) throw new Error("The requested dimensions are too large for safe browser processing."); context.drawImage(first.bitmap, 0, 0, canvas.width, canvas.height);
      } else if (tool.operation === "preset-resize") {
        canvas.width = tool.presetWidth || 512; canvas.height = tool.presetHeight || 512;
        const scale = Math.max(canvas.width / first.width, canvas.height / first.height);
        const drawWidth = first.width * scale; const drawHeight = first.height * scale;
        if (tool.outputFormat === "jpg") { context.fillStyle = "#ffffff"; context.fillRect(0, 0, canvas.width, canvas.height); }
        context.drawImage(first.bitmap, (canvas.width - drawWidth) / 2, (canvas.height - drawHeight) / 2, drawWidth, drawHeight);
      } else if (tool.operation === "crop") {
        const margin = Math.max(0, Math.min(amount, Math.floor(Math.min(first.width, first.height) / 2) - 1));
        canvas.width = first.width - margin * 2; canvas.height = first.height - margin * 2; context.drawImage(first.bitmap, margin, margin, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
      } else if (tool.operation === "circle") {
        const size = Math.min(first.width, first.height); canvas.width = size; canvas.height = size; context.beginPath(); context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2); context.clip(); context.drawImage(first.bitmap, (first.width - size) / 2, (first.height - size) / 2, size, size, 0, 0, size, size);
      } else if (tool.operation === "border") {
        canvas.width = first.width + amount * 2; canvas.height = first.height + amount * 2; context.fillStyle = color; context.fillRect(0, 0, canvas.width, canvas.height); context.drawImage(first.bitmap, amount, amount);
      } else if (tool.operation === "flip") {
        canvas.width = first.width; canvas.height = first.height; context.translate(direction === "horizontal" ? canvas.width : 0, direction === "vertical" ? canvas.height : 0); context.scale(direction === "horizontal" ? -1 : 1, direction === "vertical" ? -1 : 1); context.drawImage(first.bitmap, 0, 0);
      } else if (tool.operation === "rotate") {
        canvas.width = first.height; canvas.height = first.width; context.translate(canvas.width / 2, canvas.height / 2); context.rotate((tool.angle || 90) * Math.PI / 180); context.drawImage(first.bitmap, -first.width / 2, -first.height / 2);
      } else if (tool.operation === "square") {
        const size = Math.min(first.width, first.height); canvas.width = size; canvas.height = size; context.drawImage(first.bitmap, (first.width - size) / 2, (first.height - size) / 2, size, size, 0, 0, size, size);
      } else if (tool.operation === "pixelate") {
        const scale = Math.max(2, amount); const small = document.createElement("canvas"); small.width = Math.max(1, Math.floor(first.width / scale)); small.height = Math.max(1, Math.floor(first.height / scale)); small.getContext("2d")?.drawImage(first.bitmap, 0, 0, small.width, small.height); canvas.width = first.width; canvas.height = first.height; context.imageSmoothingEnabled = false; context.drawImage(small, 0, 0, canvas.width, canvas.height);
      } else {
        canvas.width = first.width; canvas.height = first.height;
        if (tool.outputFormat === "jpg") { context.fillStyle = "#ffffff"; context.fillRect(0, 0, canvas.width, canvas.height); }
        if (tool.operation === "grayscale") context.filter = "grayscale(1)";
        if (tool.operation === "filter") {
          const strength = Math.max(1, amount);
          context.filter = tool.effect === "sepia" ? `sepia(${Math.min(100, strength)}%)`
            : tool.effect === "invert" ? `invert(${Math.min(100, strength)}%)`
              : tool.effect === "blur" ? `blur(${Math.min(30, strength / 3)}px)`
                : tool.effect === "brightness" ? `brightness(${50 + strength * 1.5}%)`
                    : tool.effect === "contrast" ? `contrast(${75 + strength * 1.75}%)`
                      : tool.effect === "sharpen" ? "none"
                    : `saturate(${strength * 2}%)`;
        }
        context.drawImage(first.bitmap, 0, 0);
        context.filter = "none";
        if (tool.operation === "filter" && tool.effect === "sharpen") sharpenCanvas(context, canvas.width, canvas.height, amount);
        if (tool.operation === "text") { context.font = `900 ${Math.max(16, amount * 2)}px Arial`; context.fillStyle = color; context.textBaseline = "bottom"; context.fillText(text, 30, canvas.height - 30); }
        if (tool.operation === "meme") {
          const [top = "TOP TEXT", bottom = "BOTTOM TEXT"] = text.split("|");
          const fontSize = Math.max(28, Math.floor(canvas.width / 11)); context.font = `900 ${fontSize}px Arial`; context.textAlign = "center"; context.lineWidth = Math.max(3, fontSize / 15); context.strokeStyle = "#000000"; context.fillStyle = "#ffffff";
          context.textBaseline = "top"; context.strokeText(top.trim(), canvas.width / 2, 20); context.fillText(top.trim(), canvas.width / 2, 20);
          context.textBaseline = "bottom"; context.strokeText(bottom.trim(), canvas.width / 2, canvas.height - 20); context.fillText(bottom.trim(), canvas.width / 2, canvas.height - 20);
        }
        if (tool.operation === "watermark") {
          context.save(); context.globalAlpha = Math.max(0.08, Math.min(0.65, amount / 100)); context.fillStyle = color; context.font = `700 ${Math.max(18, Math.floor(canvas.width / 16))}px Arial`; context.rotate(-Math.PI / 6);
          for (let y = -canvas.height; y < canvas.height * 2; y += 140) for (let x = -canvas.width; x < canvas.width * 2; x += 260) context.fillText(text, x, y);
          context.restore();
        }
        if (tool.operation === "transparent") {
          const target = color.match(/[a-f0-9]{2}/gi)?.map((part) => parseInt(part, 16)) || [255, 255, 255]; const pixels = context.getImageData(0, 0, canvas.width, canvas.height); const tolerance = amount;
          for (let index = 0; index < pixels.data.length; index += 4) if (Math.abs(pixels.data[index] - target[0]) <= tolerance && Math.abs(pixels.data[index + 1] - target[1]) <= tolerance && Math.abs(pixels.data[index + 2] - target[2]) <= tolerance) pixels.data[index + 3] = 0;
          context.putImageData(pixels, 0, 0);
        }
      }

      if (tool.operation === "colors") {
        const sample = document.createElement("canvas"); sample.width = 64; sample.height = 64; const sampleContext = sample.getContext("2d"); if (!sampleContext) throw new Error("Canvas is not available."); sampleContext.drawImage(first.bitmap, 0, 0, 64, 64);
        const pixels = sampleContext.getImageData(0, 0, 64, 64).data; const buckets = new Map<string, number>();
        for (let index = 0; index < pixels.length; index += 16) { const key = [pixels[index], pixels[index + 1], pixels[index + 2]].map((value) => Math.round(value / 32) * 32).map((value) => Math.min(255, value).toString(16).padStart(2, "0")).join(""); buckets.set(`#${key}`, (buckets.get(`#${key}`) || 0) + 1); }
        const palette = [...buckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([hex]) => hex); const blob = new Blob([JSON.stringify({ palette }, null, 2)], { type: "application/json" }); loaded.forEach((image) => image.bitmap.close()); setOutput({ blob, url: URL.createObjectURL(blob), name: "image-color-palette.json" }); setMessage("Your color palette is ready."); return;
      }

      const blob = await canvasBlob(canvas, tool.outputFormat, quality / 100);
      loaded.forEach((image) => image.bitmap.close());
      const name = `${tool.slug}.${tool.outputFormat}`;
      setOutput({ blob, url: URL.createObjectURL(blob), name }); setMessage("Your image is ready to download."); trackToolEvent("tool_success", tool.slug, "image");
    } catch (error) { const detail = error instanceof Error ? error.message : "Image processing failed."; trackToolEvent("tool_error", tool.slug, "image", detail); setMessage(detail); }
    finally { setWorking(false); }
  };

  return <div className="rounded-[24px] border border-[#e3eaf2] bg-white p-5 shadow-[0_24px_70px_rgba(32,43,60,0.12)] sm:p-8">
    <button className="flex min-h-44 w-full flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-[#d6e5e4] bg-[#f5fbfa] px-5" onClick={() => inputRef.current?.click()} type="button"><span className="text-lg font-black">Choose {tool.multiple ? "images" : "an image"}</span><span className="mt-2 text-sm font-semibold text-[#728197]">JPG, PNG, WEBP, GIF, or another browser-supported image · 50 MB maximum</span><input ref={inputRef} accept={tool.accept || "image/*"} className="sr-only" multiple={tool.multiple} onChange={(event) => choose(event.target.files)} type="file" /></button>
    {files.length ? <div className="mt-4 text-sm font-bold text-[#58667a]">{files.map((file) => file.name).join(", ")}</div> : null}
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      {tool.operation === "resize" ? <><label className="text-sm font-black">Width<input className="mt-2 w-full rounded-[12px] border px-4 py-3" min="1" onChange={(event) => setWidth(Number(event.target.value))} type="number" value={width} /></label><label className="text-sm font-black">Height<input className="mt-2 w-full rounded-[12px] border px-4 py-3" min="1" onChange={(event) => setHeight(Number(event.target.value))} type="number" value={height} /></label></> : null}
      {["compress", "crop", "pixelate", "border", "text", "filter", "watermark", "transparent"].includes(tool.operation) ? <label className="text-sm font-black">{tool.operation === "compress" ? `Quality: ${quality}%` : tool.operation === "text" ? "Text size" : tool.operation === "transparent" ? "Color tolerance" : tool.operation === "watermark" ? "Opacity" : "Amount"}<input className="mt-3 w-full accent-[#16a6a1]" max="100" min={tool.operation === "compress" ? 10 : 2} onChange={(event) => tool.operation === "compress" ? setQuality(Number(event.target.value)) : setAmount(Number(event.target.value))} type="range" value={tool.operation === "compress" ? quality : amount} /></label> : null}
      {["flip", "combine"].includes(tool.operation) ? <label className="text-sm font-black">Direction<select className="mt-2 w-full rounded-[12px] border px-4 py-3" onChange={(event) => setDirection(event.target.value as "horizontal" | "vertical")} value={direction}><option value="horizontal">Horizontal</option><option value="vertical">Vertical</option></select></label> : null}
      {["text", "meme", "watermark"].includes(tool.operation) ? <label className="text-sm font-black">{tool.operation === "meme" ? "Top text | Bottom text" : tool.operation === "watermark" ? "Watermark text" : "Text"}<input className="mt-2 w-full rounded-[12px] border px-4 py-3" onChange={(event) => setText(event.target.value)} value={text} /></label> : null}
      {["border", "text", "watermark", "transparent"].includes(tool.operation) ? <label className="text-sm font-black">{tool.operation === "transparent" ? "Color to remove" : "Color"}<input className="mt-2 block h-12 w-full rounded-[12px] border p-1" onChange={(event) => setColor(event.target.value)} type="color" value={color} /></label> : null}
    </div>
    {message ? <div className="mt-5 rounded-[14px] bg-[#eef9f7] px-4 py-3 text-sm font-bold text-[#15766f]">{message}</div> : null}
    <div className="mt-5 flex flex-wrap gap-3"><button className="rounded-full bg-[#14948f] px-7 py-3 text-sm font-black text-white disabled:opacity-50" disabled={working} onClick={run} type="button">{working ? "Processing..." : `Run ${tool.name}`}</button>{output ? <a className="rounded-full bg-[#263244] px-7 py-3 text-sm font-black text-white" download={output.name} href={output.url} onClick={() => trackToolEvent("download_result", tool.slug, "image")}>Download result</a> : null}</div>
    {output && output.blob.type.startsWith("image/") ? <div className="mt-6 overflow-hidden rounded-[18px] bg-[linear-gradient(45deg,#eef2f6_25%,transparent_25%),linear-gradient(-45deg,#eef2f6_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#eef2f6_75%),linear-gradient(-45deg,transparent_75%,#eef2f6_75%)] bg-[length:24px_24px] bg-[position:0_0,0_12px,12px_-12px,-12px_0]"><img alt="Processed result" className="mx-auto max-h-[520px] max-w-full object-contain" src={output.url} /></div> : null}
  </div>;
}
