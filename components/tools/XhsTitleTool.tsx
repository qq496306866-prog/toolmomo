"use client";

import { useMemo, useState } from "react";

const contentTypes = {
  note: "种草笔记",
  guide: "干货攻略",
  review: "测评体验",
  list: "清单合集",
  shop: "探店分享",
};

type ContentType = keyof typeof contentTypes;

function splitKeywords(value: string) {
  return value
    .split(/[\n,，、;；]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function compactTitle(title: string) {
  return title.replace(/\s+/g, " ").trim();
}

export function XhsTitleTool() {
  const [contentType, setContentType] = useState<ContentType>("note");
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("真实");
  const [copyText, setCopyText] = useState("复制第一条");

  const titles = useMemo(() => {
    const coreTopic = topic.trim() || "你的主题";
    const targetAudience = audience.trim();
    const keywordList = splitKeywords(keywords).slice(0, 4);
    const firstKeyword = keywordList[0] ?? "实用";
    const secondKeyword = keywordList[1] ?? "好用";
    const thirdKeyword = keywordList[2] ?? "值得收藏";
    const audiencePrefix = targetAudience ? `${targetAudience}看过来` : "新手看过来";

    const templates = {
      note: [
        `${coreTopic}真的太${secondKeyword}了`,
        `${audiencePrefix}，${coreTopic}这样选不踩坑`,
        `被问爆的${coreTopic}，${firstKeyword}又${secondKeyword}`,
        `${tone}分享｜${coreTopic}使用体验`,
      ],
      guide: [
        `${coreTopic}攻略，一篇讲清楚`,
        `${audiencePrefix}，${coreTopic}避坑指南`,
        `${coreTopic}怎么做？这 ${keywordList.length || 3} 点很关键`,
        `收藏级干货｜${coreTopic}${thirdKeyword}`,
      ],
      review: [
        `${coreTopic}真实测评：优缺点都说清楚`,
        `${coreTopic}值不值得？我的体验是这样`,
        `${tone}测评｜${coreTopic}${firstKeyword}吗`,
        `${audiencePrefix}，${coreTopic}测完再决定`,
      ],
      list: [
        `${coreTopic}清单整理，直接照着选`,
        `${audiencePrefix}，这些${coreTopic}值得收藏`,
        `${keywordList.length || 5} 个${coreTopic}推荐，${thirdKeyword}`,
        `${coreTopic}合集｜${firstKeyword} ${secondKeyword}`,
      ],
      shop: [
        `${coreTopic}探店分享，体验感拉满`,
        `${audiencePrefix}，这家${coreTopic}可以冲`,
        `${tone}探店｜${coreTopic}${firstKeyword}又${secondKeyword}`,
        `${coreTopic}值不值得去？看完再决定`,
      ],
    } satisfies Record<ContentType, string[]>;

    return Array.from(new Set(templates[contentType].map(compactTitle)));
  }, [audience, contentType, keywords, tone, topic]);

  const handleSample = () => {
    setContentType("guide");
    setTopic("新手咖啡杯选购");
    setAudience("上班族");
    setKeywords("保温, 高颜值, 不漏水, 通勤");
    setTone("真实");
    setCopyText("复制第一条");
  };

  const handleClear = () => {
    setTopic("");
    setAudience("");
    setKeywords("");
    setTone("真实");
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
          <div className="text-xs font-semibold text-slate-500">内容类型</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{contentTypes[contentType]}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">标题数量</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{titles.length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">关键词</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{splitKeywords(keywords).length}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800" htmlFor="xhs-type">
            内容类型
            <select
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="xhs-type"
              onChange={(event) => setContentType(event.target.value as ContentType)}
              value={contentType}
            >
              {Object.entries(contentTypes).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="xhs-topic">
              主题
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="xhs-topic"
                onChange={(event) => setTopic(event.target.value)}
                placeholder="例如：新手咖啡杯选购"
                value={topic}
              />
            </label>
            <label className="text-sm font-semibold text-slate-800" htmlFor="xhs-audience">
              目标人群
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="xhs-audience"
                onChange={(event) => setAudience(event.target.value)}
                placeholder="例如：上班族、新手妈妈"
                value={audience}
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="xhs-keywords">
            关键词/卖点
            <textarea
              className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="xhs-keywords"
              onChange={(event) => setKeywords(event.target.value)}
              placeholder="用逗号或换行分隔，例如：保温, 高颜值, 不漏水"
              value={keywords}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="xhs-tone">
            标题语气
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="xhs-tone"
              onChange={(event) => setTone(event.target.value)}
              placeholder="例如：真实、干货、温柔、犀利"
              value={tone}
            />
          </label>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">生成提示</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            小红书标题更适合突出场景、人群、体验感和可收藏价值。生成后建议结合真实内容再微调。
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
              <div className="text-sm font-semibold leading-6 text-slate-950">{title}</div>
              <div className="mt-2 text-xs text-slate-500">{title.length} 字，点击复制</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
