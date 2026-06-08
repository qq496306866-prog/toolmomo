"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";

type EcommerceImagePresetLocale = "zh" | "en";

type Preset = {
  id: string;
  name: Record<EcommerceImagePresetLocale, string>;
  platform: Record<EcommerceImagePresetLocale, string>;
  width: number;
  height: number;
  note: Record<EcommerceImagePresetLocale, string>;
};

type OutputImage = {
  name: string;
  width: number;
  height: number;
  size: number;
  url: string;
};

const copy = {
  zh: {
    currentPreset: "当前规格",
    sourceSize: "原图尺寸",
    outputSize: "输出大小",
    chooseImage: "选择商品图片",
    chooseHint: "选择后会显示原图预览，可按平台规格生成居中裁剪主图。",
    imagePreviewAlt: "商品图预览",
    presetTitle: "平台规格",
    quality: "输出质量",
    generate: "生成主图",
    generating: "生成中...",
    clear: "清空",
    result: "生成结果",
    outputLabel: "输出大小",
    download: "下载主图",
    resultAlt: "主图生成结果",
    fileTypeError: "请选择 JPG、PNG、WebP 等图片文件。",
    missingFileError: "请先选择一张商品图片。",
    loadError: "图片读取失败，请换一张图片重试。",
    canvasError: "浏览器不支持 Canvas 图片处理。",
    generateError: "主图生成失败，请重试。",
  },
  en: {
    currentPreset: "Current preset",
    sourceSize: "Source size",
    outputSize: "Output size",
    chooseImage: "Choose product image",
    chooseHint: "Preview the source image, then generate a centered crop for the selected marketplace size.",
    imagePreviewAlt: "Product image preview",
    presetTitle: "Marketplace presets",
    quality: "Output quality",
    generate: "Generate image",
    generating: "Generating...",
    clear: "Clear",
    result: "Generated result",
    outputLabel: "Output size",
    download: "Download image",
    resultAlt: "Generated product image",
    fileTypeError: "Choose an image file such as JPG, PNG, or WebP.",
    missingFileError: "Choose a product image first.",
    loadError: "The image could not be loaded. Try another file.",
    canvasError: "This browser does not support Canvas image processing.",
    generateError: "Image generation failed. Please try again.",
  },
};

const presets: Preset[] = [
  {
    id: "amazon-main",
    name: { zh: "Amazon 主图", en: "Amazon Main Image" },
    platform: { zh: "Amazon", en: "Amazon" },
    width: 2000,
    height: 2000,
    note: {
      zh: "适合可放大查看的 Amazon 方形主图，建议白底并保持商品居中。",
      en: "Square product image for zoom-ready Amazon listings. Keep the product centered on a white background.",
    },
  },
  {
    id: "shopify-square",
    name: { zh: "Shopify 商品方图", en: "Shopify Product Square" },
    platform: { zh: "Shopify", en: "Shopify" },
    width: 2048,
    height: 2048,
    note: {
      zh: "适合 Shopify 商品详情页、集合页和店铺陈列的高清方图。",
      en: "High-resolution square product image for storefront collections and product detail pages.",
    },
  },
  {
    id: "etsy-listing",
    name: { zh: "Etsy 列表图", en: "Etsy Listing Image" },
    platform: { zh: "Etsy", en: "Etsy" },
    width: 2000,
    height: 1600,
    note: {
      zh: "适合 Etsy 搜索结果和商品图库预览的横向比例。",
      en: "Landscape listing image ratio commonly used for Etsy search and product gallery previews.",
    },
  },
  {
    id: "ebay-gallery",
    name: { zh: "eBay 图库图", en: "eBay Gallery Image" },
    platform: { zh: "eBay", en: "eBay" },
    width: 1600,
    height: 1600,
    note: {
      zh: "适合 eBay 搜索结果和商品页的方形图库图片。",
      en: "Square gallery image for marketplace search results and product pages.",
    },
  },
  {
    id: "walmart-main",
    name: { zh: "Walmart 主图", en: "Walmart Main Image" },
    platform: { zh: "Walmart", en: "Walmart" },
    width: 2000,
    height: 2000,
    note: {
      zh: "适合 Walmart Marketplace 商品列表的零售风格方形主图。",
      en: "Retail-style square image for Walmart Marketplace product listings.",
    },
  },
  {
    id: "taobao-main",
    name: { zh: "淘宝主图", en: "Taobao Main Image" },
    platform: { zh: "淘宝", en: "Taobao" },
    width: 800,
    height: 800,
    note: {
      zh: "常用商品主图比例，适合列表和商品详情入口。",
      en: "Standard square product image for Taobao listing and product detail entry points.",
    },
  },
  {
    id: "taobao-long-main",
    name: { zh: "淘宝竖版长图", en: "Taobao Portrait Image" },
    platform: { zh: "淘宝", en: "Taobao" },
    width: 750,
    height: 1000,
    note: {
      zh: "常用于竖版主图、场景图和商品长图展示。",
      en: "Portrait product image for scene images and taller product gallery assets.",
    },
  },
  {
    id: "tmall-main",
    name: { zh: "天猫主图", en: "Tmall Main Image" },
    platform: { zh: "天猫", en: "Tmall" },
    width: 800,
    height: 800,
    note: {
      zh: "常见天猫商品主图规格，建议主体居中留白。",
      en: "Common Tmall square product image size with centered product framing.",
    },
  },
  {
    id: "jd-main",
    name: { zh: "京东主图", en: "JD Product Image" },
    platform: { zh: "京东", en: "JD" },
    width: 800,
    height: 800,
    note: {
      zh: "京东商品主图常用方图规格。",
      en: "Common square product image size for JD listings.",
    },
  },
  {
    id: "pdd-main",
    name: { zh: "拼多多主图", en: "Pinduoduo Main Image" },
    platform: { zh: "拼多多", en: "Pinduoduo" },
    width: 800,
    height: 800,
    note: {
      zh: "适合商品主图和活动入口图基础处理。",
      en: "Square product image size for Pinduoduo product and promotion entry images.",
    },
  },
  {
    id: "douyin-main",
    name: { zh: "抖店商品图", en: "Douyin Shop Image" },
    platform: { zh: "抖店", en: "Douyin Shop" },
    width: 800,
    height: 800,
    note: {
      zh: "抖店常用商品图尺寸，适合正方形素材。",
      en: "Square product image size commonly used for Douyin Shop assets.",
    },
  },
  {
    id: "taobao-detail",
    name: { zh: "淘宝详情页宽图", en: "Taobao Detail Image" },
    platform: { zh: "淘宝", en: "Taobao" },
    width: 790,
    height: 1200,
    note: {
      zh: "详情页常用宽度示例，高度可按内容继续裁切。",
      en: "Detail-page width preset. Extend or crop height based on the final content block.",
    },
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

function loadImage(file: File, errorMessage: string) {
  return new Promise<{ image: HTMLImageElement; width: number; height: number }>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ image, width: image.naturalWidth, height: image.naturalHeight });
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(errorMessage));
    };

    image.src = url;
  });
}

