import type { Metadata } from "next";
import { EnglishShell } from "@/components/en/EnglishShell";
import { imageTools } from "@/data/imageTools";

export const metadata: Metadata = { title: "Free Image Tools", description: "Compress, resize, crop, convert, and edit images privately in your browser.", alternates: { canonical: "/tools/image" } };

export default function ImageToolsPage() {
  return <EnglishShell title="Image Tools" description="Fast browser-based tools for everyday image editing and conversion. Your images stay on your device.">
    <section className="mx-auto max-w-[1220px] px-5 py-12"><div className="flex items-end justify-between gap-5"><div><p className="text-sm font-black uppercase text-[#14948f]">Browser private</p><h2 className="mt-2 text-[34px] font-black">{imageTools.length} production-ready tools</h2></div><span className="text-sm font-bold text-[#728197]">50 MB per job</span></div><div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{imageTools.map((tool) => <a className="group flex min-h-[126px] gap-4 rounded-[18px] border border-[#e3eaf2] bg-white p-5 shadow-[0_8px_24px_rgba(32,43,60,0.05)] hover:border-[#8ed8d4]" href={`/tools/image/${tool.slug}`} key={tool.slug}><span className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] bg-[#e9f8f6] text-xs font-black text-[#147d78]">{tool.icon}</span><span><span className="text-lg font-black group-hover:text-[#14948f]">{tool.name}</span><span className="mt-2 block text-sm font-semibold leading-6 text-[#728197]">{tool.description}</span></span></a>)}</div></section>
  </EnglishShell>;
}
