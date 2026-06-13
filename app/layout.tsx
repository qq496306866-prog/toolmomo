import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { siteCopy } from "@/data/tools";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://toolmomo.com"),
  title: {
    default: siteCopy.title,
    template: "%s | Toolmomo",
  },
  description:
    "TOOLMOMO 提供AI写作、AI提示词、图片处理、PDF处理、SEO、电商、社交媒体和开发者常用工具，帮助创作者、站长和小企业提升效率。",
  keywords: ["Toolmomo", "在线工具", "AI工具测评", "AI工具推荐", "图片工具", "PDF工具", "SEO工具", "开发工具"],
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
    title: siteCopy.title,
    description:
      "TOOLMOMO 提供AI写作、AI提示词、图片处理、PDF处理、SEO、电商、社交媒体和开发者常用工具，帮助创作者、站长和小企业提升效率。",
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
