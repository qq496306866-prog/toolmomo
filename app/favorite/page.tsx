import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";

export const metadata: Metadata = {
  title: "收藏本站 - Toolmomo",
  description: "收藏 Toolmomo，快速访问免费中文在线工具箱。",
};

export default function FavoritePage() {
  return (
    <StaticPageShell title="收藏本站" description="把 Toolmomo 加入浏览器收藏，下次可以更快打开常用工具。">
      <p>你可以使用浏览器自带的收藏功能保存本站。桌面浏览器通常可以按 Ctrl + D 添加收藏，手机浏览器可以通过菜单里的“添加书签”或“添加到主屏幕”保存。</p>
      <a className="mt-5 inline-flex rounded-md bg-accent-500 px-4 py-2 font-semibold text-white hover:bg-accent-600" href="/">
        返回首页
      </a>
    </StaticPageShell>
  );
}
