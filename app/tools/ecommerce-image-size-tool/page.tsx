import type { Metadata } from "next";
import { EcommerceImagePresetTool } from "@/components/tools/EcommerceImagePresetTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "电商图片尺寸工具 - TOOLMOMO免费在线工具",
  description: "查询 Amazon、Shopify、Etsy、eBay、Walmart、Instagram 和 Pinterest 常用产品图片尺寸，并可本地生成指定规格图片。",
};

const relatedTools = [
  { name: "图片压缩工具", href: "/tools/image-compressor", description: "压缩 JPG、PNG 图片体积。" },
  { name: "图片尺寸调整", href: "/tools/image-resizer", description: "修改图片宽高，适配常用展示规格。" },
  { name: "图片转WebP", href: "/tools/image-to-webp", description: "将常见图片格式转换为轻量 WebP。" },
];

export default function EcommerceImageSizeToolPage() {
  return (
    <ToolPageShell
      category="图片工具"
      description="查看全球通用电商与社交媒体产品图规格，上传图片后可按预设尺寸居中裁剪并下载。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel items={["常用电商商品图以高清方图为主。", "生成图片会按目标比例居中裁剪。", "图片只在浏览器本地处理，不会上传服务器。"]} title="图片规格说明" />
        </>
      }
      title="电商图片尺寸工具"
    >
      <div className="space-y-5">
        <EcommerceImagePresetTool />
        <InfoPanel items={["适合商品上架前快速生成产品图片规格。", "建议商品主体居中，四周留出安全边距。", "正式发布前请以平台后台要求为准。"]} title="使用说明" />
      </div>
    </ToolPageShell>
  );
}
