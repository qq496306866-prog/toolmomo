"use client";

import { useMemo, useState } from "react";

const sampleJson = `{
  "site": "Toolmomo",
  "type": "online-tools",
  "features": ["JSON格式化", "字数统计", "Base64编码解码"],
  "active": true
}`;

function formatError(error: unknown) {
  if (error instanceof SyntaxError) {
    return error.message;
  }

  return "JSON 内容格式不正确，请检查引号、逗号、括号是否完整。";
}

export function JsonFormatTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copyText, setCopyText] = useState("复制结果");

  const stats = useMemo(() => {
    return {
      inputLength: input.length,
      outputLength: output.length,
      lines: output ? output.split(/\r\n|\r|\n/).length : 0,
    };
  }, [input, output]);

  const parseJson = () => {
    return JSON.parse(input);
  };

  const handleFormat = () => {
    try {
      const parsed = parseJson();
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
      setCopyText("复制结果");
    } catch (caughtError) {
      setError(formatError(caughtError));
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = parseJson();
      setOutput(JSON.stringify(parsed));
      setError("");
      setCopyText("复制结果");
    } catch (caughtError) {
      setError(formatError(caughtError));
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
    setInput(sampleJson);
    setOutput(JSON.stringify(JSON.parse(sampleJson), null, 2));
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
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输入字符</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{stats.inputLength}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输出字符</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{stats.outputLength}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-500">输出行数</div>
          <div className="mt-2 text-2xl font-bold text-primary-700">{stats.lines}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-800" htmlFor="json-input">
            输入 JSON
          </label>
          <textarea
            className="mt-2 min-h-96 w-full resize-y rounded-md border border-slate-200 bg-white p-4 font-mono text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
            id="json-input"
            onChange={(event) => setInput(event.target.value)}
            placeholder="粘贴 JSON 内容，例如：{&quot;name&quot;:&quot;Toolmomo&quot;}"
            spellCheck={false}
            value={input}
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800" htmlFor="json-output">
            输出结果
          </label>
          <textarea
            className="mt-2 min-h-96 w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-6 text-slate-800 outline-none"
            id="json-output"
            placeholder="格式化或压缩后的 JSON 会显示在这里"
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
          onClick={handleFormat}
          type="button"
        >
          格式化
        </button>
        <button
          className="rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-900"
          onClick={handleMinify}
          type="button"
        >
          压缩
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
