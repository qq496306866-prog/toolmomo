import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { WordCountTool } from "@/components/tools/WordCountTool";

export const metadata: Metadata = {
  title: "字数统计 - Toolmomo 免费中文在线工具箱",
  description: "在线统计中文文本字数、字符数、段落数、行数和预计阅读时间，适合文案、自媒体、论文和运营内容整理。",
};

const relatedTools = [
  {
    name: "文本去重",
    href: "/tools/text-deduplicate",
    description: "去除重复行，整理名单、关键词和素材文本。",
  },
  {
    name: "Markdown预览",
    href: "/tools/markdown-preview",
    description: "实时查看 Markdown 排版效果。",
  },
  {
    name: "小红书标题生成",
    href: "/tools/xhs-title",
    description: "按场景生成更适合种草内容的标题。",
  },
];

export default function WordCountPage() {
  return (
    <ToolPageShell
      category="文本工具"
      description="粘贴中文、英文或混合内容，实时统计字数、字符数、段落、行数和预计阅读时间。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "中文按单个汉字计为一个字。",
              "英文和数字按连续词组计数。",
              "阅读时间按每分钟约 350 字估算。",
            ]}
            title="统计规则"
          />
        </>
      }
      title="字数统计"
    >
      <div className="space-y-5">
        <WordCountTool />
        <InfoPanel
          items={[
            "适合公众号、小红书、短视频脚本、商品文案和论文摘要等内容整理。",
            "输入内容只在浏览器本地统计，不会提交到服务器。",
            "复制长文本后直接粘贴即可实时查看结果。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
