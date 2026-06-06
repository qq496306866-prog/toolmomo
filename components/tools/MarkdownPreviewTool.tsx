"use client";

import { useMemo, useState } from "react";

const sampleMarkdown = `# Toolmomo 工具说明

这是一个 **Markdown预览** 示例。

## 常用格式

- 支持标题
- 支持列表
- 支持 **加粗** 和 *斜体*
- 支持 [链接](https://toolmomo.com)

> 适合快速检查文案排版。

\`\`\`
console.log("Hello Toolmomo");
\`\`\`
`;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInline(value: string) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
    );
}

function renderMarkdown(markdown: string) {
  const lines = markdown.split(/\r\n|\r|\n/);
  const html: string[] = [];
  let inCode = false;
  let inList = false;
  let codeLines: string[] = [];

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  lines.forEach((line) => {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        closeList();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      codeLines.push(line);
      return;
    }

    if (!line.trim()) {
      closeList();
      return;
    }

    if (line.startsWith("### ")) {
      closeList();
      html.push(`<h3>${renderInline(line.slice(4))}</h3>`);
      return;
    }

    if (line.startsWith("## ")) {
      closeList();
      html.push(`<h2>${renderInline(line.slice(3))}</h2>`);
      return;
    }

    if (line.startsWith("# ")) {
      closeList();
      html.push(`<h1>${renderInline(line.slice(2))}</h1>`);
      return;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${renderInline(line.replace(/^\s*[-*]\s+/, ""))}</li>`);
      return;
    }

    if (line.startsWith("> ")) {
      closeList();
      html.push(`<blockquote>${renderInline(line.slice(2))}</blockquote>`);
      return;
    }

    closeList();
    html.push(`<p>${renderInline(line)}</p>`);
  });

  closeList();

  if (inCode) {
    html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
  }

  return html.join("\n");
}

export function MarkdownPreviewTool() {
  const [markdown, setMarkdown] = useState("");
  const [copyText, setCopyText] = useState("复制Markdown");

  const html = useMemo(() => renderMarkdown(markdown), [markdown]);
  const stats = useMemo(() => {
    return {
      characters: markdown.length,
      lines: markdown ? markdown.split(/\r\n|\r|\n/).length : 0,
      headings: (markdown.match(/^#{1,3}\s+/gm) ?? []).length,
    };
  }, [markdown]);

  const handleSample = () => {
    setMarkdown(sampleMarkdown);
    setCopyText("复制Markdown");
  };

  const handleClear = () => {
    setMarkdown("");
    setCopyText("复制Markdown");
  };

  const handleCopy = async () => {
    if (!markdown) {
      return;
    }

    try {
      await navigator.clipboard.writeText(markdown);
      setCopyText("已复制");
      window.setTimeout(() => setCopyText("复制Markdown"), 1600);
    } catch {
      setCopyText("复制失败");
      window.setTimeout(() => setCopyText("复制Markdown"), 1600);
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">字符数</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{stats.characters}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">行数</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{stats.lines}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">标题数</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{stats.headings}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-800" htmlFor="markdown-input">
            Markdown输入
          </label>
          <textarea
            className="mt-2 min-h-96 w-full resize-y rounded-md border border-slate-200 bg-white p-4 font-mono text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
            id="markdown-input"
            onChange={(event) => setMarkdown(event.target.value)}
            placeholder="输入 Markdown 内容，右侧会实时预览"
            spellCheck={false}
            value={markdown}
          />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-800">实时预览</div>
          <div
            className="markdown-preview mt-2 min-h-96 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700"
            dangerouslySetInnerHTML={{
              __html: html || '<p class="text-slate-400">预览内容会显示在这里</p>',
            }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
          onClick={handleSample}
          type="button"
        >
          填入示例
        </button>
        <button
          className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
          onClick={handleCopy}
          type="button"
        >
          {copyText}
        </button>
        <button
          className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
          onClick={handleClear}
          type="button"
        >
          清空
        </button>
      </div>
    </section>
  );
}
