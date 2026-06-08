"use client";

import { useMemo, useState } from "react";

type RgbColor = {
  r: number;
  g: number;
  b: number;
};

const presetColors = ["#2563eb", "#f97316", "#10b981", "#ef4444", "#111827", "#ffffff"];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function componentToHex(value: number) {
  return clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0");
}

function rgbToHex({ r, g, b }: RgbColor) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`.toUpperCase();
}

function hexToRgb(hex: string): RgbColor | null {
  const normalized = hex.trim().replace(/^#/, "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) {
    return null;
  }

  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16),
  };
}

function rgbToHsl({ r, g, b }: RgbColor) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(lightness * 100) };
  }

  const delta = max - min;
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue = 0;

  if (max === red) {
    hue = (green - blue) / delta + (green < blue ? 6 : 0);
  } else if (max === green) {
    hue = (blue - red) / delta + 2;
  } else {
    hue = (red - green) / delta + 4;
  }

  return {
    h: Math.round(hue * 60),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
}

function parseRgb(text: string): RgbColor | null {
  const numbers = text.match(/\d+(\.\d+)?/g)?.map(Number) ?? [];

  if (numbers.length < 3) {
    return null;
  }

  return {
    r: clamp(numbers[0], 0, 255),
    g: clamp(numbers[1], 0, 255),
    b: clamp(numbers[2], 0, 255),
  };
}

function parseColor(text: string): RgbColor | null {
  if (text.trim().startsWith("#") || /^[0-9a-fA-F]{3,6}$/.test(text.trim())) {
    return hexToRgb(text);
  }

  return parseRgb(text);
}

export function ColorConverterTool() {
  const [input, setInput] = useState("#2563eb");
  const [copyText, setCopyText] = useState("复制全部");

  const result = useMemo(() => {
    const rgb = parseColor(input);

    if (!rgb) {
      return null;
    }

    const hex = rgbToHex(rgb);
    const hsl = rgbToHsl(rgb);

    return {
      rgb,
      hex,
      rgbText: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hslText: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    };
  }, [input]);

  const copyAll = async () => {
    if (!result) {
      return;
    }

    try {
      await navigator.clipboard.writeText([result.hex, result.rgbText, result.hslText].join("\n"));
      setCopyText("已复制");
      window.setTimeout(() => setCopyText("复制全部"), 1600);
    } catch {
      setCopyText("复制失败");
      window.setTimeout(() => setCopyText("复制全部"), 1600);
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <label className="text-sm font-semibold text-slate-800" htmlFor="color-input">
            输入颜色值
          </label>
          <input
            className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 font-mono text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
            id="color-input"
            onChange={(event) => setInput(event.target.value)}
            placeholder="#2563eb 或 rgb(37, 99, 235)"
            value={input}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {presetColors.map((color) => (
              <button
                aria-label={`选择颜色 ${color}`}
                className="h-9 w-9 rounded-md border border-slate-200"
                key={color}
                onClick={() => setInput(color)}
                style={{ backgroundColor: color }}
                type="button"
              />
            ))}
          </div>

          {result ? (
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-md bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-500">HEX</div>
                <div className="mt-2 break-all font-mono text-lg font-bold text-primary-700">{result.hex}</div>
              </div>
              <div className="rounded-md bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-500">RGB</div>
                <div className="mt-2 break-all font-mono text-lg font-bold text-primary-700">{result.rgbText}</div>
              </div>
              <div className="rounded-md bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-500">HSL</div>
                <div className="mt-2 break-all font-mono text-lg font-bold text-accent-600">{result.hslText}</div>
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              暂时无法识别这个颜色值，请输入 HEX 或 RGB 格式。
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 disabled:bg-slate-300"
              disabled={!result}
              onClick={copyAll}
              type="button"
            >
              {copyText}
            </button>
            <button
              className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
              onClick={() => setInput("#2563eb")}
              type="button"
            >
              重置
            </button>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">颜色预览</h2>
          <div
            className="mt-4 h-44 rounded-md border border-slate-200"
            style={{ backgroundColor: result?.hex ?? "#f8fafc" }}
          />
          <div className="mt-4 rounded-md bg-white p-4 text-sm leading-6 text-slate-600">
            可用于 CSS、设计标注、品牌色整理和前端页面调色。
          </div>
        </div>
      </div>
    </section>
  );
}
