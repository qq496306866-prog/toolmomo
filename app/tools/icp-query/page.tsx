import type { Metadata } from "next";
import { IcpQueryTool } from "@/components/tools/IcpQueryTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "网站备案查询 - Toolmomo 免费中文在线工具箱",
  description: "规范化域名并提供 ICP 备案、公安联网备案和第三方备案查询入口，适合网站上线前检查。",
};

const relatedTools = [
  {
    name: "HTTP状态码查询",
    href: "/tools/http-status",
    description: "快速查看常见 HTTP 状态码含义。",
  },
  {
    name: "Meta标签生成",
    href: "/tools/meta-generator",
    description: "生成网页标题、描述和社交分享标签。",
  },
  {
    name: "URL编码解码",
    href: "/tools/url-encode",
    description: "处理 URL 参数编码和解码。",
  },
];

export default function IcpQueryPage() {
  return (
    <ToolPageShell
      category="站长工具"
      description="输入域名或网址，自动整理为主域名，并提供常用备案查询入口和上线前检查清单。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "官方 ICP 查询通常需要验证码。",
              "备案状态以工信部官方平台为准。",
              "中国大陆服务器通常需要备案后再正式解析上线。",
            ]}
            title="备案说明"
          />
        </>
      }
      title="网站备案查询"
    >
      <div className="space-y-5">
        <IcpQueryTool />
        <InfoPanel
          items={[
            "适合网站上线前检查域名备案状态和公安备案入口。",
            "本工具不会保存或提交你的查询内容。",
            "如果使用海外服务器，备案要求可能不同，请结合业务所在地判断。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
