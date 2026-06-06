"use client";

import { useMemo, useState } from "react";

type ImageFile = {
  id: string;
  file: File;
  preview: string;
};

function formatSize(size: number) {
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

function toArrayBuffer(bytes: Uint8Array) {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

export function ImageToPdfTool() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [outputUrl, setOutputUrl] = useState("");
  const [outputSize, setOutputSize] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const totalSize = useMemo(() => images.reduce((sum, image) => sum + image.file.size, 0), [images]);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) {
      return;
    }

    const selectedImages = Array.from(fileList).filter((file) => file.type === "image/png" || file.type === "image/jpeg");

    if (selectedImages.length === 0) {
      setError("请选择 JPG 或 PNG 图片。");
      return;
    }

    setImages((current) => [
      ...current,
      ...selectedImages.map((file) => ({
        id: `${file.name}-${file.size}-${crypto.randomUUID()}`,
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
    setOutputUrl("");
    setOutputSize(0);
    setStatus("");
    setError("");
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    setImages((current) => {
      const next = [...current];
      const targetIndex = index + direction;

      if (targetIndex < 0 || targetIndex >= next.length) {
        return current;
      }

      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  const removeImage = (id: string) => {
    setImages((current) => {
      const removed = current.find((image) => image.id === id);

      if (removed) {
        URL.revokeObjectURL(removed.preview);
      }

      return current.filter((image) => image.id !== id);
    });
  };

  const convertToPdf = async () => {
    if (images.length === 0) {
      setError("请先选择图片。");
      return;
    }

    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdf = await PDFDocument.create();

      setStatus("正在生成 PDF，请稍候...");
      setError("");

      for (const image of images) {
        const bytes = await image.file.arrayBuffer();
        const embeddedImage = image.file.type === "image/png" ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
        const page = pdf.addPage([embeddedImage.width, embeddedImage.height]);

        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: embeddedImage.width,
          height: embeddedImage.height,
        });
      }

      const pdfBytes = await pdf.save();
      const blob = new Blob([toArrayBuffer(pdfBytes)], { type: "application/pdf" });

      if (outputUrl) {
        URL.revokeObjectURL(outputUrl);
      }

      setOutputUrl(URL.createObjectURL(blob));
      setOutputSize(blob.size);
      setStatus(`已生成 ${images.length} 页 PDF。`);
    } catch {
      setStatus("");
      setError("生成失败，请确认图片格式为 JPG 或 PNG。");
    }
  };

  const clearAll = () => {
    images.forEach((image) => URL.revokeObjectURL(image.preview));

    if (outputUrl) {
      URL.revokeObjectURL(outputUrl);
    }

    setImages([]);
    setOutputUrl("");
    setOutputSize(0);
    setStatus("");
    setError("");
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">图片数量</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{images.length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">原始大小</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{formatSize(totalSize)}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输出大小</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{outputSize ? formatSize(outputSize) : "0 KB"}</div>
        </div>
      </div>

      <label className="mt-5 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-primary-200 bg-slate-50 px-4 py-8 text-center hover:border-accent-400 hover:bg-accent-50">
        <span className="text-base font-bold text-slate-950">选择图片</span>
        <span className="mt-2 text-sm leading-6 text-slate-600">支持多张 JPG、PNG 图片，生成顺序按下方列表排列。</span>
        <input accept="image/png,image/jpeg" className="sr-only" multiple onChange={(event) => handleFiles(event.target.files)} type="file" />
      </label>

      {images.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {images.map((image, index) => (
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3" key={image.id}>
              <img alt={image.file.name} className="h-40 w-full rounded bg-white object-contain" src={image.preview} />
              <div className="mt-3 truncate text-sm font-semibold text-slate-950">{index + 1}. {image.file.name}</div>
              <div className="mt-1 text-xs text-slate-500">{formatSize(image.file.size)}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-accent-700" onClick={() => moveImage(index, -1)} type="button">
                  上移
                </button>
                <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-accent-700" onClick={() => moveImage(index, 1)} type="button">
                  下移
                </button>
                <button className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50" onClick={() => removeImage(image.id)} type="button">
                  移除
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {error ? <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      {status ? <div className="mt-4 rounded-md border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-700">{status}</div> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600" onClick={convertToPdf} type="button">
          生成PDF
        </button>
        {outputUrl ? (
          <a className="rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-900" download="toolmomo-images.pdf" href={outputUrl}>
            下载PDF
          </a>
        ) : null}
        <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700" onClick={clearAll} type="button">
          清空
        </button>
      </div>
    </section>
  );
}
