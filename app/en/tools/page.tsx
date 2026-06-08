import type { Metadata } from "next";
import { EnglishShell } from "@/components/en/EnglishShell";
import { EnglishToolCard } from "@/components/en/EnglishToolCard";
import { englishCategoryTabs, englishTools, englishToolsByCategory, type EnglishToolCategory } from "@/data/toolsEn";

export const metadata: Metadata = {
  title: "All Tools - Toolmomo English",
  description: "Browse Toolmomo English online tools for ecommerce sellers, creators, developers, and store operators.",
};

type EnglishToolsPageProps = {
  searchParams: Promise<{
    category?: string;
    q?: string;
  }>;
};

function isEnglishCategory(value: string): value is EnglishToolCategory {
  return englishCategoryTabs.includes(value as EnglishToolCategory);
}

export default async function EnglishToolsPage({ searchParams }: EnglishToolsPageProps) {
  const { category = "", q = "" } = await searchParams;
  const activeCategory = isEnglishCategory(category) ? category : "";
  const keyword = q.trim().toLowerCase();
  const filteredTools = englishTools.filter((tool) => {
    const matchesCategory = activeCategory ? tool.category === activeCategory : true;
    const searchText = [tool.name, tool.description, tool.category].join(" ").toLowerCase();
    const matchesKeyword = keyword ? searchText.includes(keyword) : true;
    return matchesCategory && matchesKeyword;
  });

  return (
    <EnglishShell
      description="Browse English-ready tools for marketplace listings, product images, SKUs, data formatting, and daily store operations."
      title="All Tools"
    >
      <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <form action="/en/tools" className="mb-5 flex max-w-3xl overflow-hidden rounded-md border border-slate-200 bg-white p-2 shadow-sm">
          {activeCategory ? <input name="category" type="hidden" value={activeCategory} /> : null}
          <input
            aria-label="Search tools"
            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:px-4"
            defaultValue={q}
            name="q"
            placeholder="Search tools, e.g. Amazon title, image resize, JSON, regex"
            type="search"
          />
          <button className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 sm:px-6" type="submit">
            Search
          </button>
        </form>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          <a
            className={
              activeCategory
                ? "min-w-fit rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:text-accent-700"
                : "min-w-fit rounded-md bg-primary-700 px-3 py-2 text-sm font-semibold text-white"
            }
            href="/en/tools"
          >
            All
          </a>
          {englishCategoryTabs.map((item) => (
            <a
              className={
                item === activeCategory
                  ? "min-w-fit rounded-md bg-primary-700 px-3 py-2 text-sm font-semibold text-white"
                  : "min-w-fit rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:text-accent-700"
              }
              href={`/en/tools?category=${encodeURIComponent(item)}`}
              key={item}
            >
              {item}
            </a>
          ))}
        </div>

        {activeCategory || keyword ? (
          <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-950">{activeCategory || "Search results"}</h2>
              <span className="text-sm text-slate-500">{filteredTools.length} tools</span>
            </div>
            {filteredTools.length ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTools.map((tool) => (
                  <EnglishToolCard key={tool.href} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="rounded-md bg-slate-50 p-5 text-sm text-slate-600">No matching tools yet.</div>
            )}
          </section>
        ) : (
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
        )}
      </section>
    </EnglishShell>
  );
}
