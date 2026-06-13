"use client";

import { useMemo, useState } from "react";

export type CatalogTool = { slug: string; name: string; description: string; icon: string; href: string; provider: "browser" | "ai" | "remote"; category: string; color: string; background: string };

export function ToolCatalog({ tools }: { tools: CatalogTool[] }) {
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState<"all" | CatalogTool["provider"]>("all");
  const [visibleCount, setVisibleCount] = useState(24);
  const filtered = useMemo(() => tools.filter((tool) => (provider === "all" || tool.provider === provider) && `${tool.name} ${tool.description}`.toLowerCase().includes(query.toLowerCase())), [provider, query, tools]);
  const visible = filtered.slice(0, visibleCount);

  return <div>
    <div className="grid gap-3 rounded-[12px] border border-[#e3eaf2] bg-white p-3 md:grid-cols-[1fr_auto]">
      <input aria-label="Search this category" className="min-h-11 rounded-[8px] bg-[#f6f8fb] px-4 font-bold outline-none focus:ring-2 focus:ring-[#ff5b34]" onChange={(event) => { setQuery(event.target.value); setVisibleCount(24); }} placeholder="Search tools in this category" type="search" value={query} />
      <div className="flex flex-wrap gap-2" aria-label="Processing type">{(["all", "browser", "ai", "remote"] as const).map((value) => <button className={`min-h-11 rounded-[8px] px-4 text-sm font-black ${provider === value ? "bg-[#263244] text-white" : "bg-[#f6f8fb] text-[#58667a]"}`} key={value} onClick={() => { setProvider(value); setVisibleCount(24); }} type="button">{value === "all" ? "All" : value === "browser" ? "Browser" : value === "ai" ? "AI" : "Cloud"}</button>)}</div>
    </div>
    <p className="mt-4 text-sm font-bold text-[#728197]">{filtered.length} matching tools</p>
    <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {visible.map((tool) => <div className="contents" key={tool.href}>
        <a className="group flex min-h-[130px] gap-4 rounded-[12px] border border-[#e7edf5] bg-white p-5 hover:border-[#b8c8d9]" href={tool.href}><span className="grid h-14 w-14 shrink-0 place-items-center rounded-[12px] text-xs font-black" style={{ background: tool.background, color: tool.color }}>{tool.icon}</span><span><span className="flex items-center gap-2 text-xs font-black uppercase text-[#9aa7b8]">{tool.category}<span className="rounded-full bg-[#f2f5f8] px-2 py-1 text-[10px]">{tool.provider}</span></span><span className="mt-1 block text-lg font-black group-hover:text-[#ff5b34]">{tool.name}</span><span className="mt-2 block text-sm font-semibold leading-6 text-[#728197]">{tool.description}</span></span></a>
      </div>)}
    </div>
    {!filtered.length ? <div className="py-20 text-center text-lg font-black text-[#8a98aa]">No tools match these filters.</div> : null}
    {visibleCount < filtered.length ? <div className="mt-8 text-center"><button className="rounded-[8px] bg-[#263244] px-7 py-3 text-sm font-black text-white" onClick={() => setVisibleCount((count) => count + 24)} type="button">Show more tools</button></div> : null}
  </div>;
}
