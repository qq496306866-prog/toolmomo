import type { Metadata } from "next";
import { ImageResizeTool } from "@/components/tools/ImageResizeTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "图片尺寸调整 - Toolmomo 免费中文在线工具箱",
  description: "在线调整图片宽高，支持保持比例、输出质量设置和本地下载，适合网页、电商和社媒素材。",
};

const relatedTools = [
  {
    name: "图片压缩",
    href: "/tools/image-compress",
    description: "压缩 JPG、PNG 图片体积，适合网页和电商素材。",
  },
  {
    name: "图片转WebP",
    href: "/tools/image-webp",
    description: "将常见图片格式转换为轻量 WebP。",
  },
  {
    name: "淘宝主图尺寸",
    href: "/tools/taobao-main-image",
    description: "查询并裁剪淘宝、天猫常用主图尺寸。",
  },
];

export default function ImageResizePage() {
  return (
    <ToolPageShell
      category="图片工具"
      description="选择图片后输入目标宽高，可保持原图比例并下载调整后的图片，浏览器本地处理无需上传。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "保持比例开启时，修改宽度会自动计算高度。",
              "输出为 JPG，适合网页和电商素材。",
              "大尺寸图片处理速度取决于浏览器性能。",
            ]}
            title="调整说明"
          />
        </>
      }
      title="图片尺寸调整"
    >
      <div className="space-y-5">
        <ImageResizeTool />
        <InfoPanel
          items={[
            "适合制作商品图、文章封面、网页素材和社媒配图。",
            "输入内容只在浏览器本地处理，不会提交到服务器。",
            "如果需要保留透明背景，后续可扩展 PNG/WebP 输出格式。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
