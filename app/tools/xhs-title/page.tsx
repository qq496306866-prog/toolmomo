import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { XhsTitleTool } from "@/components/tools/XhsTitleTool";

export const metadata: Metadata = {
  title: "小红书标题生成 - Toolmomo 免费中文在线工具箱",
  description: "根据主题、人群、关键词和内容类型生成小红书标题候选，适合种草笔记、干货攻略和测评内容。",
};

const relatedTools = [
  {
    name: "字数统计",
    href: "/tools/word-count",
    description: "统计字数、字符数、段落和阅读时长。",
  },
  {
    name: "商品标题优化",
    href: "/tools/product-title",
    description: "整理商品卖点，生成更清晰的标题结构。",
  },
  {
    name: "短视频脚本模板",
    href: "/tools/video-script",
    description: "生成口播、探店、带货等脚本框架。",
  },
];

export default function XhsTitlePage() {
  return (
    <ToolPageShell
      category="短视频工具"
      description="输入主题、人群和关键词，快速生成小红书风格标题候选，适合笔记、攻略、测评和清单内容。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "当前为规则模板生成，不调用后端或 AI。",
              "标题适合做草稿，发布前建议结合正文微调。",
              "避免夸大宣传和平台违规词。",
            ]}
            title="生成说明"
          />
        </>
      }
      title="小红书标题生成"
    >
      <div className="space-y-5">
        <XhsTitleTool />
        <InfoPanel
          items={[
            "适合种草笔记、干货攻略、测评体验、清单合集和探店内容。",
            "可以把生成标题复制后继续用字数统计工具检查长度。",
            "后续接入 AI 后，可以扩展更多自然表达和爆款风格。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
