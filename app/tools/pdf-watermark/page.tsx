import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { PdfWatermarkTool } from "@/components/tools/PdfWatermarkTool";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "PDF加水印 - Toolmomo 免费中文在线工具箱",
  description: "在线给 PDF 添加文字水印，支持字号和透明度设置，浏览器本地处理并下载结果。",
};

const relatedTools = [
  { name: "PDF合并", href: "/tools/pdf-merge", description: "将多个 PDF 合并为一个文件。" },
  { name: "PDF删除页面", href: "/tools/pdf-delete-pages", description: "删除 PDF 中不需要的页面。" },
  { name: "图片转PDF", href: "/tools/image-to-pdf", description: "把多张图片合成为 PDF。" },
];

export default function PdfWatermarkPage() {
  return (
    <ToolPageShell
      category="PDF工具"
      description="输入水印文字并设置字号、透明度，为 PDF 每一页添加斜向文字水印，适合资料标识和内部文档保护。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "目前支持英文、数字等基础文字水印。",
              "透明度越低，水印越浅，不影响阅读。",
              "文件只在浏览器本地处理，不会上传服务器。",
            ]}
            title="水印说明"
          />
        </>
      }
      title="PDF加水印"
    >
      <div className="space-y-5">
        <PdfWatermarkTool />
        <InfoPanel
          items={[
            "适合给报价单、资料包、内部文件添加来源标识。",
            "正式合同签章建议使用专业电子签章系统。",
            "加密或损坏的 PDF 可能无法添加水印。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
