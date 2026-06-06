"use client";

import { useEffect, useMemo, useState } from "react";

type WebpResult = {
  name: string;
  originalSize: number;
  outputSize: number;
  width: number;
  height: number;
  url: string;
};

function formatBytes(bytes: number) {
  if (!bytes) {
    return "0 KB";
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function loadImage(file: File) {
  return new Promise<{ image: HTMLImageElement; width: number; height: number }>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ image, width: image.naturalWidth, height: image.naturalHeight });
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("图片读取失败，请换一张图片重试。"));
    };

    image.src = url;
  });
}

async function convertToWebp(file: File, quality: number) {
  const { image, width, height } = await loadImage(file);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("浏览器不支持 Canvas 图片处理。");
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  return new Promise<{ blob: Blob; width: number; height: number }>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("WebP 转换失败，请重试。"));
          return;
        }

        resolve({ blob, width, height });
      },
      "image/webp",
      quality,
    );
  });
}

export function ImageWebpTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [quality, setQuality] = useState(0.82);
  const [result, setResult] = useState<WebpResult | null>(null);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const savedPercent = useMemo(() => {
    if (!result || !result.originalSize) {
      return 0;
    }

    return Math.max(0, Math.round((1 - result.outputSize / result.originalSize) * 100));
  }, [result]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (result?.url) {
        URL.revokeObjectURL(result.url);
      }
    };
  }, [result]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("请选择 JPG、PNG、WebP 等图片文件。");
      setFile(null);
      setPreviewUrl("");
      setResult(null);
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setResult(null);
    setError("");
  };

  const handleConvert = async () => {
    if (!file) {
      setError("请先选择一张图片。");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const { blob, width, height } = await convertToWebp(file, quality);
      const url = URL.createObjectURL(blob);

      if (result?.url) {
        URL.revokeObjectURL(result.url);
      }

      setResult({
        name: file.name.replace(/\.[^.]+$/, "") + ".webp",
        originalSize: file.size,
        outputSize: blob.size,
        width,
        height,
        url,
      });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "WebP 转换失败，请重试。");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }

    setFile(null);
    setPreviewUrl("");
    setResult(null);
    setError("");
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">原图大小</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{formatBytes(file?.size ?? 0)}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">WebP大小</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{formatBytes(result?.outputSize ?? 0)}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">节省体积</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{savedPercent}%</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-5">
          <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-md bg-white p-6 text-center hover:bg-accent-50">
            {previewUrl ? (
              <img alt="原图预览" className="max-h-72 w-full rounded-md object-contain" src={previewUrl} />
            ) : (
              <>
                <span className="text-base font-bold text-slate-950">选择图片</span>
                <span className="mt-2 text-sm leading-6 text-slate-500">
                  支持 JPG、PNG、WebP。选择后可转换为轻量 WebP。
                </span>
              </>
            )}
            <input accept="image/*" className="sr-only" onChange={handleFileChange} type="file" />
          </label>
          {file ? (
            <div className="mt-4 rounded-md bg-white p-4 text-sm text-slate-600">
              <div className="font-semibold text-slate-950">{file.name}</div>
              <div className="mt-1">文件大小：{formatBytes(file.size)}</div>
            </div>
          ) : null}
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4">
          <h2 className="text-base font-bold text-slate-950">转换参数</h2>
          <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="webp-quality">
            输出质量：{Math.round(quality * 100)}%
          </label>
          <input
            className="mt-2 w-full accent-accent-500"
            id="webp-quality"
            max="0.95"
            min="0.3"
            onChange={(event) => setQuality(Number(event.target.value))}
            step="0.01"
            type="range"
            value={quality}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={isProcessing}
              onClick={handleConvert}
              type="button"
            >
              {isProcessing ? "转换中" : "转为WebP"}
            </button>
            <button
              className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
              onClick={handleClear}
              type="button"
            >
              清空
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-950">转换结果</h2>
              <p className="mt-1 text-sm text-slate-500">
                输出尺寸：{result.width} x {result.height}，WebP 大小：{formatBytes(result.outputSize)}
              </p>
            </div>
            <a
              className="rounded-md bg-primary-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary-900"
              download={result.name}
              href={result.url}
            >
              下载WebP
            </a>
          </div>
          <img
            alt="WebP结果预览"
            className="mt-4 max-h-[420px] w-full rounded-md border border-slate-200 object-contain"
            src={result.url}
          />
        </div>
      ) : null}
    </section>
  );
}
