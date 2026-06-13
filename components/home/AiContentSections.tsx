import { aiToolRankings, aiToolReviews, dealPages, tutorials } from "@/data/content";
import { SectionHeader } from "./SectionHeader";

function LinkGrid({
  items,
}: {
  items: Array<{
    title: string;
    description: string;
    href: string;
    category: string;
  }>;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <a
          className="rounded-md border border-slate-200 bg-white p-4 shadow-sm hover:border-accent-200 hover:shadow-soft"
          href={item.href}
          key={item.href}
        >
          <div className="text-xs font-semibold text-accent-700">{item.category}</div>
          <h3 className="mt-2 text-base font-bold text-slate-950">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
        </a>
      ))}
    </div>
  );
}

export function AiContentSections() {
  return (
    <>
      <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <SectionHeader
          eyebrow="AI Reviews"
          title="AI工具测评"
          description="优先整理主流 AI 工具的使用教程、测评和对比内容，为后续推荐与联盟推广预留内容位。"
        />
        <LinkGrid items={aiToolReviews.slice(0, 6)} />
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <SectionHeader
            eyebrow="Best AI Tools"
            title="AI工具排行榜与优惠"
            description="按写作、图片、视频、SEO、电商和小企业场景整理 AI 工具推荐，同时预留优惠入口。"
          />
          <LinkGrid items={[...aiToolRankings.slice(0, 4), ...dealPages.slice(0, 2)]} />
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <SectionHeader
          eyebrow="Tutorials"
          title="最新教程"
          description="围绕 AI 提示词、产品图、SEO 标题和 AI 视频生成整理可持续扩展的教程入口。"
        />
        <LinkGrid items={tutorials} />
      </section>
    </>
  );
}
