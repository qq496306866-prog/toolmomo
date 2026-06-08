import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { UuidGeneratorTool } from "@/components/tools/UuidGeneratorTool";

export const metadata: Metadata = {
  title: "UUID生成器 - Toolmomo 免费中文在线工具箱",
  description: "在线批量生成 UUID v4、GUID 和随机唯一标识，支持大写、去连字符、复制和导出 TXT。",
};

const relatedTools = [
  {
    name: "随机密码生成器",
    href: "/tools/password-generator",
    description: "生成安全密码、PIN 码和可复制的随机字符串。",
  },
  {
    name: "Base64编码解码",
    href: "/tools/base64",
    description: "文本与 Base64 互相转换。",
  },
  {
    name: "时间戳转换",
    href: "/tools/timestamp",
    description: "Unix 时间戳与日期时间互转。",
  },
];

export default function UuidGeneratorPage() {
  return (
    <ToolPageShell
      category="开发工具"
      description="批量生成 UUID v4，适合测试数据、数据库主键、接口调试和临时唯一标识。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "UUID v4 基于随机数生成，适合作为非连续唯一标识。",
              "默认标准格式包含连字符，也可以输出 32 位紧凑格式。",
              "所有生成操作都在浏览器本地完成。",
            ]}
            title="使用提示"
          />
        </>
      }
      title="UUID生成器"
    >
      <div className="space-y-5">
        <UuidGeneratorTool />
        <InfoPanel
          items={[
            "适合生成前端 mock 数据、后台测试记录 ID、临时 token 名称等。",
            "如果业务需要严格去重，应结合数据库唯一约束或服务端校验。",
            "导出 TXT 可以快速粘贴到表格、脚本或测试用例中。",
          ]}
          title="适用场景"
        />
      </div>
    </ToolPageShell>
  );
}
