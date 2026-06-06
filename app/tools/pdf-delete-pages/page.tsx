import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { PdfDeletePagesTool } from "@/components/tools/PdfDeletePagesTool";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "PDF删除页面 - Toolmomo 免费中文在线工具箱",
  description: "在线删除 PDF 指定页面，支持单页和连续页码范围，浏览器本地处理并下载新 PDF。",
};

const relatedTools = [
  { name: "PDF拆分", href: "/tools/pdf-split", description: "按页码范围拆分 PDF 文件。" },
  { name: "PDF合并", href: "/tools/pdf-merge", description: "将多个 PDF 合并为一个文件。" },
  { name: "PDF加水印", href: "/tools/pdf-watermark", description: "给 PDF 添加文字水印。" },
];

export default function PdfDeletePagesPage() {
  return (
    <ToolPageShell
      category="PDF工具"
      description="输入要删除的页码，快速移除 PDF 中不需要的页面，适合整理合同、扫描件和资料文档。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "删除页码支持 1,3-5,8 这类格式。",
              "不能删除全部页面，至少需要保留 1 页。",
              "处理过程在浏览器本地完成。",
            ]}
            title="删除说明"
          />
        </>
      }
      title="PDF删除页面"
    >
      <div className="space-y-5">
        <PdfDeletePagesTool />
        <InfoPanel
          items={[
            "适合删除空白页、重复页、封面页或错误扫描页。",
            "下载结果前请核对保留页数是否符合预期。",
            "加密或损坏的 PDF 可能无法处理。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
