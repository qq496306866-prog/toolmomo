"use client";

import { useMemo, useState } from "react";

type SkuItem = {
  name: string;
  code: string;
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

export function SkuHelperTool() {
  const [prefix, setPrefix] = useState("TM");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [specs, setSpecs] = useState("");
  const [copyText, setCopyText] = useState("复制全部");

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
    setPrefix("CUP");
    setColors("白色, 黑色, 蓝色");
    setSizes("350ml, 500ml");
    setSpecs("单只装, 双只装");
    setCopyText("复制全部");
  };

  const handleClear = () => {
    setPrefix("");
    setColors("");
    setSizes("");
    setSpecs("");
    setCopyText("复制全部");
  };

  const handleCopy = async () => {
    if (!skuList.length) {
      return;
    }

    const content = skuList.map((item) => `${item.code}\t${item.name}`).join("\n");

    try {
      await navigator.clipboard.writeText(content);
      setCopyText("已复制");
      window.setTimeout(() => setCopyText("复制全部"), 1600);
    } catch {
      setCopyText("复制失败");
      window.setTimeout(() => setCopyText("复制全部"), 1600);
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">SKU数量</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{skuList.length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">颜色数</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{splitValues(colors).length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">规格组</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">
            {[colors, sizes, specs].filter((item) => splitValues(item).length).length}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800" htmlFor="sku-prefix">
            SKU前缀
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="sku-prefix"
              onChange={(event) => setPrefix(event.target.value)}
              placeholder="例如：CUP、TSHIRT、SKU"
              value={prefix}
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="text-sm font-semibold text-slate-800" htmlFor="sku-colors">
              颜色
              <textarea
                className="mt-2 min-h-40 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="sku-colors"
                onChange={(event) => setColors(event.target.value)}
                placeholder="白色, 黑色"
                value={colors}
              />
            </label>
            <label className="text-sm font-semibold text-slate-800" htmlFor="sku-sizes">
              尺码/容量
              <textarea
                className="mt-2 min-h-40 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="sku-sizes"
                onChange={(event) => setSizes(event.target.value)}
                placeholder="S, M, L 或 350ml"
                value={sizes}
              />
            </label>
            <label className="text-sm font-semibold text-slate-800" htmlFor="sku-specs">
              规格
              <textarea
                className="mt-2 min-h-40 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="sku-specs"
                onChange={(event) => setSpecs(event.target.value)}
                placeholder="单只装, 双只装"
                value={specs}
              />
            </label>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">生成规则</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>按颜色、尺码、规格自动排列组合。</li>
            <li>SKU 编码会附加序号，避免重复。</li>
            <li>复制结果使用制表符分隔，方便粘贴到表格。</li>
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
              填入示例
            </button>
            <button
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
              onClick={handleClear}
              type="button"
            >
              清空
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-md border border-slate-200">
        <div className="grid grid-cols-[minmax(160px,1fr)_minmax(180px,1.2fr)] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700">
          <div>SKU编码</div>
          <div>SKU名称</div>
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
              输入颜色、尺码或规格后会自动生成 SKU。
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
