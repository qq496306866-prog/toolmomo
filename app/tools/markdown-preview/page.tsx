import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { MarkdownPreviewTool } from "@/components/tools/MarkdownPreviewTool";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "Markdown预览 - Toolmomo 免费中文在线工具箱",
  description: "在线实时预览 Markdown 排版效果，支持标题、列表、引用、代码块、链接和基础行内格式。",
};

const relatedTools = [
  {
    name: "字数统计",
    href: "/tools/word-count",
    description: "统计字数、字符数、段落和阅读时长。",
  },
  {
    name: "文本去重",
    href: "/tools/text-deduplicate",
    description: "去除重复行，整理名单、关键词和素材文本。",
  },
  {
    name: "JSON格式化",
    href: "/tools/json-format",
    description: "格式化、压缩并校验 JSON 数据。",
  },
];

export default function MarkdownPreviewPage() {
  return (
    <ToolPageShell
      category="文本工具"
      description="输入 Markdown 内容即可实时查看排版效果，适合文章、说明文档和发布前检查。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "支持常用标题、列表、引用、链接和代码块。",
              "预览会转义原始 HTML，减少误粘贴脚本风险。",
              "复杂表格和扩展语法后续可继续增强。",
            ]}
            title="预览说明"
          />
        </>
      }
      title="Markdown预览"
    >
      <div className="space-y-5">
        <MarkdownPreviewTool />
        <InfoPanel
          items={[
            "适合公众号草稿、README、产品说明、技术文档和教程内容预览。",
            "输入内容只在浏览器本地处理，不会提交到服务器。",
            "如果要严格兼容 GitHub Markdown，后续可接入专业 Markdown 解析库。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
