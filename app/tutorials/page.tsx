import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";
import { tutorials } from "@/data/content";

export const metadata: Metadata = {
  title: "教程中心 - TOOLMOMO",
  description: "TOOLMOMO 教程中心，提供 AI提示词、AI产品图、SEO标题和AI视频生成教程。",
};

export default function TutorialsPage() {
  return (
    <StaticPageShell title="教程中心" description="围绕 AI 创作、SEO、产品图和视频生成整理可持续扩展的教程内容。" framed={false}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tutorials.map((item) => (
          <a className="rounded-md border border-slate-200 bg-white p-5 shadow-sm hover:border-accent-200" href={item.href} key={item.href}>
            <h2 className="text-lg font-bold text-slate-950">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
          </a>
        ))}
      </div>
    </StaticPageShell>
  );
}
