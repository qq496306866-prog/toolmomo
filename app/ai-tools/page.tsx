import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";
import { aiToolReviews } from "@/data/content";

export const metadata: Metadata = {
  title: "AI工具测评 - TOOLMOMO",
  description: "浏览 TOOLMOMO AI工具测评栏目，包含AI写作、AI图片、AI视频、AI SEO和AI编程工具测评。",
};

export default function AiToolsPage() {
  return (
    <StaticPageShell
      title="AI工具测评"
      description="整理主流 AI 工具的教程、测评、优缺点和适用场景，帮助创作者、站长和小企业选择合适工具。"
      framed={false}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aiToolReviews.map((item) => (
          <a className="rounded-md border border-slate-200 bg-white p-5 shadow-sm hover:border-accent-200" href={item.href} key={item.href}>
            <div className="text-xs font-semibold text-accent-700">{item.category}</div>
            <h2 className="mt-2 text-lg font-bold text-slate-950">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
          </a>
        ))}
      </div>
    </StaticPageShell>
  );
}
