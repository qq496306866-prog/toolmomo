"use client";

import { useMemo, useState } from "react";

const sampleText = `图片压缩
JSON格式化
字数统计
图片压缩
Base64编码解码
字数统计`;

function deduplicateLines(text: string, trimLine: boolean) {
  const seen = new Set<string>();
  const result: string[] = [];

  text.split(/\r\n|\r|\n/).forEach((line) => {
    const value = trimLine ? line.trim() : line;

    if (!value) {
      return;
    }

    if (!seen.has(value)) {
      seen.add(value);
      result.push(value);
    }
  });

  return result.join("\n");
}

export function TextDeduplicateTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [trimLine, setTrimLine] = useState(true);
  const [copyText, setCopyText] = useState("复制结果");

  const stats = useMemo(() => {
    const inputLines = input ? input.split(/\r\n|\r|\n/).filter((line) => line.trim()).length : 0;
    const outputLines = output ? output.split(/\r\n|\r|\n/).filter((line) => line.trim()).length : 0;

    return {
      inputLines,
      outputLines,
      removedLines: Math.max(0, inputLines - outputLines),
    };
  }, [input, output]);

  const handleDeduplicate = () => {
    setOutput(deduplicateLines(input, trimLine));
    setCopyText("复制结果");
  };

  const handleSample = () => {
    setInput(sampleText);
    setOutput(deduplicateLines(sampleText, trimLine));
    setCopyText("复制结果");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setCopyText("复制结果");
  };

  const handleCopy = async () => {
    if (!output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      setCopyText("已复制");
      window.setTimeout(() => setCopyText("复制结果"), 1600);
    } catch {
      setCopyText("复制失败");
      window.setTimeout(() => setCopyText("复制结果"), 1600);
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输入行数</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{stats.inputLines}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">去重后</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{stats.outputLines}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">移除重复</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{stats.removedLines}</div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <input
          checked={trimLine}
          className="h-4 w-4 accent-accent-500"
          id="trim-line"
          onChange={(event) => setTrimLine(event.target.checked)}
          type="checkbox"
        />
        <label className="text-sm font-medium text-slate-700" htmlFor="trim-line">
          去除每行首尾空格后再判断重复
        </label>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-800" htmlFor="dedupe-input">
            输入文本
          </label>
          <textarea
            className="mt-2 min-h-80 w-full resize-y rounded-md border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-800 outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
            id="dedupe-input"
            onChange={(event) => setInput(event.target.value)}
            placeholder="每行输入一个关键词、标题、名单或素材文本"
            value={input}
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800" htmlFor="dedupe-output">
            输出结果
          </label>
          <textarea
            className="mt-2 min-h-80 w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-800 outline-none"
            id="dedupe-output"
            placeholder="去重后的文本会显示在这里"
            readOnly
            value={output}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
          onClick={handleDeduplicate}
          type="button"
        >
          一键去重
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
          onClick={handleSample}
          type="button"
        >
          填入示例
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
