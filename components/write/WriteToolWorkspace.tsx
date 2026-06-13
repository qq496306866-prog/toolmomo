"use client";

import { useMemo, useState } from "react";
import type { WriteToolDefinition } from "@/data/writeTools";
import { trackToolEvent } from "@/lib/clientAnalytics";

export function WriteToolWorkspace({ tool }: { tool: WriteToolDefinition }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [option, setOption] = useState(() => {
    if (tool.provider === "openai") {
      if (tool.operation === "translate") return "Spanish";
      if (tool.operation === "rewrite" || tool.operation === "grammar") return "Natural and clear";
      return "";
    }
    return "upper";
  });
  const [find, setFind] = useState("");
  const [replacement, setReplacement] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const textTransformationOperations = ["rewrite", "grammar", "summarize", "translate", "shorten", "paraphrase", "tone", "active-passive", "bullets", "conclusion", "expand"];
  const isBriefTool = tool.provider === "openai" && !textTransformationOperations.includes(tool.operation);

  const stats = useMemo(() => {
    const words = input.trim() ? input.trim().split(/\s+/).length : 0;
    return {
      words,
      characters: input.length,
      noSpaces: input.replace(/\s/g, "").length,
      sentences: input.trim() ? input.split(/[.!?]+/).filter((item) => item.trim()).length : 0,
      paragraphs: input.trim() ? input.split(/\n\s*\n/).filter((item) => item.trim()).length : 0,
      minutes: Math.max(1, Math.ceil(words / 225)),
    };
  }, [input]);
  const finishLocal = (value: string) => { setOutput(value); trackToolEvent("tool_success", tool.slug, "write"); };

  const run = async () => {
    setError("");
    trackToolEvent("tool_start", tool.slug, "write");
    if (tool.provider === "openai") {
      if (!input.trim()) { setError("Enter some text or a brief first."); return; }
      setLoading(true);
      try {
        const response = await fetch("/api/openai/text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tool: tool.slug, input, option: option || undefined }),
        });
        const payload = await response.json() as { output?: string; error?: string };
        if (!response.ok) throw new Error(payload.error || "Unable to generate text.");
        setOutput(payload.output || ""); trackToolEvent("tool_success", tool.slug, "write");
      } catch (requestError) {
        const detail = requestError instanceof Error ? requestError.message : "Unable to generate text."; trackToolEvent("tool_error", tool.slug, "write", detail); setError(detail);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (tool.operation === "count") { finishLocal(JSON.stringify(stats, null, 2)); return; }
    if (tool.operation === "case") { finishLocal(option === "upper" ? input.toUpperCase() : option === "lower" ? input.toLowerCase() : option === "title" ? input.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase()) : input.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (letter) => letter.toUpperCase())); return; }
    if (tool.operation === "deduplicate") { finishLocal(Array.from(new Set(input.split(/\r?\n/))).join("\n")); return; }
    if (tool.operation === "sort") { finishLocal(input.split(/\r?\n/).sort((a, b) => option === "desc" ? b.localeCompare(a) : a.localeCompare(b)).join("\n")); return; }
    if (tool.operation === "find-replace") { finishLocal(find ? input.split(find).join(replacement) : input); return; }
    if (tool.operation === "slug") { finishLocal(input.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")); return; }
    if (tool.operation === "clean") { finishLocal(input.replace(/[\t\u00a0]+/g, " ").replace(/ +/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n").trim()); return; }
    finishLocal(option === "words" ? input.split(/(\s+)/).reverse().join("") : option === "lines" ? input.split(/\r?\n/).reverse().join("\n") : Array.from(input).reverse().join(""));
  };

  const aiOption = tool.provider === "openai" && (tool.operation === "rewrite" || tool.operation === "grammar" || tool.operation === "tone")
    ? <select className="rounded-[12px] border px-4 py-3 font-bold" onChange={(event) => setOption(event.target.value)} value={option}><option value="Natural and clear">Natural and clear</option><option value="Professional">Professional</option><option value="Friendly">Friendly</option><option value="Concise">Concise</option><option value="Formal">Formal</option></select>
    : tool.provider === "openai" && tool.operation === "translate"
      ? <input className="rounded-[12px] border px-4 py-3" onChange={(event) => setOption(event.target.value)} placeholder="Target language, e.g. Spanish" value={option} />
    : isBriefTool
        ? <input className="rounded-[12px] border px-4 py-3" onChange={(event) => setOption(event.target.value)} placeholder="Optional tone or audience" value={option} />
        : null;

  return <div className="rounded-[20px] border border-[#e3eaf2] bg-white p-5 shadow-[0_24px_70px_rgba(32,43,60,0.1)] sm:p-8">
    {tool.provider === "openai" ? <div className="mb-5 flex items-center justify-between gap-4 rounded-[14px] bg-[#f7f3ff] px-4 py-3 text-sm font-bold text-[#6842b5]"><span>Powered by TOOLMOMO AI. Requests are processed securely and are not saved by TOOLMOMO.</span><span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs">5/day</span></div> : null}
    <div className="grid gap-5 lg:grid-cols-2">
      <label className="text-sm font-black">{isBriefTool ? "Topic or brief" : "Input"}<textarea className="mt-2 min-h-[320px] w-full resize-y rounded-[14px] border border-[#dfe7f1] p-4 font-medium leading-7 outline-none focus:border-[#805ad5]" maxLength={tool.provider === "openai" ? 20000 : undefined} onChange={(event) => setInput(event.target.value)} placeholder={isBriefTool ? "Describe the content you want generated" : tool.provider === "openai" ? "Paste the text you want this tool to process" : "Enter or paste text"} value={input} /></label>
      <label className="text-sm font-black">Output<textarea className="mt-2 min-h-[320px] w-full resize-y rounded-[14px] border border-[#dfe7f1] bg-[#faf9fd] p-4 font-medium leading-7" readOnly value={output} /></label>
    </div>
    <div className="mt-5 grid gap-4 sm:grid-cols-3">
      {tool.provider === "local" && tool.operation === "case" ? <select className="rounded-[12px] border px-4 py-3 font-bold" onChange={(event) => setOption(event.target.value)} value={option}><option value="upper">UPPER CASE</option><option value="lower">lower case</option><option value="title">Title Case</option><option value="sentence">Sentence case</option></select> : null}
      {tool.provider === "local" && tool.operation === "sort" ? <select className="rounded-[12px] border px-4 py-3 font-bold" onChange={(event) => setOption(event.target.value)} value={option}><option value="asc">A to Z</option><option value="desc">Z to A</option></select> : null}
      {tool.provider === "local" && tool.operation === "reverse" ? <select className="rounded-[12px] border px-4 py-3 font-bold" onChange={(event) => setOption(event.target.value)} value={option}><option value="characters">Characters</option><option value="words">Words</option><option value="lines">Lines</option></select> : null}
      {tool.provider === "local" && tool.operation === "find-replace" ? <><input className="rounded-[12px] border px-4 py-3" onChange={(event) => setFind(event.target.value)} placeholder="Find" value={find} /><input className="rounded-[12px] border px-4 py-3" onChange={(event) => setReplacement(event.target.value)} placeholder="Replace with" value={replacement} /></> : null}
      {aiOption}
    </div>
    {tool.provider === "local" && tool.operation === "count" ? <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] bg-[#e5e0ef] sm:grid-cols-6">{Object.entries(stats).map(([key, value]) => <div className="bg-[#faf9fd] p-4 text-center" key={key}><div className="text-2xl font-black">{value}</div><div className="mt-1 text-xs font-black uppercase text-[#81758f]">{key}</div></div>)}</div> : null}
    {error ? <p className="mt-5 rounded-[12px] bg-[#fff0ed] px-4 py-3 text-sm font-bold text-[#b43720]">{error}</p> : null}
    <div className="mt-5 flex flex-wrap gap-3"><button className="rounded-full bg-[#805ad5] px-7 py-3 text-sm font-black text-white disabled:cursor-wait disabled:opacity-60" disabled={loading} onClick={run} type="button">{loading ? "Generating..." : `Run ${tool.name}`}</button>{output ? <button className="rounded-full bg-[#263244] px-7 py-3 text-sm font-black text-white" onClick={async () => { await navigator.clipboard.writeText(output); trackToolEvent("download_result", tool.slug, "write"); }} type="button">Copy output</button> : null}<button className="rounded-full border border-[#dfe7f1] px-7 py-3 text-sm font-black" onClick={() => { setInput(""); setOutput(""); setError(""); }} type="button">Clear</button></div>
  </div>;
}
