"use client";

import { useMemo, useState } from "react";
type UuidGeneratorLocale = "zh" | "en";

const uuidText = {
  zh: {
    copyAll: "复制全部",
    copied: "已复制",
    copyFailed: "复制失败",
    settings: "生成设置",
    count: "数量",
    uppercase: "转为大写",
    withoutHyphen: "移除连字符",
    generate: "生成 UUID",
    generated: "已生成",
    format: "格式",
    compact: "32位",
    standard: "标准",
    version: "版本",
    placeholder: "点击生成后，UUID 会显示在这里",
    export: "导出 TXT",
  },
  en: {
    copyAll: "Copy all",
    copied: "Copied",
    copyFailed: "Copy failed",
    settings: "Generator settings",
    count: "Count",
    uppercase: "Uppercase",
    withoutHyphen: "Remove hyphens",
    generate: "Generate UUIDs",
    generated: "Generated",
    format: "Format",
    compact: "32 chars",
    standard: "Standard",
    version: "Version",
    placeholder: "Generated UUIDs will appear here",
    export: "Export TXT",
  },
};

function createUuid() {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex
    .slice(8, 10)
    .join("")}-${hex.slice(10).join("")}`;
}

export function UuidGeneratorTool({ locale = "zh" }: { locale?: UuidGeneratorLocale }) {
  const text = uuidText[locale];
  const [count, setCount] = useState(10);
  const [uppercase, setUppercase] = useState(false);
  const [withoutHyphen, setWithoutHyphen] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copyText, setCopyText] = useState(text.copyAll);

  const outputText = useMemo(() => uuids.join("\n"), [uuids]);

  const formatUuid = (uuid: string) => {
    const formatted = withoutHyphen ? uuid.replaceAll("-", "") : uuid;
    return uppercase ? formatted.toUpperCase() : formatted;
  };

  const generate = () => {
    const safeCount = Math.min(100, Math.max(1, count));
    setUuids(Array.from({ length: safeCount }, () => formatUuid(createUuid())));
    setCopyText(text.copyAll);
  };

  const copyAll = async () => {
    if (!outputText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      setCopyText(text.copied);
      window.setTimeout(() => setCopyText(text.copyAll), 1600);
    } catch {
      setCopyText(text.copyFailed);
      window.setTimeout(() => setCopyText(text.copyAll), 1600);
    }
  };

  const download = () => {
    if (!outputText) {
      return;
    }

    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "toolmomo-uuid.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">{text.settings}</h2>
          <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="uuid-count">
            {text.count}: {count}
          </label>
          <input
            className="mt-2 w-full accent-accent-500"
            id="uuid-count"
            max="100"
            min="1"
            onChange={(event) => setCount(Number(event.target.value))}
            type="range"
            value={count}
          />
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                checked={uppercase}
                className="h-4 w-4 accent-accent-500"
                onChange={(event) => setUppercase(event.target.checked)}
                type="checkbox"
              />
              {text.uppercase}
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                checked={withoutHyphen}
                className="h-4 w-4 accent-accent-500"
                onChange={(event) => setWithoutHyphen(event.target.checked)}
                type="checkbox"
              />
              {text.withoutHyphen}
            </label>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
              onClick={generate}
              type="button"
            >
              {text.generate}
            </button>
            <button
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
              onClick={copyAll}
              type="button"
            >
              {copyText}
            </button>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-500">{text.generated}</div>
              <div className="mt-2 text-2xl font-bold text-primary-700">{uuids.length}</div>
            </div>
            <div className="rounded-md bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-500">{text.format}</div>
              <div className="mt-2 text-lg font-bold text-primary-700">{withoutHyphen ? text.compact : text.standard}</div>
            </div>
            <div className="rounded-md bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-500">{text.version}</div>
              <div className="mt-2 text-lg font-bold text-accent-600">UUID v4</div>
            </div>
          </div>

          <textarea
            className="mt-4 min-h-80 w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-7 text-slate-800 outline-none"
            placeholder={text.placeholder}
            readOnly
            spellCheck={false}
            value={outputText}
          />
          <button
            className="mt-3 rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
            onClick={download}
            type="button"
          >
            {text.export}
          </button>
        </div>
      </div>
    </section>
  );
}
