"use client";

import { useEffect, useMemo, useState } from "react";

type Preset = {
  id: string;
  name: string;
  platform: string;
  width: number;
  height: number;
  note: string;
};

type OutputImage = {
  name: string;
  width: number;
  height: number;
  size: number;
  url: string;
};

const presets: Preset[] = [
  {
    id: "amazon-main",
    name: "Amazon Main Image",
    platform: "Amazon",
    width: 2000,
    height: 2000,
    note: "Square product image for zoom-ready Amazon listings. Keep the product centered on a white background.",
  },
  {
    id: "shopify-square",
    name: "Shopify Product Square",
    platform: "Shopify",
    width: 2048,
    height: 2048,
    note: "High-resolution square product image for storefront collections and product detail pages.",
  },
  {
    id: "etsy-listing",
    name: "Etsy Listing Image",
    platform: "Etsy",
    width: 2000,
    height: 1600,
    note: "Landscape listing image ratio commonly used for Etsy search and product gallery previews.",
  },
  {
    id: "ebay-gallery",
    name: "eBay Gallery Image",
    platform: "eBay",
    width: 1600,
    height: 1600,
    note: "Square gallery image for marketplace search results and product pages.",
  },
  {
    id: "walmart-main",
    name: "Walmart Main Image",
    platform: "Walmart",
    width: 2000,
    height: 2000,
    note: "Retail-style square image for Walmart Marketplace product listings.",
  },
  {
    id: "taobao-main",
    name: "淘宝主图",
    platform: "淘宝",
    width: 800,
    height: 800,
    note: "常用商品主图比例，适合列表和商品详情入口。",
  },
  {
    id: "taobao-long-main",
    name: "淘宝竖版长图",
    platform: "淘宝",
    width: 750,
    height: 1000,
    note: "常用于竖版主图、场景图和商品长图展示。",
  },
  {
    id: "tmall-main",
    name: "天猫主图",
    platform: "天猫",
    width: 800,
    height: 800,
    note: "常见天猫商品主图规格，建议主体居中留白。",
  },
  {
    id: "jd-main",
    name: "京东主图",
    platform: "京东",
    width: 800,
    height: 800,
    note: "京东商品主图常用方图规格。",
  },
  {
    id: "pdd-main",
    name: "拼多多主图",
    platform: "拼多多",
    width: 800,
    height: 800,
    note: "适合商品主图和活动入口图基础处理。",
  },
  {
    id: "douyin-main",
    name: "抖店商品图",
    platform: "抖店",
    width: 800,
    height: 800,
    note: "抖店常用商品图尺寸，适合正方形素材。",
  },
  {
    id: "taobao-detail",
    name: "淘宝详情页宽图",
    platform: "淘宝",
    width: 790,
    height: 1200,
    note: "详情页常用宽度示例，高度可按内容继续裁切。",
  },
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

async function createPresetImage(file: File, preset: Preset, quality: number) {
  const { image, width, height } = await loadImage(file);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("浏览器不支持 Canvas 图片处理。");
  }

  canvas.width = preset.width;
  canvas.height = preset.height;
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, preset.width, preset.height);

  const sourceRatio = width / height;
  const targetRatio = preset.width / preset.height;
  let sourceWidth = width;
  let sourceHeight = height;
  let sourceX = 0;
  let sourceY = 0;

  if (sourceRatio > targetRatio) {
    sourceWidth = Math.round(height * targetRatio);
    sourceX = Math.round((width - sourceWidth) / 2);
  } else {
    sourceHeight = Math.round(width / targetRatio);
    sourceY = Math.round((height - sourceHeight) / 2);
  }

  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    preset.width,
    preset.height,
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("主图生成失败，请重试。"));
          return;
        }

        resolve(blob);
      },
      "image/jpeg",
      quality,
    );
  });
}

