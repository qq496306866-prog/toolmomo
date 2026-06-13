import type { Metadata } from "next";
import { PdfMergeTool } from "@/components/tools/PdfMergeTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "PDF合并 - TOOLMOMO免费在线工具",
  description: "在线合并多个 PDF 文件，支持排序、移除和下载合并结果。",
};

const relatedTools = [
  { name: "PDF拆分", href: "/tools/pdf-split", description: "按页码范围拆分 PDF。" },
  { name: "图片转PDF", href: "/tools/image-to-pdf", description: "将多张图片合成为 PDF。" },
  { name: "图片压缩工具", href: "/tools/image-compressor", description: "压缩图片体积。" },
];

export default function PdfMergePage() {
  return (
    <ToolPageShell
      category="PDF工具"
      description="选择多个 PDF 文件后合并为一个文档，浏览器本地处理，无需上传服务器。"
      sidebar={<RelatedTools tools={relatedTools} />}
      title="PDF合并"
    >
      <div className="space-y-5">
        <PdfMergeTool />
        <InfoPanel items={["适合整理合同、发票、资料和多份扫描件。", "合并前可以调整文件顺序。"]} title="使用说明" />
      </div>
    </ToolPageShell>
  );
}
