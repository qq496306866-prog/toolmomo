"use client";

import { useEffect, useMemo, useState } from "react";

type OutputImage = {
  name: string;
  width: number;
  height: number;
  size: number;
  url: string;
};

const backgroundColors = [
  { label: "白底", value: "#ffffff" },
  { label: "蓝底", value: "#2f80ed" },
  { label: "红底", value: "#d93025" },
  { label: "浅灰", value: "#f1f5f9" },
];

function formatBytes(bytes: number) {
  if (!bytes) {
    return "0 KB";
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const numeric = Number.parseInt(normalized, 16);

  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255,
  };
}

function colorDistance(a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }) {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
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

async function replaceBackground(file: File, targetColor: string, tolerance: number) {
  const { image, width, height } = await loadImage(file);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("浏览器不支持 Canvas 图片处理。");
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  const sample = { r: data[0], g: data[1], b: data[2] };
  const target = hexToRgb(targetColor);

  for (let index = 0; index < data.length; index += 4) {
    const current = { r: data[index], g: data[index + 1], b: data[index + 2] };

    if (colorDistance(sample, current) <= tolerance) {
      data[index] = target.r;
      data[index + 1] = target.g;
      data[index + 2] = target.b;
    }
  }

  context.putImageData(imageData, 0, 0);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (!result) {
        reject(new Error("换底色失败，请重试。"));
        return;
      }

      resolve(result);
    }, "image/png");
  });

  return { blob, width, height };
}

export function IdPhotoBgTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [targetColor, setTargetColor] = useState("#2f80ed");
  const [tolerance, setTolerance] = useState(55);
  const [output, setOutput] = useState<OutputImage | null>(null);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedColor = useMemo(
    () => backgroundColors.find((item) => item.value === targetColor)?.label ?? "自定义",
    [targetColor],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (output?.url) {
        URL.revokeObjectURL(output.url);
      }
    };
  }, [output]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("请选择 JPG、PNG、WebP 等图片文件。");
      setFile(null);
      setPreviewUrl("");
      setOutput(null);
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setOutput(null);
    setError("");
  };

  const handleReplace = async () => {
    if (!file) {
      setError("请先选择一张证件照。");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const { blob, width, height } = await replaceBackground(file, targetColor, tolerance);
      const url = URL.createObjectURL(blob);

      if (output?.url) {
        URL.revokeObjectURL(output.url);
      }

      setOutput({
        name: file.name.replace(/\.[^.]+$/, "") + "-bg.png",
        width,
        height,
        size: blob.size,
        url,
      });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "换底色失败，请重试。");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    if (output?.url) {
      URL.revokeObjectURL(output.url);
    }

    setFile(null);
    setPreviewUrl("");
    setOutput(null);
    setError("");
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">目标底色</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{selectedColor}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">容差</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{tolerance}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输出大小</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{formatBytes(output?.size ?? 0)}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-5">
          <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-md bg-white p-6 text-center hover:bg-accent-50">
            {previewUrl ? (
              <img alt="原图预览" className="max-h-80 w-full rounded-md object-contain" src={previewUrl} />
            ) : (
              <>
                <span className="text-base font-bold text-slate-950">选择证件照</span>
                <span className="mt-2 text-sm leading-6 text-slate-500">
                  适合纯色背景证件照。工具会以左上角颜色作为原背景参考。
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
          <h2 className="text-base font-bold text-slate-950">换底参数</h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {backgroundColors.map((item) => (
              <button
                className={
                  item.value === targetColor
                    ? "rounded-md border border-accent-500 bg-accent-50 px-3 py-2 text-sm font-semibold text-accent-700"
                    : "rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50"
                }
                key={item.value}
                onClick={() => setTargetColor(item.value)}
                type="button"
              >
                <span
                  className="mr-2 inline-block h-3 w-3 rounded-full border border-slate-200 align-middle"
                  style={{ backgroundColor: item.value }}
                />
                {item.label}
              </button>
            ))}
          </div>

          <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="custom-bg-color">
            自定义底色
          </label>
          <input
            className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-2"
            id="custom-bg-color"
            onChange={(event) => setTargetColor(event.target.value)}
            type="color"
            value={targetColor}
          />

          <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="bg-tolerance">
            背景容差：{tolerance}
          </label>
          <input
            className="mt-2 w-full accent-accent-500"
            id="bg-tolerance"
            max="140"
            min="10"
            onChange={(event) => setTolerance(Number(event.target.value))}
            step="1"
            type="range"
            value={tolerance}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={isProcessing}
              onClick={handleReplace}
              type="button"
            >
              {isProcessing ? "处理中" : "更换底色"}
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

      {output ? (
        <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-950">换底结果</h2>
              <p className="mt-1 text-sm text-slate-500">
                输出尺寸：{output.width} x {output.height}，文件大小：{formatBytes(output.size)}
              </p>
            </div>
            <a
              className="rounded-md bg-primary-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary-900"
              download={output.name}
              href={output.url}
            >
              下载PNG
            </a>
          </div>
          <img
            alt="换底结果预览"
            className="mt-4 max-h-[520px] w-full rounded-md border border-slate-200 object-contain"
            src={output.url}
          />
        </div>
      ) : null}
    </section>
  );
}
