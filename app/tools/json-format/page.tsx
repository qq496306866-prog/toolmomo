import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { JsonFormatTool } from "@/components/tools/JsonFormatTool";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "JSON格式化 - Toolmomo 免费中文在线工具箱",
  description: "在线格式化、压缩和校验 JSON 数据，适合接口调试、配置文件整理和开发数据查看。",
};

const relatedTools = [
  {
    name: "Base64编码解码",
    href: "/tools/base64",
    description: "文本与 Base64 内容互相转换。",
  },
  {
    name: "URL编码解码",
    href: "/tools/url-encode",
    description: "处理 URL 参数编码和解码。",
  },
  {
    name: "时间戳转换",
    href: "/tools/timestamp",
    description: "Unix 时间戳与日期时间互转。",
  },
];

export default function JsonFormatPage() {
  return (
    <ToolPageShell
      category="开发工具"
      description="粘贴 JSON 内容，一键格式化、压缩和校验，方便查看接口返回、配置文件和调试数据。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "格式化会保留 JSON 数据结构并增加缩进。",
              "压缩会移除多余空格和换行，适合减少体积。",
              "错误提示可帮助定位引号、逗号或括号问题。",
            ]}
            title="功能说明"
          />
        </>
      }
      title="JSON格式化"
    >
      <div className="space-y-5">
        <JsonFormatTool />
        <InfoPanel
          items={[
            "适合接口调试、配置检查、日志数据查看和前后端联调。",
            "输入内容只在浏览器本地处理，不会提交到服务器。",
            "如果内容无法解析，请先检查属性名是否使用双引号。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
