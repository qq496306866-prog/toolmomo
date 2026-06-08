import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RegexTesterTool } from "@/components/tools/RegexTesterTool";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "正则表达式测试器 - Toolmomo 免费中文在线工具箱",
  description: "在线测试 JavaScript 正则表达式，查看匹配结果、索引、捕获分组和替换预览。",
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
    name: "文本去重",
    href: "/tools/text-deduplicate",
    description: "去除重复行，整理名单、关键词和素材文本。",
  },
];

export default function RegexTesterPage() {
  return (
    <ToolPageShell
      category="开发工具"
      description="输入正则表达式和测试文本，快速查看匹配项、索引、分组和替换后的文本预览。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "使用 JavaScript RegExp 语法。",
              "支持 g、i、m 三种常用标志位。",
              "测试文本只在浏览器本地处理。",
            ]}
            title="规则说明"
          />
        </>
      }
      title="正则表达式测试器"
    >
      <div className="space-y-5">
        <RegexTesterTool />
        <InfoPanel
          items={[
            "适合提取邮箱、手机号、URL、订单号和日志字段。",
            "打开全局匹配后会列出所有命中项。",
            "替换预览可以提前确认批量替换结果是否符合预期。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
