"use client";

import { useState } from "react";

type SplitResult = {
  name: string;
  url: string;
};

function parseRanges(value: string, totalPages: number) {
  const groups = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (groups.length === 0) {
    throw new Error("请输入页码范围，例如 1-3,5。");
  }

  return groups.map((group) => {
    const [startText, endText] = group.split("-").map((item) => item.trim());
    const start = Number(startText);
    const end = endText ? Number(endText) : start;

    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start || end > totalPages) {
      throw new Error(`页码范围 ${group} 无效，当前 PDF 共 ${totalPages} 页。`);
    }

    return {
      label: group,
      pages: Array.from({ length: end - start + 1 }, (_, index) => start + index - 1),
    };
  });
}

function toArrayBuffer(bytes: Uint8Array) {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

export function PdfSplitTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [rangeText, setRangeText] = useState("1");
  const [results, setResults] = useState<SplitResult[]>([]);
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

      results.forEach((item) => URL.revokeObjectURL(item.url));
      setFile(selectedFile);
      setPageCount(pdf.getPageCount());
      setRangeText(pdf.getPageCount() > 1 ? "1,2-" + pdf.getPageCount() : "1");
      setResults([]);
      setStatus("");
      setError("");
    } catch {
      setError("读取 PDF 失败，请确认文件没有加密或损坏。");
    }
  };

  const splitPdf = async () => {
    if (!file) {
      setError("请先选择 PDF 文件。");
      return;
    }

    try {
      const { PDFDocument } = await import("pdf-lib");
      const sourcePdf = await PDFDocument.load(await file.arrayBuffer());
      const ranges = parseRanges(rangeText, sourcePdf.getPageCount());
      const nextResults: SplitResult[] = [];

      results.forEach((item) => URL.revokeObjectURL(item.url));
      setStatus("正在拆分 PDF，请稍候...");
      setError("");

      for (const range of ranges) {
        const outputPdf = await PDFDocument.create();
        const copiedPages = await outputPdf.copyPages(sourcePdf, range.pages);
        copiedPages.forEach((page) => outputPdf.addPage(page));
        const bytes = await outputPdf.save();
        const blob = new Blob([toArrayBuffer(bytes)], { type: "application/pdf" });

        nextResults.push({
          name: `toolmomo-pdf-pages-${range.label}.pdf`,
          url: URL.createObjectURL(blob),
        });
      }

      setResults(nextResults);
      setStatus(`已生成 ${nextResults.length} 个 PDF 文件。`);
    } catch (caughtError) {
      setStatus("");
      setError(caughtError instanceof Error ? caughtError.message : "拆分失败，请检查页码范围。");
    }
  };

  const clearAll = () => {
    results.forEach((item) => URL.revokeObjectURL(item.url));
    setFile(null);
    setPageCount(0);
    setRangeText("1");
    setResults([]);
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
          <div className="text-xs font-semibold text-slate-500">总页数</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{pageCount}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输出文件</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{results.length}</div>
        </div>
      </div>

      <label className="mt-5 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-primary-200 bg-slate-50 px-4 py-8 text-center hover:border-accent-400 hover:bg-accent-50">
        <span className="text-base font-bold text-slate-950">选择 PDF 文件</span>
        <span className="mt-2 text-sm leading-6 text-slate-600">读取页数后输入拆分范围，例如 1-3,5,8-10。</span>
        <input accept="application/pdf,.pdf" className="sr-only" onChange={(event) => handleFile(event.target.files)} type="file" />
      </label>

      <div className="mt-5">
        <label className="text-sm font-semibold text-slate-800" htmlFor="pdf-ranges">
          拆分页码
        </label>
        <input
          className="mt-2 w-full rounded-md border border-slate-200 px-4 py-3 font-mono text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
          id="pdf-ranges"
          onChange={(event) => setRangeText(event.target.value)}
          placeholder="例如：1-3,5,8-10"
          value={rangeText}
        />
      </div>

      {error ? <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      {status ? <div className="mt-4 rounded-md border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-700">{status}</div> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600" onClick={splitPdf} type="button">
          拆分PDF
        </button>
        <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700" onClick={clearAll} type="button">
          清空
        </button>
      </div>

      {results.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {results.map((item) => (
            <a className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-primary-700 hover:border-accent-300 hover:text-accent-700" download={item.name} href={item.url} key={item.name}>
              下载 {item.name}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
