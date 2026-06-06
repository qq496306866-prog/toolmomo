import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { VideoScriptTool } from "@/components/tools/VideoScriptTool";

export const metadata: Metadata = {
  title: "短视频脚本模板 - Toolmomo 免费中文在线工具箱",
  description: "根据主题、人群、亮点和时长生成短视频分镜脚本，适合带货、探店、知识分享、测评和 Vlog。",
};

const relatedTools = [
  {
    name: "短视频模板生成",
    href: "/tools/video-template",
    description: "把脚本内容整理成可预览的 Remotion 视频模板。",
  },
  {
    name: "小红书标题生成",
    href: "/tools/xhs-title",
    description: "按场景生成更适合种草内容的标题。",
  },
  {
    name: "商品标题优化",
    href: "/tools/product-title",
    description: "整理商品卖点，生成更清晰的标题结构。",
  },
  {
    name: "字数统计",
    href: "/tools/word-count",
    description: "统计字数、字符数、段落和阅读时长。",
  },
];

export default function VideoScriptPage() {
  return (
    <ToolPageShell
      category="短视频工具"
      description="输入主题、人群、亮点和时长，快速生成短视频口播与画面分镜脚本。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "当前为规则模板生成，不调用后端或 AI。",
              "生成内容适合作为拍摄草稿。",
              "发布前建议结合真实素材和平台规则调整。",
            ]}
            title="脚本说明"
          />
        </>
      }
      title="短视频脚本模板"
    >
      <div className="space-y-5">
        <VideoScriptTool />
        <InfoPanel
          items={[
            "适合带货口播、探店、知识分享、测评和 Vlog 草稿。",
            "可先生成脚本，再用小红书标题工具生成封面标题。",
            "后续接入 AI 后，可以扩展更自然的口播表达。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
