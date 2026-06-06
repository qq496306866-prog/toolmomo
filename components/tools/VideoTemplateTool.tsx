"use client";

import { Player } from "@remotion/player";
import { useMemo, useState } from "react";
import { ShortVideoTemplate } from "@/remotion/ShortVideoTemplate";
import type { ShortVideoTemplateProps } from "@/remotion/ShortVideoTemplate";

type TemplateStyle = "sales" | "knowledge" | "list";

const templateStyles: Record<TemplateStyle, string> = {
  sales: "带货种草",
  knowledge: "知识口播",
  list: "清单盘点",
};

const defaultSections = [
  {
    title: "开场钩子",
    content: "先用一句话说清楚这条视频为什么值得看。",
  },
  {
    title: "痛点引入",
    content: "指出用户常见困扰，让画面和口播快速进入主题。",
  },
  {
    title: "核心内容",
    content: "用 2-3 个镜头讲清楚卖点、方法或结论。",
  },
  {
    title: "结尾行动",
    content: "提醒收藏、关注或点击相关工具继续生成。",
  },
];

function splitLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 5);
}

function buildSections(style: TemplateStyle, topic: string, points: string) {
  const lines = splitLines(points);
  const coreTopic = topic.trim() || "Toolmomo 短视频模板";

  if (lines.length === 0) {
    return defaultSections;
  }

  return lines.map((line, index) => {
    if (style === "list") {
      return {
        title: `第 ${index + 1} 点`,
        content: line,
      };
    }

    if (style === "knowledge") {
      return {
        title: index === 0 ? "核心观点" : `解释 ${index + 1}`,
        content: `关于「${coreTopic}」，${line}`,
      };
    }

    return {
      title: index === 0 ? "主卖点" : `卖点 ${index + 1}`,
      content: line,
    };
  });
}

export function VideoTemplateTool() {
  const [style, setStyle] = useState<TemplateStyle>("sales");
  const [title, setTitle] = useState("保温咖啡杯");
  const [hook, setHook] = useState("上班族通勤路上，最怕咖啡变凉和杯子漏水。");
  const [points, setPoints] = useState(
    "长效保温，早上装好下午还能喝\n杯盖密封，放包里也不容易漏\n杯身轻便，适合办公室和通勤",
  );
  const [cta, setCta] = useState("收藏 Toolmomo，继续生成更多短视频模板");
  const [copyText, setCopyText] = useState("复制模板 JSON");

  const templateData = useMemo<ShortVideoTemplateProps>(
    () => ({
      title: title.trim() || "Toolmomo 短视频模板",
      subtitle: `${templateStyles[style]} · 竖版短视频`,
      category: templateStyles[style],
      hook: hook.trim() || "输入主题后，Toolmomo 会生成可预览的视频模板。",
      cta: cta.trim() || "收藏 Toolmomo，继续生成更多短视频模板",
      sections: buildSections(style, title, points),
    }),
    [cta, hook, points, style, title],
  );

  const handleSample = () => {
    setStyle("sales");
    setTitle("保温咖啡杯");
    setHook("上班族通勤路上，最怕咖啡变凉和杯子漏水。");
    setPoints("长效保温，早上装好下午还能喝\n杯盖密封，放包里也不容易漏\n杯身轻便，适合办公室和通勤");
    setCta("收藏 Toolmomo，继续生成更多短视频模板");
    setCopyText("复制模板 JSON");
  };

  const handleClear = () => {
    setTitle("");
    setHook("");
    setPoints("");
    setCta("");
    setCopyText("复制模板 JSON");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(templateData, null, 2));
      setCopyText("已复制 JSON");
      window.setTimeout(() => setCopyText("复制模板 JSON"), 1600);
    } catch {
      setCopyText("复制失败");
      window.setTimeout(() => setCopyText("复制模板 JSON"), 1600);
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">模板类型</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{templateStyles[style]}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">视频尺寸</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">1080 x 1920</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">镜头数量</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">
            {templateData.sections?.length ?? 0}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800" htmlFor="template-style">
            模板类型
            <select
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="template-style"
              onChange={(event) => setStyle(event.target.value as TemplateStyle)}
              value={style}
            >
              {Object.entries(templateStyles).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="template-title">
            视频标题
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="template-title"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="例如：保温咖啡杯"
              value={title}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="template-hook">
            开场钩子
            <textarea
              className="mt-2 min-h-24 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="template-hook"
              onChange={(event) => setHook(event.target.value)}
              placeholder="用一句话说明用户为什么要继续看"
              value={hook}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="template-points">
            镜头内容
            <textarea
              className="mt-2 min-h-40 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="template-points"
              onChange={(event) => setPoints(event.target.value)}
              placeholder="每行一个镜头内容，最多 5 行"
              value={points}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="template-cta">
            结尾行动
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="template-cta"
              onChange={(event) => setCta(event.target.value)}
              placeholder="例如：收藏并关注，获取更多模板"
              value={cta}
            />
          </label>

          <div className="flex flex-wrap gap-2">
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

        <div className="space-y-4">
          <div className="rounded-md border border-slate-200 bg-slate-950 p-3 shadow-sm">
            <div className="overflow-hidden rounded-md bg-white">
              <Player
                acknowledgeRemotionLicense
                component={ShortVideoTemplate}
                compositionHeight={1920}
                compositionWidth={1080}
                controls
                durationInFrames={810}
                fps={30}
                inputProps={templateData}
                style={{
                  aspectRatio: "9 / 16",
                  width: "100%",
                }}
              />
            </div>
          </div>

          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-base font-bold text-slate-950">渲染说明</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              当前页面用于生成模板数据和预览画面。后续接入服务端后，可以把 JSON 传给 Remotion
              Renderer 生成 MP4。
            </p>
            <code className="mt-3 block rounded-md bg-white p-3 text-xs leading-5 text-slate-600">
              npm run remotion:render:short
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
