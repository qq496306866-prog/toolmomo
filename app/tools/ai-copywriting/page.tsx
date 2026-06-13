import type { Metadata } from "next";
import { AiCopywritingTool } from "@/components/tools/AiCopywritingTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "AI文案生成 - Toolmomo 免费中文在线工具箱",
  description: "根据产品主题、卖点、人群和场景生成文案草稿，适合商品卖点、社媒种草、广告短文案和产品介绍。",
};

const relatedTools = [
  {
    name: "商品标题优化",
    href: "/tools/product-title",
    description: "整理商品卖点，生成更清晰的标题结构。",
  },
  {
    name: "社交媒体标题生成器",
    href: "/tools/social-media-title-generator",
    description: "按场景生成更适合社交媒体内容的标题。",
  },
  {
    name: "字数统计",
    href: "/tools/word-count",
    description: "统计字数、字符数、段落和阅读时长。",
  },
];

export default function AiCopywritingPage() {
  return (
    <ToolPageShell
      category="AI工具"
      description="输入产品、卖点、人群和场景，生成多种中文文案草稿。当前为本地模板版，后续可升级接入 AI。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "当前为本地模板生成，不调用后端 AI。",
              "适合快速整理文案方向和结构。",
              "生成内容发布前建议人工检查和润色。",
            ]}
            title="生成说明"
          />
        </>
      }
      title="AI文案生成"
    >
      <div className="space-y-5">
        <AiCopywritingTool />
        <InfoPanel
          items={[
            "适合电商商品卖点、社媒种草、广告短句、活动促销和产品介绍。",
            "可以先生成文案，再用字数统计检查长度。",
            "后续接入真实 AI 后，可以保留当前输入结构作为提示词表单。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
