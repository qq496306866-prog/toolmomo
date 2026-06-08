import type { Metadata } from "next";
import { FavoriteToolsList } from "@/components/tools/FavoriteToolsList";
import { StaticPageShell } from "@/components/site/StaticPageShell";
import { tools } from "@/data/tools";

export const metadata: Metadata = {
  title: "我的常用工具 - Toolmomo",
  description: "收藏 Toolmomo 常用工具并查看最近使用记录，快速访问免费中文在线工具箱。",
};

export default function FavoritePage() {
  return (
    <StaticPageShell
      description="收藏常用工具，并查看最近使用记录，下次可以更快回到工作流。"
      framed={false}
      title="我的常用工具"
    >
      <FavoriteToolsList tools={tools} />
    </StaticPageShell>
  );
}
