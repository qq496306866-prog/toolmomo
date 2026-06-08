import type { Metadata } from "next";
import { EnglishShell } from "@/components/en/EnglishShell";
import { EnglishToolCard } from "@/components/en/EnglishToolCard";
import { englishLatestTools, englishPopularTools } from "@/data/toolsEn";

export const metadata: Metadata = {
  title: "Toolmomo English - Free Online Tools for Ecommerce Sellers",
  description:
    "Toolmomo English provides practical online tools for North American ecommerce sellers, creators, and developers.",
  alternates: {
    canonical: "/en",
    languages: {
      "zh-CN": "/",
      en: "/en",
    },
  },
};

export default function EnglishHomePage() {
  return (
    <EnglishShell>
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-primary-50 to-slate-50">
        <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="max-w-4xl">
            <span className="rounded-md bg-accent-50 px-3 py-1.5 text-sm font-semibold text-accent-700">
              English tools for North American sellers
            </span>
            <h1 className="mt-5 text-3xl font-bold text-slate-950 sm:text-4xl lg:text-5xl">
              Free online tools for ecommerce listings, content, images, and developer work
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              Build better product titles, prepare marketplace images, generate SKUs, format data, and handle routine
              store operations directly in your browser.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="rounded-md bg-accent-500 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-600" href="/en/tools">
                Browse tools
              </a>
              <a
                className="rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-accent-200 hover:text-accent-700"
                href="/en/tools/product-title"
              >
                Optimize a product title
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-950">Popular tools</h2>
          <p className="mt-1 text-sm text-slate-500">Fast entry points for ecommerce sellers and operators.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {englishPopularTools.map((tool) => (
            <EnglishToolCard key={tool.href} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-950">Latest tools</h2>
          <p className="mt-1 text-sm text-slate-500">New English-ready tools and marketplace workflows.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {englishLatestTools.map((tool) => (
            <EnglishToolCard key={tool.href} tool={tool} />
          ))}
        </div>
      </section>
    </EnglishShell>
  );
}
