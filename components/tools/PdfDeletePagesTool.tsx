"use client";

import { useState } from "react";

function parsePages(value: string, totalPages: number) {
  const pages = new Set<number>();

  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .forEach((part) => {
      const [startText, endText] = part.split("-").map((item) => item.trim());
      const start = Number(startText);
      const end = endText ? Number(endText) : start;

      if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start || end > totalPages) {
        throw new Error(`页码 ${part} 无效，当前 PDF 共 ${totalPages} 页。`);
      }

      for (let page = start; page <= end; page += 1) {
        pages.add(page - 1);
      }
    });

  return pages;
}

function toArrayBuffer(bytes: Uint8Array) {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

export function PdfDeletePagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [deleteText, setDeleteText] = useState("");
  const [outputUrl, setOutputUrl] = useState("");
  const [keptPages, setKeptPages] = useState(0);
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
      setDeleteText("");
      setOutputUrl("");
      setKeptPages(0);
      setStatus("");
      setError("");
    } catch {
      setError("读取 PDF 失败，请确认文件没有加密或损坏。");
    }
  };

  const deletePages = async () => {
    if (!file) {
      setError("请先选择 PDF 文件。");
      return;
    }

    try {
      const { PDFDocument } = await import("pdf-lib");
      const sourcePdf = await PDFDocument.load(await file.arrayBuffer());
      const deleteSet = parsePages(deleteText, sourcePdf.getPageCount());
      const keepIndexes = sourcePdf.getPageIndices().filter((index) => !deleteSet.has(index));

      if (deleteSet.size === 0) {
        setError("请输入需要删除的页码。");
        return;
      }

      if (keepIndexes.length === 0) {
        setError("不能删除全部页面，请至少保留 1 页。");
        return;
      }

      const outputPdf = await PDFDocument.create();
      const copiedPages = await outputPdf.copyPages(sourcePdf, keepIndexes);
      copiedPages.forEach((page) => outputPdf.addPage(page));
      const bytes = await outputPdf.save();
      const blob = new Blob([toArrayBuffer(bytes)], { type: "application/pdf" });

      if (outputUrl) {
        URL.revokeObjectURL(outputUrl);
      }

      setOutputUrl(URL.createObjectURL(blob));
      setKeptPages(keepIndexes.length);
      setStatus(`已删除 ${deleteSet.size} 页，保留 ${keepIndexes.length} 页。`);
      setError("");
    } catch (caughtError) {
      setStatus("");
      setError(caughtError instanceof Error ? caughtError.message : "删除页面失败，请检查页码。");
    }
  };

  const clearAll = () => {
    if (outputUrl) {
      URL.revokeObjectURL(outputUrl);
    }

    setFile(null);
    setPageCount(0);
    setDeleteText("");
    setOutputUrl("");
    setKeptPages(0);
    setStatus("");
    setError("");
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">总页数</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{pageCount}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">保留页数</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{keptPages}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">处理方式</div>
          <div className="mt-2 text-lg font-bold text-accent-600">删除页面</div>
        </div>
      </div>

      <label className="mt-5 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-primary-200 bg-slate-50 px-4 py-8 text-center hover:border-accent-400 hover:bg-accent-50">
        <span className="text-base font-bold text-slate-950">{file ? file.name : "选择 PDF 文件"}</span>
        <span className="mt-2 text-sm leading-6 text-slate-600">输入要删除的页码，例如 1,3-5,8。</span>
        <input accept="application/pdf,.pdf" className="sr-only" onChange={(event) => handleFile(event.target.files)} type="file" />
      </label>

      <div className="mt-5">
        <label className="text-sm font-semibold text-slate-800" htmlFor="delete-pages">
          删除页码
        </label>
        <input
          className="mt-2 w-full rounded-md border border-slate-200 px-4 py-3 font-mono text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
          id="delete-pages"
          onChange={(event) => setDeleteText(event.target.value)}
          placeholder="例如：1,3-5,8"
          value={deleteText}
        />
      </div>

      {error ? <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      {status ? <div className="mt-4 rounded-md border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-700">{status}</div> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600" onClick={deletePages} type="button">
          删除页面
        </button>
        {outputUrl ? (
          <a className="rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-900" download="toolmomo-pdf-deleted.pdf" href={outputUrl}>
            下载结果
          </a>
        ) : null}
        <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700" onClick={clearAll} type="button">
          清空
        </button>
      </div>
    </section>
  );
}
