"use client";

import { useMemo, useState } from "react";

const sampleText = "Toolmomo 免费中文在线工具箱";

function encodeBase64(text: string) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

function decodeBase64(text: string) {
  const binary = atob(text.trim());
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function looksLikeBase64(text: string) {
  const value = text.trim();

  if (!value || value.length % 4 !== 0) {
    return false;
  }

  return /^[A-Za-z0-9+/]+={0,2}$/.test(value);
}

export function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copyText, setCopyText] = useState("复制结果");

  const stats = useMemo(() => {
    return {
      inputLength: input.length,
      outputLength: output.length,
      detectedType: looksLikeBase64(input) ? "疑似 Base64" : "普通文本",
    };
  }, [input, output]);

  const resetCopyText = () => {
    setCopyText("复制结果");
  };

  const handleEncode = () => {
    try {
      setOutput(encodeBase64(input));
      setError("");
      resetCopyText();
    } catch {
      setError("编码失败，请检查输入内容。");
      setOutput("");
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeBase64(input));
      setError("");
      resetCopyText();
    } catch {
      setError("解码失败，请确认输入的是有效 Base64 内容。");
      setOutput("");
    }
  };

  const handleAuto = () => {
    if (looksLikeBase64(input)) {
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

  const handleDownload = () => {
    if (!output) {
      return;
    }

    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "toolmomo-base64-result.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSample = () => {
    setInput(sampleText);
    setOutput(encodeBase64(sampleText));
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-800" htmlFor="base64-input">
            输入内容
          </label>
          <textarea
            className="mt-2 min-h-80 w-full resize-y rounded-md border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-800 outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
            id="base64-input"
            onChange={(event) => setInput(event.target.value)}
            placeholder="输入普通文本，或粘贴 Base64 内容"
            spellCheck={false}
            value={input}
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800" htmlFor="base64-output">
            输出结果
          </label>
          <textarea
            className="mt-2 min-h-80 w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-800 outline-none"
            id="base64-output"
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
          Base64编码
        </button>
        <button
          className="rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-900"
          onClick={handleDecode}
          type="button"
        >
          Base64解码
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
          onClick={handleDownload}
          type="button"
        >
          下载结果
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
