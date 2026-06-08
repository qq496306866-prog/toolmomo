import type { Metadata } from "next";
import { ColorConverterTool } from "@/components/tools/ColorConverterTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "颜色转换器 - Toolmomo 免费中文在线工具箱",
  description: "在线转换 HEX、RGB、HSL 颜色值，支持颜色预览和常用色板，适合前端开发、设计标注和品牌色整理。",
};

const relatedTools = [
  {
    name: "JSON格式化",
    href: "/tools/json-format",
    description: "格式化、压缩并校验 JSON 数据。",
  },
  {
    name: "Meta标签生成",
    href: "/tools/meta-generator",
    description: "生成网页标题、描述和社交分享标签。",
  },
  {
    name: "图片尺寸调整",
    href: "/tools/image-resize",
    description: "批量修改图片宽高，适配平台常用规格。",
  },
];

export default function ColorConverterPage() {
  return (
    <ToolPageShell
      category="开发工具"
      description="输入 HEX 或 RGB 颜色值，立即转换为 HEX、RGB、HSL，并查看颜色预览。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "支持 #2563eb、2563eb、#fff 和 rgb(37, 99, 235) 等常见格式。",
              "转换和复制都在浏览器本地完成。",
              "适合 CSS 调试、设计稿标注和品牌色整理。",
            ]}
            title="使用提示"
          />
        </>
      }
      title="颜色转换器"
    >
      <div className="space-y-5">
        <ColorConverterTool />
        <InfoPanel
          items={[
            "HEX 适合 CSS、设计标注和品牌色文档。",
            "RGB 更适合透明度组合，例如 rgba(37, 99, 235, 0.8)。",
            "HSL 更适合调整色相、饱和度和亮度。",
          ]}
          title="格式说明"
        />
      </div>
    </ToolPageShell>
  );
}
