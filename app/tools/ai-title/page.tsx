import type { Metadata } from "next";
import { AiTitleTool } from "@/components/tools/AiTitleTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "AI标题助手 - Toolmomo 免费中文在线工具箱",
  description: "根据主题、人群、关键词和平台生成标题候选，适合文章、电商、社交媒体和短视频标题草稿。",
};

const relatedTools = [
  {
    name: "AI文案生成",
    href: "/tools/ai-copywriting",
    description: "快速生成营销文案、标题和短内容草稿。",
  },
  {
    name: "社交媒体标题生成器",
    href: "/tools/social-media-title-generator",
    description: "按场景生成更适合社交媒体内容的标题。",
  },
  {
    name: "商品标题优化",
    href: "/tools/product-title",
    description: "整理商品卖点，生成更清晰的标题结构。",
  },
];

export default function AiTitlePage() {
  return (
    <ToolPageShell
      category="AI工具"
      description="输入主题、人群和关键词，按不同平台和风格生成标题候选。当前为本地模板版，后续可升级接入 AI。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "当前为本地模板生成，不调用后端 AI。",
              "标题适合作为草稿和方向参考。",
              "发布前建议结合平台规则和真实内容调整。",
            ]}
            title="生成说明"
          />
        </>
      }
      title="AI标题助手"
    >
      <div className="space-y-5">
        <AiTitleTool />
        <InfoPanel
          items={[
            "适合文章标题、电商标题、社交媒体标题和短视频标题草稿。",
            "可以先生成标题，再用字数统计检查长度。",
            "如果需要更自然的表达，后续可以在此页面接入 AI 生成。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
