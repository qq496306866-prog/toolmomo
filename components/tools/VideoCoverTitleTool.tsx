"use client";

import { useMemo, useState } from "react";

const styles = {
  direct: "直接型",
  question: "提问型",
  contrast: "反差型",
  list: "清单型",
  warning: "避坑型",
};

type StyleKey = keyof typeof styles;

function splitKeywords(value: string) {
  return value
    .split(/[\n,，、;；]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function clamp(value: string, max = 14) {
  const text = value.replace(/\s+/g, "").trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export function VideoCoverTitleTool() {
  const [style, setStyle] = useState<StyleKey>("direct");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [audience, setAudience] = useState("");
  const [copyText, setCopyText] = useState("复制第一条");

  const titles = useMemo(() => {
    const core = topic.trim() || "你的主题";
    const people = audience.trim();
    const words = splitKeywords(keywords);
    const first = words[0] ?? "实用";
    const second = words[1] ?? "好用";
    const third = words[2] ?? "收藏";

    const templates: Record<StyleKey, string[]> = {
      direct: [`${core}${first}`, `${core}这样做`, `${people || "新手"}必看`, `${core}${second}`],
      question: [`${core}怎么选？`, `真的${second}吗？`, `${people || "新手"}适合吗？`, `${core}值不值？`],
      contrast: [`用了才知道`, `别再乱选了`, `${core}差别很大`, `之前都做错了`],
      list: [`${core}3个重点`, `${first}${second}${third}`, `收藏这份清单`, `${people || "新手"}攻略`],
      warning: [`${core}避坑`, `这点别忽略`, `先看再买`, `${people || "新手"}别踩坑`],
    };

    return Array.from(new Set(templates[style].map((title) => clamp(title))));
  }, [audience, keywords, style, topic]);

  const handleSample = () => {
    setStyle("warning");
    setTopic("保温杯");
    setKeywords("防漏, 保温, 通勤");
    setAudience("上班族");
    setCopyText("复制第一条");
  };

  const handleClear = () => {
    setTopic("");
    setKeywords("");
    setAudience("");
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
          <div className="text-xs font-semibold text-slate-500">标题风格</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{styles[style]}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">候选数量</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{titles.length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">建议长度</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">≤ 14字</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800" htmlFor="cover-style">
            标题风格
            <select
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="cover-style"
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="cover-topic">
              内容主题
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="cover-topic"
                onChange={(event) => setTopic(event.target.value)}
                placeholder="例如：保温杯"
                value={topic}
              />
            </label>
            <label className="text-sm font-semibold text-slate-800" htmlFor="cover-audience">
              目标人群
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="cover-audience"
                onChange={(event) => setAudience(event.target.value)}
                placeholder="例如：上班族"
                value={audience}
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="cover-keywords">
            关键词/卖点
            <textarea
              className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="cover-keywords"
              onChange={(event) => setKeywords(event.target.value)}
              placeholder="用逗号或换行分隔，例如：防漏, 保温, 通勤"
              value={keywords}
            />
          </label>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">封面建议</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            封面标题建议短、粗、直接，核心信息最好 8-14 个字内完成。可搭配副标题补充细节。
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
        <h2 className="text-base font-bold text-slate-950">封面标题候选</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {titles.map((title, index) => (
            <button
              className="rounded-md bg-white p-5 text-center hover:bg-accent-50"
              key={`${title}-${index}`}
              onClick={() => handleCopy(title)}
              type="button"
            >
              <div className="text-2xl font-black leading-tight text-slate-950">{title}</div>
              <div className="mt-3 text-xs text-slate-500">{title.length} 字，点击复制</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
