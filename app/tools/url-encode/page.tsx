import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { UrlEncodeTool } from "@/components/tools/UrlEncodeTool";

export const metadata: Metadata = {
  title: "URL编码解码 - Toolmomo 免费中文在线工具箱",
  description: "在线进行 URL 编码和解码，处理中文链接、查询参数、接口参数和特殊字符。",
};

const relatedTools = [
  {
    name: "JSON格式化",
    href: "/tools/json-format",
    description: "格式化、压缩并校验 JSON 数据。",
  },
  {
    name: "Base64编码解码",
    href: "/tools/base64",
    description: "文本与 Base64 内容互相转换。",
  },
  {
    name: "时间戳转换",
    href: "/tools/timestamp",
    description: "Unix 时间戳与日期时间互转。",
  },
];

export default function UrlEncodePage() {
  return (
    <ToolPageShell
      category="开发工具"
      description="输入 URL、查询参数或普通文本，一键完成 URL 编码和解码，方便接口调试和链接处理。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "编码会把中文、空格和特殊符号转换为安全字符。",
              "解码会把 %E4%B8%AD 这类内容还原为可读文本。",
              "适合处理搜索参数、分享链接和接口参数。",
            ]}
            title="功能说明"
          />
        </>
      }
      title="URL编码解码"
    >
      <div className="space-y-5">
        <UrlEncodeTool />
        <InfoPanel
          items={[
            "适合前后端联调、链接参数整理、中文 URL 处理和营销链接检查。",
            "输入内容只在浏览器本地处理，不会提交到服务器。",
            "如果解码失败，请检查百分号编码是否完整。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
