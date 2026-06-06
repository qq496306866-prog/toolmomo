import type { Metadata } from "next";
import { ImageWebpTool } from "@/components/tools/ImageWebpTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "图片转WebP - Toolmomo 免费中文在线工具箱",
  description: "在线将 JPG、PNG 等图片转换为 WebP，支持质量设置、预览和下载，浏览器本地处理。",
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
    description: "批量修改图片宽高，适配平台常用规格。",
  },
  {
    name: "字数统计",
    href: "/tools/word-count",
    description: "统计字数、字符数、段落和阅读时长。",
  },
];

export default function ImageWebpPage() {
  return (
    <ToolPageShell
      category="图片工具"
      description="选择图片后设置输出质量，一键转换为轻量 WebP 格式，适合网页素材和内容配图优化。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "WebP 通常比 JPG/PNG 更小，适合网页使用。",
              "转换只在浏览器本地完成，不会上传服务器。",
              "透明 PNG 转 WebP 时通常可保留透明信息。",
            ]}
            title="转换说明"
          />
        </>
      }
      title="图片转WebP"
    >
      <div className="space-y-5">
        <ImageWebpTool />
        <InfoPanel
          items={[
            "适合网页图片优化、文章配图、电商素材和移动端页面加速。",
            "输出质量越低，文件越小，但画质损失也会更明显。",
            "部分非常老的浏览器可能不支持 WebP 预览。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
