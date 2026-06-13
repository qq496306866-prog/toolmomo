import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { EnglishShell } from "@/components/en/EnglishShell";
import { FileToolWorkspace } from "@/components/file/FileToolWorkspace";
import { RemoteConversionWorkspace } from "@/components/remote/RemoteConversionWorkspace";
import { ToolDetails } from "@/components/site/ToolDetails";
import { fileTools, getFileTool } from "@/data/fileTools";
import { isFileIndexed } from "@/lib/toolIndexing";
export const dynamicParams = false;
export const generateStaticParams = () => fileTools.map((tool) => ({ slug: tool.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const tool = getFileTool((await params).slug); return tool ? { title: `${tool.name} - Free Online Tool`, description: tool.description, robots: isFileIndexed(tool) ? undefined : { index: false, follow: true }, alternates: { canonical: `/tools/file/${tool.slug}` } } : {}; }
export default async function FileToolPage({ params }: { params: Promise<{ slug: string }> }) { const tool = getFileTool((await params).slug); if (!tool) notFound(); const related = fileTools.filter((item) => item.slug !== tool.slug).slice(0, 3).map((item) => ({ ...item, href: `/tools/file/${item.slug}` })); return <EnglishShell><section className="bg-white"><div className="mx-auto max-w-[900px] px-5 py-12 text-center"><span className="mx-auto grid h-20 w-20 place-items-center rounded-[20px] bg-[#edf4fd] text-sm font-black text-[#285f9f]">{tool.icon}</span><p className="mt-6 text-sm font-black uppercase text-[#2674d9]">File Tools</p><h1 className="mt-3 text-[42px] font-black sm:text-[58px]">{tool.name}</h1><p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-[#728197]">{tool.description}</p></div></section><section className="mx-auto max-w-[980px] px-5 pb-14">{tool.provider === "local" ? <FileToolWorkspace tool={tool} /> : <RemoteConversionWorkspace tool={tool} />}</section><section className="mx-auto max-w-[1100px] px-5 py-10"><AdSenseUnit slot={process.env.NEXT_PUBLIC_ADSENSE_TOOL_SLOT} /></section><ToolDetails name={tool.name} description={tool.description} category="File" mode={tool.provider === "local" ? "browser" : "remote"} formats={tool.accept} related={related} /></EnglishShell>; }
