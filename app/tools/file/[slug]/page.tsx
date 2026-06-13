import { notFound } from "next/navigation";
import { EnglishShell } from "@/components/en/EnglishShell";
import { FileToolWorkspace } from "@/components/file/FileToolWorkspace";
import { RemoteConversionWorkspace } from "@/components/remote/RemoteConversionWorkspace";
import { fileTools, getFileTool } from "@/data/fileTools";
export const dynamicParams = false;
export const generateStaticParams = () => fileTools.map((tool) => ({ slug: tool.slug }));
export default async function FileToolPage({ params }: { params: Promise<{ slug: string }> }) { const tool = getFileTool((await params).slug); if (!tool) notFound(); return <EnglishShell><section className="bg-white"><div className="mx-auto max-w-[900px] px-5 py-12 text-center"><span className="mx-auto grid h-20 w-20 place-items-center rounded-[20px] bg-[#edf4fd] text-sm font-black text-[#285f9f]">{tool.icon}</span><p className="mt-6 text-sm font-black uppercase text-[#2674d9]">File Tools</p><h1 className="mt-3 text-[42px] font-black sm:text-[58px]">{tool.name}</h1><p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-[#728197]">{tool.description}</p></div></section><section className="mx-auto max-w-[980px] px-5 pb-14">{tool.provider === "local" ? <FileToolWorkspace tool={tool} /> : <RemoteConversionWorkspace tool={tool} />}</section></EnglishShell>; }
