import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { SkuHelperTool } from "@/components/tools/SkuHelperTool";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "SKU命名助手 - Toolmomo 免费中文在线工具箱",
  description: "按颜色、尺码、规格自动生成电商 SKU 编码和名称，适合商品上架前整理规格组合。",
};

const relatedTools = [
  {
    name: "商品标题优化",
    href: "/tools/product-title",
    description: "整理商品卖点，生成更清晰的标题结构。",
  },
  {
    name: "电商图片尺寸工具",
    href: "/tools/ecommerce-image-size-tool",
    description: "查询并生成全球通用电商和社交媒体图片尺寸。",
  },
  {
    name: "文本去重",
    href: "/tools/text-deduplicate",
    description: "去除重复行，整理名单、关键词和素材文本。",
  },
];

export default function SkuHelperPage() {
  return (
    <ToolPageShell
      category="电商工具"
      description="输入颜色、尺码、容量、包装等规格，自动组合生成 SKU 编码和名称，方便粘贴到表格。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "每组规格可用逗号、顿号或换行分隔。",
              "生成结果保留规格组合顺序。",
              "复制内容适合直接粘贴进表格。",
            ]}
            title="命名规则"
          />
        </>
      }
      title="SKU命名助手"
    >
      <div className="space-y-5">
        <SkuHelperTool />
        <InfoPanel
          items={[
            "适合商品上架前整理颜色、尺码、容量、套餐等 SKU。",
            "SKU 编码规则可后续扩展为品牌编码、类目编码和库存编码。",
            "如果平台有固定命名规范，请以平台规则为准。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
