import { LogoMark } from "./LogoMark";

const footerLinks = [
  { label: "关于我们", href: "/about" },
  { label: "联系我们", href: "/contact" },
  { label: "隐私政策", href: "/privacy" },
  { label: "免责声明", href: "/disclaimer" },
  { label: "联盟披露", href: "/affiliate-disclosure" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export function Footer() {
  return (
    <footer className="border-t border-primary-900 bg-primary-900">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-8 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <div>
            <LogoMark inverse />
          </div>
          <p className="mt-1 text-slate-400">免费在线工具箱与AI工具测评推荐平台。</p>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          {footerLinks.map((link) => (
            <a className="hover:text-accent-500" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
