import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { XhsTitleTool } from "@/components/tools/XhsTitleTool";

export const metadata: Metadata = {
  title: "社交媒体标题生成器 - TOOLMOMO免费在线工具",
  description: "根据主题、人群、关键词和内容类型生成社交媒体标题候选，适合帖子、短视频、教程、测评和清单内容。",
};

const relatedTools = [
  { name: "字数统计", href: "/tools/word-counter", description: "统计字数、字符数、段落和阅读时长。" },
  { name: "商品标题优化工具", href: "/tools/product-title", description: "整理商品卖点，生成更清晰的电商标题结构。" },
  { name: "短视频脚本生成器", href: "/tools/short-video-script-generator", description: "生成产品介绍、线下体验、知识分享和测评脚本框架。" },
];

export default function SocialMediaTitleGeneratorPage() {
  return (
    <ToolPageShell
      category="社交媒体工具"
      description="输入主题、人群和关键词，快速生成通用社交媒体标题候选，适合帖子、教程、测评、清单和短视频内容。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel items={["当前为本地规则模板生成，不调用后端或 AI。", "标题适合作为草稿，发布前建议结合正文内容、平台规则和品牌语气微调。", "避免夸大宣传、绝对化承诺和误导性表达。"]} title="生成说明" />
        </>
      }
      title="社交媒体标题生成器"
    >
      <div className="space-y-5">
        <XhsTitleTool />
        <InfoPanel items={["适合社交媒体帖子、干货教程、测评体验、清单合集和短视频标题。", "可以把生成标题复制后继续用字数统计工具检查长度。", "后续接入 AI 后，可以扩展更多自然表达和风格。"]} title="使用说明" />
      </div>
    </ToolPageShell>
  );
}
