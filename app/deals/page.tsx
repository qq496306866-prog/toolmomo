import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";
import { dealPages } from "@/data/content";

export const metadata: Metadata = {
  title: "AI工具优惠 - TOOLMOMO",
  description: "TOOLMOMO AI工具优惠栏目，预留 AI、SEO、创作者和电商工具优惠入口。",
};

export default function DealsPage() {
  return (
    <StaticPageShell title="AI工具优惠" description="这里会用于后续放置真实优惠码、免费试用和联盟推荐链接。当前先提供占位内容与清晰分类。" framed={false}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dealPages.map((item) => (
          <a className="rounded-md border border-slate-200 bg-white p-5 shadow-sm hover:border-accent-200" href={item.href} key={item.href}>
            <h2 className="text-lg font-bold text-slate-950">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
          </a>
        ))}
      </div>
    </StaticPageShell>
  );
}
