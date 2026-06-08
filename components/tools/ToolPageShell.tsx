import { AdBanner } from "@/components/home/AdBanner";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { TopBar } from "@/components/home/TopBar";
import { ToolVisitTracker } from "@/components/tools/ToolVisitTracker";
import type { ReactNode } from "react";

type ToolPageShellProps = {
  title: string;
  description: string;
  category: string;
  children: ReactNode;
  sidebar?: ReactNode;
};

export function ToolPageShell({
  title,
  description,
  category,
  children,
  sidebar,
}: ToolPageShellProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${title} - Toolmomo`,
    description,
    applicationCategory: category,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CNY",
    },
    publisher: {
      "@type": "Organization",
      name: "Toolmomo",
      url: "https://toolmomo.com",
    },
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <ToolVisitTracker category={category} description={description} title={title} />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <TopBar />
      <Header />
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-primary-50 to-slate-50">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="flex flex-col gap-3">
            <div className="text-sm text-slate-500">
              <a className="hover:text-accent-600" href="/">
                首页
              </a>
              <span className="mx-2">/</span>
              <span>{category}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">{title}</h1>
            <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <div className="min-w-0">{children}</div>
        <aside className="space-y-5">{sidebar}</aside>
      </div>
      <AdBanner />
      <Footer />
    </main>
  );
}
