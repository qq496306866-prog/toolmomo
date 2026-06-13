import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TinyWow Style Homepage Preview",
  description: "A static TinyWow-inspired homepage preview for TOOLMOMO.",
  robots: {
    index: false,
    follow: false,
  },
};

type IconName = "pdf" | "image" | "video" | "write" | "file" | "ai" | "code" | "text";

const categories: Array<{
  name: string;
  title: string;
  subtitle: string;
  featured: string;
  count: string;
  icon: IconName;
  tone: string;
}> = [
  {
    name: "PDF",
    title: "PDF Tools",
    subtitle: "Merge, split, compress, convert and unlock PDFs.",
    featured: "PDF Creator",
    count: "47 tools",
    icon: "pdf",
    tone: "rose",
  },
  {
    name: "Image",
    title: "Image Tools",
    subtitle: "Resize, compress, crop, convert and remove backgrounds.",
    featured: "Background Remover",
    count: "36 tools",
    icon: "image",
    tone: "sky",
  },
  {
    name: "Write",
    title: "AI Write",
    subtitle: "Generate paragraphs, emails, titles and rewrites.",
    featured: "Paragraph Writer",
    count: "31 tools",
    icon: "write",
    tone: "violet",
  },
  {
    name: "Video",
    title: "Video Tools",
    subtitle: "Create, trim, script and prepare video content.",
    featured: "Video Script",
    count: "18 tools",
    icon: "video",
    tone: "amber",
  },
  {
    name: "File",
    title: "File Tools",
    subtitle: "Convert, format and clean up everyday file content.",
    featured: "JSON Formatter",
    count: "24 tools",
    icon: "file",
    tone: "emerald",
  },
];

const popularTools = [
  ["PDF Creator", "Create a PDF from text or images.", "PDF Tools", "pdf"],
  ["Merge PDF", "Combine multiple PDF files into one.", "PDF Tools", "pdf"],
  ["PDF to JPG", "Turn PDF pages into image files.", "PDF Tools", "pdf"],
  ["Compress PDF", "Reduce PDF size while keeping quality.", "PDF Tools", "pdf"],
  ["Remove Background", "Erase image backgrounds in seconds.", "Image Tools", "image"],
  ["Resize Image", "Resize photos for web and social.", "Image Tools", "image"],
  ["Image to WebP", "Convert images into WebP files.", "Image Tools", "image"],
  ["JPG to PDF", "Make a PDF from JPG or PNG images.", "Image Tools", "image"],
  ["Paragraph Writer", "Draft clean paragraphs from a prompt.", "AI Write", "ai"],
  ["Email Writer", "Write simple, polished emails fast.", "AI Write", "ai"],
  ["Word Counter", "Count words, characters and reading time.", "Other Tools", "text"],
  ["JSON Formatter", "Format, validate and minify JSON.", "Developer Tools", "code"],
] as const;

const featuredTools = [
  ["PDF Editor", "Edit PDF text, pages and simple annotations.", "pdf"],
  ["PDF to Word", "Convert PDF files into editable documents.", "pdf"],
  ["AI Humanizer", "Make drafted copy read more naturally.", "ai"],
  ["Photo Cleanup", "Remove unwanted objects from an image.", "image"],
  ["Image Compressor", "Shrink large images without heavy quality loss.", "image"],
  ["QR Code Generator", "Create a QR code for links and text.", "code"],
  ["Video Compressor", "Reduce video file size for sharing.", "video"],
  ["Text Compare", "Find differences between two text blocks.", "text"],
] as const;

const tabs = ["All Tools", "PDF", "Image", "AI Write", "Video", "File"];
const nav = ["PDF", "Image", "Video", "AI Write", "File"];

