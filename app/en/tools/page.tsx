import type { Metadata } from "next";
import { EnglishShell } from "@/components/en/EnglishShell";
import { EnglishToolCard } from "@/components/en/EnglishToolCard";
import { englishCategoryTabs, englishToolsByCategory } from "@/data/toolsEn";

export const metadata: Metadata = {
  title: "All Tools - Toolmomo English",
  description: "Browse Toolmomo English online tools for ecommerce sellers, creators, developers, and store operators.",
};

export default function EnglishToolsPage() {
  return (
    <EnglishShell
      description="Browse English-ready tools for marketplace listings, product images, SKUs, data formatting, and daily store operations."
      title="All Tools"
    >
      <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-5">
          {englishCategoryTabs.map((category) => {
            const tools = englishToolsByCategory[category];

            if (!tools.length) {
              return null;
            }

            return (
              <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm" key={category}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold text-slate-950">{category}</h2>
                  <span className="text-sm text-slate-500">{tools.length} tools</span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => (
                    <EnglishToolCard key={tool.href} tool={tool} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </EnglishShell>
  );
}
