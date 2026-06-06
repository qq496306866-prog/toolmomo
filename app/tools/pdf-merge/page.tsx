import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { PdfMergeTool } from "@/components/tools/PdfMergeTool";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "PDF合并 - Toolmomo 免费中文在线工具箱",
  description: "在线合并多个 PDF 文件，支持排序、移除和下载合并结果，浏览器本地处理，无需上传服务器。",
};

const relatedTools = [
  {
    name: "PDF转图片",
    href: "/tools/pdf-to-image",
    description: "把 PDF 页面导出为 PNG 图片。",
  },
  {
    name: "图片压缩",
    href: "/tools/image-compress",
    description: "压缩 JPG、PNG 图片体积。",
  },
  {
    name: "图片转WebP",
    href: "/tools/image-webp",
    description: "将常见图片格式转换为 WebP。",
  },
];

export default function PdfMergePage() {
  return (
    <ToolPageShell
      category="PDF工具"
      description="选择多个 PDF 文件后调整顺序，一键合并为一个 PDF，适合合同、资料、表格和扫描件整理。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "文件只在浏览器本地处理，不会上传到服务器。",
              "可通过上移、下移调整最终 PDF 页面顺序。",
              "加密或损坏的 PDF 可能无法合并。",
            ]}
            title="合并说明"
          />
        </>
      }
      title="PDF合并"
    >
      <div className="space-y-5">
        <PdfMergeTool />
        <InfoPanel
          items={[
            "适合把多份合同、报价单、说明书和扫描资料合并成一个文件。",
            "大文件合并速度取决于浏览器性能和电脑内存。",
            "合并完成后请及时下载结果，刷新页面后临时文件会被清空。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
