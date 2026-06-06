import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";

export const metadata: Metadata = {
  title: "免责声明",
  description: "Toolmomo 免责声明，说明工具结果、第三方链接和用户使用责任。",
};

export default function DisclaimerPage() {
  return (
    <StaticPageShell title="免责声明" description="请在理解工具边界的前提下使用 Toolmomo。">
      <div className="space-y-4">
        <p>
          Toolmomo 提供的在线工具主要用于日常效率辅助，工具结果仅供参考。涉及备案、法律、财务、医疗等重要事项时，请以官方平台或专业人士意见为准。
        </p>
        <p>
          网站中可能包含第三方网站入口或参考链接，这些网站的内容、可用性和服务规则由对应平台负责，Toolmomo 不对第三方服务结果作保证。
        </p>
        <p>用户应自行判断输入内容和处理结果的适用性，并对使用本网站工具产生的后续行为负责。</p>
      </div>
    </StaticPageShell>
  );
}
