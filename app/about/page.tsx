import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";

export const metadata: Metadata = {
  title: "关于我们",
  description: "了解 Toolmomo 免费中文在线工具箱的定位、工具方向和服务理念。",
};

export default function AboutPage() {
  return (
    <StaticPageShell
      title="关于我们"
      description="Toolmomo 专注提供轻量、实用、打开即用的中文在线工具。"
    >
      <div className="space-y-4">
        <p>
          Toolmomo 是一个面向中文用户的在线工具箱，覆盖图片处理、文本整理、电商运营、短视频创作、开发调试和站长常用场景。
        </p>
        <p>我们优先把高频、小而刚需的功能做好，让用户无需安装软件，也能在浏览器中快速完成日常处理工作。</p>
        <p>当前网站仍在持续完善中，后续会逐步补充更多实用工具、工具说明、搜索入口和移动端体验优化。</p>
      </div>
    </StaticPageShell>
  );
}
