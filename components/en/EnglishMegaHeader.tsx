import { imageTools } from "@/data/imageTools";
import { fileTools } from "@/data/fileTools";
import { videoTools } from "@/data/videoTools";
import { writeTools } from "@/data/writeTools";
import { pdfTools } from "@/data/pdfTools";
import { siteCategories } from "@/data/siteCategories";

const toolSets = { pdf: pdfTools, image: imageTools, write: writeTools, video: videoTools, file: fileTools } as const;

export function EnglishMegaHeader() {
  return <header className="sticky top-0 z-40 border-b border-[#edf1f6] bg-white/95 backdrop-blur">
    <div className="mx-auto flex h-[72px] max-w-[1220px] items-center gap-4 px-5">
      <a className="flex shrink-0 items-center gap-3" href="/"><span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#ff5b34] text-xl font-black text-white">T</span><span className="text-xl font-black text-[#243044] lg:text-[24px]">TOOLMOMO</span></a>
      <nav aria-label="Tool categories" className="ml-auto hidden h-full items-center md:flex">
        {siteCategories.map((category) => {
          const tools = toolSets[category.slug].slice(0, 8);
          return <div className="group relative flex h-full items-center" key={category.slug}>
            <a className="inline-flex items-center px-3 py-2 text-sm font-black text-[#4f5c6e] hover:text-[#ff5b34] focus:text-[#ff5b34] lg:px-4" href={category.href}>{category.name}</a>
            <div className="pointer-events-none absolute left-1/2 top-[64px] w-[620px] -translate-x-1/2 translate-y-2 rounded-[16px] bg-white p-5 opacity-0 shadow-[0_24px_70px_rgba(32,43,60,0.16)] ring-1 ring-[#e7edf5] transition group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex items-center justify-between border-b border-[#edf1f6] pb-3"><span className="text-xs font-black uppercase text-[#8a98aa]">{category.name} Tools</span><span className="text-xs font-bold text-[#8a98aa]">{category.availableCount} available</span></div>
              {tools.length ? <div className="mt-3 grid grid-cols-2 gap-2">{tools.map((tool) => <a className="rounded-[10px] px-3 py-2 hover:bg-[#f7f9fc] focus:bg-[#f7f9fc]" href={category.slug === "pdf" ? `/tools/${tool.slug}` : `/tools/${category.slug}/${tool.slug}`} key={tool.slug}><span className="text-sm font-black text-[#263244]">{tool.name}</span><span className="mt-1 block text-xs font-semibold text-[#728197]">{tool.description}</span></a>)}</div> : <div className="py-8 text-center text-sm font-bold text-[#8a98aa]">Production tools are entering validation.</div>}
              <a className="mt-3 block border-t border-[#edf1f6] pt-4 text-sm font-black text-[#ff5b34]" href={category.href}>Browse {category.name} tools</a>
            </div>
          </div>;
        })}
      </nav>
      <a aria-label="Search tools" className="ml-auto grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5f7fa] text-[#58667a] md:ml-0" href="/tools"><svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24"><path d="M10.8 18.1a7.3 7.3 0 1 1 5.2-2.1l4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.3" /></svg></a>
      <details className="relative md:hidden"><summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full bg-[#f5f7fa] text-xl font-black">≡</summary><div className="absolute right-0 top-12 w-56 rounded-[14px] bg-white p-2 shadow-xl ring-1 ring-[#e7edf5]">{siteCategories.map((category) => <a className="flex items-center justify-between rounded-[10px] px-4 py-3 text-sm font-black hover:bg-[#f7f9fc]" href={category.href} key={category.slug}><span>{category.name}</span><span className="text-xs text-[#8a98aa]">{category.availableCount}</span></a>)}</div></details>
    </div>
  </header>;
}
