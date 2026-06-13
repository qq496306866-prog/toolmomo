import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://toolmomo.com"),
  title: { default: "Toolmomo - Free PDF Tools", template: "%s | Toolmomo" },
  description: "Free online PDF tools for editing, converting, merging, splitting, signing, compressing, and extracting PDF files.",
  keywords: ["Toolmomo", "PDF tools", "merge PDF", "compress PDF", "PDF converter", "edit PDF"],
  verification: { google: "p00mldr9Ddv6rm-jWcObCeKimRwjujIfKQuSD7FP5ZA", other: { "baidu-site-verification": "codeva-KZTqTbegMd" } },
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  applicationName: "Toolmomo",
  appleWebApp: { title: "Toolmomo", capable: true, statusBarStyle: "default" },
  openGraph: { title: "Toolmomo - Free PDF Tools", description: "Free online PDF editing and conversion tools.", url: "https://toolmomo.com", siteName: "Toolmomo", locale: "en_US", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><Script async crossOrigin="anonymous" id="google-adsense" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1935746779426009" strategy="afterInteractive" /></head><body>{children}</body>{gaId ? <GoogleAnalytics gaId={gaId} /> : null}</html>;
}
