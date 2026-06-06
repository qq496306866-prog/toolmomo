"use client";

import { useMemo, useState } from "react";

const copyTypes = {
  product: "商品卖点文案",
  social: "社媒种草文案",
  ad: "广告短文案",
  intro: "产品介绍",
  activity: "活动促销文案",
};

type CopyType = keyof typeof copyTypes;

const presetCases: Array<{
  label: string;
  copyType: CopyType;
  subject: string;
  audience: string;
  scenario: string;
  points: string;
  tone: string;
}> = [
  {
    label: "电商种草",
    copyType: "social",
    subject: "保温咖啡杯",
    audience: "上班族",
    scenario: "通勤和办公室",
    points: "长效保温, 防漏设计, 高颜值, 大容量",
    tone: "真实、轻松",
  },
  {
    label: "活动促销",
    copyType: "activity",
    subject: "夏季防晒衣",
    audience: "户外通勤人群",
    scenario: "日常出门和周末出游",
    points: "轻薄透气, 防晒遮阳, 好搭配",
    tone: "直接、有购买理由",
  },
  {
    label: "产品介绍",
    copyType: "intro",
    subject: "在线图片压缩工具",
    audience: "电商运营和自媒体作者",
    scenario: "上传商品图和文章配图前",
    points: "本地处理, 降低图片体积, 操作简单",
    tone: "清晰、专业",
  },
];

