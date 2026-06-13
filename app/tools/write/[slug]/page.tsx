import { notFound } from "next/navigation";
import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { EnglishShell } from "@/components/en/EnglishShell";
import { WriteToolWorkspace } from "@/components/write/WriteToolWorkspace";
import { ToolDetails } from "@/components/site/ToolDetails";
import { getWriteTool, writeTools } from "@/data/writeTools";
export const dynamicParams = false;
export const generateStaticParams = () => writeTools.map((tool) => ({ slug: tool.slug }));
export default async function WriteToolPage({ params }: { params: Promise<{ slug: string }> }) { const tool = getWriteTool((await params).slug); if (!tool) notFound(); const related = writeTools.filter((item) => item.slug !== tool.slug).slice(0, 3).map((item) => ({ ...item, href: `/tools/write/${item.slug}` })); return <EnglishShell><section className="bg-white"><div className="mx-auto max-w-[900px] px-5 py-12 text-center"><span className="mx-auto grid h-20 w-20 place-items-center rounded-[20px] bg-[#f1ebfc] text-sm font-black text-[#6842b5]">{tool.icon}</span><p className="mt-6 text-sm font-black uppercase text-[#805ad5]">Write Tools</p><h1 className="mt-3 text-[42px] font-black sm:text-[58px]">{tool.name}</h1><p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-[#728197]">{tool.description}</p></div></section><section className="mx-auto max-w-[1100px] px-5 pb-14"><WriteToolWorkspace tool={tool} /></section><section className="mx-auto max-w-[1100px] px-5 py-10"><AdSenseUnit slot={process.env.NEXT_PUBLIC_ADSENSE_TOOL_SLOT} /></section><ToolDetails name={tool.name} description={tool.description} category="Write" mode={tool.provider === "local" ? "browser" : "ai"} formats="Plain text up to 20,000 characters for AI tools" related={related} /></EnglishShell>; }
