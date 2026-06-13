import type { ReactNode } from "react";
import { EnglishMegaHeader } from "@/components/en/EnglishMegaHeader";
import { englishCategoryTabs } from "@/data/toolsEn";

type EnglishShellProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function EnglishShell({ title, description, children }: EnglishShellProps) {
  const primaryCategories = englishCategoryTabs.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#263244]" lang="en">
      <EnglishMegaHeader />

      {title ? (
        <section className="border-b border-[#e9eff6] bg-white">
          <div className="mx-auto max-w-[1220px] px-5 py-10">
            <div className="text-sm font-bold text-[#8392a8]">
              <a className="hover:text-[#ff5b34]" href="/en">
                Home
              </a>
              <span className="mx-2">/</span>
              <span>{title}</span>
            </div>
            <h1 className="mt-4 text-[38px] font-black leading-tight text-[#263244] sm:text-[48px]">{title}</h1>
            {description ? <p className="mt-4 max-w-3xl text-[16px] font-semibold leading-8 text-[#728197]">{description}</p> : null}
          </div>
        </section>
      ) : null}

      {children}

      <footer className="bg-white">
        <div className="mx-auto grid max-w-[1220px] gap-8 border-t border-[#e9eff6] px-5 py-10 md:grid-cols-[1.3fr_0.8fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#ff5b34] text-xl font-black text-white">T</span>
              <span className="text-[25px] font-black text-[#243044]">TOOLMOMO</span>
            </div>
            <p className="mt-4 max-w-md text-[14px] font-semibold leading-7 text-[#728197]">
              Free online tools for ecommerce sellers, creators, marketers, and developers.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-black text-[#263244]">Navigate</h3>
            <div className="mt-4 grid gap-3 text-sm font-bold text-[#728197]">
              <a href="/en">Home</a>
              <a href="/en/tools">Tools</a>
              <a href="/">Chinese</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black text-[#263244]">Categories</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-bold text-[#728197]">
              {primaryCategories.map((category) => (
                <a href={`/en/tools?category=${encodeURIComponent(category)}`} key={category}>
                  {category.replace(" Tools", "")}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
