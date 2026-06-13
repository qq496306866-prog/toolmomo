import type { Metadata } from "next";
import { ImageToPdfTool } from "@/components/tools/ImageToPdfTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "图片转PDF - TOOLMOMO免费在线工具",
  description: "在线把多张 JPG、PNG 图片合成为 PDF，支持排序、预览和下载。",
};

const relatedTools = [
  { name: "图片压缩工具", href: "/tools/image-compressor", description: "压缩 JPG、PNG 图片体积。" },
  { name: "图片尺寸调整", href: "/tools/image-resizer", description: "修改图片宽高并下载结果。" },
];

export default function ImageToPdfPage() {
  return (
    <ToolPageShell
      category="PDF工具"
      description="选择多张图片后合成为一个 PDF 文件，适合整理截图、证件图和资料图片。"
      sidebar={<RelatedTools tools={relatedTools} />}
      title="图片转PDF"
    >
      <div className="space-y-5">
        <ImageToPdfTool />
        <InfoPanel items={["图片会在浏览器本地处理。", "可以先压缩或调整图片尺寸后再合成 PDF。"]} title="使用说明" />
      </div>
    </ToolPageShell>
  );
}
