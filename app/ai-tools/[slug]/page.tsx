import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";
import { aiToolRankings, aiToolReviews } from "@/data/content";
import { tools } from "@/data/tools";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findReview(slug: string) {
  return aiToolReviews.find((item) => item.href === `/ai-tools/${slug}`);
}

export function generateStaticParams() {
  return aiToolReviews.map((item) => ({ slug: item.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = findReview(slug);

  if (!item) {
    return {
      title: "AI工具测评 - TOOLMOMO",
      description: "TOOLMOMO AI工具测评栏目页面。",
    };
  }

  return {
    title: `${item.title} - TOOLMOMO AI工具测评`,
    description: item.description,
  };
}

export default async function AiToolReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const item = findReview(slug);

  if (!item) {
    notFound();
  }

  const relatedTools = tools.slice(0, 4);
  const relatedRankings = aiToolRankings.slice(0, 3);

  return (
    <StaticPageShell title={item.title} description={item.description}>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-slate-950">适合谁使用</h2>
          <p className="mt-3">
            这篇测评面向内容创作者、站长、营销人员、电商运营、AI 创作者和小企业主。我们会从功能、价格、适用场景、学习成本和替代方案几个角度整理信息，方便后续扩展成更完整的英文版测评。
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">测评重点</h2>
          <ul className="mt-3 space-y-2">
            <li>核心功能是否能解决真实创作、运营或开发问题。</li>
            <li>免费额度、付费门槛和团队协作成本是否清晰。</li>
            <li>生成结果是否容易二次编辑，是否适合商业内容工作流。</li>
            <li>是否能和 TOOLMOMO 的免费工具组合使用。</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">推荐工具组合</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {relatedTools.map((tool) => (
              <a className="rounded-md bg-slate-50 p-4 hover:bg-accent-50" href={tool.href} key={tool.href}>
                <div className="font-semibold text-slate-950">{tool.name}</div>
                <p className="mt-1 text-sm leading-6 text-slate-500">{tool.description}</p>
              </a>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">相关排行榜</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {relatedRankings.map((ranking) => (
              <a className="rounded-md border border-slate-200 p-4 hover:border-accent-200" href={ranking.href} key={ranking.href}>
                {ranking.title}
              </a>
            ))}
          </div>
        </section>
      </div>
    </StaticPageShell>
  );
}
