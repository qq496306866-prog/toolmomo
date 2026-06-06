"use client";

import { useMemo, useState } from "react";

const sampleJson = `{
  "site": "Toolmomo",
  "type": "online-tools",
  "features": ["JSON格式化", "字数统计", "Base64编码解码"],
  "active": true
}`;

function sortJsonValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortJsonValue);
  }

  if (value && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort((left, right) => left.localeCompare(right))
      .reduce<Record<string, unknown>>((sorted, key) => {
        sorted[key] = sortJsonValue((value as Record<string, unknown>)[key]);
        return sorted;
      }, {});
  }

  return value;
}

function getLineColumn(text: string, position: number) {
  const before = text.slice(0, position);
  const lines = before.split(/\r\n|\r|\n/);

  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
}

function formatError(error: unknown, input: string) {
  if (error instanceof SyntaxError) {
    const positionMatch = error.message.match(/position\s+(\d+)/i);

    if (positionMatch) {
      const position = Number(positionMatch[1]);
      const location = getLineColumn(input, position);
      return `${error.message}（第 ${location.line} 行，第 ${location.column} 列）`;
    }

    return error.message;
  }

  return "JSON 内容格式不正确，请检查引号、逗号、冒号和括号是否完整。";
}

export function JsonFormatTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copyText, setCopyText] = useState("复制结果");
  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);

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

  const stringifyJson = (value: unknown, space?: number) => {
    const finalValue = sortKeys ? sortJsonValue(value) : value;
    return JSON.stringify(finalValue, null, space);
  };

  const resetCopyText = () => {
    setCopyText("复制结果");
  };

  const handleFormat = () => {
    try {
      const parsed = parseJson();
      setOutput(stringifyJson(parsed, indentSize));
      setError("");
      resetCopyText();
    } catch (caughtError) {
      setError(formatError(caughtError, input));
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = parseJson();
      setOutput(stringifyJson(parsed));
      setError("");
      resetCopyText();
    } catch (caughtError) {
      setError(formatError(caughtError, input));
      setOutput("");
    }
  };

  const handleValidate = () => {
    try {
      parseJson();
      setOutput("JSON 格式正确，可以正常解析。");
      setError("");
      resetCopyText();
    } catch (caughtError) {
      setError(formatError(caughtError, input));
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
      window.setTimeout(resetCopyText, 1600);
    } catch {
      setCopyText("复制失败");
      window.setTimeout(resetCopyText, 1600);
    }
  };

  const handleSample = () => {
    setInput(sampleJson);
    setOutput(JSON.stringify(JSON.parse(sampleJson), null, indentSize));
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

      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <span>缩进</span>
          <select
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm outline-none focus:border-accent-500"
            onChange={(event) => setIndentSize(Number(event.target.value))}
            value={indentSize}
          >
            <option value={2}>2 空格</option>
            <option value={4}>4 空格</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input
            checked={sortKeys}
            className="h-4 w-4 accent-accent-500"
            onChange={(event) => setSortKeys(event.target.checked)}
            type="checkbox"
          />
          键名按字母排序
        </label>
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
            placeholder='粘贴 JSON 内容，例如：{"name":"Toolmomo"}'
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
            placeholder="格式化、压缩或校验结果会显示在这里"
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
          onClick={handleValidate}
          type="button"
        >
          校验
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
