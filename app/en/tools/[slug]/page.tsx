import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishShell } from "@/components/en/EnglishShell";
import { EnglishToolCard } from "@/components/en/EnglishToolCard";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { englishTools, getEnglishToolBySlug } from "@/data/toolsEn";

type EnglishToolPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return englishTools.map((tool) => ({
    slug: tool.href.replace("/en/tools/", ""),
  }));
}

export async function generateMetadata({ params }: EnglishToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getEnglishToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool not found - Toolmomo English",
    };
  }

  return {
    title: `${tool.name} - Toolmomo English`,
    description: tool.description,
  };
}

export default async function EnglishToolPage({ params }: EnglishToolPageProps) {
  const { slug } = await params;
  const tool = getEnglishToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = englishTools
    .filter((item) => item.category === tool.category && item.href !== tool.href)
    .slice(0, 3)
    .map((item) => ({
      name: item.name,
      href: item.href,
      description: item.description,
    }));
  const suggestedTools = englishTools
    .filter((item) => item.category !== tool.category)
    .slice(0, 3);

  return (
    <EnglishShell description={tool.description} title={tool.name}>
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <div className="space-y-5">
          <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="inline-flex rounded-md bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
                  {tool.category}
                </span>
                <h2 className="mt-3 text-xl font-bold text-slate-950">English tool overview</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{tool.description}</p>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-accent-50 text-sm font-bold text-accent-700">
                {tool.icon}
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                className="inline-flex rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
                href={tool.originalHref}
              >
                Open working tool
              </a>
              <a
                className="inline-flex rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-accent-200 hover:text-accent-700"
                href="/en/tools"
              >
                Browse English tools
              </a>
            </div>
          </section>
          <InfoPanel
            items={[
              "Use this English entry to understand the tool's purpose, category, and best-fit workflow.",
              "For tools that still share the original working interface, the button above opens the live tool page directly.",
              "North American ecommerce workflows are prioritized across listing, image, SKU, SEO, developer, and content tools.",
            ]}
            title="How this tool fits"
          />
          {suggestedTools.length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950">Suggested tools</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {suggestedTools.map((item) => (
                  <EnglishToolCard key={item.href} tool={item} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
        <aside className="space-y-5">
          <RelatedTools title="Related tools" tools={relatedTools} />
          <InfoPanel
            items={[
              "Most tools run locally in the browser.",
              "No account is required for the free utilities.",
              "Use the Ecommerce section first for Amazon, Shopify, Etsy, eBay, and Walmart tasks.",
            ]}
            title="Quick notes"
          />
        </aside>
      </section>
    </EnglishShell>
  );
}
