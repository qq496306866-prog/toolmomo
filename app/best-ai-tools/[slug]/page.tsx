import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";
import { aiToolRankings, dealPages } from "@/data/content";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findRanking(slug: string) {
  return aiToolRankings.find((item) => item.href === `/best-ai-tools/${slug}`);
}

export function generateStaticParams() {
  return aiToolRankings.map((item) => ({ slug: item.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = findRanking(slug);
  return {
    title: item ? `${item.title} - TOOLMOMO` : "AI工具排行榜 - TOOLMOMO",
    description: item?.description ?? "TOOLMOMO AI工具排行榜页面。",
  };
}

export default async function RankingPage({ params }: PageProps) {
  const { slug } = await params;
  const item = findRanking(slug);

  if (!item) {
    notFound();
  }

  return (
    <StaticPageShell title={item.title} description={item.description}>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-slate-950">推荐维度</h2>
          <p className="mt-3">
            这个榜单会优先关注功能完整度、免费额度、价格透明度、生成质量、中文与英文内容适配度、团队协作和商业使用场景。当前先建立栏目结构，后续可逐步补充真实工具评分和联盟链接。
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">适合的使用场景</h2>
          <ul className="mt-3 space-y-2">
            <li>内容创作者批量准备标题、脚本、图片和视频素材。</li>
            <li>站长围绕关键词、SEO 标题和文章结构提升内容效率。</li>
            <li>电商团队生成产品描述、商品图提示词和广告文案。</li>
            <li>小企业用低成本工具完成营销、设计和办公自动化。</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">相关优惠入口</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {dealPages.map((deal) => (
              <a className="rounded-md bg-slate-50 p-4 hover:bg-accent-50" href={deal.href} key={deal.href}>
                <div className="font-semibold text-slate-950">{deal.title}</div>
                <p className="mt-1 text-sm leading-6 text-slate-500">{deal.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </StaticPageShell>
  );
}
