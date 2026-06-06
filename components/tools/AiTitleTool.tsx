"use client";

import { useMemo, useState } from "react";

const platforms = {
  general: "通用标题",
  ecommerce: "电商标题",
  xhs: "小红书",
  video: "短视频",
  article: "文章标题",
};

const styles = {
  practical: "实用干货",
  curiosity: "好奇悬念",
  benefit: "利益结果",
  list: "清单合集",
  contrast: "反差对比",
};

type PlatformKey = keyof typeof platforms;
type StyleKey = keyof typeof styles;

function splitKeywords(value: string) {
  return value
    .split(/[\n,，、;；]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function trimTitle(value: string, maxLength: number) {
  const title = value.replace(/\s+/g, " ").trim();
  return title.length > maxLength ? `${title.slice(0, maxLength - 1)}…` : title;
}

const maxLengthByPlatform: Record<PlatformKey, number> = {
  general: 48,
  ecommerce: 60,
  xhs: 32,
  video: 24,
  article: 56,
};

export function AiTitleTool() {
  const [platform, setPlatform] = useState<PlatformKey>("general");
  const [style, setStyle] = useState<StyleKey>("practical");
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [keywords, setKeywords] = useState("");
  const [copyText, setCopyText] = useState("复制第一条");

  const titles = useMemo(() => {
    const core = topic.trim() || "你的主题";
    const people = audience.trim() || "新手";
    const words = splitKeywords(keywords);
    const first = words[0] ?? "实用";
    const second = words[1] ?? "高效";
    const third = words[2] ?? "值得收藏";
    const maxLength = maxLengthByPlatform[platform];

    const platformPrefix: Record<PlatformKey, string> = {
      general: "",
      ecommerce: "商品标题：",
      xhs: "",
      video: "",
      article: "",
    };

    const templates: Record<StyleKey, string[]> = {
      practical: [
        `${people}必看：${core}实用指南`,
        `${core}怎么做？这几个方法更${second}`,
        `${platformPrefix[platform]}${core} ${first} ${second} ${third}`,
        `${core}从入门到上手，一篇讲清楚`,
      ],
      curiosity: [
        `${core}为什么总做不好？`,
        `很多人忽略了${core}的这一步`,
        `${people}都在问：${core}到底怎么选？`,
        `${core}的关键，其实是${first}`,
      ],
      benefit: [
        `${core}这样做，更${first}`,
        `用${core}提升${second}，方法很简单`,
        `${people}用得上的${core}方案`,
        `${core}让${people}少走弯路`,
      ],
      list: [
        `${core}清单：${first}、${second}、${third}`,
        `${people}收藏：${core} 5 个重点`,
        `${core}必备合集，直接照着用`,
        `${core}避坑清单，一次整理好`,
      ],
      contrast: [
        `${core}前后差别有多大？`,
        `以前做${core}，我忽略了${first}`,
        `${core}不是越多越好，关键看${second}`,
        `${people}做${core}，这点最容易踩坑`,
      ],
    };

    return Array.from(new Set(templates[style].map((title) => trimTitle(title, maxLength))));
  }, [audience, keywords, platform, style, topic]);

  const handleSample = () => {
    setPlatform("xhs");
    setStyle("benefit");
    setTopic("通勤咖啡杯选购");
    setAudience("上班族");
    setKeywords("防漏, 保温, 高颜值");
    setCopyText("复制第一条");
  };

  const handleClear = () => {
    setTopic("");
    setAudience("");
    setKeywords("");
    setCopyText("复制第一条");
  };

  const handleCopy = async (title: string, first = false) => {
    try {
      await navigator.clipboard.writeText(title);
      if (first) {
        setCopyText("已复制");
        window.setTimeout(() => setCopyText("复制第一条"), 1600);
      }
    } catch {
      if (first) {
        setCopyText("复制失败");
        window.setTimeout(() => setCopyText("复制第一条"), 1600);
      }
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">平台</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{platforms[platform]}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">标题风格</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{styles[style]}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">建议长度</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">≤ {maxLengthByPlatform[platform]}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="title-platform">
              使用平台
              <select
                className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="title-platform"
                onChange={(event) => setPlatform(event.target.value as PlatformKey)}
                value={platform}
              >
                {Object.entries(platforms).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-800" htmlFor="title-style">
              标题风格
              <select
                className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="title-style"
                onChange={(event) => setStyle(event.target.value as StyleKey)}
                value={style}
              >
                {Object.entries(styles).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="title-topic">
              主题/产品
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="title-topic"
                onChange={(event) => setTopic(event.target.value)}
                placeholder="例如：通勤咖啡杯选购"
                value={topic}
              />
            </label>
            <label className="text-sm font-semibold text-slate-800" htmlFor="title-audience">
              目标人群
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="title-audience"
                onChange={(event) => setAudience(event.target.value)}
                placeholder="例如：上班族、新手卖家"
                value={audience}
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="title-keywords">
            关键词
            <textarea
              className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="title-keywords"
              onChange={(event) => setKeywords(event.target.value)}
              placeholder="用逗号或换行分隔，例如：防漏, 保温, 高颜值"
              value={keywords}
            />
          </label>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">生成说明</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            当前为本地模板生成，不调用后端 AI。适合快速整理标题方向，后续可升级为真正 AI 生成。
          </p>
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
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {titles.map((title, index) => (
            <button
              className="rounded-md bg-white p-4 text-left hover:bg-accent-50"
              key={`${title}-${index}`}
              onClick={() => handleCopy(title)}
              type="button"
            >
              <div className="text-base font-bold leading-6 text-slate-950">{title}</div>
              <div className="mt-2 text-xs text-slate-500">{title.length} 字，点击复制</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
