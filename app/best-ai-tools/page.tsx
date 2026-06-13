import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";
import { aiToolRankings } from "@/data/content";

export const metadata: Metadata = {
  title: "AI工具排行榜 - TOOLMOMO",
  description: "按写作、图片、视频、SEO、电商、创作者和小企业场景整理 AI 工具排行榜。",
};

export default function BestAiToolsPage() {
  return (
    <StaticPageShell title="AI工具排行榜" description="按使用场景整理 AI 工具推荐清单，后续可扩展真实测评、价格、优惠和联盟推荐。" framed={false}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aiToolRankings.map((item) => (
          <a className="rounded-md border border-slate-200 bg-white p-5 shadow-sm hover:border-accent-200" href={item.href} key={item.href}>
            <h2 className="text-lg font-bold text-slate-950">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
          </a>
        ))}
      </div>
    </StaticPageShell>
  );
}
