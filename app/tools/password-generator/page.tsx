import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "随机密码生成器 - Toolmomo 免费中文在线工具箱",
  description: "在线生成安全随机密码、PIN 码和随机字符串，支持设置长度、大小写、数字和符号，浏览器本地完成生成。",
};

const relatedTools = [
  {
    name: "Base64编码解码",
    href: "/tools/base64",
    description: "文本与 Base64 互相转换。",
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

export default function PasswordGeneratorPage() {
  return (
    <ToolPageShell
      category="开发工具"
      description="按长度和字符类型生成随机密码，适合账号注册、测试数据、临时口令和随机字符串场景。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "生成过程使用浏览器加密随机数。",
              "密码不会上传到服务器，也不会写入页面日志。",
              "建议每个网站使用不同密码，并用密码管理器保存。",
            ]}
            title="安全提示"
          />
        </>
      }
      title="随机密码生成器"
    >
      <div className="space-y-5">
        <PasswordGeneratorTool />
        <InfoPanel
          items={[
            "长度越长、字符池越丰富，密码被猜中的难度通常越高。",
            "部分网站不支持特殊符号，可关闭符号选项后重新生成。",
            "临时 PIN 码可以把长度调低，并只保留数字选项。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
