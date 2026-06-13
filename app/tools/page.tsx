import type { Metadata } from "next";
import { EnglishShell } from "@/components/en/EnglishShell";
import { imageTools } from "@/data/imageTools";
import { fileTools } from "@/data/fileTools";
import { videoTools } from "@/data/videoTools";
import { writeTools } from "@/data/writeTools";
import { pdfTools } from "@/data/pdfTools";

export const metadata: Metadata = { title: "Free Online Tools", description: "Browse production-ready PDF and image tools.", alternates: { canonical: "/tools" } };

export default async function ToolsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = (await searchParams).q?.trim() || ""; const keyword = query.toLowerCase();
  const pdf = keyword ? pdfTools.filter((tool) => `${tool.name} ${tool.description}`.toLowerCase().includes(keyword)) : pdfTools;
  const images = keyword ? imageTools.filter((tool) => `${tool.name} ${tool.description}`.toLowerCase().includes(keyword)) : imageTools;
  const files = keyword ? fileTools.filter((tool) => `${tool.name} ${tool.description}`.toLowerCase().includes(keyword)) : fileTools;
  const writing = keyword ? writeTools.filter((tool) => `${tool.name} ${tool.description}`.toLowerCase().includes(keyword)) : writeTools;
  const videos = keyword ? videoTools.filter((tool) => `${tool.name} ${tool.description}`.toLowerCase().includes(keyword)) : videoTools;
  const cards = [
    ...pdf.map((tool) => ({ ...tool, category: "PDF", href: `/tools/${tool.slug}`, color: "#ff5b34", background: "#fff1ee" })),
    ...images.map((tool) => ({ ...tool, category: "Image", href: `/tools/image/${tool.slug}`, color: "#147d78", background: "#e9f8f6" })),
    ...files.map((tool) => ({ ...tool, category: "File", href: `/tools/file/${tool.slug}`, color: "#285f9f", background: "#edf4fd" })),
    ...writing.map((tool) => ({ ...tool, category: "Write", href: `/tools/write/${tool.slug}`, color: "#6842b5", background: "#f1ebfc" })),
    ...videos.map((tool) => ({ ...tool, category: "Video", href: `/tools/video/${tool.slug}`, color: "#b72f61", background: "#fff0f5" })),
  ];
  return <EnglishShell title="All Tools" description="Search production-ready TOOLMOMO utilities across PDF, Image, Write, Video, and File."><section className="mx-auto max-w-[1220px] px-5 py-10"><form action="/tools" className="mx-auto flex max-w-[760px] gap-2 rounded-full bg-white p-2 shadow-[0_18px_55px_rgba(32,43,60,0.12)] ring-1 ring-[#e5ebf3]"><input aria-label="Search tools" className="min-w-0 flex-1 rounded-full bg-[#f7f9fc] px-5 text-base font-bold outline-none" defaultValue={query} name="q" placeholder="Search all tools" type="search" /><button className="rounded-full bg-[#ff5b34] px-6 py-3 text-sm font-black text-white" type="submit">Search</button></form><div className="mt-8 flex items-end justify-between"><div><h2 className="text-[34px] font-black">{query ? "Search results" : `${cards.length} available tools`}</h2><p className="mt-2 text-sm font-semibold text-[#728197]">{pdf.length} PDF · {images.length} Image · {writing.length} Write · {videos.length} Video · {files.length} File</p></div>{query ? <a className="text-sm font-black text-[#ff5b34]" href="/tools">Clear search</a> : null}</div><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{cards.map((tool) => <a className="group flex min-h-[130px] gap-4 rounded-[18px] border border-[#e7edf5] bg-white p-5 hover:border-[#b8c8d9]" href={tool.href} key={`${tool.category}-${tool.slug}`}><span className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] text-xs font-black" style={{ background: tool.background, color: tool.color }}>{tool.icon}</span><span><span className="text-xs font-black uppercase text-[#9aa7b8]">{tool.category}</span><span className="mt-1 block text-lg font-black group-hover:text-[#ff5b34]">{tool.name}</span><span className="mt-2 block text-sm font-semibold leading-6 text-[#728197]">{tool.description}</span></span></a>)}</div>{!cards.length ? <div className="py-20 text-center text-lg font-black text-[#8a98aa]">No production-ready tools match this search.</div> : null}</section></EnglishShell>;
}
