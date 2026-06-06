"use client";

import { useMemo, useState } from "react";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getLengthStatus(length: number, min: number, max: number) {
  if (length === 0) {
    return "待填写";
  }

  if (length < min) {
    return "偏短";
  }

  if (length > max) {
    return "偏长";
  }

  return "合适";
}

export function MetaGeneratorTool() {
  const [siteName, setSiteName] = useState("Toolmomo");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [robots, setRobots] = useState("index,follow");
  const [copyText, setCopyText] = useState("复制代码");

  const titleLength = title.trim().length;
  const descriptionLength = description.trim().length;
  const keywordCount = keywords
    .split(/[,，\s]+/)
    .map((item) => item.trim())
    .filter(Boolean).length;

  const metaCode = useMemo(() => {
    const safeSiteName = escapeHtml(siteName.trim() || "Toolmomo");
    const safeTitle = escapeHtml(title.trim() || "页面标题");
    const safeDescription = escapeHtml(description.trim() || "页面描述");
    const safeKeywords = escapeHtml(keywords.trim() || "关键词1,关键词2,关键词3");
    const safeUrl = escapeHtml(url.trim() || "https://example.com/");
    const safeImageUrl = escapeHtml(imageUrl.trim() || "https://example.com/og-image.jpg");
    const safeRobots = escapeHtml(robots);

    return [
      "<!-- Basic SEO -->",
      `<title>${safeTitle}</title>`,
      `<meta name="description" content="${safeDescription}" />`,
      `<meta name="keywords" content="${safeKeywords}" />`,
      `<meta name="robots" content="${safeRobots}" />`,
      `<link rel="canonical" href="${safeUrl}" />`,
      "",
      "<!-- Open Graph -->",
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${safeSiteName}" />`,
      `<meta property="og:title" content="${safeTitle}" />`,
      `<meta property="og:description" content="${safeDescription}" />`,
      `<meta property="og:url" content="${safeUrl}" />`,
      `<meta property="og:image" content="${safeImageUrl}" />`,
      "",
      "<!-- Twitter / X -->",
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${safeTitle}" />`,
      `<meta name="twitter:description" content="${safeDescription}" />`,
      `<meta name="twitter:image" content="${safeImageUrl}" />`,
    ].join("\n");
  }, [description, imageUrl, keywords, robots, siteName, title, url]);

  const handleSample = () => {
    setSiteName("Toolmomo");
    setTitle("Toolmomo 免费中文在线工具箱 - 图片、文本、电商、开发工具");
    setDescription("Toolmomo 提供图片处理、文本整理、电商运营、短视频创作和开发者常用工具，打开即用，无需安装。");
    setKeywords("在线工具,免费工具箱,图片压缩,JSON格式化,Base64,字数统计");
    setUrl("https://toolmomo.com/");
    setImageUrl("https://toolmomo.com/og-image.jpg");
    setRobots("index,follow");
    setCopyText("复制代码");
  };

  const handleClear = () => {
    setSiteName("");
    setTitle("");
    setDescription("");
    setKeywords("");
    setUrl("");
    setImageUrl("");
    setRobots("index,follow");
    setCopyText("复制代码");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(metaCode);
      setCopyText("已复制");
      window.setTimeout(() => setCopyText("复制代码"), 1600);
    } catch {
      setCopyText("复制失败");
      window.setTimeout(() => setCopyText("复制代码"), 1600);
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">标题长度</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{titleLength}</div>
          <div className="mt-1 text-xs text-slate-500">{getLengthStatus(titleLength, 20, 60)}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">描述长度</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{descriptionLength}</div>
          <div className="mt-1 text-xs text-slate-500">{getLengthStatus(descriptionLength, 70, 160)}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">关键词数量</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{keywordCount}</div>
          <div className="mt-1 text-xs text-slate-500">建议 3-8 个</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">推荐范围</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">60/160</div>
          <div className="mt-1 text-xs text-slate-500">标题 / 描述</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800" htmlFor="site-name">
            网站名称
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="site-name"
              onChange={(event) => setSiteName(event.target.value)}
              placeholder="例如：Toolmomo"
              value={siteName}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800" htmlFor="meta-title">
            页面标题
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="meta-title"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="建议 20-60 个字符，包含核心关键词"
              value={title}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800" htmlFor="meta-description">
            页面描述
            <textarea
              className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="meta-description"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="建议 70-160 个字符，说明页面能解决什么问题"
              value={description}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800" htmlFor="meta-keywords">
            关键词
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="meta-keywords"
              onChange={(event) => setKeywords(event.target.value)}
              placeholder="用逗号分隔，例如：图片压缩,在线工具,JSON格式化"
              value={keywords}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800" htmlFor="canonical-url">
            页面URL
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="canonical-url"
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://toolmomo.com/"
              value={url}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800" htmlFor="og-image">
            分享图片URL
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="og-image"
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://toolmomo.com/og-image.jpg"
              value={imageUrl}
            />
          </label>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">SEO 设置</h2>
          <label className="mt-4 block text-sm font-semibold text-slate-800" htmlFor="meta-robots">
            Robots
            <select
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="meta-robots"
              onChange={(event) => setRobots(event.target.value)}
              value={robots}
            >
              <option value="index,follow">允许收录并跟踪链接</option>
              <option value="noindex,follow">不收录但跟踪链接</option>
              <option value="index,nofollow">收录但不跟踪链接</option>
              <option value="noindex,nofollow">不收录也不跟踪链接</option>
            </select>
          </label>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
            <li>标题建议包含品牌名和核心关键词。</li>
            <li>描述建议写清楚页面价值，不要堆砌关键词。</li>
            <li>分享图建议使用 1200 x 630 尺寸。</li>
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

      <div className="mt-5 rounded-md border border-slate-200 bg-slate-950 p-4">
        <div className="mb-3 text-sm font-semibold text-white">生成代码</div>
        <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-md bg-primary-900 p-4 text-sm leading-6 text-slate-100">
          {metaCode}
        </pre>
      </div>
    </section>
  );
}
