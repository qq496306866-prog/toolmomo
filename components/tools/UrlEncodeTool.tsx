"use client";

import { useMemo, useState } from "react";

const sampleText = "https://toolmomo.com/search?q=免费 在线工具&category=开发工具&utm_source=baidu";

type EncodeMode = "component" | "uri";

function safeDecode(text: string) {
  return decodeURIComponent(text.replace(/\+/g, " "));
}

function hasEncodedChars(text: string) {
  return /%[0-9A-Fa-f]{2}/.test(text);
}

function parseQueryRows(text: string) {
  try {
    const url = text.startsWith("http://") || text.startsWith("https://") ? new URL(text) : null;
    const queryText = url ? url.search.slice(1) : text.includes("?") ? text.split("?")[1] : text;

    if (!queryText.includes("=")) {
      return [];
    }

    return queryText
      .split("&")
      .filter(Boolean)
      .map((item) => {
        const [rawKey, ...rawValueParts] = item.split("=");
        const rawValue = rawValueParts.join("=");

        return {
          key: safeDecode(rawKey || ""),
          value: safeDecode(rawValue || ""),
        };
      });
  } catch {
    return [];
  }
}

export function UrlEncodeTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copyText, setCopyText] = useState("复制结果");
  const [mode, setMode] = useState<EncodeMode>("component");

  const queryRows = useMemo(() => parseQueryRows(input), [input]);

  const stats = useMemo(() => {
    return {
      inputLength: input.length,
      outputLength: output.length,
      detectedType: hasEncodedChars(input) ? "包含编码字符" : "普通文本",
      queryCount: queryRows.length,
    };
  }, [input, output, queryRows.length]);

  const resetCopyText = () => {
    setCopyText("复制结果");
  };

  const handleEncode = () => {
    try {
      const result = mode === "uri" ? encodeURI(input) : encodeURIComponent(input);
      setOutput(result);
      setError("");
      resetCopyText();
    } catch {
      setError("编码失败，请检查输入内容。");
      setOutput("");
    }
  };

  const handleDecode = () => {
    try {
      setOutput(safeDecode(input));
      setError("");
      resetCopyText();
    } catch {
      setError("解码失败，请确认输入内容是有效的 URL 编码文本。");
      setOutput("");
    }
  };

  const handleAuto = () => {
    if (hasEncodedChars(input)) {
      handleDecode();
      return;
    }

    handleEncode();
  };

  const handleSwap = () => {
    setInput(output);
    setOutput(input);
    setError("");
    resetCopyText();
  };

  const handleCopy = async () => {
    if (!output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      setCopyText("已复制");
      window.setTimeout(resetCopyText, 1600);
    } catch {
      setCopyText("复制失败");
      window.setTimeout(resetCopyText, 1600);
    }
  };

  const handleSample = () => {
    setInput(sampleText);
    setOutput(encodeURIComponent(sampleText));
    setError("");
    resetCopyText();
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    resetCopyText();
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输入字符</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{stats.inputLength}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输出字符</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{stats.outputLength}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输入识别</div>
          <div className="mt-2 text-lg font-bold text-primary-700">{stats.detectedType}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">参数数量</div>
          <div className="mt-2 text-2xl font-bold text-accent-600">{stats.queryCount}</div>
        </div>
      </div>

      <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-3">
        <div className="text-sm font-semibold text-slate-800">编码方式</div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            className={`rounded-md px-4 py-2 text-sm font-semibold ${
              mode === "component"
                ? "bg-primary-700 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:border-accent-200 hover:text-accent-700"
            }`}
            onClick={() => setMode("component")}
            type="button"
          >
            参数值编码
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-semibold ${
              mode === "uri"
                ? "bg-primary-700 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:border-accent-200 hover:text-accent-700"
            }`}
            onClick={() => setMode("uri")}
            type="button"
          >
            整段URL编码
          </button>
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
            placeholder="输入普通文本、URL、查询参数，或已经编码的 URL 内容"
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

      {queryRows.length > 0 ? (
        <div className="mt-4 rounded-md border border-slate-200">
          <div className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800">
            查询参数解析
          </div>
          <div className="divide-y divide-slate-100">
            {queryRows.map((row, index) => (
              <div className="grid gap-2 px-4 py-3 text-sm sm:grid-cols-[180px_1fr]" key={`${row.key}-${index}`}>
                <div className="font-mono font-semibold text-primary-700">{row.key || "-"}</div>
                <div className="break-all font-mono text-slate-700">{row.value || "-"}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
          onClick={handleAuto}
          type="button"
        >
          自动处理
        </button>
        <button
          className="rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-900"
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
          onClick={handleSwap}
          type="button"
        >
          交换
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
