"use client";

import { useMemo, useState } from "react";

type MatchItem = {
  value: string;
  index: number;
  groups: string[];
};

function buildRegex(pattern: string, flags: string) {
  return new RegExp(pattern, flags);
}

export function RegexTesterTool() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [sample, setSample] = useState("联系邮箱：hello@toolmomo.com，备用邮箱：support@example.com");
  const [replacement, setReplacement] = useState("[邮箱]");
  const [globalFlag, setGlobalFlag] = useState(true);
  const [ignoreCaseFlag, setIgnoreCaseFlag] = useState(false);
  const [multilineFlag, setMultilineFlag] = useState(false);

  const flags = `${globalFlag ? "g" : ""}${ignoreCaseFlag ? "i" : ""}${multilineFlag ? "m" : ""}`;

  const result = useMemo(() => {
    try {
      const regex = buildRegex(pattern, flags);
      const matches: MatchItem[] = [];

      if (globalFlag) {
        for (const match of sample.matchAll(regex)) {
          matches.push({
            value: match[0],
            index: match.index ?? 0,
            groups: match.slice(1),
          });
        }
      } else {
        const match = sample.match(regex);

        if (match) {
          matches.push({
            value: match[0],
            index: match.index ?? 0,
            groups: match.slice(1),
          });
        }
      }

      return {
        error: "",
        matches,
        replaced: sample.replace(regex, replacement),
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "正则表达式格式不正确。",
        matches: [],
        replaced: "",
      };
    }
  }, [flags, globalFlag, pattern, replacement, sample]);

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800" htmlFor="regex-pattern">
            正则表达式
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 font-mono text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="regex-pattern"
              onChange={(event) => setPattern(event.target.value)}
              spellCheck={false}
              value={pattern}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800" htmlFor="regex-sample">
            测试文本
            <textarea
              className="mt-2 min-h-56 w-full resize-y rounded-md border border-slate-200 p-4 text-sm leading-7 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="regex-sample"
              onChange={(event) => setSample(event.target.value)}
              value={sample}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800" htmlFor="regex-replacement">
            替换为
            <input
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-3 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              id="regex-replacement"
              onChange={(event) => setReplacement(event.target.value)}
              value={replacement}
            />
          </label>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">匹配选项</h2>
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                checked={globalFlag}
                className="h-4 w-4 accent-accent-500"
                onChange={(event) => setGlobalFlag(event.target.checked)}
                type="checkbox"
              />
              全局匹配 g
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                checked={ignoreCaseFlag}
                className="h-4 w-4 accent-accent-500"
                onChange={(event) => setIgnoreCaseFlag(event.target.checked)}
                type="checkbox"
              />
              忽略大小写 i
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                checked={multilineFlag}
                className="h-4 w-4 accent-accent-500"
                onChange={(event) => setMultilineFlag(event.target.checked)}
                type="checkbox"
              />
              多行模式 m
            </label>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-md bg-white p-4">
              <div className="text-xs font-semibold text-slate-500">Flags</div>
              <div className="mt-2 font-mono text-xl font-bold text-primary-700">/{flags || "-"}</div>
            </div>
            <div className="rounded-md bg-white p-4">
              <div className="text-xs font-semibold text-slate-500">匹配数</div>
              <div className="mt-2 text-xl font-bold text-accent-600">{result.matches.length}</div>
            </div>
          </div>
        </div>
      </div>

      {result.error ? (
        <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {result.error}
        </div>
      ) : null}

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">匹配结果</h2>
          <div className="mt-3 space-y-2">
            {result.matches.length ? (
              result.matches.map((match, index) => (
                <div className="rounded-md bg-white p-3 text-sm" key={`${match.value}-${match.index}-${index}`}>
                  <div className="break-all font-mono font-bold text-primary-700">{match.value}</div>
                  <div className="mt-1 text-xs text-slate-500">索引：{match.index}</div>
                  {match.groups.length ? (
                    <div className="mt-2 text-xs leading-5 text-slate-600">分组：{match.groups.join(" / ")}</div>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="rounded-md bg-white p-4 text-sm text-slate-500">暂无匹配结果。</div>
            )}
          </div>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-base font-bold text-slate-950">替换预览</h2>
          <pre className="mt-3 min-h-40 whitespace-pre-wrap break-words rounded-md bg-white p-4 text-sm leading-7 text-slate-700">
            {result.replaced || "替换结果会显示在这里"}
          </pre>
        </div>
      </div>
    </section>
  );
}
