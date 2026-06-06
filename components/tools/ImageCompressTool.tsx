"use client";

import { useEffect, useMemo, useState } from "react";

type CompressedImage = {
  name: string;
  originalSize: number;
  compressedSize: number;
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

function getImageSize(file: File) {
  return new Promise<{ width: number; height: number; image: HTMLImageElement }>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: image.naturalWidth, height: image.naturalHeight, image });
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("图片读取失败，请换一张图片重试。"));
    };

    image.src = url;
  });
}

async function compressImage(file: File, quality: number, maxWidth: number) {
  const { width, height, image } = await getImageSize(file);
  const ratio = width > maxWidth ? maxWidth / width : 1;
  const targetWidth = Math.round(width * ratio);
  const targetHeight = Math.round(height * ratio);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("浏览器不支持 Canvas 图片处理。");
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;
  context.drawImage(image, 0, 0, targetWidth, targetHeight);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("图片压缩失败，请重试。"));
          return;
        }

        resolve(blob);
      },
      "image/jpeg",
      quality,
    );
  });
}

export function ImageCompressTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [quality, setQuality] = useState(0.72);
  const [maxWidth, setMaxWidth] = useState(1600);
  const [result, setResult] = useState<CompressedImage | null>(null);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const savedPercent = useMemo(() => {
    if (!result || !result.originalSize) {
      return 0;
    }

    return Math.max(0, Math.round((1 - result.compressedSize / result.originalSize) * 100));
  }, [result]);

  useEffect(() => {
    return () => {
      if (result?.url) {
        URL.revokeObjectURL(result.url);
      }
    };
  }, [result]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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

  const handleCompress = async () => {
    if (!file) {
      setError("请先选择一张图片。");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const blob = await compressImage(file, quality, maxWidth);
      const imageUrl = URL.createObjectURL(blob);
      const { width, height } = await getImageSize(new File([blob], file.name, { type: blob.type }));

      if (result?.url) {
        URL.revokeObjectURL(result.url);
      }

      setResult({
        name: file.name.replace(/\.[^.]+$/, "") + "-compressed.jpg",
        originalSize: file.size,
        compressedSize: blob.size,
        width,
        height,
        url: imageUrl,
      });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "图片压缩失败，请重试。");
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
          <div className="text-xs font-semibold text-slate-500">压缩后</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">
            {formatBytes(result?.compressedSize ?? 0)}
          </div>
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
                  支持 JPG、PNG、WebP。图片只在浏览器本地处理。
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
          <h2 className="text-base font-bold text-slate-950">压缩参数</h2>
          <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="quality">
            图片质量：{Math.round(quality * 100)}%
          </label>
          <input
            className="mt-2 w-full accent-accent-500"
            id="quality"
            max="0.95"
            min="0.3"
            onChange={(event) => setQuality(Number(event.target.value))}
            step="0.01"
            type="range"
            value={quality}
          />

          <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="max-width">
            最大宽度
          </label>
          <input
            className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
            id="max-width"
            min="320"
            onChange={(event) => setMaxWidth(Number(event.target.value))}
            step="100"
            type="number"
            value={maxWidth}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={isProcessing}
              onClick={handleCompress}
              type="button"
            >
              {isProcessing ? "压缩中" : "开始压缩"}
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
              <h2 className="text-base font-bold text-slate-950">压缩结果</h2>
              <p className="mt-1 text-sm text-slate-500">
                输出尺寸：{result.width} x {result.height}，文件大小：{formatBytes(result.compressedSize)}
              </p>
            </div>
            <a
              className="rounded-md bg-primary-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary-900"
              download={result.name}
              href={result.url}
            >
              下载图片
            </a>
          </div>
          <img
            alt="压缩结果预览"
            className="mt-4 max-h-[420px] w-full rounded-md border border-slate-200 object-contain"
            src={result.url}
          />
        </div>
      ) : null}
    </section>
  );
}
