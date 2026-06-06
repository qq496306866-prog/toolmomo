import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { PdfToImageTool } from "@/components/tools/PdfToImageTool";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "PDF转图片 - Toolmomo 免费中文在线工具箱",
  description: "在线把 PDF 页面转换为 PNG 图片，支持清晰度设置、预览和逐页下载，浏览器本地处理。",
};

const relatedTools = [
  {
    name: "PDF合并",
    href: "/tools/pdf-merge",
    description: "将多个 PDF 合并为一个文件。",
  },
  {
    name: "图片尺寸调整",
    href: "/tools/image-resize",
    description: "修改图片宽高并下载结果。",
  },
  {
    name: "图片压缩",
    href: "/tools/image-compress",
    description: "压缩 JPG、PNG 图片体积。",
  },
];

export default function PdfToImagePage() {
  return (
    <ToolPageShell
      category="PDF工具"
      description="选择 PDF 文件后设置清晰度，把每一页导出为 PNG 图片，适合资料截图、页面预览和内容素材整理。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "PDF 只在浏览器本地渲染，不会上传服务器。",
              "清晰度越高，图片越清楚，占用内存也越多。",
              "加密或损坏的 PDF 可能无法转换。",
            ]}
            title="转换说明"
          />
        </>
      }
      title="PDF转图片"
    >
      <div className="space-y-5">
        <PdfToImageTool />
        <InfoPanel
          items={[
            "适合把 PDF 简历、海报、合同页面和课程资料转换为图片。",
            "多页 PDF 会逐页生成图片，可单独下载每一页。",
            "如果页面很多，建议先使用较低清晰度测试转换速度。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
