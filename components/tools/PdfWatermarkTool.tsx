"use client";

import { useState } from "react";

function toArrayBuffer(bytes: Uint8Array) {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

export function PdfWatermarkTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [text, setText] = useState("Toolmomo");
  const [fontSize, setFontSize] = useState(42);
  const [opacity, setOpacity] = useState(0.18);
  const [outputUrl, setOutputUrl] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleFile = async (fileList: FileList | null) => {
    const selectedFile = fileList?.[0];

    if (!selectedFile || (!selectedFile.name.endsWith(".pdf") && selectedFile.type !== "application/pdf")) {
      setError("请选择 PDF 文件。");
      return;
    }

    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdf = await PDFDocument.load(await selectedFile.arrayBuffer());

      if (outputUrl) {
        URL.revokeObjectURL(outputUrl);
      }

      setFile(selectedFile);
      setPageCount(pdf.getPageCount());
      setOutputUrl("");
      setStatus("");
      setError("");
    } catch {
      setError("读取 PDF 失败，请确认文件没有加密或损坏。");
    }
  };

  const addWatermark = async () => {
    if (!file) {
      setError("请先选择 PDF 文件。");
      return;
    }

    if (!text.trim()) {
      setError("请输入水印文字。");
      return;
    }

    try {
      const { degrees, PDFDocument, rgb, StandardFonts } = await import("pdf-lib");
      const pdf = await PDFDocument.load(await file.arrayBuffer());
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);

      pdf.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, fontSize);

        page.drawText(text, {
          x: width / 2 - textWidth / 2,
          y: height / 2,
          size: fontSize,
          font,
          color: rgb(0.04, 0.12, 0.24),
          opacity,
          rotate: degrees(-35),
        });
      });

      const bytes = await pdf.save();
      const blob = new Blob([toArrayBuffer(bytes)], { type: "application/pdf" });

      if (outputUrl) {
        URL.revokeObjectURL(outputUrl);
      }

      setOutputUrl(URL.createObjectURL(blob));
      setStatus(`已为 ${pdf.getPageCount()} 页添加文字水印。`);
      setError("");
    } catch {
      setStatus("");
      setError("添加水印失败，请确认 PDF 没有加密或损坏。");
    }
  };

  const clearAll = () => {
    if (outputUrl) {
      URL.revokeObjectURL(outputUrl);
    }

    setFile(null);
    setPageCount(0);
    setText("Toolmomo");
    setOutputUrl("");
    setStatus("");
    setError("");
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">PDF文件</div>
          <div className="mt-2 truncate text-lg font-bold text-primary-700">{file ? file.name : "未选择"}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">页数</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{pageCount}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">透明度</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{Math.round(opacity * 100)}%</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-primary-200 bg-slate-50 px-4 py-8 text-center hover:border-accent-400 hover:bg-accent-50">
          <span className="text-base font-bold text-slate-950">{file ? file.name : "选择 PDF 文件"}</span>
          <span className="mt-2 text-sm leading-6 text-slate-600">为每一页添加居中的斜向文字水印。</span>
          <input accept="application/pdf,.pdf" className="sr-only" onChange={(event) => handleFile(event.target.files)} type="file" />
        </label>

        <div className="rounded-md border border-slate-200 p-4">
          <h2 className="text-base font-bold text-slate-950">水印参数</h2>
          <label className="mt-4 block text-sm font-semibold text-slate-800" htmlFor="watermark-text">
            水印文字
          </label>
          <input
            className="mt-2 w-full rounded-md border border-slate-200 px-4 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
            id="watermark-text"
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
          <label className="mt-4 block text-sm font-semibold text-slate-800" htmlFor="watermark-size">
            字号：{fontSize}
          </label>
          <input className="mt-2 w-full accent-accent-500" id="watermark-size" max="80" min="18" onChange={(event) => setFontSize(Number(event.target.value))} type="range" value={fontSize} />
          <label className="mt-4 block text-sm font-semibold text-slate-800" htmlFor="watermark-opacity">
            透明度
          </label>
          <input className="mt-2 w-full accent-accent-500" id="watermark-opacity" max="0.45" min="0.08" onChange={(event) => setOpacity(Number(event.target.value))} step="0.01" type="range" value={opacity} />
        </div>
      </div>

      {error ? <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      {status ? <div className="mt-4 rounded-md border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-700">{status}</div> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600" onClick={addWatermark} type="button">
          添加水印
        </button>
        {outputUrl ? (
          <a className="rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-900" download="toolmomo-watermark.pdf" href={outputUrl}>
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