function Icon({ name, className = "h-7 w-7" }: { name: IconName; className?: string }) {
  if (name === "pdf") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 32 32">
        <path d="M8 3h11l6 6v20H8z" fill="white" stroke="currentColor" strokeWidth="2.2" />
        <path d="M19 3v7h7" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M6 17h20v8H6z" fill="currentColor" />
        <path d="M10 23v-4h2.3c1.3 0 2.1.7 2.1 1.8s-.8 1.8-2.1 1.8h-.9v.4zm1.4-1.6h.7c.5 0 .8-.2.8-.6s-.3-.6-.8-.6h-.7zm4 1.6v-4h1.9c1.5 0 2.5.8 2.5 2s-1 2-2.5 2zm1.5-1.2h.4c.6 0 1-.3 1-.8s-.4-.8-1-.8h-.4zm4.1 1.2v-4h3.3v1.2h-1.8v.6H24V23h-1.5z" fill="white" />
      </svg>
    );
  }

  if (name === "image") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 32 32">
        <rect fill="white" height="22" rx="5" stroke="currentColor" strokeWidth="2.2" width="24" x="4" y="5" />
        <circle cx="12" cy="13" fill="currentColor" r="2.5" />
        <path d="M6.5 25l7.1-7.1 4.4 4.4 3-3 4.6 5.7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
      </svg>
    );
  }

  if (name === "video") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 32 32">
        <rect fill="white" height="18" rx="4" stroke="currentColor" strokeWidth="2.2" width="21" x="4" y="7" />
        <path d="M25 13l5-3v12l-5-3zM13 12l7 4-7 4z" fill="currentColor" />
      </svg>
    );
  }

  if (name === "write") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 32 32">
        <path d="M7 4h18v24H7z" fill="white" stroke="currentColor" strokeWidth="2.2" />
        <path d="M12 11h9M12 16h9M12 21h5" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
        <path d="M22 24l5-5 2 2-5 5-3 1z" fill="currentColor" />
      </svg>
    );
  }

  if (name === "ai") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 32 32">
        <path d="M16 3l2.9 8.1L27 14l-8.1 2.9L16 25l-2.9-8.1L5 14l8.1-2.9z" fill="white" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.2" />
        <path d="M24 22l.8 2.2L27 25l-2.2.8L24 28l-.8-2.2L21 25l2.2-.8z" fill="currentColor" />
      </svg>
    );
  }

  if (name === "code") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 32 32">
        <path d="M12 9l-6 7 6 7M20 9l6 7-6 7M18 7l-4 18" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      </svg>
    );
  }

  if (name === "text") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 32 32">
        <path d="M8 5h16v22H8z" fill="white" stroke="currentColor" strokeWidth="2.2" />
        <path d="M12 12h8M12 17h8M12 22h5" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 32 32">
      <path d="M8 4h13l4 4v20H8z" fill="white" stroke="currentColor" strokeWidth="2.2" />
      <path d="M21 4v6h6M12 15h10M12 20h10M12 24h6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
    </svg>
  );
}

function toneClasses(tone: string) {
  const tones: Record<string, string> = {
    rose: "bg-[#fff2f3] text-[#ef476f]",
    sky: "bg-[#eff8ff] text-[#2493d1]",
    violet: "bg-[#f5f0ff] text-[#7655df]",
    amber: "bg-[#fff6e5] text-[#df9320]",
    emerald: "bg-[#effaf4] text-[#1f9a6a]",
  };

  return tones[tone] ?? "bg-[#f6f8fb] text-[#65758a]";
}

