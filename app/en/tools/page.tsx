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
    const searchText = [tool.name, tool.description, tool.category, tool.icon].join(" ").toLowerCase();
    const matchesKeyword = keyword ? searchText.includes(keyword) : true;
    return matchesCategory && matchesKeyword;
  });

  return (
    <EnglishShell
      description="Search and browse English-ready tools for marketplace listings, product images, SKUs, data formatting, PDFs, AI writing, and daily store operations."
      title="All Tools"
    >
      <section className="bg-white">
        <div className="mx-auto max-w-[1220px] px-5 pb-10 pt-8">
          <form action="/en/tools" className="mx-auto max-w-[760px] rounded-full bg-white p-2 shadow-[0_22px_70px_rgba(32,43,60,0.16)] ring-1 ring-[#e5ebf3]">
            {activeCategory ? <input name="category" type="hidden" value={activeCategory} /> : null}
            <div className="flex h-[60px] items-center gap-2 rounded-full bg-[#f7f9fc] px-2">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#93a0b1] shadow-sm">
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M10.8 18.1a7.3 7.3 0 1 1 5.2-2.1l4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
                </svg>
              </span>
              <input
                aria-label="Search tools"
                className="h-full min-w-0 flex-1 border-0 bg-transparent px-2 text-base font-bold text-[#263244] outline-none placeholder:text-[#9ba8ba]"
                defaultValue={q}
                name="q"
                placeholder="Search tools, e.g. Amazon title, image resize, JSON, regex"
                type="search"
              />
              <button aria-label="Search" className="grid h-11 w-11 place-items-center rounded-full bg-[#ff5b34] text-white" type="submit">
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                </svg>
              </button>
            </div>
          </form>

          <div className="mx-auto mt-8 flex max-w-[1080px] flex-wrap justify-center gap-2 rounded-[28px] bg-[#f5f7fb] p-2">
            <a
              className={
                activeCategory
                  ? "h-11 rounded-full px-5 py-3 text-sm font-black text-[#728197] hover:bg-white"
                  : "h-11 rounded-full bg-[#ff5b34] px-5 py-3 text-sm font-black text-white"
              }
              href="/en/tools"
            >
              All Tools
            </a>
            {englishCategoryTabs.map((item) => (
              <a
                className={
                  item === activeCategory
                    ? "h-11 rounded-full bg-[#ff5b34] px-5 py-3 text-sm font-black text-white"
                    : "h-11 rounded-full px-5 py-3 text-sm font-black text-[#728197] hover:bg-white"
                }
                href={`/en/tools?category=${encodeURIComponent(item)}`}
                key={item}
              >
                {item.replace(" Tools", "")}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1220px] px-5 py-10">
        {activeCategory || keyword ? (
          <section>
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-[34px] font-black leading-tight text-[#263244]">{activeCategory || "Search Results"}</h2>
                <p className="mt-2 text-[15px] font-semibold text-[#728197]">
                  {filteredTools.length} tools{keyword ? ` matching "${q}"` : ""}
                </p>
              </div>
              {(activeCategory || keyword) ? (
                <a className="text-sm font-black text-[#ff5b34]" href="/en/tools">
                  Clear filters
                </a>
              ) : null}
            </div>
            {filteredTools.length ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTools.map((tool) => (
                  <EnglishToolCard key={tool.href} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-[#e9eff6] bg-white p-8 text-center shadow-[0_12px_28px_rgba(32,43,60,0.07)]">
                <h2 className="text-[24px] font-black text-[#263244]">No matching tools yet</h2>
                <p className="mt-2 text-[15px] font-semibold text-[#728197]">Try a broader keyword or browse all categories.</p>
                <a className="mt-5 inline-flex h-11 items-center rounded-full bg-[#ff5b34] px-5 text-sm font-black text-white" href="/en/tools">
                  Browse all tools
                </a>
              </div>
            )}
          </section>
        ) : (
          <div className="space-y-8">
            {englishCategoryTabs.map((item) => {
              const tools = englishToolsByCategory[item];

              if (!tools.length) {
                return null;
              }

              return (
                <section className="rounded-[32px] bg-white p-5 shadow-[0_12px_28px_rgba(32,43,60,0.07)]" key={item}>
                  <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                      <h2 className="text-[28px] font-black leading-tight text-[#263244]">{item}</h2>
                      <p className="mt-2 text-[14px] font-semibold text-[#728197]">{tools.length} browser-based tools</p>
                    </div>
                    <a className="text-sm font-black text-[#ff5b34]" href={`/en/tools?category=${encodeURIComponent(item)}`}>
                      View category
                    </a>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
