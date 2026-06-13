import { navItems } from "@/data/tools";
import { LogoMark } from "./LogoMark";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="/">
          <LogoMark />
        </a>
        <nav className="hidden items-center gap-1 overflow-x-auto text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <a
              className="rounded-md px-3 py-2 hover:bg-primary-50 hover:text-primary-700"
              href={item.href}
              key={`${item.label}-${item.href}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="rounded-md border border-accent-200 px-3 py-2 text-sm font-semibold text-accent-700 hover:bg-accent-50 md:hidden"
          href="/tools"
        >
          全部工具
        </a>
      </div>
      <nav className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-4 pb-3 text-sm font-medium text-slate-600 sm:px-6 md:hidden">
        {navItems.map((item) => (
          <a
            className="min-w-fit rounded-md bg-slate-100 px-3 py-2 hover:bg-accent-50 hover:text-accent-700"
            href={item.href}
            key={`${item.label}-${item.href}`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
