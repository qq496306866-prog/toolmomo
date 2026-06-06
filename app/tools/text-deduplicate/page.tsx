import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { TextDeduplicateTool } from "@/components/tools/TextDeduplicateTool";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "文本去重 - Toolmomo 免费中文在线工具箱",
  description: "在线去除重复行，整理关键词、标题、名单、素材文本和运营文案。",
};

const relatedTools = [
  {
    name: "字数统计",
    href: "/tools/word-count",
    description: "统计字数、字符数、段落和阅读时长。",
  },
  {
    name: "JSON格式化",
    href: "/tools/json-format",
    description: "格式化、压缩并校验 JSON 数据。",
  },
  {
    name: "Base64编码解码",
    href: "/tools/base64",
    description: "文本与 Base64 内容互相转换。",
  },
];

export default function TextDeduplicatePage() {
  return (
    <ToolPageShell
      category="文本工具"
      description="按行去除重复内容，适合整理关键词、名单、标题、链接和批量素材文本。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "每一行作为一个独立内容参与去重。",
              "默认会忽略每行首尾空格。",
              "会保留第一次出现的内容顺序。",
            ]}
            title="去重规则"
          />
        </>
      }
      title="文本去重"
    >
      <div className="space-y-5">
        <TextDeduplicateTool />
        <InfoPanel
          items={[
            "适合整理商品关键词、账号名单、链接列表、标题素材和批量运营文本。",
            "输入内容只在浏览器本地处理，不会提交到服务器。",
            "需要区分首尾空格时，可以关闭空格清理选项。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
