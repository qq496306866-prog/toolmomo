import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { VideoTemplateTool } from "@/components/tools/VideoTemplateTool";

export const metadata: Metadata = {
  title: "短视频模板生成 - Toolmomo 免费中文在线工具箱",
  description:
    "输入标题、开场钩子和镜头内容，生成可预览的 Remotion 竖版短视频模板数据，适合产品介绍、知识口播和清单视频。",
};

const relatedTools = [
  {
    name: "短视频脚本模板",
    href: "/tools/video-script",
    description: "生成产品介绍、线下体验、知识分享等脚本框架。",
  },
  {
    name: "视频封面标题",
    href: "/tools/video-cover-title",
    description: "提炼封面短句，提升内容识别度。",
  },
  {
    name: "社交媒体标题生成器",
    href: "/tools/social-media-title-generator",
    description: "按场景生成适合种草内容的标题。",
  },
];

export default function VideoTemplatePage() {
  return (
    <ToolPageShell
      category="短视频工具"
      description="填写短视频标题、钩子和镜头内容，快速生成 Remotion 竖版模板并在线预览。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "当前模块只在浏览器中生成模板数据和预览画面。",
              "视频渲染建议放到服务端或本地 Remotion CLI 中执行。",
              "模板数据为普通 JSON，后续可以接入 AI 脚本生成结果。",
            ]}
            title="模板说明"
          />
        </>
      }
      title="短视频模板生成"
    >
      <div className="space-y-5">
        <VideoTemplateTool />
        <InfoPanel
          items={[
            "适合生成产品介绍、知识口播、清单盘点等竖版视频模板。",
            "右侧预览使用 @remotion/player，不会上传你的输入内容。",
            "复制 JSON 后，可以作为 Remotion Renderer 的 inputProps。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
