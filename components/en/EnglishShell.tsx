import type { ReactNode } from "react";
import { englishCategoryTabs } from "@/data/toolsEn";

type EnglishShellProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function EnglishShell({ title, description, children }: EnglishShellProps) {
  const primaryCategories = englishCategoryTabs.slice(0, 6);

  return (
    <main className="min-h-screen bg-slate-50" lang="en">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-9 max-w-[1200px] items-center justify-between px-4 text-xs text-slate-500 sm:px-6 lg:px-8">
          <span className="font-medium text-slate-600">Free online tools for ecommerce sellers and creators</span>
          <div className="flex items-center gap-4">
            <a className="hover:text-accent-600" href="/">
              Chinese
            </a>
            <a className="font-semibold text-accent-700 hover:text-accent-600" href="/en">
              English
            </a>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a className="text-lg font-black tracking-tight text-primary-700" href="/en">
            TOOLMOMO
          </a>
          <nav className="hidden items-center gap-1 overflow-x-auto text-sm font-medium text-slate-600 lg:flex">
            <a className="min-w-fit rounded-md px-3 py-2 hover:bg-primary-50 hover:text-primary-700" href="/en">
              Home
            </a>
            <a className="min-w-fit rounded-md px-3 py-2 hover:bg-primary-50 hover:text-primary-700" href="/en/tools">
              Tools
            </a>
            <a
              className="min-w-fit rounded-md px-3 py-2 hover:bg-primary-50 hover:text-primary-700"
              href="/en/tools?category=Ecommerce%20Tools"
            >
              Ecommerce
            </a>
            <a
              className="min-w-fit rounded-md px-3 py-2 hover:bg-primary-50 hover:text-primary-700"
              href="/en/tools?category=Developer%20Tools"
            >
              Developers
            </a>
            <a
              className="min-w-fit rounded-md px-3 py-2 hover:bg-primary-50 hover:text-primary-700"
              href="/en/tools?category=Image%20Tools"
            >
              Images
            </a>
            <a
              className="min-w-fit rounded-md px-3 py-2 hover:bg-primary-50 hover:text-primary-700"
              href="/en/tools?category=PDF%20Tools"
            >
              PDF
            </a>
          </nav>
          <a
            className="min-w-fit rounded-md bg-accent-500 px-3 py-2 text-sm font-semibold text-white hover:bg-accent-600"
            href="/en/tools"
          >
            Browse
          </a>
        </div>
        <nav className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-4 pb-3 text-sm font-medium text-slate-600 sm:px-6 lg:hidden">
          {primaryCategories.map((category) => (
            <a
              className="min-w-fit rounded-md bg-slate-100 px-3 py-2 hover:bg-accent-50 hover:text-accent-700"
              href={`/en/tools?category=${encodeURIComponent(category)}`}
              key={category}
            >
              {category.replace(" Tools", "")}
            </a>
          ))}
        </nav>
      </header>
      {title ? (
        <section className="border-b border-slate-200 bg-gradient-to-b from-white via-primary-50 to-slate-50">
          <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="text-sm text-slate-500">
              <a className="hover:text-accent-600" href="/en">
                Home
              </a>
              <span className="mx-2">/</span>
              <span>{title}</span>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">{title}</h1>
            {description ? <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p> : null}
          </div>
        </section>
      ) : null}
      {children}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-8 text-sm text-slate-500 sm:px-6 lg:px-8">
          Toolmomo helps ecommerce sellers, creators, and developers handle routine work faster.
        </div>
      </footer>
    </main>
  );
}
