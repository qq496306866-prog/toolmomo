import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "Toolmomo 隐私政策，说明本地处理、数据收集和第三方服务相关事项。",
};

export default function PrivacyPage() {
  return (
    <StaticPageShell title="隐私政策" description="我们重视用户隐私，并尽量让工具处理过程清晰可控。">
      <div className="space-y-4">
        <p>
          Toolmomo 的多数工具设计为浏览器本地处理，例如文本统计、编码转换和部分图片处理，输入内容不会主动提交到服务器。
        </p>
        <p>
          网站后续可能接入访问统计、广告服务或基础安全服务，用于了解访问情况、改善体验和维持网站运营。相关第三方服务可能会依据其政策处理必要信息。
        </p>
        <p>请不要在在线工具中输入密码、身份证号、银行卡号、商业机密等敏感信息。使用网站即表示你理解并接受本政策。</p>
      </div>
    </StaticPageShell>
  );
}
