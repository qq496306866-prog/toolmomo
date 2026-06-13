import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishShell } from "@/components/en/EnglishShell";
import { PdfToolWorkspace } from "@/components/pdf/PdfToolWorkspace";
import { getPdfTool, pdfTools } from "@/data/pdfTools";

export const dynamicParams = false;
export function generateStaticParams() { return pdfTools.map((tool) => ({ slug: tool.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const tool = getPdfTool((await params).slug); if (!tool) return { title: "Tool not found" };
  return { title: `${tool.name} - Free Online Tool`, description: tool.description, alternates: { canonical: `/tools/${tool.slug}` }, openGraph: { title: `${tool.name} - Toolmomo`, description: tool.description, url: `/tools/${tool.slug}`, type: "website" } };
}

export default async function PdfToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const tool = getPdfTool((await params).slug); if (!tool) notFound();
  const related = pdfTools.filter((item) => item.slug !== tool.slug).slice(0, 6);
  const jsonLd = { "@context": "https://schema.org", "@type": "WebApplication", name: tool.name, description: tool.description, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  return (
    <EnglishShell>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
      <section className="bg-white"><div className="mx-auto max-w-[920px] px-5 py-12 text-center"><div className="mx-auto grid h-20 w-20 place-items-center rounded-[26px] bg-[#fff1ee] text-lg font-black text-[#ef5535]">{tool.icon}</div><p className="mt-6 text-sm font-black uppercase text-[#ff5b34]">PDF Tools</p><h1 className="mt-3 text-[42px] font-black leading-tight text-[#202b3c] sm:text-[60px]">{tool.name}</h1><p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-[#728197]">{tool.description}</p>{tool.note ? <p className="mx-auto mt-4 max-w-2xl rounded-[16px] bg-[#fff8e8] px-4 py-3 text-sm font-bold text-[#8b6428]">{tool.note}</p> : null}</div></section>
      <section className="mx-auto max-w-[980px] px-5 pb-14"><PdfToolWorkspace tool={tool} /></section>
      <section className="bg-white py-12"><div className="mx-auto max-w-[1220px] px-5"><h2 className="text-center text-[34px] font-black text-[#263244]">More PDF Tools</h2><div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{related.map((item) => <a className="rounded-[20px] border border-[#e7edf5] p-5 hover:border-[#ffc3b4]" href={`/tools/${item.slug}`} key={item.slug}><span className="font-black text-[#263244]">{item.name}</span><span className="mt-2 block text-sm font-semibold text-[#728197]">{item.description}</span></a>)}</div></div></section>
    </EnglishShell>
  );
}
