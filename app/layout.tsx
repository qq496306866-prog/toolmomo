import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://toolmomo.com"),
  title: {
    default: "Toolmomo 免费中文在线工具箱",
    template: "%s | Toolmomo",
  },
  description:
    "提供图片处理、文本整理、电商运营、短视频创作、开发者常用工具，打开即用，无需安装。",
  keywords: ["Toolmomo", "在线工具", "中文工具箱", "图片工具", "文本工具", "开发工具", "电商工具"],
  verification: {
    google: "p00mldr9Ddv6rm-jWcObCeKimRwjujIfKQuSD7FP5ZA",
    other: {
      "baidu-site-verification": "codeva-KZTqTbegMd",
    },
  },
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
      <head>
        <Script
          async
          crossOrigin="anonymous"
          id="google-adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1935746779426009"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
