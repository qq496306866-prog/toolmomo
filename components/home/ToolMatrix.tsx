import { categoryTabs, toolsByCategory } from "@/data/tools";
import { SectionHeader } from "./SectionHeader";

const matrixCategories = categoryTabs.filter((category) => category !== "PDF工具" && category !== "生活工具");

export function ToolMatrix() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <SectionHeader
          title="全部工具矩阵"
          description="按分类快速浏览工具入口，矩阵保持密集但留出足够间距，方便扫描。"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {matrixCategories.map((category) => (
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4" key={category}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold text-slate-950">{category}</h3>
                <a className="text-xs font-semibold text-accent-600" href={`/category/${encodeURIComponent(category)}`}>
                  更多
                </a>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {toolsByCategory[category].map((tool) => (
                  <a
                    className="truncate rounded-md bg-white px-3 py-2 text-sm text-slate-600 hover:text-accent-700"
                    href={tool.href}
                    key={tool.name}
                  >
                    {tool.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
