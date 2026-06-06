import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { MetaGeneratorTool } from "@/components/tools/MetaGeneratorTool";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "Meta标签生成 - Toolmomo 免费中文在线工具箱",
  description: "在线生成 SEO Meta、Open Graph 和 Twitter/X 分享标签，适合网站上线前整理页面头部信息。",
};

const relatedTools = [
  {
    name: "HTTP状态码查询",
    href: "/tools/http-status",
    description: "快速查看常见 HTTP 状态码含义。",
  },
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
];

export default function MetaGeneratorPage() {
  return (
    <ToolPageShell
      category="站长工具"
      description="输入标题、描述、页面 URL 和分享图，生成常用 SEO 与社交分享 Meta 标签代码。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "标题建议保持清晰且包含核心关键词。",
              "描述建议自然概括页面价值。",
              "分享图建议使用完整 HTTPS 地址。",
            ]}
            title="生成规则"
          />
        </>
      }
      title="Meta标签生成"
    >
      <div className="space-y-5">
        <MetaGeneratorTool />
        <InfoPanel
          items={[
            "适合网站首页、工具详情页、落地页和文章页上线前整理。",
            "生成代码可复制到页面 head 区域。",
            "Next.js 项目也可以把这些字段迁移到 metadata 配置中。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