function HeroIllustration() {
  return (
    <div className="relative mx-auto h-[330px] w-full max-w-[430px]">
      <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-[#f7d77b]" />
      <div className="absolute bottom-2 left-12 h-56 w-56 rounded-full bg-[#d7effe]" />
      <div className="absolute right-8 top-14 h-40 w-40 rounded-full bg-[#ffd9cf]" />

      <div className="absolute left-8 top-12 grid h-16 w-16 place-items-center rounded-[20px] bg-white text-[#ef476f] shadow-[0_18px_40px_rgba(32,43,60,0.12)]">
        <Icon name="pdf" className="h-9 w-9" />
      </div>
      <div className="absolute right-10 top-2 grid h-16 w-16 place-items-center rounded-[20px] bg-white text-[#2493d1] shadow-[0_18px_40px_rgba(32,43,60,0.12)]">
        <Icon name="image" className="h-9 w-9" />
      </div>
      <div className="absolute bottom-18 right-0 grid h-16 w-16 place-items-center rounded-[20px] bg-white text-[#7655df] shadow-[0_18px_40px_rgba(32,43,60,0.12)]">
        <Icon name="ai" className="h-9 w-9" />
      </div>

      <div className="absolute bottom-8 left-1/2 h-[176px] w-[300px] -translate-x-1/2 rounded-[34px] bg-[#222f43] p-4 shadow-[0_30px_80px_rgba(32,43,60,0.24)]">
        <div className="h-full rounded-[24px] bg-[#f7fbff] p-4">
          <div className="mb-4 flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b58]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f8c14a]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3dcf8e]" />
          </div>
          <div className="grid gap-3">
            <span className="h-4 w-40 rounded-full bg-[#dfe7f1]" />
            <span className="h-4 w-56 rounded-full bg-[#edf2f7]" />
            <span className="h-4 w-48 rounded-full bg-[#edf2f7]" />
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff2f3] text-[#ef476f]">
              <Icon name="pdf" className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block h-3 w-24 rounded-full bg-[#cbd6e4]" />
              <span className="mt-2 block h-3 w-32 rounded-full bg-[#edf2f7]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TinyWowPreviewPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#263244]">
      <header className="sticky top-0 z-30 border-b border-[#eef2f7] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[74px] max-w-[1220px] items-center justify-between px-5">
          <a className="flex items-center gap-3" href="/tinywow-preview">
            <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#ff5b34] text-xl font-black text-white">T</span>
            <span className="text-[25px] font-black text-[#243044]">TOOLMOMO</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a className="rounded-full px-5 py-2 text-[15px] font-extrabold text-[#5d6d82] hover:bg-[#f4f7fb]" href="#tools" key={item}>
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button aria-label="Help" className="grid h-10 w-10 place-items-center rounded-full border border-[#e4ebf3] bg-white text-base font-black text-[#7c8ca0]">
              ?
            </button>
            <button className="hidden h-10 rounded-full border border-[#e4ebf3] bg-white px-4 text-sm font-black text-[#65758a] sm:block">
              English
            </button>
            <button className="h-10 rounded-full bg-[#233044] px-5 text-sm font-black text-white">Sign In</button>
          </div>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 px-5 pb-14 pt-12 lg:grid-cols-[0.88fr_1.12fr] lg:pb-20 lg:pt-16">
          <HeroIllustration />

          <div className="text-center lg:text-left">
            <p className="mb-4 inline-flex rounded-full bg-[#fff1ec] px-4 py-2 text-sm font-black text-[#ff5b34]">
              100% Free Online Tools
            </p>
            <h1 className="text-[44px] font-black leading-[1.03] text-[#202b3c] sm:text-[68px] lg:text-[82px]">
              Free Tools to Make
              <span className="block text-[#ff5b34]">Everything</span>
              Simple
            </h1>
            <p className="mx-auto mt-6 max-w-[650px] text-[18px] font-semibold leading-8 text-[#6f7f94] lg:mx-0">
              TinyWow-style PDF, image, video, AI writing and file utilities in one clean static homepage preview.
            </p>

            <div className="mx-auto mt-8 max-w-[680px] rounded-full bg-white p-2 shadow-[0_22px_70px_rgba(32,43,60,0.16)] ring-1 ring-[#e5ebf3] lg:mx-0">
              <div className="flex h-[60px] items-center gap-2 rounded-full bg-[#f7f9fc] px-2">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#93a0b1] shadow-sm">
                  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M10.8 18.1a7.3 7.3 0 1 1 5.2-2.1l4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
                  </svg>
                </span>
                <input className="h-full min-w-0 flex-1 border-0 bg-transparent px-2 text-base font-bold text-[#263244] outline-none placeholder:text-[#9ba8ba]" placeholder="Search for any tool" type="search" />
                <button aria-label="Search" className="grid h-11 w-11 place-items-center rounded-full bg-[#ff5b34] text-white">
                  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm font-black text-[#7f8fa4] lg:justify-start">
              {["PDF Creator", "Remove Background", "AI Writer", "Compress Image"].map((item) => (
                <a className="rounded-full border border-[#e8eef5] bg-white px-4 py-2 hover:border-[#ffcabd] hover:text-[#ff5b34]" href="#tools" key={item}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1220px] px-5 pb-10 pt-8">
        <div className="grid gap-5 md:grid-cols-5">
          {categories.map((category) => (
            <a className="group rounded-[28px] border border-[#e9eff6] bg-white p-5 shadow-[0_12px_28px_rgba(32,43,60,0.07)] transition hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(32,43,60,0.14)]" href="#tools" key={category.title}>
              <div className={`grid h-[74px] w-[74px] place-items-center rounded-[24px] ${toneClasses(category.tone)}`}>
                <Icon name={category.icon} className="h-12 w-12" />
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <h2 className="text-[21px] font-black text-[#263244]">{category.title}</h2>
                <span className="rounded-full bg-[#f5f7fa] px-3 py-1 text-[11px] font-black text-[#7f8fa4]">{category.count}</span>
              </div>
              <p className="mt-3 min-h-[72px] text-[14px] font-semibold leading-6 text-[#728197]">{category.subtitle}</p>
              <div className="mt-4 border-t border-[#eef2f7] pt-4 text-[13px] font-black text-[#8a99ac]">
                Featured:
                <span className="ml-1 text-[#263244]">{category.featured}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1060px] px-5 py-5">
        <div className="grid overflow-hidden rounded-[28px] bg-white shadow-[0_12px_28px_rgba(32,43,60,0.07)] sm:grid-cols-4">
          {[
            ["1m+", "Active Users"],
            ["10m+", "Files Converted"],
            ["200+", "Free Tools"],
            ["500k+", "PDFs Created"],
          ].map(([value, label], index) => (
            <div className={`px-5 py-7 text-center ${index !== 3 ? "sm:border-r sm:border-[#edf2f7]" : ""}`} key={label}>
              <div className="text-[34px] font-black text-[#263244]">{value}</div>
              <div className="mt-1 text-[13px] font-black text-[#8392a8]">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1220px] px-5 py-14" id="tools">
        <div className="text-center">
          <h2 className="text-[38px] font-black leading-tight text-[#263244] sm:text-[44px]">Our Most Popular Tools</h2>
          <p className="mt-3 text-[16px] font-semibold text-[#728197]">Free tools people use every day.</p>
        </div>

        <div className="mx-auto mt-8 flex max-w-[920px] flex-wrap justify-center gap-2 rounded-[28px] bg-white p-2 shadow-[0_12px_28px_rgba(32,43,60,0.07)]">
          {tabs.map((tab, index) => (
            <button className={`h-11 rounded-full px-5 text-sm font-black ${index === 0 ? "bg-[#ff5b34] text-white" : "text-[#728197] hover:bg-[#f4f7fb]"}`} key={tab}>
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {popularTools.map(([name, desc, category, icon]) => (
            <a className="group flex min-h-[120px] gap-4 rounded-[24px] border border-[#e9eff6] bg-white p-4 shadow-[0_8px_22px_rgba(32,43,60,0.05)] transition hover:-translate-y-0.5 hover:border-[#ffd1c5] hover:shadow-[0_20px_46px_rgba(32,43,60,0.12)]" href="#" key={name}>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-[#f5f7fa] text-[#75859a] group-hover:bg-[#fff1ec] group-hover:text-[#ff5b34]">
                <Icon name={icon as IconName} />
              </span>
              <span className="min-w-0 pt-1">
                <span className="block text-[17px] font-black text-[#263244]">{name}</span>
                <span className="mt-1 block text-xs font-black text-[#ff5b34]">{category}</span>
                <span className="mt-1 block text-[14px] font-semibold leading-6 text-[#728197]">{desc}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-[1220px] px-5">
          <div className="text-center">
            <h2 className="text-[38px] font-black leading-tight text-[#263244] sm:text-[44px]">Free Tools You Would Usually Pay For</h2>
            <p className="mt-3 text-[16px] font-semibold text-[#728197]">A TinyWow-style wall of quick launch cards.</p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map(([name, desc, icon], index) => (
              <a className="group overflow-hidden rounded-[28px] border border-[#e9eff6] bg-[#f7f9fc] shadow-[0_12px_28px_rgba(32,43,60,0.07)] transition hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(32,43,60,0.14)]" href="#" key={name}>
                <div className="grid h-[150px] place-items-center bg-white">
                  <span className={`grid h-[84px] w-[84px] place-items-center rounded-[28px] ${toneClasses(categories[index % categories.length].tone)}`}>
                    <Icon name={icon as IconName} className="h-12 w-12" />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-[18px] font-black text-[#263244]">{name}</h3>
                  <p className="mt-2 min-h-[52px] text-[14px] font-semibold leading-6 text-[#728197]">{desc}</p>
                  <span className="mt-4 inline-flex text-sm font-black text-[#ff5b34]">Learn more</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1220px] px-5 py-14">
        <div className="grid overflow-hidden rounded-[36px] bg-[#263244] shadow-[0_24px_70px_rgba(32,43,60,0.24)] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="p-8 text-white md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#ffb19f]">Upgrade</p>
            <h2 className="mt-3 text-[38px] font-black leading-tight">Support the tools you use every day</h2>
            <p className="mt-4 max-w-xl text-[16px] font-semibold leading-8 text-[#d9e2ef]">
              Keep the free tools running and unlock a faster, cleaner workspace when you need more.
            </p>
            <div className="mt-7 grid gap-3 text-sm font-black text-white sm:grid-cols-3">
              {["Ad-free workspace", "No captcha", "Priority processing"].map((item) => (
                <span className="rounded-full bg-white/10 px-4 py-3 text-center" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid min-h-[280px] place-items-center bg-[#f7f9fc] p-8">
            <div className="w-full max-w-[300px] rounded-[30px] bg-white p-6 shadow-[0_20px_60px_rgba(32,43,60,0.14)]">
              <div className="text-sm font-black text-[#ff5b34]">Tiny Plan</div>
              <div className="mt-2 text-[44px] font-black text-[#263244]">$5.99</div>
              <div className="text-sm font-bold text-[#728197]">per month</div>
              <button className="mt-5 h-12 w-full rounded-full bg-[#ff5b34] px-7 text-sm font-black text-white">Get Started</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto grid max-w-[1220px] gap-8 border-t border-[#e9eff6] px-5 py-10 md:grid-cols-[1.3fr_0.8fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#ff5b34] text-xl font-black text-white">T</span>
              <span className="text-[25px] font-black text-[#243044]">TOOLMOMO</span>
            </div>
            <p className="mt-4 max-w-md text-[14px] font-semibold leading-7 text-[#728197]">
              A static homepage preview inspired by TinyWow: quick categories, strong search, popular tools and compact conversion cards.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-black text-[#263244]">Navigate</h3>
            <div className="mt-4 grid gap-3 text-sm font-bold text-[#728197]">
              <a href="/">Home</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/contact">Contact</a>
              <a href="/about">About</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black text-[#263244]">Tools</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-bold text-[#728197]">
              <a href="#tools">PDF Creator</a>
              <a href="#tools">Compress Image</a>
              <a href="#tools">AI Writer</a>
              <a href="#tools">JSON Formatter</a>
              <a href="#tools">Word Counter</a>
              <a href="#tools">Video Tools</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
