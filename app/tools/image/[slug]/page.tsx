import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishShell } from "@/components/en/EnglishShell";
import { ImageToolWorkspace } from "@/components/image/ImageToolWorkspace";
import { RemoteConversionWorkspace } from "@/components/remote/RemoteConversionWorkspace";
import { getImageTool, imageTools } from "@/data/imageTools";

export const dynamicParams = false;
export const generateStaticParams = () => imageTools.map((tool) => ({ slug: tool.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const tool = getImageTool((await params).slug); return tool ? { title: `${tool.name} - Free Online Tool`, description: tool.description, alternates: { canonical: `/tools/image/${tool.slug}` } } : {}; }

export default async function ImageToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const tool = getImageTool((await params).slug); if (!tool) notFound();
  return <EnglishShell><section className="bg-white"><div className="mx-auto max-w-[900px] px-5 py-12 text-center"><span className="mx-auto grid h-20 w-20 place-items-center rounded-[20px] bg-[#e9f8f6] text-sm font-black text-[#147d78]">{tool.icon}</span><p className="mt-6 text-sm font-black uppercase text-[#14948f]">Image Tools</p><h1 className="mt-3 text-[42px] font-black leading-tight sm:text-[58px]">{tool.name}</h1><p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-[#728197]">{tool.description}</p></div></section><section className="mx-auto max-w-[980px] px-5 pb-14">{tool.provider === "local" ? <ImageToolWorkspace tool={tool} /> : <RemoteConversionWorkspace tool={tool} />}</section></EnglishShell>;
}
