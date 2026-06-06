import type { Metadata } from "next";
import { HttpStatusTool } from "@/components/tools/HttpStatusTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "HTTP状态码查询 - Toolmomo 免费中文在线工具箱",
  description: "查询常见 HTTP 状态码含义，支持按状态码、分类和关键词筛选，适合接口调试和网站诊断。",
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
    name: "时间戳转换",
    href: "/tools/timestamp",
    description: "Unix 时间戳与日期时间互转。",
  },
];

export default function HttpStatusPage() {
  return (
    <ToolPageShell
      category="站长工具"
      description="快速查询 HTTP 状态码含义，帮助排查接口、页面跳转、缓存和服务器错误。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "2xx 通常表示请求成功。",
              "3xx 通常表示重定向或缓存。",
              "4xx 是客户端侧问题，5xx 是服务端侧问题。",
            ]}
            title="速查规则"
          />
        </>
      }
      title="HTTP状态码查询"
    >
      <div className="space-y-5">
        <HttpStatusTool />
        <InfoPanel
          items={[
            "适合接口联调、网站诊断、日志排查和 SEO 跳转检查。",
            "如果出现 500、502、503、504，优先检查服务器和反向代理日志。",
            "如果出现 404，优先检查路由、文件路径和部署目录。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
