import type { Metadata } from "next";
import { AiKeywordsTool } from "@/components/tools/AiKeywordsTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "AI关键词扩展 - Toolmomo 免费中文在线工具箱",
  description: "根据核心词、人群、场景和卖点扩展长尾词、场景词、人群词和卖点词，适合 SEO、电商和内容选题。",
};

const relatedTools = [
  {
    name: "AI文案生成",
    href: "/tools/ai-copywriting",
    description: "快速生成营销文案、标题和短内容草稿。",
  },
  {
    name: "AI标题助手",
    href: "/tools/ai-title",
    description: "生成小红书、短视频和电商标题灵感。",
  },
  {
    name: "文本去重",
    href: "/tools/text-deduplicate",
    description: "去除重复行，整理名单、关键词和素材文本。",
  },
];

export default function AiKeywordsPage() {
  return (
    <ToolPageShell
      category="AI工具"
      description="输入核心词、人群、场景和卖点，快速扩展可用于标题、SEO、商品上架和内容选题的关键词。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "当前为本地模板扩展，不调用后端 AI。",
              "可用于标题、搜索词、标签和选题整理。",
              "复制后可配合文本去重继续清洗。",
            ]}
            title="扩展说明"
          />
        </>
      }
      title="AI关键词扩展"
    >
      <div className="space-y-5">
        <AiKeywordsTool />
        <InfoPanel
          items={[
            "适合电商标题、SEO 页面、短视频标签、小红书选题和广告关键词整理。",
            "建议输入明确核心词，再补充人群和场景词。",
            "后续接入真实 AI 后，可以扩展为语义聚类和搜索意图分析。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
