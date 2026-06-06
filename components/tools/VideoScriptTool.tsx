"use client";

import { useMemo, useState } from "react";

const scriptTypes = {
  sales: "带货口播",
  shop: "探店脚本",
  knowledge: "知识分享",
  review: "测评体验",
  vlog: "生活Vlog",
};

type ScriptType = keyof typeof scriptTypes;

type ScriptSection = {
  title: string;
  time: string;
  content: string;
  shot: string;
};

function buildSections(type: ScriptType, topic: string, audience: string, sellingPoint: string, duration: string): ScriptSection[] {
  const coreTopic = topic.trim() || "你的主题";
  const targetAudience = audience.trim() || "目标用户";
  const point = sellingPoint.trim() || "核心亮点";
  const totalDuration = duration.trim() || "60秒";

  const commonEnd = {
    title: "结尾行动",
    time: "最后5秒",
    content: `如果你也关注${coreTopic}，可以收藏这条内容，后续继续分享更多细节。`,
    shot: "镜头回到主体，画面叠加收藏/关注提示。",
  };

  const templates: Record<ScriptType, ScriptSection[]> = {
    sales: [
      {
        title: "开场钩子",
        time: "0-5秒",
        content: `${targetAudience}注意，这个${coreTopic}最打动我的点是：${point}。`,
        shot: "产品特写快速切入，搭配强对比字幕。",
      },
      {
        title: "痛点引入",
        time: "5-15秒",
        content: `很多人在选${coreTopic}时容易忽略真实使用场景，结果买回去才发现不适合。`,
        shot: "展示错误示范或旧方案，制造对比。",
      },
      {
        title: "卖点展开",
        time: `中段，约${totalDuration}`,
        content: `这款的核心优势是${point}，适合${targetAudience}日常使用。`,
        shot: "分 2-3 个镜头展示卖点细节。",
      },
      commonEnd,
    ],
    shop: [
      {
        title: "地点开场",
        time: "0-5秒",
        content: `今天带你看一家适合${targetAudience}的${coreTopic}，亮点是${point}。`,
        shot: "门头/环境外景快速建立地点。",
      },
      {
        title: "环境体验",
        time: "5-20秒",
        content: `先看环境和动线，整体感觉适合拍照、聚会或日常打卡。`,
        shot: "横移镜头展示空间、座位、细节。",
      },
      {
        title: "核心推荐",
        time: `中段，约${totalDuration}`,
        content: `最推荐的是${point}，实际体验下来和预期比较一致。`,
        shot: "展示菜品/服务/产品细节和人物反应。",
      },
      commonEnd,
    ],
    knowledge: [
      {
        title: "问题开场",
        time: "0-5秒",
        content: `关于${coreTopic}，很多${targetAudience}最容易搞错的一点是${point}。`,
        shot: "正面口播，屏幕出现问题字幕。",
      },
      {
        title: "核心解释",
        time: "5-25秒",
        content: `先记住一个判断方法：围绕${point}去看，会更容易做决定。`,
        shot: "图文卡片或屏幕录制辅助说明。",
      },
      {
        title: "案例说明",
        time: `中段，约${totalDuration}`,
        content: `举个例子，如果你的场景是${targetAudience}常见需求，就可以这样处理${coreTopic}。`,
        shot: "示例画面、步骤拆解、关键点标注。",
      },
      commonEnd,
    ],
    review: [
      {
        title: "测评结论",
        time: "0-5秒",
        content: `${coreTopic}我试了一段时间，最大的感受是${point}。`,
        shot: "产品/体验结果先展示，快速给结论。",
      },
      {
        title: "优点展示",
        time: "5-20秒",
        content: `优点主要集中在${point}，对${targetAudience}比较友好。`,
        shot: "连续特写展示优点。",
      },
      {
        title: "不足提醒",
        time: `中段，约${totalDuration}`,
        content: `但也不是所有人都适合，建议结合自己的预算、使用频率和场景判断。`,
        shot: "切换到真实使用画面，语气客观。",
      },
      commonEnd,
    ],
    vlog: [
      {
        title: "生活切入",
        time: "0-5秒",
        content: `今天记录一下和${coreTopic}有关的小日常，重点是${point}。`,
        shot: "自然环境声开场，镜头从手部或环境切入。",
      },
      {
        title: "过程记录",
        time: "5-30秒",
        content: `整个过程最适合${targetAudience}参考，节奏不用太快，突出真实感。`,
        shot: "连续生活化镜头，保留一些自然停顿。",
      },
      {
        title: "感受总结",
        time: `中段，约${totalDuration}`,
        content: `最后感受是${point}，如果你也有类似需求，可以试试这个思路。`,
        shot: "人物出镜或画面叠加文字总结。",
      },
      commonEnd,
    ],
  };

  return templates[type];
}

