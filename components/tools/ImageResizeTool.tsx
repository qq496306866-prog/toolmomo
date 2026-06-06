"use client";

import { useEffect, useState } from "react";

type ResizeResult = {
  name: string;
  originalWidth: number;
  originalHeight: number;
  width: number;
  height: number;
  size: number;
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

async function resizeImage(file: File, width: number, height: number, quality: number) {
  const { image, width: originalWidth, height: originalHeight } = await loadImage(file);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("浏览器不支持 Canvas 图片处理。");
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (!result) {
          reject(new Error("图片尺寸调整失败，请重试。"));
          return;
        }

        resolve(result);
      },
      "image/jpeg",
      quality,
    );
  });

  return { blob, originalWidth, originalHeight };
}

export function ImageResizeTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [targetWidth, setTargetWidth] = useState(800);
  const [targetHeight, setTargetHeight] = useState(800);
  const [keepRatio, setKeepRatio] = useState(true);
  const [quality, setQuality] = useState(0.9);
  const [result, setResult] = useState<ResizeResult | null>(null);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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

  const ratio = originalWidth && originalHeight ? originalHeight / originalWidth : 1;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("请选择 JPG、PNG、WebP 等图片文件。");
      setFile(null);
      setPreviewUrl("");
      return;
    }

    try {
      const imageInfo = await loadImage(selectedFile);
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setOriginalWidth(imageInfo.width);
      setOriginalHeight(imageInfo.height);
      setTargetWidth(imageInfo.width);
      setTargetHeight(imageInfo.height);
      setResult(null);
      setError("");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "图片读取失败，请重试。");
    }
  };

  const updateWidth = (value: number) => {
    setTargetWidth(value);

    if (keepRatio) {
      setTargetHeight(Math.max(1, Math.round(value * ratio)));
    }
  };

  const updateHeight = (value: number) => {
    setTargetHeight(value);

    if (keepRatio && ratio) {
      setTargetWidth(Math.max(1, Math.round(value / ratio)));
    }
  };

  const handleResize = async () => {
    if (!file) {
      setError("请先选择一张图片。");
      return;
    }

    if (targetWidth <= 0 || targetHeight <= 0) {
      setError("宽度和高度必须大于 0。");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const { blob, originalWidth: sourceWidth, originalHeight: sourceHeight } = await resizeImage(
        file,
        targetWidth,
        targetHeight,
        quality,
      );
      const url = URL.createObjectURL(blob);

      if (result?.url) {
        URL.revokeObjectURL(result.url);
      }

      setResult({
        name: file.name.replace(/\.[^.]+$/, "") + `-${targetWidth}x${targetHeight}.jpg`,
        originalWidth: sourceWidth,
        originalHeight: sourceHeight,
        width: targetWidth,
        height: targetHeight,
        size: blob.size,
        url,
      });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "图片尺寸调整失败，请重试。");
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
    setOriginalWidth(0);
    setOriginalHeight(0);
    setTargetWidth(800);
    setTargetHeight(800);
    setResult(null);
    setError("");
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">原始尺寸</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">
            {originalWidth ? `${originalWidth} x ${originalHeight}` : "-"}
          </div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">目标尺寸</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">
            {targetWidth} x {targetHeight}
          </div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输出大小</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{formatBytes(result?.size ?? 0)}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-5">
          <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-md bg-white p-6 text-center hover:bg-accent-50">
            {previewUrl ? (
              <img alt="原图预览" className="max-h-72 w-full rounded-md object-contain" src={previewUrl} />
            ) : (
              <>
                <span className="text-base font-bold text-slate-950">选择图片</span>
                <span className="mt-2 text-sm leading-6 text-slate-500">
                  选择后会自动读取原始宽高，可按比例调整尺寸。
                </span>
              </>
            )}
            <input accept="image/*" className="sr-only" onChange={handleFileChange} type="file" />
          </label>
          {file ? (
            <div className="mt-4 rounded-md bg-white p-4 text-sm text-slate-600">
              <div className="font-semibold text-slate-950">{file.name}</div>
              <div className="mt-1">
                {originalWidth} x {originalHeight}，{formatBytes(file.size)}
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4">
          <h2 className="text-base font-bold text-slate-950">调整参数</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="text-sm font-semibold text-slate-700" htmlFor="resize-width">
              宽度
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="resize-width"
                min="1"
                onChange={(event) => updateWidth(Number(event.target.value))}
                type="number"
                value={targetWidth}
              />
            </label>
            <label className="text-sm font-semibold text-slate-700" htmlFor="resize-height">
              高度
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="resize-height"
                min="1"
                onChange={(event) => updateHeight(Number(event.target.value))}
                type="number"
                value={targetHeight}
              />
            </label>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              checked={keepRatio}
              className="h-4 w-4 accent-accent-500"
              id="keep-ratio"
              onChange={(event) => setKeepRatio(event.target.checked)}
              type="checkbox"
            />
            <label className="text-sm font-medium text-slate-700" htmlFor="keep-ratio">
              保持原图比例
            </label>
          </div>

          <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="resize-quality">
            输出质量：{Math.round(quality * 100)}%
          </label>
          <input
            className="mt-2 w-full accent-accent-500"
            id="resize-quality"
            max="0.95"
            min="0.4"
            onChange={(event) => setQuality(Number(event.target.value))}
            step="0.01"
            type="range"
            value={quality}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={isProcessing}
              onClick={handleResize}
              type="button"
            >
              {isProcessing ? "处理中" : "调整尺寸"}
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
              <h2 className="text-base font-bold text-slate-950">调整结果</h2>
              <p className="mt-1 text-sm text-slate-500">
                {result.originalWidth} x {result.originalHeight} 调整为 {result.width} x {result.height}，输出大小{" "}
                {formatBytes(result.size)}
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
            alt="尺寸调整结果预览"
            className="mt-4 max-h-[420px] w-full rounded-md border border-slate-200 object-contain"
            src={result.url}
          />
        </div>
      ) : null}
    </section>
  );
}
