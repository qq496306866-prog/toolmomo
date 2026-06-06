import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://toolmomo.com"),
  title: {
    default: "Toolmomo 免费中文在线工具箱",
    template: "%s | Toolmomo",
  },
  description:
    "提供图片处理、文本整理、电商运营、短视频创作、开发者常用工具，打开即用，无需安装。",
  keywords: ["Toolmomo", "在线工具", "中文工具箱", "图片工具", "文本工具", "开发工具", "电商工具"],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  applicationName: "Toolmomo",
  appleWebApp: {
    title: "Toolmomo",
    capable: true,
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Toolmomo 免费中文在线工具箱",
    description:
      "提供图片处理、文本整理、电商运营、短视频创作、开发者常用工具，打开即用，无需安装。",
    url: "https://toolmomo.com",
    siteName: "Toolmomo",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
