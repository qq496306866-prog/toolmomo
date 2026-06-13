import { englishPopularTools, englishTools, type EnglishToolCategory, type EnglishToolItem } from "@/data/toolsEn";

type MenuGroup = {
  label: string;
  category: EnglishToolCategory;
  featured: string[];
  allHref: string;
};

const menuGroups: MenuGroup[] = [
  {
    label: "PDF",
    category: "PDF Tools",
    featured: ["Edit PDF", "PDF to Word", "JPG to PDF", "Merge PDF"],
    allHref: "/en/tools?category=PDF%20Tools",
  },
  {
    label: "Image",
    category: "Image Tools",
    featured: ["AI Image Generator", "Remove Background from Image", "Upscale Image", "Remove Watermark"],
    allHref: "/en/tools?category=Image%20Tools",
  },
  {
    label: "Write",
    category: "Write Tools",
    featured: ["Content Improver", "Essay Writer", "Paragraph Writer", "Paragraph Completer"],
    allHref: "/en/tools?category=Write%20Tools",
  },
  {
    label: "Video",
    category: "Video Tools",
    featured: ["YouTube to Text", "Compress Video", "Instagram Download", "TikTok Video Downloader"],
    allHref: "/en/tools?category=Video%20Tools",
  },
  {
    label: "File",
    category: "File Tools",
    featured: ["Split CSV", "Split Excel", "Excel to PDF", "CSV to Excel"],
    allHref: "/en/tools?category=File%20Tools",
  },
];

const accentClasses = [
  "bg-[#eaf8db] text-[#77c842]",
  "bg-[#defcff] text-[#12c4d2]",
  "bg-[#ffe7e6] text-[#ff5b5b]",
  "bg-[#e8e0ff] text-[#7655df]",
];

function toolsForGroup(group: MenuGroup) {
  const categoryTools = englishTools.filter((tool) => tool.category === group.category);
  const featuredTools = group.featured
    .map((name) => categoryTools.find((tool) => tool.name === name))
    .filter((tool): tool is EnglishToolItem => Boolean(tool));
  const featuredHrefs = new Set(featuredTools.map((tool) => tool.href));
  const otherTools = categoryTools.filter((tool) => !featuredHrefs.has(tool.href));

  return { featuredTools, otherTools };
}

export function EnglishMegaHeader() {
  const recentTools = englishPopularTools.slice(0, 5);

  return (
    <header className="sticky top-0 z-40 border-b border-[#eef2f7] bg-white/95 shadow-[0_8px_30px_rgba(32,43,60,0.05)] backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1220px] items-center gap-4 px-5">
        <a className="flex min-w-fit items-center gap-3" href="/en">
          <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#ff5b34] text-xl font-black text-white">T</span>
          <span className="hidden text-[25px] font-black text-[#243044] sm:block">TOOLMOMO</span>
        </a>

        <nav className="hidden h-full flex-1 items-center justify-center lg:flex">
          {menuGroups.map((group) => {
            const { featuredTools, otherTools } = toolsForGroup(group);

            return (
              <div className="group/menu flex h-full items-center" key={group.label}>
                <a
                  className="flex h-10 items-center gap-1 rounded-[12px] px-4 text-[20px] font-black text-[#555b66] transition group-hover/menu:bg-[#e9f5ff] group-hover/menu:text-[#1787e8]"
                  href={group.allHref}
                >
                  {group.label}
                  <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20">
                    <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </a>

                <div className="pointer-events-none absolute left-1/2 top-[72px] w-[min(1100px,calc(100vw-40px))] -translate-x-1/2 translate-y-2 opacity-0 transition group-hover/menu:pointer-events-auto group-hover/menu:translate-y-0 group-hover/menu:opacity-100">
                  <div className="grid overflow-hidden rounded-b-[18px] bg-white shadow-[0_28px_80px_rgba(32,43,60,0.16)] ring-1 ring-[#edf2f7] lg:grid-cols-[290px_1fr]">
                    <div className="border-r border-[#edf2f7] bg-white p-5">
                      <h3 className="mb-5 text-[12px] font-black uppercase tracking-[0.08em] text-[#8a9099]">Featured Tools</h3>
                      <div className="grid gap-4">
                        {featuredTools.map((tool, index) => (
                          <a className="group/item flex gap-4 rounded-[16px] p-2 hover:bg-[#f7f9fc]" href={tool.href} key={tool.href}>
                            <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-[8px] text-[18px] font-black ${accentClasses[index % accentClasses.length]}`}>
                              {tool.icon}
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[17px] font-black leading-6 text-[#20242b] group-hover/item:text-[#1787e8]">{tool.name}</span>
                              <span className="mt-1 block text-[13px] font-semibold leading-6 text-[#7a8088]">{tool.description}</span>
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="mb-6 text-[12px] font-black uppercase tracking-[0.08em] text-[#8a9099]">Other {group.label} Tools</h3>
                      <div className="grid grid-cols-2 gap-x-12 gap-y-5">
                        {otherTools.slice(0, 10).map((tool) => (
                          <a className="text-[20px] font-black leading-7 text-[#20242b] hover:text-[#1787e8]" href={tool.href} key={tool.href}>
                            {tool.name.replace(" Converter", "").replace(" / Decoder", "")}
                          </a>
                        ))}
                        <a className="text-[20px] font-black leading-7 text-[#1787e8]" href={group.allHref}>
                          All {group.label} Tools
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <button aria-label="Toggle theme" className="grid h-12 w-12 place-items-center rounded-full border border-[#e4ebf3] bg-white text-[#4f5864]">
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M20 14.2A7.2 7.2 0 0 1 9.8 4 8.5 8.5 0 1 0 20 14.2z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
          <button aria-label="Share" className="grid h-12 w-12 place-items-center rounded-full border border-[#e4ebf3] bg-white text-[#4f5864]">
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M18 8a3 3 0 1 0-2.8-4M6 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.8 12.8l6.4 3.4M15.1 7.8 8.9 10.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
          <form action="/en/tools" className="ml-2 flex h-12 w-[230px] items-center gap-3 rounded-[8px] bg-[#f5f5f5] px-4">
            <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#747b85]" viewBox="0 0 24 24">
              <path d="M10.8 18.1a7.3 7.3 0 1 1 5.2-2.1l4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.3" />
            </svg>
            <input className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#263244] outline-none placeholder:text-[#8a9099]" name="q" placeholder="Search" type="search" />
          </form>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 lg:hidden">
          <a className="rounded-full border border-[#e8eef5] bg-white px-4 py-2 text-sm font-black text-[#65758a]" href="/en/tools">
            Tools
          </a>
          <form action="/en/tools" className="flex h-10 w-[150px] items-center gap-2 rounded-full bg-[#f5f7fb] px-3">
            <input className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-[#8a9099]" name="q" placeholder="Search" type="search" />
          </form>
        </div>
      </div>
      <div className="hidden border-t border-[#f0f4f8] bg-white/90 lg:block">
        <div className="mx-auto flex h-[44px] max-w-[1220px] items-center gap-3 px-5">
          <span className="min-w-fit text-[16px] font-black text-black">Recent Tools:</span>
          <div className="flex min-w-0 gap-3 overflow-hidden">
            {recentTools.map((tool) => (
              <a
                className="min-w-fit rounded-[10px] border border-[#1787e8] bg-[#f7fbff] px-4 py-1.5 text-[14px] font-bold text-[#1787e8] hover:bg-[#e9f5ff]"
                href={tool.href}
                key={tool.href}
              >
                {tool.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
