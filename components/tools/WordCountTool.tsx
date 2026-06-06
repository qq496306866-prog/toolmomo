"use client";

import { useMemo, useState } from "react";

const sampleText = "粘贴或输入一段中文内容，Toolmomo 会实时统计字数、字符数、段落数、行数和预计阅读时间。";

function countChineseWords(text: string) {
  const chineseMatches = text.match(/[\u4e00-\u9fa5]/g) ?? [];
  const latinWords = text.match(/[A-Za-z0-9]+(?:[-_'][A-Za-z0-9]+)*/g) ?? [];
  return chineseMatches.length + latinWords.length;
}

function countParagraphs(text: string) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean).length;
}

function countLines(text: string) {
  if (!text) {
    return 0;
  }

  return text.split(/\r\n|\r|\n/).length;
}

export function WordCountTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const cleanText = text.trim();
    const characters = text.length;
    const charactersNoSpace = text.replace(/\s/g, "").length;
    const words = countChineseWords(text);
    const paragraphs = countParagraphs(text);
    const lines = countLines(text);
    const readingMinutes = cleanText ? Math.max(1, Math.ceil(words / 350)) : 0;

    return {
      characters,
      charactersNoSpace,
      words,
      paragraphs,
      lines,
      readingMinutes,
    };
  }, [text]);

  const statCards = [
    { label: "字数", value: stats.words },
    { label: "字符数", value: stats.characters },
    { label: "不含空格", value: stats.charactersNoSpace },
    { label: "段落数", value: stats.paragraphs },
    { label: "行数", value: stats.lines },
    { label: "阅读时间", value: stats.readingMinutes ? `${stats.readingMinutes} 分钟` : "0 分钟" },
  ];

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {statCards.map((item) => (
          <div className="rounded-md bg-slate-50 p-4" key={item.label}>
            <div className="text-xs font-semibold text-slate-500">{item.label}</div>
            <div className="mt-2 text-2xl font-bold text-primary-700">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <label className="text-sm font-semibold text-slate-800" htmlFor="word-count-input">
          输入文本
        </label>
        <textarea
          className="mt-2 min-h-72 w-full resize-y rounded-md border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-800 outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
          id="word-count-input"
          onChange={(event) => setText(event.target.value)}
          placeholder={sampleText}
          value={text}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
          onClick={() => setText(sampleText)}
          type="button"
        >
          填入示例
        </button>
        <button
          className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
          onClick={() => setText("")}
          type="button"
        >
          清空文本
        </button>
      </div>
    </section>
  );
}
