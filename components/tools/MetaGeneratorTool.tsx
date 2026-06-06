"use client";

import { useMemo, useState } from "react";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function MetaGeneratorTool() {
  const [siteName, setSiteName] = useState("Toolmomo");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [copyText, setCopyText] = useState("复制代码");

  const metaCode = useMemo(() => {
    const safeSiteName = escapeHtml(siteName.trim() || "Toolmomo");
    const safeTitle = escapeHtml(title.trim() || "页面标题");
    const safeDescription = escapeHtml(description.trim() || "页面描述");
    const safeUrl = escapeHtml(url.trim() || "https://example.com/");
    const safeImageUrl = escapeHtml(imageUrl.trim() || "https://example.com/og-image.jpg");

    return [
      `<title>${safeTitle}</title>`,
      `<meta name="description" content="${safeDescription}" />`,
      `<link rel="canonical" href="${safeUrl}" />`,
      "",
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${safeSiteName}" />`,
      `<meta property="og:title" content="${safeTitle}" />`,
      `<meta property="og:description" content="${safeDescription}" />`,
      `<meta property="og:url" content="${safeUrl}" />`,
      `<meta property="og:image" content="${safeImageUrl}" />`,
      "",
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${safeTitle}" />`,
      `<meta name="twitter:description" content="${safeDescription}" />`,
      `<meta name="twitter:image" content="${safeImageUrl}" />`,
    ].join("\n");
  }, [description, imageUrl, siteName, title, url]);

  const titleLength = title.trim().length;
  const descriptionLength = description.trim().length;

  const handleSample = () => {
    setSiteName("Toolmomo");
    setTitle("Toolmomo 免费中文在线工具箱");
    setDescription("提供图片处理、文本整理、电商运营、短视频创作和开发者常用工具，打开即用，无需安装。");
    setUrl("https://toolmomo.com/");
    setImageUrl("https://toolmomo.com/og-image.jpg");
    setCopyText("复制代码");
  };

  const handleClear = () => {
    setSiteName("");
    setTitle("");
    setDescription("");
    setUrl("");
    setImageUrl("");
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">标题长度</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{titleLength}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">描述长度</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{descriptionLength}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">推荐范围</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">60/160</div>
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
              placeholder="建议 30-60 个字符"
              value={title}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800" htmlFor="meta-description">
            页面描述
            <textarea
              className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="meta-description"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="建议 80-160 个字符，概括页面价值"
              value={description}
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
          <h2 className="text-base font-bold text-slate-950">SEO建议</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>标题建议包含品牌名和页面核心关键词。</li>
            <li>描述建议说明页面能解决什么问题。</li>
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
