import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { isToolReady } from "@/data/readyTools";
import { tools } from "@/data/tools";

type ComingSoonPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function findTool(slug: string) {
  return tools.find((tool) => tool.href === `/tools/${slug}`);
}

export async function generateMetadata({ params }: ComingSoonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = findTool(slug);

  return {
    title: tool ? `${tool.name} - 即将上线 - Toolmomo` : "工具即将上线 - Toolmomo",
    description: tool?.description ?? "该工具正在规划中，Toolmomo 会持续补充更多免费中文在线工具。",
  };
}

export default async function ComingSoonPage({ params }: ComingSoonPageProps) {
  const { slug } = await params;
  const tool = findTool(slug);
  const title = tool?.name ?? "工具即将上线";
  const category = tool?.category ?? "全部工具";
  const description = tool?.description ?? "这个工具正在整理需求和页面结构，后续会逐步上线。";

  return (
    <ToolPageShell
      category={category}
      description={description}
      sidebar={
        <>
          <RelatedTools
            tools={[
              {
                name: "字数统计",
                href: "/tools/word-count",
                description: "统计字数、字符数、段落和阅读时长。",
              },
              {
                name: "JSON格式化",
                href: "/tools/json-format",
                description: "格式化、压缩并校验 JSON 数据。",
              },
              {
                name: "全部工具",
                href: "/tools",
                description: "查看 Toolmomo 已上线和规划中的所有工具。",
              },
            ]}
          />
          <InfoPanel
            items={["该页面已预留工具入口。", "已上线工具会显示为可用状态。", "更多工具会按分类逐步补齐。"]}
            title="上线状态"
          />
        </>
      }
      title={isToolReady(`/tools/${slug}`) ? title : `${title}（即将上线）`}
    >
      <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="rounded-md bg-accent-50 p-5">
          <div className="text-sm font-semibold text-accent-700">Coming Soon</div>
          <h2 className="mt-2 text-xl font-bold text-slate-950">这个工具正在准备中</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Toolmomo 已经为这个入口准备好页面占位，后续会补充真实功能、说明内容和相关工具推荐。
          </p>
          <a
            className="mt-5 inline-flex rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
            href="/tools"
          >
            返回全部工具
          </a>
        </div>
      </section>
    </ToolPageShell>
  );
}
