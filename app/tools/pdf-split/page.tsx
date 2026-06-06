import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { PdfSplitTool } from "@/components/tools/PdfSplitTool";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "PDF拆分 - Toolmomo 免费中文在线工具箱",
  description: "在线按页码范围拆分 PDF 文件，支持 1-3,5 等格式，浏览器本地处理并下载拆分结果。",
};

const relatedTools = [
  { name: "PDF合并", href: "/tools/pdf-merge", description: "将多个 PDF 合并为一个文件。" },
  { name: "PDF删除页面", href: "/tools/pdf-delete-pages", description: "删除 PDF 中不需要的页面。" },
  { name: "PDF转图片", href: "/tools/pdf-to-image", description: "把 PDF 页面导出为 PNG 图片。" },
];

export default function PdfSplitPage() {
  return (
    <ToolPageShell
      category="PDF工具"
      description="选择 PDF 后输入页码范围，把指定页面拆成一个或多个 PDF 文件，适合资料归档、合同分发和页面提取。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "页码范围支持 1-3,5,8-10 这类格式。",
              "每一段页码范围会生成一个独立 PDF。",
              "文件只在浏览器本地处理，不会上传服务器。",
            ]}
            title="拆分说明"
          />
        </>
      }
      title="PDF拆分"
    >
      <div className="space-y-5">
        <PdfSplitTool />
        <InfoPanel
          items={[
            "适合把多页资料拆分成单独章节、附件或页面包。",
            "请先确认页码范围，避免遗漏关键页面。",
            "加密或损坏的 PDF 可能无法读取页数或拆分。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
