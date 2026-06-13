import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://toolmomo.com"),
  title: { default: "Toolmomo - Free PDF and Image Tools", template: "%s | Toolmomo" },
  description: "Free browser-based PDF and image tools, plus secure document and media conversions.",
  keywords: ["Toolmomo", "PDF tools", "image tools", "merge PDF", "compress image", "file converter"],
  verification: { google: "p00mldr9Ddv6rm-jWcObCeKimRwjujIfKQuSD7FP5ZA", other: { "baidu-site-verification": "codeva-KZTqTbegMd" } },
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  applicationName: "Toolmomo",
  appleWebApp: { title: "Toolmomo", capable: true, statusBarStyle: "default" },
  openGraph: { title: "Toolmomo - Free PDF and Image Tools", description: "Private browser tools and secure online conversions.", url: "https://toolmomo.com", siteName: "Toolmomo", locale: "en_US", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><Script async crossOrigin="anonymous" id="google-adsense" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1935746779426009" strategy="afterInteractive" /></head><body>{children}</body>{gaId ? <GoogleAnalytics gaId={gaId} /> : null}</html>;
}
