"use client";

import { useMemo, useState } from "react";

const sampleText = "https://toolmomo.com/search?q=免费 在线工具&category=开发工具";

export function UrlEncodeTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copyText, setCopyText] = useState("复制结果");

  const stats = useMemo(() => {
    return {
      inputLength: input.length,
      outputLength: output.length,
    };
  }, [input, output]);

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input));
      setError("");
      setCopyText("复制结果");
    } catch {
      setError("编码失败，请检查输入内容。");
      setOutput("");
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
      setError("");
      setCopyText("复制结果");
    } catch {
      setError("解码失败，请确认输入内容是有效的 URL 编码文本。");
      setOutput("");
    }
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

  const handleSample = () => {
    setInput(sampleText);
    setOutput(encodeURIComponent(sampleText));
    setError("");
    setCopyText("复制结果");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setCopyText("复制结果");
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输入字符</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{stats.inputLength}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输出字符</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{stats.outputLength}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-800" htmlFor="url-input">
            输入内容
          </label>
          <textarea
            className="mt-2 min-h-80 w-full resize-y rounded-md border border-slate-200 bg-white p-4 font-mono text-sm leading-7 text-slate-800 outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
            id="url-input"
            onChange={(event) => setInput(event.target.value)}
            placeholder="输入普通文本、URL 或已经编码的 URL 内容"
            spellCheck={false}
            value={input}
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800" htmlFor="url-output">
            输出结果
          </label>
          <textarea
            className="mt-2 min-h-80 w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-7 text-slate-800 outline-none"
            id="url-output"
            placeholder="编码或解码后的结果会显示在这里"
            readOnly
            spellCheck={false}
            value={output}
          />
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
          onClick={handleEncode}
          type="button"
        >
          URL编码
        </button>
        <button
          className="rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-900"
          onClick={handleDecode}
          type="button"
        >
          URL解码
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
