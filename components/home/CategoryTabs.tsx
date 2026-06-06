import { categoryTabs } from "@/data/tools";

export function CategoryTabs() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto">
          <a
            className="min-w-fit rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white"
            href="/tools"
          >
            全部工具
          </a>
          {categoryTabs.map((category) => (
            <a
              className="min-w-fit rounded-md border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
              href={`/category/${encodeURIComponent(category)}`}
              key={category}
            >
              {category}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
