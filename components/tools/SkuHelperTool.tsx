"use client";

import { useMemo, useState } from "react";

type SkuItem = {
  name: string;
  code: string;
};

type SkuHelperLocale = "zh" | "en";

const skuText = {
  zh: {
    copyAll: "复制全部",
    copied: "已复制",
    copyFailed: "复制失败",
    count: "SKU数量",
    colorCount: "颜色数",
    groups: "规格组",
    prefix: "SKU前缀",
    prefixPlaceholder: "例如：CUP、TSHIRT、SKU",
    colors: "颜色",
    colorsPlaceholder: "白色, 黑色",
    sizes: "尺码/容量",
    sizesPlaceholder: "S, M, L 或 350ml",
    specs: "规格",
    specsPlaceholder: "单只装, 双只装",
    rules: "生成规则",
    rulesList: ["按颜色、尺码、规格自动排列组合。", "SKU 编码会附加序号，避免重复。", "复制结果使用制表符分隔，方便粘贴到表格。"],
    sample: "填入示例",
    clear: "清空",
    code: "SKU编码",
    name: "SKU名称",
    empty: "输入颜色、尺码或规格后会自动生成 SKU。",
    samplePrefix: "CUP",
    sampleColors: "白色, 黑色, 蓝色",
    sampleSizes: "350ml, 500ml",
    sampleSpecs: "单只装, 双只装",
  },
  en: {
    copyAll: "Copy all",
    copied: "Copied",
    copyFailed: "Copy failed",
    count: "SKU count",
    colorCount: "Color options",
    groups: "Option groups",
    prefix: "SKU prefix",
    prefixPlaceholder: "e.g. CUP, TSHIRT, SKU",
    colors: "Colors",
    colorsPlaceholder: "White, Black, Blue",
    sizes: "Sizes / capacity",
    sizesPlaceholder: "S, M, L or 12oz",
    specs: "Packs / variants",
    specsPlaceholder: "Single Pack, 2 Pack",
    rules: "Generation rules",
    rulesList: ["Combines colors, sizes, and variants automatically.", "Adds a sequence number to reduce duplicate SKU codes.", "Copied results use tabs, so they paste cleanly into spreadsheets."],
    sample: "Use sample",
    clear: "Clear",
    code: "SKU code",
    name: "SKU name",
    empty: "Enter colors, sizes, or variants to generate SKUs.",
    samplePrefix: "TUMBLER",
    sampleColors: "White, Black, Navy",
    sampleSizes: "12oz, 20oz",
    sampleSpecs: "Single Pack, 2 Pack",
  },
};

function splitValues(value: string) {
  return value
    .split(/[\n,，、;；]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeCode(value: string) {
  return value
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fa5-]/g, "")
    .toUpperCase();
}

function combine(values: string[][]) {
  return values.reduce<string[][]>(
    (groups, currentValues) => groups.flatMap((group) => currentValues.map((value) => [...group, value])),
    [[]],
  );
}

export function SkuHelperTool({ locale = "zh" }: { locale?: SkuHelperLocale }) {
  const text = skuText[locale];
  const [prefix, setPrefix] = useState("TM");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [specs, setSpecs] = useState("");
  const [copyText, setCopyText] = useState(text.copyAll);

  const skuList = useMemo<SkuItem[]>(() => {
    const groups = [splitValues(colors), splitValues(sizes), splitValues(specs)].filter((group) => group.length);

    if (!groups.length) {
      return [];
    }

    return combine(groups).map((parts, index) => {
      const name = parts.join(" / ");
      const codeParts = [prefix.trim(), ...parts.map(normalizeCode), String(index + 1).padStart(3, "0")].filter(Boolean);

      return {
        name,
        code: codeParts.join("-"),
      };
    });
  }, [colors, prefix, sizes, specs]);

  const handleSample = () => {
    setPrefix(text.samplePrefix);
    setColors(text.sampleColors);
    setSizes(text.sampleSizes);
    setSpecs(text.sampleSpecs);
    setCopyText(text.copyAll);
  };

  const handleClear = () => {
    setPrefix("");
    setColors("");
    setSizes("");
    setSpecs("");
    setCopyText(text.copyAll);
  };

  const handleCopy = async () => {
    if (!skuList.length) {
      return;
    }

    const content = skuList.map((item) => `${item.code}\t${item.name}`).join("\n");

    try {
      await navigator.clipboard.writeText(content);
      setCopyText(text.copied);
      window.setTimeout(() => setCopyText(text.copyAll), 1600);
    } catch {
      setCopyText(text.copyFailed);
      window.setTimeout(() => setCopyText(text.copyAll), 1600);
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">{text.count}</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{skuList.length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">{text.colorCount}</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{splitValues(colors).length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">{text.groups}</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">
            {[colors, sizes, specs].filter((item) => splitValues(item).length).length}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800" htmlFor="sku-prefix">
            {text.prefix}
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="sku-prefix"
              onChange={(event) => setPrefix(event.target.value)}
              placeholder={text.prefixPlaceholder}
              value={prefix}
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="text-sm font-semibold text-slate-800" htmlFor="sku-colors">
              {text.colors}
              <textarea
                className="mt-2 min-h-40 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="sku-colors"
                onChange={(event) => setColors(event.target.value)}
                placeholder={text.colorsPlaceholder}
                value={colors}
              />
            </label>
            <label className="text-sm font-semibold text-slate-800" htmlFor="sku-sizes">
              {text.sizes}
              <textarea
                className="mt-2 min-h-40 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="sku-sizes"
                onChange={(event) => setSizes(event.target.value)}
                placeholder={text.sizesPlaceholder}
                value={sizes}
              />
            </label>
            <label className="text-sm font-semibold text-slate-800" htmlFor="sku-specs">
              {text.specs}
              <textarea
                className="mt-2 min-h-40 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="sku-specs"
                onChange={(event) => setSpecs(event.target.value)}
                placeholder={text.specsPlaceholder}
                value={specs}
              />
            </label>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">{text.rules}</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            {text.rulesList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
              onClick={handleCopy}
              type="button"
            >
              {copyText}
            </button>
            <button
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
              onClick={handleSample}
              type="button"
            >
              {text.sample}
            </button>
            <button
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
              onClick={handleClear}
              type="button"
            >
              {text.clear}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-md border border-slate-200">
        <div className="grid grid-cols-[minmax(160px,1fr)_minmax(180px,1.2fr)] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700">
          <div>{text.code}</div>
          <div>{text.name}</div>
        </div>
        <div className="max-h-96 overflow-auto bg-white">
          {skuList.length ? (
            skuList.map((item) => (
              <div
                className="grid grid-cols-[minmax(160px,1fr)_minmax(180px,1.2fr)] border-t border-slate-100 px-4 py-3 text-sm"
                key={item.code}
              >
                <div className="break-all font-mono text-primary-700">{item.code}</div>
                <div className="text-slate-700">{item.name}</div>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-sm text-slate-500">
              {text.empty}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
