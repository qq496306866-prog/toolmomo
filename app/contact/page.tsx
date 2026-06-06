import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";

export const metadata: Metadata = {
  title: "联系我们",
  description: "联系 Toolmomo，反馈工具建议、网站问题或合作需求。",
};

export default function ContactPage() {
  return (
    <StaticPageShell title="联系我们" description="欢迎反馈工具建议、问题线索和合作需求。">
      <div className="space-y-4">
        <p>如果你在使用 Toolmomo 时遇到问题，或者希望新增某个工具，可以通过以下方式联系我们。</p>
        <div className="rounded-md bg-slate-50 p-4">
          <div className="font-semibold text-slate-950">联系邮箱</div>
          <a className="mt-1 inline-block text-accent-700 hover:text-accent-600" href="mailto:contact@toolmomo.com">
            contact@toolmomo.com
          </a>
        </div>
        <p>为了方便定位问题，反馈时建议附上工具名称、页面地址、浏览器环境和简单的问题描述。</p>
      </div>
    </StaticPageShell>
  );
}
