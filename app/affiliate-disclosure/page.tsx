import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";

export const metadata: Metadata = {
  title: "联盟披露 - TOOLMOMO",
  description: "TOOLMOMO 联盟链接和工具推荐披露说明。",
};

export default function AffiliateDisclosurePage() {
  return (
    <StaticPageShell title="联盟披露" description="关于 TOOLMOMO 工具推荐和联盟链接的透明说明。">
      <p>
        TOOLMOMO 的部分文章、测评和工具推荐可能包含联盟链接。当你通过这些链接注册或购买服务时，我们可能获得佣金，但这不会影响你的购买价格。我们会尽量基于功能、价格、适用场景和用户需求进行客观推荐。
      </p>
    </StaticPageShell>
  );
}
