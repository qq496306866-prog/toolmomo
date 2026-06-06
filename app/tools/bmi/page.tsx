import type { Metadata } from "next";
import { BmiTool } from "@/components/tools/BmiTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export const metadata: Metadata = {
  title: "BMI计算器 - Toolmomo 免费中文在线工具箱",
  description: "输入身高和体重，在线计算 BMI 指数、体重状态和参考体重范围。",
};

const relatedTools = [
  {
    name: "字数统计",
    href: "/tools/word-count",
    description: "统计字数、字符数、段落和阅读时长。",
  },
  {
    name: "时间戳转换",
    href: "/tools/timestamp",
    description: "Unix 时间戳与日期时间互转。",
  },
  {
    name: "文本去重",
    href: "/tools/text-deduplicate",
    description: "去除重复行，整理名单、关键词和素材文本。",
  },
];

export default function BmiPage() {
  return (
    <ToolPageShell
      category="生活工具"
      description="输入身高和体重，快速计算 BMI 指数，并查看常见体重状态参考。"
      sidebar={
        <>
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "BMI 适合成人日常健康参考。",
              "运动员、孕期、儿童等人群不宜只看 BMI。",
              "身体状态请结合腰围、体脂和专业建议判断。",
            ]}
            title="计算说明"
          />
        </>
      }
      title="BMI计算器"
    >
      <div className="space-y-5">
        <BmiTool />
        <InfoPanel
          items={[
            "结果仅供日常参考，不构成医学建议。",
            "如存在健康问题或体重快速变化，建议咨询医生。",
            "参考体重范围按 BMI 18.5-23.9 估算。",
          ]}
          title="使用说明"
        />
      </div>
    </ToolPageShell>
  );
}
