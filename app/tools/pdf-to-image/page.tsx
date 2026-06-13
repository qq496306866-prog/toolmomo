import type { Metadata } from "next";
import { PdfToImageTool } from "@/components/tools/PdfToImageTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "PDF转图片 - TOOLMOMO免费在线工具",
  description: "在线把 PDF 页面转换为 PNG 图片，支持预览和逐页下载。",
};

const relatedTools = [
  { name: "图片尺寸调整", href: "/tools/image-resizer", description: "修改图片宽高并下载结果。" },
  { name: "图片压缩工具", href: "/tools/image-compressor", description: "压缩图片体积。" },
];

export default function PdfToImagePage() {
  return (
    <ToolPageShell
      category="PDF工具"
      description="把 PDF 页面导出为清晰图片，适合截图分享、资料拆分和页面预览。"
      sidebar={<RelatedTools tools={relatedTools} />}
      title="PDF转图片"
    >
      <div className="space-y-5">
        <PdfToImageTool />
        <InfoPanel items={["PDF 文件会在浏览器本地处理。", "大文件转换速度取决于设备性能。"]} title="使用说明" />
      </div>
    </ToolPageShell>
  );
}
