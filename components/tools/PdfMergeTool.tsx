"use client";

import { useMemo, useState } from "react";

type PdfFile = {
  id: string;
  file: File;
  pageCount?: number;
};

function formatSize(size: number) {
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

export function PdfMergeTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [outputUrl, setOutputUrl] = useState("");
  const [outputSize, setOutputSize] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const totalSize = useMemo(() => files.reduce((sum, item) => sum + item.file.size, 0), [files]);
  const totalPages = useMemo(() => files.reduce((sum, item) => sum + (item.pageCount || 0), 0), [files]);

  const resetOutput = () => {
    if (outputUrl) {
      URL.revokeObjectURL(outputUrl);
    }

    setOutputUrl("");
    setOutputSize(0);
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) {
      return;
    }

    const selectedFiles = Array.from(fileList).filter(
      (file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"),
    );

    if (selectedFiles.length === 0) {
      setError("请选择 PDF 文件。");
      return;
    }

    try {
      setStatus("正在读取 PDF 页数...");
      setError("");

      const { PDFDocument } = await import("pdf-lib");
      const newFiles = await Promise.all(
        selectedFiles.map(async (file) => {
          const pdf = await PDFDocument.load(await file.arrayBuffer());

          return {
            id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
            file,
            pageCount: pdf.getPageCount(),
          };
        }),
      );

      setFiles((current) => [...current, ...newFiles]);
      resetOutput();
      setStatus(`已添加 ${newFiles.length} 个 PDF 文件。`);
    } catch {
      setStatus("");
      setError("读取失败，请确认 PDF 没有加密或损坏。");
    }
  };

  const moveFile = (index: number, direction: -1 | 1) => {
    setFiles((current) => {
      const next = [...current];
      const targetIndex = index + direction;

      if (targetIndex < 0 || targetIndex >= next.length) {
        return current;
      }

      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
    resetOutput();
  };

  const removeFile = (id: string) => {
    setFiles((current) => current.filter((item) => item.id !== id));
    resetOutput();
    setStatus("");
  };

  const mergePdf = async () => {
    if (files.length < 2) {
      setError("请至少选择 2 个 PDF 文件再合并。");
      return;
    }

    try {
      setStatus("正在合并 PDF，请稍候...");
      setError("");

      const { PDFDocument } = await import("pdf-lib");
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const sourcePdf = await PDFDocument.load(await item.file.arrayBuffer());
        const copiedPages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const mergedBuffer = new ArrayBuffer(mergedBytes.byteLength);
      new Uint8Array(mergedBuffer).set(mergedBytes);
      const blob = new Blob([mergedBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      resetOutput();
      setOutputUrl(url);
      setOutputSize(blob.size);
      setStatus("PDF 合并完成，可以下载结果。");
    } catch {
      setStatus("");
      setError("合并失败，请确认文件没有加密或损坏。");
    }
  };

  const clearAll = () => {
    resetOutput();
    setFiles([]);
    setStatus("");
    setError("");
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">已选文件</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{files.length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">总页数</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{totalPages}</div>
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

      <div className="mt-5 rounded-md border border-dashed border-primary-200 bg-slate-50 p-4">
        <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-md bg-white px-4 py-8 text-center hover:bg-accent-50">
          <span className="text-base font-bold text-slate-950">选择 PDF 文件</span>
          <span className="mt-2 text-sm leading-6 text-slate-600">
            支持多选，文件会按下方记录顺序合并，全部在浏览器本地处理。
          </span>
          <input accept="application/pdf,.pdf" className="sr-only" multiple onChange={(event) => handleFiles(event.target.files)} type="file" />
        </label>

        {files.length > 0 ? (
          <div className="mt-4 rounded-md border border-slate-200 bg-white">
            <div className="flex flex-col gap-1 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-950">已选择文件记录</div>
                <div className="mt-1 text-xs text-slate-500">合并顺序按列表从上到下排列。</div>
              </div>
              <label className="w-fit cursor-pointer rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700">
                继续添加
                <input accept="application/pdf,.pdf" className="sr-only" multiple onChange={(event) => handleFiles(event.target.files)} type="file" />
              </label>
            </div>
            <div className="divide-y divide-slate-100">
              {files.map((item, index) => (
                <div className="grid gap-3 px-4 py-3 text-sm sm:grid-cols-[1fr_auto]" key={item.id}>
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-slate-950">
                      {index + 1}. {item.file.name}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {formatSize(item.file.size)} · {item.pageCount ?? "-"} 页
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="rounded-md border border-slate-200 px-3 py-2 font-semibold text-slate-600 hover:text-accent-700 disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={index === 0}
                      onClick={() => moveFile(index, -1)}
                      type="button"
                    >
                      上移
                    </button>
                    <button
                      className="rounded-md border border-slate-200 px-3 py-2 font-semibold text-slate-600 hover:text-accent-700 disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={index === files.length - 1}
                      onClick={() => moveFile(index, 1)}
                      type="button"
                    >
                      下移
                    </button>
                    <button className="rounded-md border border-red-200 px-3 py-2 font-semibold text-red-600 hover:bg-red-50" onClick={() => removeFile(item.id)} type="button">
                      移除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {error ? <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      {status ? <div className="mt-4 rounded-md border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-700">{status}</div> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600" onClick={mergePdf} type="button">
          合并PDF
        </button>
        {outputUrl ? (
          <a className="rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-900" download="toolmomo-merged.pdf" href={outputUrl}>
            下载合并文件
          </a>
        ) : null}
        <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700" onClick={clearAll} type="button">
          清空
        </button>
      </div>
    </section>
  );
}
