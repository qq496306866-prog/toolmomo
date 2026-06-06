import type { Metadata } from "next";
import { ImageCompressTool } from "@/components/tools/ImageCompressTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "图片压缩 - Toolmomo 免费中文在线工具箱",
  description: "在线压缩 JPG、PNG、WebP 图片，支持质量和最大宽度设置，浏览器本地处理，无需上传服务器。",
};

const relatedTools = [
  {
    name: "图片尺寸调整",
    href: "/tools/image-resize",
    description: "批量修改图片宽高，适配平台常用规格。",
  },
  {
    name: "图片转WebP",
    href: "/tools/image-webp",
    description: "将常见图片格式转换为轻量 WebP。",
  },
  {
    name: "字数统计",
    href: "/tools/word-count",
    description: "统计字数、字符数、段落和阅读时长。",
  },
];

export default function ImageCompressPage() {
  return (
    <ToolPageShell
      category="图片工具"
      description="选择图片后设置质量和最大宽度，即可在浏览器本地压缩并下载结果，适合网页、电商和内容素材。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "图片只在浏览器本地处理，不会上传服务器。",
              "降低质量可以显著减少图片体积。",
              "限制最大宽度适合网页和电商素材。",
            ]}
            title="压缩说明"
          />
        </>
      }
      title="图片压缩"
    >
      <div className="space-y-5">
        <ImageCompressTool />
        <InfoPanel
          items={[
            "适合压缩商品图、文章配图、网页素材和社媒图片。",
            "当前输出为 JPG，透明 PNG 压缩后会变为非透明背景。",
            "大图处理速度取决于浏览器性能和图片尺寸。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
