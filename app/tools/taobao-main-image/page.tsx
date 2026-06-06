import type { Metadata } from "next";
import { EcommerceImagePresetTool } from "@/components/tools/EcommerceImagePresetTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "淘宝主图尺寸 - Toolmomo 免费中文在线工具箱",
  description: "查询淘宝、天猫、京东、拼多多、抖店常用商品主图尺寸，并可本地生成指定规格图片。",
};

const relatedTools = [
  {
    name: "图片压缩",
    href: "/tools/image-compress",
    description: "压缩 JPG、PNG 图片体积，适合网页和电商素材。",
  },
  {
    name: "图片尺寸调整",
    href: "/tools/image-resize",
    description: "修改图片宽高，适配平台常用规格。",
  },
  {
    name: "图片转WebP",
    href: "/tools/image-webp",
    description: "将常见图片格式转换为轻量 WebP。",
  },
];

export default function TaobaoMainImagePage() {
  return (
    <ToolPageShell
      category="电商工具"
      description="查看常用电商平台商品图规格，上传图片后可按预设尺寸居中裁剪并下载主图。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "多数平台商品主图常用 800 x 800 方图。",
              "生成主图会按目标比例居中裁剪。",
              "图片只在浏览器本地处理，不会上传服务器。",
            ]}
            title="主图说明"
          />
        </>
      }
      title="淘宝主图尺寸"
    >
      <div className="space-y-5">
        <EcommerceImagePresetTool />
        <InfoPanel
          items={[
            "适合商品上架前快速检查和生成主图规格。",
            "建议商品主体居中，四周留出适当安全边距。",
            "不同平台规则可能调整，正式投放前请以平台后台要求为准。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