async function createPresetImage(
  file: File,
  preset: Preset,
  quality: number,
  messages: { loadError: string; canvasError: string; generateError: string },
) {
  const { image, width, height } = await loadImage(file, messages.loadError);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error(messages.canvasError);
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

  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, preset.width, preset.height);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error(messages.generateError));
          return;
        }

        resolve(blob);
      },
      "image/jpeg",
      quality,
    );
  });
}

export function EcommerceImagePresetTool({ locale = "zh" }: { locale?: EcommerceImagePresetLocale }) {
  const text = copy[locale];
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

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError(text.fileTypeError);
      setFile(null);
      setPreviewUrl("");
      setOutput(null);
      return;
    }

    try {
      const imageInfo = await loadImage(selectedFile, text.loadError);
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setSourceSize({ width: imageInfo.width, height: imageInfo.height });
      setOutput(null);
      setError("");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : text.loadError);
    }
  };

  const handleGenerate = async () => {
    if (!file) {
      setError(text.missingFileError);
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const blob = await createPresetImage(file, selectedPreset, quality, text);
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
      setError(caughtError instanceof Error ? caughtError.message : text.generateError);
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
          <div className="text-xs font-semibold text-slate-500">{text.currentPreset}</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">
            {selectedPreset.width} x {selectedPreset.height}
          </div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">{text.sourceSize}</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">
            {sourceSize.width ? `${sourceSize.width} x ${sourceSize.height}` : "-"}
          </div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">{text.outputSize}</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{formatBytes(output?.size ?? 0)}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-5">
          <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-md bg-white p-6 text-center hover:bg-accent-50">
            {previewUrl ? (
              <img alt={text.imagePreviewAlt} className="max-h-80 w-full rounded-md object-contain" src={previewUrl} />
            ) : (
              <>
                <span className="text-base font-bold text-slate-950">{text.chooseImage}</span>
                <span className="mt-2 text-sm leading-6 text-slate-500">{text.chooseHint}</span>
              </>
            )}
            <input accept="image/*" className="sr-only" onChange={handleFileChange} type="file" />
          </label>
          {file ? (
            <div className="mt-4 rounded-md bg-white p-4 text-sm text-slate-600">
              <div className="font-semibold text-slate-950">{file.name}</div>
              <div className="mt-1">
                {sourceSize.width} x {sourceSize.height}, {formatBytes(file.size)}
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4">
          <h2 className="text-base font-bold text-slate-950">{text.presetTitle}</h2>
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
                  <span className="text-sm font-bold text-slate-950">{preset.name[locale]}</span>
                  <span className="text-xs font-semibold text-accent-700">
                    {preset.width} x {preset.height}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-500">{preset.note[locale]}</p>
              </button>
            ))}
          </div>

          <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="main-image-quality">
            {text.quality}: {Math.round(quality * 100)}%
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
              {isProcessing ? text.generating : text.generate}
            </button>
            <button
              className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
              onClick={handleClear}
              type="button"
            >
              {text.clear}
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
              <h2 className="text-base font-bold text-slate-950">{text.result}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {selectedPreset.name[locale]}, {output.width} x {output.height}, {text.outputLabel}:{" "}
                {formatBytes(output.size)}
              </p>
            </div>
            <a
              className="rounded-md bg-primary-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary-900"
              download={output.name}
              href={output.url}
            >
              {text.download}
            </a>
          </div>
          <img
            alt={text.resultAlt}
            className="mt-4 max-h-[520px] w-full rounded-md border border-slate-200 object-contain"
            src={output.url}
          />
        </div>
      ) : null}
    </section>
  );
}
