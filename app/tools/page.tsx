import type { Metadata } from "next";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { TopBar } from "@/components/home/TopBar";
import { isToolReady, readyToolCount } from "@/data/readyTools";
import { categoryTabs, tools, toolsByCategory } from "@/data/tools";

export const metadata: Metadata = {
  title: "全部工具 - Toolmomo 免费中文在线工具箱",
  description: "浏览 Toolmomo 全部在线工具，包含文本工具、开发工具、图片工具、电商工具和更多常用工具。",
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <TopBar />
      <Header />
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-primary-50 to-slate-50">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="flex flex-col gap-3">
            <div className="text-sm text-slate-500">
              <a className="hover:text-accent-600" href="/">
                首页
              </a>
              <span className="mx-2">/</span>
              <span>全部工具</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">全部工具</h1>
            <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              已上线 {readyToolCount} 个可用工具，更多工具正在陆续补齐。未上线入口会进入预告页，不会出现空白页面。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold text-slate-500">工具总数</div>
            <div className="mt-2 text-3xl font-bold text-primary-700">{tools.length}</div>
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold text-slate-500">已上线</div>
            <div className="mt-2 text-3xl font-bold text-accent-600">{readyToolCount}</div>
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold text-slate-500">分类数量</div>
            <div className="mt-2 text-3xl font-bold text-primary-700">{categoryTabs.length}</div>
          </div>
        </div>

        <div className="space-y-5">
          {categoryTabs.map((category) => {
            const categoryTools = toolsByCategory[category];

            if (!categoryTools.length) {
              return null;
            }

            return (
              <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm" key={category}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold text-slate-950">{category}</h2>
                  <span className="text-sm text-slate-500">{categoryTools.length} 个工具</span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryTools.map((tool) => {
                    const ready = isToolReady(tool.href);

                    return (
                      <a
                        className="rounded-md border border-slate-200 bg-slate-50 p-4 hover:border-accent-200 hover:bg-accent-50"
                        href={tool.href}
                        key={tool.name}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="truncate text-base font-bold text-slate-950">{tool.name}</h3>
                            <p className="mt-2 h-10 overflow-hidden text-sm leading-5 text-slate-500">
                              {tool.description}
                            </p>
                          </div>
                          <span
                            className={
                              ready
                                ? "shrink-0 rounded-md bg-accent-100 px-2 py-1 text-xs font-semibold text-accent-700"
                                : "shrink-0 rounded-md bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-500"
                            }
                          >
                            {ready ? "已上线" : "预告"}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
}
