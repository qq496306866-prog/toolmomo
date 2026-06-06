"use client";

import { useMemo, useState } from "react";

const platformTips = {
  taobao: {
    label: "淘宝/天猫",
    maxLength: 60,
    tone: "突出品类、核心卖点和适用场景",
  },
  jd: {
    label: "京东",
    maxLength: 60,
    tone: "强调品牌感、规格和品质关键词",
  },
  pdd: {
    label: "拼多多",
    maxLength: 50,
    tone: "突出实惠、组合、规格和人群需求",
  },
  xhs: {
    label: "小红书",
    maxLength: 36,
    tone: "更像种草标题，突出场景和情绪价值",
  },
};

type PlatformKey = keyof typeof platformTips;

function splitKeywords(value: string) {
  return value
    .split(/[\n,，、;；]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function uniqueJoin(items: string[]) {
  return Array.from(new Set(items.filter(Boolean))).join(" ");
}

function clampTitle(title: string, maxLength: number) {
  if (title.length <= maxLength) {
    return title;
  }

  return `${title.slice(0, maxLength - 1)}…`;
}

export function ProductTitleTool() {
  const [platform, setPlatform] = useState<PlatformKey>("taobao");
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [sellingPoints, setSellingPoints] = useState("");
  const [audience, setAudience] = useState("");
  const [scenario, setScenario] = useState("");
  const [copyText, setCopyText] = useState("复制第一条");

  const titles = useMemo(() => {
    const tips = platformTips[platform];
    const points = splitKeywords(sellingPoints).slice(0, 5);
    const core = productName.trim() || "商品名称";
    const brandText = brand.trim();
    const audienceText = audience.trim();
    const scenarioText = scenario.trim();
    const pointText = uniqueJoin(points);

    const candidates = [
      uniqueJoin([brandText, core, pointText, audienceText, scenarioText]),
      uniqueJoin([core, scenarioText, pointText, audienceText ? `${audienceText}适用` : ""]),
      uniqueJoin([brandText, pointText, core, scenarioText ? `${scenarioText}推荐` : ""]),
      uniqueJoin([scenarioText ? `${scenarioText}必备` : "", core, pointText, audienceText]),
      uniqueJoin([core, points[0], points[1], scenarioText, tips.label]),
    ].filter((item) => item.trim().length > 0);

    return Array.from(new Set(candidates)).map((title) => clampTitle(title, tips.maxLength));
  }, [audience, brand, platform, productName, scenario, sellingPoints]);

  const filledFields = [productName, brand, sellingPoints, audience, scenario].filter((item) => item.trim()).length;

  const handleSample = () => {
    setPlatform("taobao");
    setProductName("保温咖啡杯");
    setBrand("Toolmomo精选");
    setSellingPoints("大容量, 长效保温, 便携防漏, 高颜值");
    setAudience("上班族");
    setScenario("办公室通勤");
    setCopyText("复制第一条");
  };

  const handleClear = () => {
    setProductName("");
    setBrand("");
    setSellingPoints("");
    setAudience("");
    setScenario("");
    setCopyText("复制第一条");
  };

  const handleCopy = async (title: string, isFirst = false) => {
    try {
      await navigator.clipboard.writeText(title);
      if (isFirst) {
        setCopyText("已复制");
        window.setTimeout(() => setCopyText("复制第一条"), 1600);
      }
    } catch {
      if (isFirst) {
        setCopyText("复制失败");
        window.setTimeout(() => setCopyText("复制第一条"), 1600);
      }
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">目标平台</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{platformTips[platform].label}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">建议字数</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">≤ {platformTips[platform].maxLength}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">已填信息</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{filledFields}/5</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800" htmlFor="platform">
            平台
            <select
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="platform"
              onChange={(event) => setPlatform(event.target.value as PlatformKey)}
              value={platform}
            >
              {Object.entries(platformTips).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="product-name">
              商品名称
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="product-name"
                onChange={(event) => setProductName(event.target.value)}
                placeholder="例如：保温咖啡杯"
                value={productName}
              />
            </label>
            <label className="text-sm font-semibold text-slate-800" htmlFor="brand">
              品牌/系列
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="brand"
                onChange={(event) => setBrand(event.target.value)}
                placeholder="可选"
                value={brand}
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="selling-points">
            核心卖点
            <textarea
              className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="selling-points"
              onChange={(event) => setSellingPoints(event.target.value)}
              placeholder="用逗号或换行分隔，例如：大容量, 防漏, 保温"
              value={sellingPoints}
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="audience">
              目标人群
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="audience"
                onChange={(event) => setAudience(event.target.value)}
                placeholder="例如：上班族"
                value={audience}
              />
            </label>
            <label className="text-sm font-semibold text-slate-800" htmlFor="scenario">
              使用场景
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="scenario"
                onChange={(event) => setScenario(event.target.value)}
                placeholder="例如：办公室通勤"
                value={scenario}
              />
            </label>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">优化建议</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{platformTips[platform].tone}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
              onClick={() => handleCopy(titles[0] ?? "", true)}
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

      <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-base font-bold text-slate-950">标题候选</h2>
        <div className="mt-3 space-y-3">
          {titles.map((title, index) => (
            <button
              className="block w-full rounded-md bg-white p-4 text-left hover:bg-accent-50"
              key={`${title}-${index}`}
              onClick={() => handleCopy(title)}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold leading-6 text-slate-950">{title}</span>
                <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
                  {title.length} 字
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
