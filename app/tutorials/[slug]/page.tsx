import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";
import { tutorials } from "@/data/content";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findTutorial(slug: string) {
  return tutorials.find((item) => item.href === `/tutorials/${slug}`);
}

export function generateStaticParams() {
  return tutorials.map((item) => ({ slug: item.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = findTutorial(slug);
  return {
    title: item ? `${item.title} - TOOLMOMO教程中心` : "教程中心 - TOOLMOMO",
    description: item?.description ?? "TOOLMOMO 教程中心页面。",
  };
}

export default async function TutorialPage({ params }: PageProps) {
  const { slug } = await params;
  const item = findTutorial(slug);

  if (!item) {
    notFound();
  }

  return (
    <StaticPageShell title={item.title} description={item.description}>
      <div className="space-y-6">
        <p>这篇教程页面先建立统一结构，后续可以扩展为完整图文教程、示例提示词、相关工具和常见问题。</p>
        <h2 className="text-xl font-bold text-slate-950">基础步骤</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>明确目标、输入素材和期望输出格式。</li>
          <li>使用 TOOLMOMO 的免费工具生成初稿或整理内容。</li>
          <li>结合 AI 工具进行扩写、改写、图片或视频生成。</li>
          <li>人工检查事实、版权、语气和平台规则后发布。</li>
        </ol>
      </div>
    </StaticPageShell>
  );
}
