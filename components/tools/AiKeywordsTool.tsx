"use client";

import { useMemo, useState } from "react";

const keywordTypes = {
  ecommerce: "电商关键词",
  seo: "SEO关键词",
  content: "内容选题词",
  social: "社媒种草词",
};

type KeywordType = keyof typeof keywordTypes;

function splitWords(value: string) {
  return value
    .split(/[\n,，、;；\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

export function AiKeywordsTool() {
  const [keywordType, setKeywordType] = useState<KeywordType>("ecommerce");
  const [coreKeyword, setCoreKeyword] = useState("");
  const [audience, setAudience] = useState("");
  const [scenario, setScenario] = useState("");
  const [features, setFeatures] = useState("");
  const [copyText, setCopyText] = useState("复制全部");

  const keywordGroups = useMemo(() => {
    const core = coreKeyword.trim() || "核心词";
    const people = audience.trim();
    const scene = scenario.trim();
    const featureList = splitWords(features);
    const baseFeatures = featureList.length ? featureList : ["实用", "好用", "高性价比"];

    const modifiers: Record<KeywordType, string[]> = {
      ecommerce: ["推荐", "怎么选", "哪个牌子好", "价格", "正品", "旗舰店", "新款", "热卖"],
      seo: ["是什么", "怎么用", "教程", "方法", "工具", "平台", "免费", "在线"],
      content: ["攻略", "避坑", "清单", "测评", "经验", "入门", "对比", "指南"],
      social: ["种草", "分享", "真实体验", "值得买吗", "好物", "日常", "通勤", "高颜值"],
    };

    return {
      longTail: unique(modifiers[keywordType].map((item) => `${core}${item}`)),
      audience: unique([people && `${people}${core}`, people && `${core}${people}适用`, people && `${people}${core}推荐`]),
      scenario: unique([scene && `${scene}${core}`, scene && `${core}${scene}使用`, scene && `${scene}${core}怎么选`]),
      feature: unique(baseFeatures.map((item) => `${item}${core}`)),
    };
  }, [audience, coreKeyword, features, keywordType, scenario]);

  const allKeywords = unique([
    ...keywordGroups.longTail,
    ...keywordGroups.audience,
    ...keywordGroups.scenario,
    ...keywordGroups.feature,
  ]);

  const handleSample = () => {
    setKeywordType("ecommerce");
    setCoreKeyword("保温咖啡杯");
    setAudience("上班族");
    setScenario("通勤办公室");
    setFeatures("防漏, 保温, 大容量, 高颜值");
    setCopyText("复制全部");
  };

  const handleClear = () => {
    setCoreKeyword("");
    setAudience("");
    setScenario("");
    setFeatures("");
    setCopyText("复制全部");
  };

  const handleCopy = async () => {
    if (!allKeywords.length) {
      return;
    }

    try {
      await navigator.clipboard.writeText(allKeywords.join("\n"));
      setCopyText("已复制");
      window.setTimeout(() => setCopyText("复制全部"), 1600);
    } catch {
      setCopyText("复制失败");
      window.setTimeout(() => setCopyText("复制全部"), 1600);
    }
  };

  const groups = [
    { title: "长尾词", items: keywordGroups.longTail },
    { title: "人群词", items: keywordGroups.audience },
    { title: "场景词", items: keywordGroups.scenario },
    { title: "卖点词", items: keywordGroups.feature },
  ];

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">扩展类型</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{keywordTypes[keywordType]}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">关键词数量</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{allKeywords.length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">卖点数量</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{splitWords(features).length}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800" htmlFor="keyword-type">
            扩展类型
            <select
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="keyword-type"
              onChange={(event) => setKeywordType(event.target.value as KeywordType)}
              value={keywordType}
            >
              {Object.entries(keywordTypes).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="core-keyword">
              核心词
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="core-keyword"
                onChange={(event) => setCoreKeyword(event.target.value)}
                placeholder="例如：保温咖啡杯"
                value={coreKeyword}
              />
            </label>
            <label className="text-sm font-semibold text-slate-800" htmlFor="keyword-audience">
              目标人群
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="keyword-audience"
                onChange={(event) => setAudience(event.target.value)}
                placeholder="例如：上班族"
                value={audience}
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="keyword-scenario">
            使用场景
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="keyword-scenario"
              onChange={(event) => setScenario(event.target.value)}
              placeholder="例如：通勤办公室"
              value={scenario}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="keyword-features">
            卖点/属性
            <textarea
              className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="keyword-features"
              onChange={(event) => setFeatures(event.target.value)}
              placeholder="用逗号或换行分隔，例如：防漏, 保温, 高颜值"
              value={features}
            />
          </label>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">扩展说明</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            当前为本地模板扩展，不调用后端 AI。适合先整理搜索词、标题词和选题词。
          </p>
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

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {groups.map((group) => (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4" key={group.title}>
            <h2 className="text-base font-bold text-slate-950">{group.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.length ? (
                group.items.map((item) => (
                  <span className="rounded-md bg-white px-3 py-2 text-sm text-slate-700" key={item}>
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-500">补充人群或场景后会生成更多关键词。</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
