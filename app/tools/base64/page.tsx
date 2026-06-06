import type { Metadata } from "next";
import { Base64Tool } from "@/components/tools/Base64Tool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "Base64编码解码 - Toolmomo 免费中文在线工具箱",
  description: "在线进行 Base64 编码和解码，支持中文文本，适合接口调试、配置处理和数据转换。",
};

const relatedTools = [
  {
    name: "JSON格式化",
    href: "/tools/json-format",
    description: "格式化、压缩并校验 JSON 数据。",
  },
  {
    name: "URL编码解码",
    href: "/tools/url-encode",
    description: "处理 URL 参数编码和解码。",
  },
  {
    name: "字数统计",
    href: "/tools/word-count",
    description: "统计字数、字符数、段落和阅读时长。",
  },
];

export default function Base64Page() {
  return (
    <ToolPageShell
      category="开发工具"
      description="输入普通文本可转换为 Base64，粘贴 Base64 内容也可以快速解码为原始文本。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "编码会把文本转换为 Base64 字符串。",
              "解码会尝试把 Base64 还原为原始文本。",
              "支持中文、英文、数字和常见符号。",
            ]}
            title="功能说明"
          />
        </>
      }
      title="Base64编码解码"
    >
      <div className="space-y-5">
        <Base64Tool />
        <InfoPanel
          items={[
            "适合接口调试、配置处理、简单数据传输和文本转换。",
            "输入内容只在浏览器本地处理，不会提交到服务器。",
            "如果解码失败，请确认内容没有多余空格或缺失字符。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
