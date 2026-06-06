import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";

export const metadata: Metadata = {
  title: "登录 - Toolmomo",
  description: "Toolmomo 登录功能准备中，当前所有在线工具可直接免费使用。",
};

export default function LoginPage() {
  return (
    <StaticPageShell title="登录" description="账号体系正在准备中，当前所有工具都可以直接打开使用。">
      <p>Toolmomo 目前不强制登录。你可以先使用已上线的工具，后续登录功能会用于收藏、历史记录和个人设置。</p>
      <a className="mt-5 inline-flex rounded-md bg-accent-500 px-4 py-2 font-semibold text-white hover:bg-accent-600" href="/tools">
        查看全部工具
      </a>
    </StaticPageShell>
  );
}
