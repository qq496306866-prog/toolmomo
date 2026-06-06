import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { VideoCoverTitleTool } from "@/components/tools/VideoCoverTitleTool";

export const metadata: Metadata = {
  title: "视频封面标题 - Toolmomo 免费中文在线工具箱",
  description: "生成适合短视频封面的短标题，支持直接型、提问型、反差型、清单型和避坑型。",
};

const relatedTools = [
  {
    name: "短视频脚本模板",
    href: "/tools/video-script",
    description: "生成口播、探店、带货等脚本框架。",
  },
  {
    name: "小红书标题生成",
    href: "/tools/xhs-title",
    description: "按场景生成更适合种草内容的标题。",
  },
  {
    name: "字数统计",
    href: "/tools/word-count",
    description: "统计字数、字符数、段落和阅读时长。",
  },
];

export default function VideoCoverTitlePage() {
  return (
    <ToolPageShell
      category="短视频工具"
      description="输入主题、人群和卖点，生成适合放在短视频封面上的短标题，方便快速做封面文案。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "封面标题建议保持短句和强识别。",
              "主标题讲核心，副标题补充细节。",
              "发布前建议结合画面主体调整排版。",
            ]}
            title="封面说明"
          />
        </>
      }
      title="视频封面标题"
    >
      <div className="space-y-5">
        <VideoCoverTitleTool />
        <InfoPanel
          items={[
            "适合短视频封面、小红书封面、带货视频和知识卡片。",
            "建议把生成标题作为主标题，再搭配 1 行副标题。",
            "后续可以继续扩展封面图尺寸和文字排版预览。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
