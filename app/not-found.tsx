import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { TopBar } from "@/components/home/TopBar";

const quickLinks = [
  { label: "返回首页", href: "/" },
  { label: "全部工具", href: "/tools" },
  { label: "搜索工具", href: "/search" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50">
      <TopBar />
      <Header />
      <section className="mx-auto flex min-h-[56vh] max-w-[1200px] items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-sm font-semibold text-accent-600">404</div>
          <h1 className="mt-3 text-2xl font-bold text-slate-950 sm:text-3xl">页面没有找到</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            这个页面可能已经移动、暂未上线，或者地址输入有误。你可以回到首页，或者继续浏览 Toolmomo 已上线的在线工具。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {quickLinks.map((link, index) => (
              <a
                className={
                  index === 0
                    ? "rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
                    : "rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-accent-200 hover:text-accent-700"
                }
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
