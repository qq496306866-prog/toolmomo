import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { TopBar } from "@/components/home/TopBar";

type StaticPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  framed?: boolean;
};

export function StaticPageShell({ title, description, children, framed = true }: StaticPageShellProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <TopBar />
      <Header />
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-primary-50 to-slate-50">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="text-sm text-slate-500">
            <a className="hover:text-accent-600" href="/">
              首页
            </a>
            <span className="mx-2">/</span>
            <span>{title}</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        {framed ? (
          <div className="rounded-md border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600 shadow-sm sm:p-7">
            {children}
          </div>
        ) : (
          children
        )}
      </section>
      <Footer />
    </main>
  );
}
