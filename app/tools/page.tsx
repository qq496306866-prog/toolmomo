import type { Metadata } from "next";
import { EnglishShell } from "@/components/en/EnglishShell";
import { pdfTools } from "@/data/pdfTools";

export const metadata: Metadata = {
  title: "Free PDF Tools - Toolmomo",
  description: "Browse 46 free PDF tools for editing, converting, signing, compressing, extracting, and organizing PDF files.",
  alternates: { canonical: "/tools" },
};

export default async function ToolsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = (await searchParams).q?.trim() || "";
  const keyword = query.toLowerCase();
  const tools = keyword ? pdfTools.filter((tool) => `${tool.name} ${tool.description}`.toLowerCase().includes(keyword)) : pdfTools;
  return (
    <EnglishShell title="All PDF Tools" description="Edit, convert, organize, sign, and extract PDF files with privacy-first browser tools and secure one-hour conversion jobs.">
      <section className="mx-auto max-w-[1220px] px-5 py-10">
        <form action="/tools" className="mx-auto flex max-w-[760px] gap-2 rounded-full bg-white p-2 shadow-[0_18px_55px_rgba(32,43,60,0.12)] ring-1 ring-[#e5ebf3]">
          <input aria-label="Search PDF tools" className="min-w-0 flex-1 rounded-full bg-[#f7f9fc] px-5 text-base font-bold outline-none" defaultValue={query} name="q" placeholder="Search PDF tools" type="search" />
          <button className="rounded-full bg-[#ff5b34] px-6 py-3 text-sm font-black text-white" type="submit">Search</button>
        </form>
        <div className="mt-8 flex items-end justify-between gap-4"><div><h2 className="text-[34px] font-black text-[#263244]">{query ? "Search results" : "46 PDF tools"}</h2><p className="mt-2 text-sm font-semibold text-[#728197]">{tools.length} tools available</p></div>{query ? <a className="text-sm font-black text-[#ff5b34]" href="/tools">Clear search</a> : null}</div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => <a className="group flex min-h-[130px] gap-4 rounded-[22px] border border-[#e7edf5] bg-white p-5 shadow-[0_8px_24px_rgba(32,43,60,0.05)] hover:border-[#ffc3b4] hover:shadow-[0_18px_40px_rgba(32,43,60,0.1)]" href={`/tools/${tool.slug}`} key={tool.slug}><span className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] bg-[#fff1ee] text-xs font-black text-[#ef5535]">{tool.icon}</span><span><span className="block text-lg font-black text-[#263244] group-hover:text-[#ff5b34]">{tool.name}</span><span className="mt-2 block text-sm font-semibold leading-6 text-[#728197]">{tool.description}</span><span className="mt-2 block text-xs font-black uppercase text-[#9aa7b8]">{tool.provider === "local" ? "Runs in your browser" : "Secure conversion job"}</span></span></a>)}
        </div>
      </section>
    </EnglishShell>
  );
}
