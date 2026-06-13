import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { ProductTitleTool } from "@/components/tools/ProductTitleTool";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "商品标题优化 - Toolmomo 免费中文在线工具箱",
  description: "根据商品名称、卖点、人群和场景生成电商标题候选，适合跨境电商、品牌官网、折扣渠道和社交媒体。",
};

const relatedTools = [
  {
    name: "电商图片尺寸工具",
    href: "/tools/ecommerce-image-size-tool",
    description: "查询并生成全球通用电商和社交媒体图片尺寸。",
  },
  {
    name: "图片压缩",
    href: "/tools/image-compress",
    description: "压缩 JPG、PNG 图片体积，适合网页和电商素材。",
  },
  {
    name: "字数统计",
    href: "/tools/word-count",
    description: "统计字数、字符数、段落和阅读时长。",
  },
];

export default function ProductTitlePage() {
  return (
    <ToolPageShell
      category="电商工具"
      description="输入商品名称、卖点、人群和场景，生成多条标题候选，方便上架前快速整理标题结构。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "当前为规则模板生成，不调用后端或 AI。",
              "建议结合平台规则和真实搜索词二次调整。",
              "标题应避免夸大宣传和违规敏感词。",
            ]}
            title="优化说明"
          />
        </>
      }
      title="商品标题优化"
    >
      <div className="space-y-5">
        <ProductTitleTool />
        <InfoPanel
          items={[
            "适合商品上架前整理卖点、场景词和人群词。",
            "可用于跨境电商、品牌官网、折扣渠道和社交媒体基础标题草稿。",
            "后续接入 AI 后，可以在此基础上生成更自然的标题版本。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