export function EcommerceImagePresetTool() {
  const [selectedPresetId, setSelectedPresetId] = useState(presets[0].id);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [sourceSize, setSourceSize] = useState({ width: 0, height: 0 });
  const [quality, setQuality] = useState(0.9);
  const [output, setOutput] = useState<OutputImage | null>(null);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPreset = useMemo(
    () => presets.find((preset) => preset.id === selectedPresetId) ?? presets[0],
    [selectedPresetId],
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

    try {
      const imageInfo = await loadImage(selectedFile);
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setSourceSize({ width: imageInfo.width, height: imageInfo.height });
      setOutput(null);
      setError("");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "图片读取失败，请重试。");
    }
  };

  const handleGenerate = async () => {
    if (!file) {
      setError("请先选择一张商品图片。");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const blob = await createPresetImage(file, selectedPreset, quality);
      const url = URL.createObjectURL(blob);

      if (output?.url) {
        URL.revokeObjectURL(output.url);
      }

      setOutput({
        name: `${selectedPreset.id}-${selectedPreset.width}x${selectedPreset.height}.jpg`,
        width: selectedPreset.width,
        height: selectedPreset.height,
        size: blob.size,
        url,
      });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "主图生成失败，请重试。");
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
    setSourceSize({ width: 0, height: 0 });
    setOutput(null);
    setError("");
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">当前规格</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">
            {selectedPreset.width} x {selectedPreset.height}
          </div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">原图尺寸</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">
            {sourceSize.width ? `${sourceSize.width} x ${sourceSize.height}` : "-"}
          </div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输出大小</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{formatBytes(output?.size ?? 0)}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-5">
          <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-md bg-white p-6 text-center hover:bg-accent-50">
            {previewUrl ? (
              <img alt="商品图预览" className="max-h-80 w-full rounded-md object-contain" src={previewUrl} />
            ) : (
              <>
                <span className="text-base font-bold text-slate-950">选择商品图片</span>
                <span className="mt-2 text-sm leading-6 text-slate-500">
                  选择后会显示原图预览，可按平台规格生成居中裁剪主图。
                </span>
              </>
            )}
            <input accept="image/*" className="sr-only" onChange={handleFileChange} type="file" />
          </label>
          {file ? (
            <div className="mt-4 rounded-md bg-white p-4 text-sm text-slate-600">
              <div className="font-semibold text-slate-950">{file.name}</div>
              <div className="mt-1">
                {sourceSize.width} x {sourceSize.height}，{formatBytes(file.size)}
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4">
          <h2 className="text-base font-bold text-slate-950">平台规格</h2>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {presets.map((preset) => (
              <button
                className={
                  preset.id === selectedPresetId
                    ? "w-full rounded-md border border-accent-500 bg-accent-50 p-3 text-left"
                    : "w-full rounded-md border border-slate-200 bg-slate-50 p-3 text-left hover:border-accent-200 hover:bg-accent-50"
                }
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                type="button"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-slate-950">{preset.name}</span>
                  <span className="text-xs font-semibold text-accent-700">
                    {preset.width} x {preset.height}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-500">{preset.note}</p>
              </button>
            ))}
          </div>

          <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="main-image-quality">
            输出质量：{Math.round(quality * 100)}%
          </label>
          <input
            className="mt-2 w-full accent-accent-500"
            id="main-image-quality"
            max="0.95"
            min="0.5"
            onChange={(event) => setQuality(Number(event.target.value))}
            step="0.01"
            type="range"
            value={quality}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={isProcessing}
              onClick={handleGenerate}
              type="button"
            >
              {isProcessing ? "生成中" : "生成主图"}
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
              <h2 className="text-base font-bold text-slate-950">生成结果</h2>
              <p className="mt-1 text-sm text-slate-500">
                {selectedPreset.name}：{output.width} x {output.height}，输出大小 {formatBytes(output.size)}
              </p>
            </div>
            <a
              className="rounded-md bg-primary-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary-900"
              download={output.name}
              href={output.url}
            >
              下载主图
            </a>
          </div>
          <img
            alt="主图生成结果"
            className="mt-4 max-h-[520px] w-full rounded-md border border-slate-200 object-contain"
            src={output.url}
          />
        </div>
      ) : null}
    </section>
  );
}
