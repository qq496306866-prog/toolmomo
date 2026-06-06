import type { Metadata } from "next";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { ToolCard } from "@/components/home/ToolCard";
import { TopBar } from "@/components/home/TopBar";
import { categoryTabs, tools } from "@/data/tools";
import { notFound } from "next/navigation";

type CategoryPageProps = {
  params: Promise<{
    name: string;
  }>;
};

function decodeParam(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getCategoryTools(category: string) {
  return tools.filter((tool) => tool.category === category);
}

export function generateStaticParams() {
  return categoryTabs.map((category) => ({
    name: encodeURIComponent(category),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { name } = await params;
  const category = decodeParam(name);

  if (!categoryTabs.includes(category as (typeof categoryTabs)[number])) {
    return {
      title: "分类不存在 - Toolmomo",
      description: "这个工具分类不存在，可以返回 Toolmomo 全部工具页继续浏览。",
    };
  }

  return {
    title: `${category} - Toolmomo`,
    description: `浏览 Toolmomo 的${category}，快速找到可直接使用的免费在线工具。`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { name } = await params;
  const category = decodeParam(name);

  if (!categoryTabs.includes(category as (typeof categoryTabs)[number])) {
    notFound();
  }

  const categoryTools = getCategoryTools(category);

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
            <a className="hover:text-accent-600" href="/tools">
              全部工具
            </a>
            <span className="mx-2">/</span>
            <span>{category}</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">{category}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            {categoryTools.length
              ? `共收录 ${categoryTools.length} 个相关工具，点击卡片即可打开使用。`
              : "这个分类暂时没有收录工具，可以先浏览全部工具。"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        {categoryTools.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.href} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-slate-200 bg-white p-6 text-sm leading-6 text-slate-600 shadow-sm">
            <p>没有找到这个分类的工具。</p>
            <a className="mt-4 inline-flex rounded-md bg-accent-500 px-4 py-2 font-semibold text-white hover:bg-accent-600" href="/tools">
              查看全部工具
            </a>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          {categoryTabs.map((item) => (
            <a
              className={
                item === category
                  ? "rounded-md bg-primary-700 px-3 py-2 text-sm font-semibold text-white"
                  : "rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:text-accent-700"
              }
              href={`/category/${encodeURIComponent(item)}`}
              key={item}
            >
              {item}
            </a>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
