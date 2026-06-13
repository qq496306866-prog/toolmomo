import type { Metadata } from "next";
import { ColorConverterTool } from "@/components/tools/ColorConverterTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "颜色转换器 - TOOLMOMO免费在线工具",
  description: "在线转换 HEX、RGB、HSL 颜色值，适合前端开发、设计标注和品牌色整理。",
};

const relatedTools = [
  { name: "JSON格式化", href: "/tools/json-formatter", description: "格式化、压缩并校验 JSON 数据。" },
  { name: "Meta标签生成器", href: "/tools/meta-generator", description: "生成网页标题、描述和分享标签。" },
  { name: "图片尺寸调整", href: "/tools/image-resizer", description: "调整图片宽高和比例。" },
];

export default function ColorConverterPage() {
  return (
    <ToolPageShell
      category="开发工具"
      description="输入 HEX、RGB 或 HSL 颜色值，快速转换为其他格式并查看颜色预览。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel items={["适合前端样式调试。", "支持常用颜色格式互转。", "结果可用于 CSS、设计稿和品牌规范。"]} title="使用说明" />
        </>
      }
      title="颜色转换器"
    >
      <ColorConverterTool />
    </ToolPageShell>
  );
}
