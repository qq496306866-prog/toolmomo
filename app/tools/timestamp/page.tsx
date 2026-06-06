import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { TimestampTool } from "@/components/tools/TimestampTool";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "时间戳转换 - Toolmomo 免费中文在线工具箱",
  description: "在线进行 Unix 时间戳与日期时间互转，支持秒级和毫秒级时间戳。",
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
    name: "Base64编码解码",
    href: "/tools/base64",
    description: "文本与 Base64 内容互相转换。",
  },
];

export default function TimestampPage() {
  return (
    <ToolPageShell
      category="开发工具"
      description="支持秒级、毫秒级 Unix 时间戳与本地日期时间互相转换，适合接口调试和日志排查。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "10 位数字通常是秒级时间戳。",
              "13 位数字通常是毫秒级时间戳。",
              "日期输入按浏览器本地时区转换。",
            ]}
            title="转换规则"
          />
        </>
      }
      title="时间戳转换"
    >
      <div className="space-y-5">
        <TimestampTool />
        <InfoPanel
          items={[
            "适合接口联调、日志时间排查、数据库时间字段查看和运营数据核对。",
            "转换过程只在浏览器本地执行，不会提交到服务器。",
            "如果时间结果和预期不同，优先检查时区和秒/毫秒单位。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