function splitPoints(value: string) {
  return value
    .split(/[\n,，、;；]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function sentenceJoin(parts: string[]) {
  return parts.filter(Boolean).join("，");
}

export function AiCopywritingTool() {
  const [copyType, setCopyType] = useState<CopyType>("product");
  const [subject, setSubject] = useState("");
  const [audience, setAudience] = useState("");
  const [scenario, setScenario] = useState("");
  const [points, setPoints] = useState("");
  const [tone, setTone] = useState("自然、有说服力");
  const [copyText, setCopyText] = useState("复制第一条");
  const [copyAllText, setCopyAllText] = useState("复制全部");

  const drafts = useMemo(() => {
    const topic = subject.trim() || "你的产品";
    const people = audience.trim() || "目标用户";
    const useScene = scenario.trim() || "日常使用";
    const pointList = splitPoints(points);
    const first = pointList[0] ?? "实用";
    const second = pointList[1] ?? "方便";
    const third = pointList[2] ?? "值得入手";
    const style = tone.trim() || "自然";

    const templates: Record<CopyType, string[]> = {
      product: [
        `${topic}专为${people}打造，适合${useScene}。它的核心优势是${sentenceJoin([first, second, third])}，让使用体验更轻松。`,
        `如果你正在找一款适合${useScene}的${topic}，可以重点看看这几个点：${pointList.join("、") || "实用、方便、耐用"}。`,
        `${topic}把${first}和${second}结合在一起，适合${people}在${useScene}中使用，整体更省心。`,
      ],
      social: [
        `最近发现一个适合${people}的${topic}，在${useScene}里真的挺好用。最喜欢的是${first}，其次是${second}，属于越用越顺手的类型。`,
        `${people}可以看看这个${topic}，不是夸张种草，主要是${first}这一点很打动我。`,
        `分享一个${style}的使用体验：${topic}在${useScene}里表现不错，${pointList.join("、") || "细节和体验"}都比较在线。`,
      ],
      ad: [
        `${topic}，让${useScene}更轻松。${first}，${second}，现在就试试。`,
        `给${people}的${topic}选择：${first}、${second}、${third}。`,
        `${topic}上新，适合${useScene}，把${first}做到更简单。`,
      ],
      intro: [
        `${topic}是一款面向${people}的实用产品，适用于${useScene}。它围绕${first}、${second}等需求设计，帮助用户获得更稳定的体验。`,
        `这款${topic}重点解决${people}在${useScene}中的常见问题，核心特点包括${pointList.join("、") || "实用、便捷、稳定"}。`,
        `${topic}的定位清晰：服务${people}，覆盖${useScene}，并通过${first}提升整体使用感。`,
      ],
      activity: [
        `${topic}限时推荐，适合${people}在${useScene}中使用。现在入手，重点体验${first}和${second}。`,
        `想提升${useScene}体验？这款${topic}可以重点关注，${first}、${second}都很实用。`,
        `${people}专属选择：${topic}，兼顾${first}与${second}，适合现在加入清单。`,
      ],
    };

    return templates[copyType];
  }, [audience, copyType, points, scenario, subject, tone]);

  const handleSample = () => {
    applyPreset(presetCases[0]);
  };

  const handleClear = () => {
    setSubject("");
    setAudience("");
    setScenario("");
    setPoints("");
    setTone("自然、有说服力");
    setCopyText("复制第一条");
    setCopyAllText("复制全部");
  };

  const applyPreset = (preset: (typeof presetCases)[number]) => {
    setCopyType(preset.copyType);
    setSubject(preset.subject);
    setAudience(preset.audience);
    setScenario(preset.scenario);
    setPoints(preset.points);
    setTone(preset.tone);
    setCopyText("复制第一条");
    setCopyAllText("复制全部");
  };

  const handleCopy = async (draft: string, first = false) => {
    try {
      await navigator.clipboard.writeText(draft);
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

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(drafts.map((draft, index) => `${index + 1}. ${draft}`).join("\n"));
      setCopyAllText("已复制全部");
      window.setTimeout(() => setCopyAllText("复制全部"), 1600);
    } catch {
      setCopyAllText("复制失败");
      window.setTimeout(() => setCopyAllText("复制全部"), 1600);
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">文案类型</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{copyTypes[copyType]}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">候选数量</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{drafts.length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">卖点数量</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{splitPoints(points).length}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800" htmlFor="copy-type">
            文案类型
            <select
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="copy-type"
              onChange={(event) => setCopyType(event.target.value as CopyType)}
              value={copyType}
            >
              {Object.entries(copyTypes).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <div>
            <div className="text-sm font-semibold text-slate-800">快捷场景</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {presetCases.map((preset) => (
                <button
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
                  key={preset.label}
                  onClick={() => applyPreset(preset)}
                  type="button"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="copy-subject">
              产品/主题
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="copy-subject"
                onChange={(event) => setSubject(event.target.value)}
                placeholder="例如：保温咖啡杯"
                value={subject}
              />
            </label>
            <label className="text-sm font-semibold text-slate-800" htmlFor="copy-audience">
              目标人群
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="copy-audience"
                onChange={(event) => setAudience(event.target.value)}
                placeholder="例如：上班族"
                value={audience}
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="copy-scenario">
            使用场景
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="copy-scenario"
              onChange={(event) => setScenario(event.target.value)}
              placeholder="例如：通勤和办公室"
              value={scenario}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="copy-points">
            核心卖点
            <textarea
              className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="copy-points"
              onChange={(event) => setPoints(event.target.value)}
              placeholder="用逗号或换行分隔，例如：长效保温, 防漏设计, 高颜值"
              value={points}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="copy-tone">
            文案语气
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="copy-tone"
              onChange={(event) => setTone(event.target.value)}
              placeholder="例如：真实、轻松、有说服力"
              value={tone}
            />
          </label>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">生成说明</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            当前为本地模板生成，不调用后端 AI。适合先整理文案结构和表达方向。
          </p>
          <div className="mt-4 rounded-md bg-white p-3 text-xs leading-5 text-slate-500">
            <div className="font-semibold text-slate-800">下一步建议</div>
            <div className="mt-1">文案生成后，可以继续提炼标题、扩展关键词或统计字数。</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
              onClick={() => handleCopy(drafts[0] ?? "", true)}
              type="button"
            >
              {copyText}
            </button>
            <button
              className="rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800"
              onClick={handleCopyAll}
              type="button"
            >
              {copyAllText}
            </button>
            <a
              className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800"
              href="/tools/ai-title"
            >
              生成标题
            </a>
            <a
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
              href="/tools/ai-keywords"
            >
              扩展关键词
            </a>
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
        <h2 className="text-base font-bold text-slate-950">文案候选</h2>
        <div className="mt-3 space-y-3">
          {drafts.map((draft, index) => (
            <button
              className="block w-full rounded-md bg-white p-4 text-left hover:bg-accent-50"
              key={`${draft}-${index}`}
              onClick={() => handleCopy(draft)}
              type="button"
            >
              <p className="text-sm leading-7 text-slate-700">{draft}</p>
              <div className="mt-2 text-xs text-slate-500">{draft.length} 字，点击复制</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
