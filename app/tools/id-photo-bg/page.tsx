import type { Metadata } from "next";
import { IdPhotoBgTool } from "@/components/tools/IdPhotoBgTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "证件照换底色 - Toolmomo 免费中文在线工具箱",
  description: "在线更换证件照背景颜色，支持白底、蓝底、红底和自定义颜色，浏览器本地处理。",
};

const relatedTools = [
  {
    name: "图片压缩",
    href: "/tools/image-compress",
    description: "压缩 JPG、PNG 图片体积，适合网页和电商素材。",
  },
  {
    name: "图片尺寸调整",
    href: "/tools/image-resize",
    description: "修改图片宽高，适配平台常用规格。",
  },
  {
    name: "图片转WebP",
    href: "/tools/image-webp",
    description: "将常见图片格式转换为轻量 WebP。",
  },
];

export default function IdPhotoBgPage() {
  return (
    <ToolPageShell
      category="图片工具"
      description="上传纯色背景证件照，选择目标底色和容差，即可本地生成白底、蓝底、红底或自定义底色图片。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "适合纯色背景、人物边缘清晰的证件照。",
              "工具会以图片左上角颜色作为原背景参考。",
              "复杂背景或发丝边缘可能需要专业抠图工具。",
            ]}
            title="换底说明"
          />
        </>
      }
      title="证件照换底色"
    >
      <div className="space-y-5">
        <IdPhotoBgTool />
        <InfoPanel
          items={[
            "图片只在浏览器本地处理，不会提交到服务器。",
            "如果背景没有换干净，可以适当调高容差。",
            "如果人物边缘被误替换，可以适当调低容差。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
