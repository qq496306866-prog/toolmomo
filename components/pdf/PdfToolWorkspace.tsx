"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PdfToolDefinition } from "@/data/pdfTools";
import { MAX_FILE_BYTES, MAX_PDF_PAGES } from "@/data/pdfTools";
import { createZip } from "@/lib/clientZip";

type ResultFile = { name: string; blob: Blob; url: string };

const formatBytes = (bytes: number) => bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(2)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
const asBuffer = (bytes: Uint8Array) => { const buffer = new ArrayBuffer(bytes.byteLength); new Uint8Array(buffer).set(bytes); return buffer; };

function parsePageList(value: string, total: number) {
  const pages: number[] = [];
  for (const part of value.split(",").map((item) => item.trim()).filter(Boolean)) {
    const [fromText, toText] = part.split("-");
    const from = Number(fromText);
    const to = toText ? Number(toText) : from;
    if (!Number.isInteger(from) || !Number.isInteger(to) || from < 1 || to < from || to > total) throw new Error(`Invalid page range: ${part}`);
    for (let page = from; page <= to; page += 1) pages.push(page - 1);
  }
  if (!pages.length) throw new Error("Enter at least one page number.");
  return pages;
}

async function imageForPdf(file: File) {
  if (file.type === "image/png" || file.name.toLowerCase().endsWith(".png")) return { bytes: await file.arrayBuffer(), type: "png" as const };
  if (file.type === "image/jpeg" || /\.jpe?g$/i.test(file.name)) return { bytes: await file.arrayBuffer(), type: "jpg" as const };
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width; canvas.height = bitmap.height;
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Image conversion failed.")), "image/png"));
  return { bytes: await blob.arrayBuffer(), type: "png" as const };
}

