"use client";

import { useState } from "react";

type RenderedPage = {
  pageNumber: number;
  url: string;
};

function formatSize(size: number) {
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

export function PdfToImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState(2);
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleFile = (fileList: FileList | null) => {
    const selectedFile = fileList?.[0];

    if (!selectedFile || (!selectedFile.name.endsWith(".pdf") && selectedFile.type !== "application/pdf")) {
      setError("请选择 PDF 文件。");
      return;
    }

    pages.forEach((page) => URL.revokeObjectURL(page.url));
    setFile(selectedFile);
    setPages([]);
    setStatus("");
    setError("");
  };

  const renderPdf = async () => {
    if (!file) {
      setError("请先选择 PDF 文件。");
      return;
    }

    try {
      setStatus("正在渲染 PDF 页面，请稍候...");
      setError("");
      pages.forEach((page) => URL.revokeObjectURL(page.url));
      setPages([]);

      const pdfjsLib = await import("pdfjs-dist");
      const pdfjs = pdfjsLib as typeof pdfjsLib & {
        getDocument: (options: { data: ArrayBuffer; disableWorker: boolean }) => { promise: Promise<any> };
      };
      const data = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data, disableWorker: true }).promise;
      const renderedPages: RenderedPage[] = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("无法创建图片画布。");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));

        if (!blob) {
          throw new Error("图片生成失败。");
        }

        renderedPages.push({
          pageNumber,
          url: URL.createObjectURL(blob),
        });
      }

      setPages(renderedPages);
      setStatus(`已生成 ${renderedPages.length} 张 PNG 图片。`);
    } catch {
      setStatus("");
      setError("转换失败，请确认 PDF 没有加密或损坏。");
    }
  };

  const clearAll = () => {
    pages.forEach((page) => URL.revokeObjectURL(page.url));
    setFile(null);
    setPages([]);
    setStatus("");
    setError("");
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">PDF 文件</div>
          <div className="mt-2 truncate text-lg font-bold text-primary-700">{file ? file.name : "未选择"}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">文件大小</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{file ? formatSize(file.size) : "0 KB"}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输出图片</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{pages.length}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-primary-200 bg-slate-50 px-4 py-8 text-center hover:border-accent-400 hover:bg-accent-50">
          <span className="text-base font-bold text-slate-950">选择 PDF 文件</span>
          <span className="mt-2 text-sm leading-6 text-slate-600">把 PDF 每一页导出为 PNG 图片，浏览器本地转换，无需上传服务器。</span>
          <input accept="application/pdf,.pdf" className="sr-only" onChange={(event) => handleFile(event.target.files)} type="file" />
        </label>

        <div className="rounded-md border border-slate-200 p-4">
          <h2 className="text-base font-bold text-slate-950">转换参数</h2>
          <label className="mt-4 block text-sm font-semibold text-slate-800" htmlFor="pdf-scale">
            清晰度：{scale}x
          </label>
          <input
            className="mt-3 w-full accent-accent-500"
            id="pdf-scale"
            max="3"
            min="1"
            onChange={(event) => setScale(Number(event.target.value))}
            step="0.5"
            type="range"
            value={scale}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600" onClick={renderPdf} type="button">
              转换为图片
            </button>
            <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700" onClick={clearAll} type="button">
              清空
            </button>
          </div>
        </div>
      </div>

      {error ? <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      {status ? <div className="mt-4 rounded-md border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-700">{status}</div> : null}

      {pages.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pages.map((page) => (
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3" key={page.pageNumber}>
              <img alt={`PDF 第 ${page.pageNumber} 页`} className="max-h-[420px] w-full rounded border border-slate-200 bg-white object-contain" src={page.url} />
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-slate-700">第 {page.pageNumber} 页</div>
                <a className="rounded-md bg-primary-700 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-900" download={`toolmomo-page-${page.pageNumber}.png`} href={page.url}>
                  下载图片
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
