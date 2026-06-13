import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";
import { dealPages } from "@/data/content";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findDeal(slug: string) {
  return dealPages.find((item) => item.href === `/deals/${slug}`);
}

export function generateStaticParams() {
  return dealPages.map((item) => ({ slug: item.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = findDeal(slug);
  return {
    title: item ? `${item.title} - TOOLMOMO` : "AI工具优惠 - TOOLMOMO",
    description: item?.description ?? "TOOLMOMO AI工具优惠页面。",
  };
}

export default async function DealPage({ params }: PageProps) {
  const { slug } = await params;
  const item = findDeal(slug);

  if (!item) {
    notFound();
  }

  return (
    <StaticPageShell title={item.title} description={item.description}>
      <div className="space-y-6">
        <p>
          当前页面为优惠入口占位页。后续添加真实联盟链接前，会补充工具名称、优惠内容、适用地区、价格说明、有效期、披露说明和替代工具推荐。
        </p>
        <div className="rounded-md bg-accent-50 p-5">
          <h2 className="text-lg font-bold text-slate-950">推荐位预留</h2>
          <p className="mt-2">这里可放置 3-6 个真实工具优惠卡片，包括官网链接、优惠码、适用场景和客观说明。</p>
        </div>
      </div>
    </StaticPageShell>
  );
}
