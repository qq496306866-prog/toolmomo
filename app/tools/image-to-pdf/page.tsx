import type { Metadata } from "next";
import { ImageToPdfTool } from "@/components/tools/ImageToPdfTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "图片转PDF - Toolmomo 免费中文在线工具箱",
  description: "在线把多张 JPG、PNG 图片合成为 PDF，支持排序、预览和下载，浏览器本地处理。",
};

const relatedTools = [
  { name: "PDF转图片", href: "/tools/pdf-to-image", description: "把 PDF 页面导出为图片。" },
  { name: "图片压缩", href: "/tools/image-compress", description: "压缩 JPG、PNG 图片体积。" },
  { name: "图片尺寸调整", href: "/tools/image-resize", description: "修改图片宽高并下载结果。" },
];

export default function ImageToPdfPage() {
  return (
    <ToolPageShell
      category="PDF工具"
      description="选择多张图片后调整顺序，一键生成 PDF 文件，适合证件、截图、商品图和扫描图片整理。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "支持 JPG 和 PNG 图片。",
              "每张图片会生成 PDF 中的一页。",
              "图片只在浏览器本地处理，不会上传服务器。",
            ]}
            title="生成说明"
          />
        </>
      }
      title="图片转PDF"
    >
      <div className="space-y-5">
        <ImageToPdfTool />
        <InfoPanel
          items={[
            "适合把多张截图、收据、资料图片合成一个 PDF。",
            "图片顺序可通过上移、下移调整。",
            "图片尺寸越大，生成的 PDF 体积通常也越大。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
