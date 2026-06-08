import type { Metadata } from "next";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { ToolCard } from "@/components/home/ToolCard";
import { TopBar } from "@/components/home/TopBar";
import { tools } from "@/data/tools";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export const metadata: Metadata = {
  title: "搜索工具 - Toolmomo",
  description: "搜索 Toolmomo 免费中文在线工具，快速找到图片、文本、电商、开发、站长等常用工具。",
};

function normalizeKeyword(value: string) {
  return value.trim().toLowerCase();
}

function getSearchText(tool: (typeof tools)[number]) {
  return [tool.name, tool.description, tool.category, tool.icon, ...(tool.keywords ?? [])].join(" ").toLowerCase();
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const keyword = normalizeKeyword(q);
  const keywordParts = keyword.split(/\s+/).filter(Boolean);
  const results = keyword
    ? tools.filter((tool) => {
        const searchText = getSearchText(tool);
        return keywordParts.every((part) => searchText.includes(part));
      })
    : tools;

  return (
    <main className="min-h-screen bg-slate-50">
      <TopBar />
      <Header />
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-primary-50 to-slate-50">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="text-sm text-slate-500">
            <a className="hover:text-accent-600" href="/">
              首页
            </a>
            <span className="mx-2">/</span>
            <span>搜索工具</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">搜索工具</h1>
          <form action="/search" className="mt-5 flex max-w-3xl overflow-hidden rounded-md border border-slate-200 bg-white p-2 shadow-sm">
            <input
              aria-label="搜索工具"
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:px-4"
              defaultValue={q}
              name="q"
              placeholder="输入工具名称、分类或关键词"
              type="search"
            />
            <button className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 sm:px-6" type="submit">
              搜索
            </button>
          </form>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {keyword ? `找到 ${results.length} 个和“${q}”相关的工具。` : "输入关键词搜索，也可以直接浏览全部工具。"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        {results.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((tool) => (
              <ToolCard key={tool.href} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-slate-200 bg-white p-6 text-sm leading-6 text-slate-600 shadow-sm">
            <p>暂时没有匹配的工具。</p>
            <a className="mt-4 inline-flex rounded-md bg-accent-500 px-4 py-2 font-semibold text-white hover:bg-accent-600" href="/tools">
              查看全部工具
            </a>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
