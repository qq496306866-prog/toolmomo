import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { EnglishShell } from "@/components/en/EnglishShell";
import { PdfToolWorkspace } from "@/components/pdf/PdfToolWorkspace";
import { ToolDetails } from "@/components/site/ToolDetails";
import { getPdfTool, pdfTools } from "@/data/pdfTools";
import { isPdfIndexed } from "@/lib/toolIndexing";

export const dynamicParams = false;
export function generateStaticParams() { return pdfTools.map((tool) => ({ slug: tool.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const tool = getPdfTool((await params).slug); if (!tool) return { title: "Tool not found" };
  return { title: `${tool.name} - Free Online Tool`, description: tool.description, robots: isPdfIndexed(tool) ? undefined : { index: false, follow: true }, alternates: { canonical: `/tools/${tool.slug}` }, openGraph: { title: `${tool.name} - Toolmomo`, description: tool.description, url: `/tools/${tool.slug}`, type: "website" } };
}

export default async function PdfToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const tool = getPdfTool((await params).slug); if (!tool) notFound();
  const related = pdfTools.filter((item) => item.slug !== tool.slug).slice(0, 3).map((item) => ({ ...item, href: `/tools/${item.slug}` }));
  const jsonLd = { "@context": "https://schema.org", "@type": "WebApplication", name: tool.name, description: tool.description, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  return (
    <EnglishShell>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
      <section className="bg-white"><div className="mx-auto max-w-[920px] px-5 py-12 text-center"><div className="mx-auto grid h-20 w-20 place-items-center rounded-[26px] bg-[#fff1ee] text-lg font-black text-[#ef5535]">{tool.icon}</div><p className="mt-6 text-sm font-black uppercase text-[#ff5b34]">PDF Tools</p><h1 className="mt-3 text-[42px] font-black leading-tight text-[#202b3c] sm:text-[60px]">{tool.name}</h1><p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-[#728197]">{tool.description}</p>{tool.note ? <p className="mx-auto mt-4 max-w-2xl rounded-[16px] bg-[#fff8e8] px-4 py-3 text-sm font-bold text-[#8b6428]">{tool.note}</p> : null}</div></section>
      <section className="mx-auto max-w-[980px] px-5 pb-14"><PdfToolWorkspace tool={tool} /></section>
      <section className="mx-auto max-w-[1100px] px-5 py-10"><AdSenseUnit slot={process.env.NEXT_PUBLIC_ADSENSE_TOOL_SLOT} /></section>
      <ToolDetails name={tool.name} category="PDF" mode={tool.provider === "local" ? "browser" : "remote"} formats={tool.accept || "PDF or the URL requested by the tool"} note={tool.note} related={related} />
    </EnglishShell>
  );
}