export function VideoScriptTool() {
  const [scriptType, setScriptType] = useState<ScriptType>("sales");
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [sellingPoint, setSellingPoint] = useState("");
  const [duration, setDuration] = useState("60秒");
  const [copyText, setCopyText] = useState("复制脚本");

  const sections = useMemo(
    () => buildSections(scriptType, topic, audience, sellingPoint, duration),
    [audience, duration, scriptType, sellingPoint, topic],
  );

  const scriptText = sections
    .map((section) => `【${section.title}｜${section.time}】\n口播：${section.content}\n画面：${section.shot}`)
    .join("\n\n");

  const handleSample = () => {
    setScriptType("sales");
    setTopic("保温咖啡杯");
    setAudience("上班族");
    setSellingPoint("长效保温、不漏水、通勤方便");
    setDuration("60秒");
    setCopyText("复制脚本");
  };

  const handleClear = () => {
    setTopic("");
    setAudience("");
    setSellingPoint("");
    setDuration("60秒");
    setCopyText("复制脚本");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scriptText);
      setCopyText("已复制");
      window.setTimeout(() => setCopyText("复制脚本"), 1600);
    } catch {
      setCopyText("复制失败");
      window.setTimeout(() => setCopyText("复制脚本"), 1600);
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">脚本类型</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{scriptTypes[scriptType]}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">分段数量</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{sections.length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">建议时长</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{duration}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800" htmlFor="video-type">
            脚本类型
            <select
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="video-type"
              onChange={(event) => setScriptType(event.target.value as ScriptType)}
              value={scriptType}
            >
              {Object.entries(scriptTypes).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="video-topic">
              主题/产品
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="video-topic"
                onChange={(event) => setTopic(event.target.value)}
                placeholder="例如：保温咖啡杯"
                value={topic}
              />
            </label>
            <label className="text-sm font-semibold text-slate-800" htmlFor="video-audience">
              目标人群
              <input
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="video-audience"
                onChange={(event) => setAudience(event.target.value)}
                placeholder="例如：上班族"
                value={audience}
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="video-point">
            核心亮点/结论
            <textarea
              className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="video-point"
              onChange={(event) => setSellingPoint(event.target.value)}
              placeholder="例如：长效保温、不漏水、通勤方便"
              value={sellingPoint}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-800" htmlFor="video-duration">
            视频时长
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="video-duration"
              onChange={(event) => setDuration(event.target.value)}
              placeholder="例如：30秒、60秒、90秒"
              value={duration}
            />
          </label>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">脚本结构</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            默认按“开场钩子、过程展开、核心信息、结尾行动”组织，适合快速生成短视频草稿。
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

      <div className="mt-5 grid grid-cols-1 gap-3">
        {sections.map((section) => (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4" key={section.title}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-bold text-slate-950">{section.title}</h2>
              <span className="rounded-md bg-accent-100 px-2 py-1 text-xs font-semibold text-accent-700">
                {section.time}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              <span className="font-semibold text-slate-950">口播：</span>
              {section.content}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              <span className="font-semibold text-slate-950">画面：</span>
              {section.shot}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
