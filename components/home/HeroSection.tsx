import { hotSearches, siteCopy } from "@/data/tools";

export function HeroSection() {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-white via-primary-50 to-slate-50">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl lg:text-5xl">
            {siteCopy.heroTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            {siteCopy.heroDescription}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              className="rounded-md bg-accent-500 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-600"
              href="/tools"
            >
              开始使用免费工具
            </a>
            <a
              className="rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-accent-200 hover:text-accent-700"
              href="/ai-tools"
            >
              查看AI工具推荐
            </a>
          </div>
          <form
            action="/search"
            className="mt-8 flex w-full max-w-3xl overflow-hidden rounded-md border border-slate-200 bg-white p-2 shadow-soft"
          >
            <input
              aria-label="搜索工具"
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:px-4 sm:text-base"
              name="q"
              placeholder={siteCopy.searchPlaceholder}
              type="search"
            />
            <button
              className="rounded-md bg-accent-500 px-4 py-3 text-sm font-semibold text-white hover:bg-accent-600 sm:px-7"
              type="submit"
            >
              搜索
            </button>
          </form>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-slate-500">热门搜索</span>
            {hotSearches.map((tag) => (
              <a
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 hover:border-accent-200 hover:text-accent-700"
                href={`/search?q=${encodeURIComponent(tag)}`}
                key={tag}
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
