import type { Metadata } from "next";
import { RegexTesterTool } from "@/components/tools/RegexTesterTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "正则表达式测试器 - TOOLMOMO免费在线工具",
  description: "在线测试 JavaScript 正则表达式，查看匹配结果、索引、捕获分组和替换预览。",
};

const relatedTools = [
  { name: "JSON格式化", href: "/tools/json-formatter", description: "格式化、压缩并校验 JSON 数据。" },
  { name: "Base64编码解码", href: "/tools/base64", description: "文本与 Base64 内容互相转换。" },
  { name: "URL编码解码", href: "/tools/url-encode", description: "处理 URL 参数编码和解码。" },
];

export default function RegexTesterPage() {
  return (
    <ToolPageShell
      category="开发工具"
      description="输入正则表达式和测试文本，实时查看匹配、分组、索引和替换结果。"
      sidebar={<RelatedTools tools={relatedTools} />}
      title="正则表达式测试器"
    >
      <div className="space-y-5">
        <RegexTesterTool />
        <InfoPanel items={["使用 JavaScript RegExp 语法。", "适合文本清洗、接口调试和规则验证。"]} title="使用说明" />
      </div>
    </ToolPageShell>
  );
}
