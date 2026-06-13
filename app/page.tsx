import { LogoMark } from "@/components/home/LogoMark";

const navItems = ["PDF", "Image", "Ecommerce", "AI Writing", "Developer", "Video"];

const popularTools = [
  { name: "PDF Merge", href: "/tools/pdf-merge", icon: "PDF", description: "Combine multiple PDF files into one clean document." },
  { name: "Image Compressor", href: "/tools/image-compress", icon: "IMG", description: "Reduce product and website image file sizes." },
  { name: "Product Title Optimizer", href: "/tools/product-title", icon: "SEO", description: "Draft marketplace-ready titles for online stores." },
  { name: "SKU Naming Helper", href: "/tools/sku-helper", icon: "SKU", description: "Generate SKU combinations for product variants." },
  { name: "JSON Formatter", href: "/tools/json-format", icon: "{}", description: "Format, validate, minify, and clean JSON data." },
  { name: "Password Generator", href: "/tools/password-generator", icon: "KEY", description: "Create secure passwords and random strings." },
];

const categories = [
  {
    name: "PDF Tools",
    count: "6 tools",
    description: "Merge, split, watermark, convert, and clean PDF files.",
    href: "/tools",
    icon: "PDF",
  },
  {
    name: "Image Tools",
    count: "5 tools",
    description: "Compress, resize, convert, and prepare listing images.",
    href: "/tools",
    icon: "IMG",
  },
  {
    name: "Ecommerce Tools",
    count: "3 tools",
    description: "Optimize titles, SKUs, and product image presets.",
    href: "/en/tools?category=Ecommerce%20Tools",
    icon: "SHOP",
  },
  {
    name: "Developer Tools",
    count: "8 tools",
    description: "Format data, encode URLs, generate IDs, and test regex.",
    href: "/en/tools?category=Developer%20Tools",
    icon: "DEV",
  },
  {
    name: "Text Tools",
    count: "3 tools",
    description: "Count words, deduplicate lines, and preview Markdown.",
    href: "/en/tools?category=Text%20Tools",
    icon: "TXT",
  },
  {
    name: "AI & Video",
    count: "7 tools",
    description: "Draft copy, titles, scripts, covers, and content structures.",
    href: "/en/tools?category=AI%20Tools",
    icon: "AI",
  },
];

const toolGroups = [
  {
    title: "Work With PDFs",
    tools: ["Merge PDF", "Split PDF", "Delete PDF Pages", "PDF to Image", "Image to PDF", "PDF Watermark"],
  },
  {
    title: "Edit Images",
    tools: ["Compress Image", "Resize Image", "Convert to WebP", "Marketplace Image Presets", "ID Photo Background"],
  },
  {
    title: "Run Your Store",
    tools: ["Product Title Optimizer", "SKU Naming Helper", "Amazon Image Presets", "Shopify Image Sizes", "Etsy Listing Images"],
  },
  {
    title: "Developer Utilities",
    tools: ["JSON Formatter", "Base64 Encoder", "URL Encoder", "Timestamp Converter", "UUID Generator", "Regex Tester"],
  },
];

const quickSearches = ["compress image", "merge pdf", "amazon title", "sku generator", "json formatter", "uuid"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8fb] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" aria-label="Toolmomo home">
            <LogoMark />
          </a>
          <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-600 lg:flex">
            {navItems.map((item) => (
              <a className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-primary-700" href="/tools" key={item}>
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a className="hidden rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 sm:inline-flex" href="/en">
              English
            </a>
            <a className="rounded-md bg-primary-700 px-4 py-2 text-sm font-bold text-white hover:bg-primary-900" href="/tools">
              All Tools
            </a>
          </div>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto max-w-[980px] px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto inline-flex rounded-md bg-accent-50 px-3 py-1 text-sm font-bold text-accent-700">
            Free browser-based tools for sellers, creators, and operators
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-normal text-primary-700 sm:text-5xl">
            What do you want to do today?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Find the right tool fast. Compress images, edit PDFs, prepare ecommerce listings, format data, generate IDs,
            and handle everyday online work in one place.
          </p>
          <form action="/search" className="mx-auto mt-8 flex max-w-3xl overflow-hidden rounded-md border border-slate-200 bg-white p-2 shadow-soft">
            <input
              aria-label="Search tools"
              className="min-w-0 flex-1 bg-transparent px-4 text-base outline-none placeholder:text-slate-400"
              name="q"
              placeholder="Search for a tool, e.g. PDF, image, SKU, JSON"
              type="search"
            />
            <button className="rounded-md bg-accent-500 px-5 py-3 text-sm font-bold text-white hover:bg-accent-600" type="submit">
              Search
            </button>
          </form>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {quickSearches.map((item) => (
              <a
                className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-700"
                href={`/search?q=${encodeURIComponent(item)}`}
                key={item}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-3 px-4 py-6 sm:grid-cols-4 sm:px-6 lg:grid-cols-6 lg:px-8">
          {categories.map((category) => (
            <a
              className="group rounded-md border border-slate-200 bg-white p-4 text-center shadow-sm hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-soft"
              href={category.href}
              key={category.name}
            >
              <span className="mx-auto grid h-11 w-11 place-items-center rounded-md bg-primary-50 text-xs font-black text-primary-700 group-hover:bg-accent-50 group-hover:text-accent-700">
                {category.icon}
              </span>
              <div className="mt-3 text-sm font-black text-slate-950">{category.name}</div>
              <div className="mt-1 text-xs font-semibold text-slate-400">{category.count}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-accent-700">Popular tools</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Start with the tools people use most</h2>
          </div>
          <a className="text-sm font-bold text-primary-700 hover:text-accent-700" href="/tools">
            View all tools
          </a>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool) => (
            <a
              className="group flex gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-sm hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-soft"
              href={tool.href}
              key={tool.name}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-slate-100 text-sm font-black text-primary-700 group-hover:bg-accent-50 group-hover:text-accent-700">
                {tool.icon}
              </span>
              <span>
                <span className="block text-base font-black text-slate-950 group-hover:text-accent-700">{tool.name}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-500">{tool.description}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
            <div>
              <p className="text-sm font-bold uppercase text-accent-700">Tool library</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">Browse by task</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                A TinyWow-style directory works best when every task has a short label and a direct entry. This static
                preview shows the direction for TOOLMOMO.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {toolGroups.map((group) => (
                <section className="rounded-md border border-slate-200 bg-slate-50 p-5" key={group.title}>
                  <h3 className="text-base font-black text-slate-950">{group.title}</h3>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    {group.tools.map((tool) => (
                      <a
                        className="flex items-center justify-between rounded-md bg-white px-3 py-3 text-sm font-semibold text-slate-700 hover:text-accent-700"
                        href="/tools"
                        key={tool}
                      >
                        <span>{tool}</span>
                        <span className="text-slate-300">Open</span>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 rounded-md border border-slate-200 bg-primary-700 p-6 text-white shadow-soft md:grid-cols-4">
          {[
            ["40+", "online tools"],
            ["9", "task categories"],
            ["0", "account required"],
            ["100%", "browser-first workflow"],
          ].map(([value, label]) => (
            <div className="rounded-md bg-white/10 p-4" key={label}>
              <div className="text-3xl font-black">{value}</div>
              <div className="mt-1 text-sm font-semibold text-primary-100">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <LogoMark />
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-accent-700" href="/about">
              About
            </a>
            <a className="hover:text-accent-700" href="/privacy">
              Privacy
            </a>
            <a className="hover:text-accent-700" href="/contact">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