export function PdfToolWorkspace({ tool }: { tool: PdfToolDefinition }) {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<ResultFile[]>([]);
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [pages, setPages] = useState("1");
  const [text, setText] = useState("Toolmomo");
  const [secondaryText, setSecondaryText] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [password, setPassword] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("EN");
  const [numberValue, setNumberValue] = useState(tool.localOperation === "rotate" ? 90 : 20);
  const [fontSize, setFontSize] = useState(24);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [signatureDrawn, setSignatureDrawn] = useState(false);
  const [providerConfigured, setProviderConfigured] = useState(tool.provider === "local");
  const [providerChecked, setProviderChecked] = useState(tool.provider === "local");
  const inputRef = useRef<HTMLInputElement>(null);
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const totalBytes = useMemo(() => files.reduce((sum, file) => sum + file.size, 0), [files]);

  useEffect(() => () => results.forEach((result) => URL.revokeObjectURL(result.url)), [results]);

  useEffect(() => {
    if (tool.provider === "local") return;
    const controller = new AbortController();
    fetch("/api/pdf/providers", { cache: "no-store", signal: controller.signal })
      .then((response) => response.json())
      .then((providers: Record<string, boolean>) => setProviderConfigured(Boolean(providers[tool.provider])))
      .catch(() => setProviderConfigured(false))
      .finally(() => setProviderChecked(true));
    return () => controller.abort();
  }, [tool.provider]);

  const clearResults = () => {
    results.forEach((result) => URL.revokeObjectURL(result.url));
    setResults([]);
  };

  const chooseFiles = async (list: FileList | null) => {
    if (!list) return;
    const selected = Array.from(list);
    if (!selected.length) return;
    if (selected.some((file) => file.size > MAX_FILE_BYTES) || selected.reduce((sum, file) => sum + file.size, 0) > MAX_FILE_BYTES) {
      setStatus("error"); setMessage("Files must be 50 MB or less in total."); return;
    }
    try {
      let count = 0;
      const pdfFiles = selected.filter((file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));
      if (pdfFiles.length) {
        const { PDFDocument } = await import("pdf-lib");
        for (const file of pdfFiles) count += (await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true })).getPageCount();
        if (count > MAX_PDF_PAGES) throw new Error("PDF jobs are limited to 100 pages.");
      }
      setFiles(tool.multiple ? selected : [selected[0]]);
      setPageCount(count);
      setPages(count > 1 ? `1-${count}` : "1");
      clearResults(); setStatus("idle"); setMessage("");
    } catch (error) {
      setStatus("error"); setMessage(error instanceof Error ? error.message : "The selected file could not be read.");
    }
  };

  const publish = (outputs: Array<{ name: string; blob: Blob }>) => {
    clearResults();
    setResults(outputs.map((output) => ({ ...output, url: URL.createObjectURL(output.blob) })));
    setStatus("done"); setMessage(`${outputs.length} result${outputs.length === 1 ? "" : "s"} ready to download.`);
  };

  const processLocal = async () => {
    const operation = tool.localOperation;
    if (!operation) return;
    if (operation !== "create" && !files.length) throw new Error("Choose a file first.");
    const { PDFDocument, StandardFonts, degrees, rgb } = await import("pdf-lib");

    if (operation === "images-to-pdf") {
      const output = await PDFDocument.create();
      for (const file of files) {
        const image = await imageForPdf(file);
        const embedded = image.type === "png" ? await output.embedPng(image.bytes) : await output.embedJpg(image.bytes);
        const page = output.addPage([embedded.width, embedded.height]);
        page.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
      }
      publish([{ name: `${tool.slug}.pdf`, blob: new Blob([asBuffer(await output.save())], { type: "application/pdf" }) }]); return;
    }

    if (operation === "create") {
      const output = await PDFDocument.create(); const font = await output.embedFont(StandardFonts.Helvetica);
      const page = output.addPage([612, 792]); const lines = text.split("\n");
      lines.slice(0, 35).forEach((line, index) => page.drawText(line, { x: 54, y: 738 - index * 20, size: 12, font, color: rgb(0.12, 0.16, 0.23) }));
      publish([{ name: "toolmomo-document.pdf", blob: new Blob([asBuffer(await output.save())], { type: "application/pdf" }) }]); return;
    }

    if (operation === "merge") {
      if (files.length < 2) throw new Error("Choose at least two PDF files.");
      const output = await PDFDocument.create();
      for (const file of files) { const source = await PDFDocument.load(await file.arrayBuffer()); const copied = await output.copyPages(source, source.getPageIndices()); copied.forEach((page) => output.addPage(page)); }
      publish([{ name: "toolmomo-merged.pdf", blob: new Blob([asBuffer(await output.save())], { type: "application/pdf" }) }]); return;
    }

    if (operation === "pdf-to-image" || operation === "extract-text") {
      const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
      const pdfDocument = await pdfjs.getDocument({ data: new Uint8Array(await files[0].arrayBuffer()) }).promise;
      if (operation === "extract-text") {
        const chunks: string[] = [];
        for (let index = 1; index <= pdfDocument.numPages; index += 1) { const content = await (await pdfDocument.getPage(index)).getTextContent(); chunks.push(content.items.map((item) => "str" in item ? item.str : "").join(" ")); }
        publish([{ name: "toolmomo-extracted-text.txt", blob: new Blob([chunks.join("\n\n")], { type: "text/plain;charset=utf-8" }) }]); return;
      }
      const outputs: Array<{ name: string; blob: Blob }> = [];
      for (let index = 1; index <= pdfDocument.numPages; index += 1) {
        const page = await pdfDocument.getPage(index); const viewport = page.getViewport({ scale: 1.6 });
        const canvas = document.createElement("canvas"); canvas.width = viewport.width; canvas.height = viewport.height;
        const context = canvas.getContext("2d"); if (!context) throw new Error("Canvas is not available.");
        await page.render({ canvasContext: context, viewport }).promise;
        const mime = tool.outputFormat === "jpg" ? "image/jpeg" : "image/png";
        const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Page rendering failed.")), mime, 0.92));
        outputs.push({ name: `page-${index}.${tool.outputFormat}`, blob });
      }
      publish(outputs); return;
    }

    const source = await PDFDocument.load(await files[0].arrayBuffer());
    if (operation === "split") {
      const outputs: Array<{ name: string; blob: Blob }> = [];
      for (const [index, pageIndex] of parsePageList(pages, source.getPageCount()).entries()) { const output = await PDFDocument.create(); const [page] = await output.copyPages(source, [pageIndex]); output.addPage(page); outputs.push({ name: `page-${index + 1}.pdf`, blob: new Blob([asBuffer(await output.save())], { type: "application/pdf" }) }); }
      publish(outputs); return;
    }
    if (operation === "delete-pages" || operation === "rearrange") {
      const selected = parsePageList(pages, source.getPageCount());
      const indices = operation === "delete-pages" ? source.getPageIndices().filter((index) => !new Set(selected).has(index)) : selected;
      if (!indices.length) throw new Error("At least one page must remain.");
      const output = await PDFDocument.create(); const copied = await output.copyPages(source, indices); copied.forEach((page) => output.addPage(page));
      publish([{ name: `${tool.slug}.pdf`, blob: new Blob([asBuffer(await output.save())], { type: "application/pdf" }) }]); return;
    }

    const font = await source.embedFont(StandardFonts.Helvetica);
    let signatureImage: Awaited<ReturnType<typeof source.embedPng>> | null = null;
    if (operation === "esign") {
      let signatureBlob: Blob | null = signatureFile;
      if (!signatureBlob && signatureDrawn && signatureCanvasRef.current) signatureBlob = await new Promise((resolve) => signatureCanvasRef.current?.toBlob(resolve, "image/png"));
      if (signatureBlob && signatureBlob.size > 200) {
        const prepared = await imageForPdf(new File([signatureBlob], "signature.png", { type: signatureBlob.type || "image/png" }));
        signatureImage = prepared.type === "png" ? await source.embedPng(prepared.bytes) : await source.embedJpg(prepared.bytes);
      }
    }
    const selectedPages = pages.trim() ? new Set(parsePageList(pages, source.getPageCount())) : new Set(source.getPageIndices());
    source.getPages().forEach((page, index) => {
      if (!selectedPages.has(index)) return;
      const { width, height } = page.getSize();
      if (operation === "rotate") page.setRotation(degrees(numberValue));
      if (operation === "crop") page.setCropBox(numberValue, numberValue, Math.max(20, width - numberValue * 2), Math.max(20, height - numberValue * 2));
      if (operation === "add-page-numbers") page.drawText(`${index + 1}`, { x: width / 2 - 4, y: 18, size: fontSize, font, color: rgb(0.2, 0.25, 0.32) });
      if (operation === "add-watermark") page.drawText(text || "Toolmomo", { x: width * 0.15, y: height * 0.48, size: fontSize, font, rotate: degrees(-35), color: rgb(0.75, 0.75, 0.75), opacity: 0.45 });
      if (operation === "esign" && signatureImage) page.drawImage(signatureImage, { x: 48, y: 42, width: Math.min(180, signatureImage.width), height: Math.min(70, signatureImage.height * Math.min(180, signatureImage.width) / signatureImage.width) });
      else if (["add-text", "annotate", "edit", "esign"].includes(operation)) page.drawText(operation === "esign" ? (secondaryText || text || "Signed") : (text || "Note"), { x: 48, y: 48, size: fontSize, font, color: operation === "annotate" ? rgb(0.9, 0.35, 0.12) : rgb(0.1, 0.18, 0.3) });
    });
    publish([{ name: `${tool.slug}.pdf`, blob: new Blob([asBuffer(await source.save())], { type: "application/pdf" }) }]);
  };

  const processRemote = async () => {
    const form = new FormData(); files.forEach((file) => form.append("files", file)); form.append("tool", tool.slug);
    form.append("options", JSON.stringify({ pages, text, secondaryText, numberValue, fontSize, url: urlValue, password, targetLanguage }));
    const response = await fetch("/api/pdf/jobs", { method: "POST", body: form });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Unable to create the conversion job.");
    for (let attempt = 0; attempt < 120; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const current = await fetch(`/api/pdf/jobs/${payload.id}`).then((result) => result.json());
      if (current.status === "failed") throw new Error(current.error || "Conversion failed.");
      if (current.status === "complete") { window.location.href = `/api/pdf/jobs/${payload.id}/download`; return; }
      setMessage(current.message || "Processing your file...");
    }
    throw new Error("The conversion timed out. Please try again.");
  };

  const run = async () => {
    try { setStatus("working"); setMessage("Processing your files..."); if (tool.provider === "local") await processLocal(); else await processRemote(); }
    catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Processing failed."); }
  };

  const downloadAll = async () => {
    const zip = await createZip(results.map(({ name, blob }) => ({ name, blob })));
    const url = URL.createObjectURL(zip); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${tool.slug}.zip`; anchor.click(); URL.revokeObjectURL(url);
  };

  const needsPages = ["split", "delete-pages", "rearrange", "rotate", "crop", "add-page-numbers", "add-watermark", "add-text", "annotate", "edit", "esign"].includes(tool.localOperation || "");
  const needsText = ["create", "add-watermark", "add-text", "annotate", "edit", "esign"].includes(tool.localOperation || "");

  return (
    <div className="rounded-[28px] border border-[#e6edf5] bg-white p-5 shadow-[0_24px_70px_rgba(32,43,60,0.12)] sm:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[18px] bg-[#f6f8fb] p-4"><div className="text-xs font-black uppercase text-[#8a98aa]">Files</div><div className="mt-2 text-2xl font-black">{files.length}</div></div>
        <div className="rounded-[18px] bg-[#f6f8fb] p-4"><div className="text-xs font-black uppercase text-[#8a98aa]">Size</div><div className="mt-2 text-2xl font-black">{formatBytes(totalBytes)}</div></div>
        <div className="rounded-[18px] bg-[#f6f8fb] p-4"><div className="text-xs font-black uppercase text-[#8a98aa]">Privacy</div><div className="mt-2 text-lg font-black">{tool.provider === "local" ? "Browser only" : "Auto-delete in 1 hour"}</div></div>
      </div>

      {tool.accept ? <button className="mt-5 flex min-h-44 w-full flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-[#dbe5f0] bg-[#f8fafc] px-5 text-center hover:border-[#ff9278]" onClick={() => inputRef.current?.click()} type="button"><span className="text-lg font-black">Choose {tool.multiple ? "files" : "a file"}</span><span className="mt-2 text-sm font-semibold text-[#728197]">Maximum 50 MB and 100 PDF pages per job</span><input ref={inputRef} accept={tool.accept} className="sr-only" multiple={tool.multiple} onChange={(event) => chooseFiles(event.target.files)} type="file" /></button> : null}
      {files.length ? <div className="mt-4 space-y-2">{files.map((file) => <div className="flex items-center justify-between rounded-[16px] bg-[#f7f9fc] px-4 py-3 text-sm" key={`${file.name}-${file.lastModified}`}><span className="truncate font-bold">{file.name}</span><span className="ml-4 shrink-0 text-[#728197]">{formatBytes(file.size)}</span></div>)}</div> : null}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {tool.slug === "url-to-pdf" ? <label className="text-sm font-black">Public web page URL<input className="mt-2 w-full rounded-[14px] border border-[#dfe7f1] px-4 py-3" onChange={(event) => setUrlValue(event.target.value)} placeholder="https://example.com" type="url" value={urlValue} /></label> : null}
        {["unlock-pdf", "protect-pdf"].includes(tool.slug) ? <label className="text-sm font-black">PDF password<input className="mt-2 w-full rounded-[14px] border border-[#dfe7f1] px-4 py-3" onChange={(event) => setPassword(event.target.value)} type="password" value={password} /></label> : null}
        {tool.slug === "pdf-translator" ? <label className="text-sm font-black">Target language<select className="mt-2 w-full rounded-[14px] border border-[#dfe7f1] px-4 py-3" onChange={(event) => setTargetLanguage(event.target.value)} value={targetLanguage}><option value="EN">English</option><option value="DE">German</option><option value="FR">French</option><option value="ES">Spanish</option><option value="IT">Italian</option><option value="JA">Japanese</option><option value="ZH-HANS">Chinese</option></select></label> : null}
        {needsPages ? <label className="text-sm font-black">Pages or order<input className="mt-2 w-full rounded-[14px] border border-[#dfe7f1] px-4 py-3 font-semibold outline-none focus:border-[#ff5b34]" onChange={(event) => setPages(event.target.value)} placeholder={pageCount ? `1-${pageCount}` : "1-3,5"} value={pages} /></label> : null}
        {needsText || tool.localOperation === "create" ? <label className="text-sm font-black">Text<textarea className="mt-2 min-h-24 w-full rounded-[14px] border border-[#dfe7f1] px-4 py-3 font-semibold outline-none focus:border-[#ff5b34]" onChange={(event) => setText(event.target.value)} value={text} /></label> : null}
        {["rotate", "crop"].includes(tool.localOperation || "") ? <label className="text-sm font-black">{tool.localOperation === "rotate" ? "Degrees" : "Margin in points"}<input className="mt-2 w-full rounded-[14px] border border-[#dfe7f1] px-4 py-3" max={tool.localOperation === "rotate" ? 270 : 100} min={0} onChange={(event) => setNumberValue(Number(event.target.value))} step={tool.localOperation === "rotate" ? 90 : 1} type="number" value={numberValue} /></label> : null}
        {["add-page-numbers", "add-watermark", "add-text", "annotate", "edit", "esign"].includes(tool.localOperation || "") ? <label className="text-sm font-black">Font size<input className="mt-2 w-full rounded-[14px] border border-[#dfe7f1] px-4 py-3" max={96} min={8} onChange={(event) => setFontSize(Number(event.target.value))} type="number" value={fontSize} /></label> : null}
        {tool.localOperation === "esign" ? <div className="sm:col-span-2"><label className="text-sm font-black">Signature text<input className="mt-2 w-full rounded-[14px] border border-[#dfe7f1] px-4 py-3" onChange={(event) => setSecondaryText(event.target.value)} placeholder="Your name" value={secondaryText} /></label><div className="mt-4 grid gap-4 sm:grid-cols-[1fr_220px]"><div><div className="text-sm font-black">Draw signature</div><canvas className="mt-2 h-36 w-full touch-none rounded-[14px] border border-[#dfe7f1] bg-white" height={144} onPointerDown={(event) => { const canvas = signatureCanvasRef.current; if (!canvas) return; drawingRef.current = true; setSignatureDrawn(true); const box = canvas.getBoundingClientRect(); const context = canvas.getContext("2d"); context?.beginPath(); context?.moveTo((event.clientX - box.left) * canvas.width / box.width, (event.clientY - box.top) * canvas.height / box.height); }} onPointerMove={(event) => { if (!drawingRef.current) return; const canvas = signatureCanvasRef.current; const box = canvas?.getBoundingClientRect(); const context = canvas?.getContext("2d"); if (!canvas || !box || !context) return; context.lineWidth = 3; context.lineCap = "round"; context.strokeStyle = "#1f2937"; context.lineTo((event.clientX - box.left) * canvas.width / box.width, (event.clientY - box.top) * canvas.height / box.height); context.stroke(); }} onPointerUp={() => { drawingRef.current = false; }} ref={signatureCanvasRef} width={620} /><button className="mt-2 text-xs font-black text-[#ff5b34]" onClick={() => { const canvas = signatureCanvasRef.current; if (canvas) canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height); setSignatureDrawn(false); }} type="button">Clear drawing</button></div><label className="text-sm font-black">Or upload signature image<input accept="image/png,image/jpeg" className="mt-2 block w-full text-xs" onChange={(event) => setSignatureFile(event.target.files?.[0] || null)} type="file" /></label></div></div> : null}
      </div>

      {providerChecked && !providerConfigured ? <div className="mt-5 rounded-[16px] bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">This remote tool is awaiting server provider configuration.</div> : null}
      {message ? <div className={`mt-5 rounded-[16px] px-4 py-3 text-sm font-bold ${status === "error" ? "bg-red-50 text-red-700" : status === "done" ? "bg-emerald-50 text-emerald-700" : "bg-[#fff5ef] text-[#ad553b]"}`}>{message}</div> : null}
      <div className="mt-5 flex flex-wrap gap-3"><button className="rounded-full bg-[#ff5b34] px-7 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50" disabled={status === "working" || !providerChecked || !providerConfigured} onClick={run} type="button">{status === "working" ? "Processing..." : !providerChecked ? "Checking service..." : `Run ${tool.name}`}</button><button className="rounded-full border border-[#dfe7f1] px-6 py-3 text-sm font-black text-[#64748b]" onClick={() => { clearResults(); setFiles([]); setSignatureFile(null); setSignatureDrawn(false); setStatus("idle"); setMessage(""); }} type="button">Reset</button></div>
      {results.length ? <div className="mt-6 grid gap-3 sm:grid-cols-2">{results.map((result) => <a className="rounded-[16px] border border-[#dfe7f1] bg-[#f8fafc] px-4 py-3 text-sm font-black text-[#263244] hover:border-[#ff9278]" download={result.name} href={result.url} key={result.name}>Download {result.name}</a>)}{results.length > 1 ? <button className="rounded-[16px] bg-[#263244] px-4 py-3 text-sm font-black text-white" onClick={downloadAll} type="button">Download all as ZIP</button> : null}</div> : null}
    </div>
  );
}
