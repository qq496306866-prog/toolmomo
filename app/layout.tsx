import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { WebVitals } from "@/components/analytics/WebVitals";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL("https://toolmomo.com"),
  title: { default: "Toolmomo - 243 Free Online Tools", template: "%s | Toolmomo" },
  description: "Free PDF, image, writing, video, audio, and file tools with private browser processing and secure conversions.",
  keywords: ["Toolmomo", "PDF tools", "image tools", "merge PDF", "compress image", "file converter"],
  verification: { google: "p00mldr9Ddv6rm-jWcObCeKimRwjujIfKQuSD7FP5ZA", other: { "baidu-site-verification": "codeva-KZTqTbegMd" } },
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  applicationName: "Toolmomo",
  appleWebApp: { title: "Toolmomo", capable: true, statusBarStyle: "default" },
  openGraph: { title: "Toolmomo - Free PDF and Image Tools", description: "Private browser tools and secure online conversions.", url: "https://toolmomo.com", siteName: "Toolmomo", locale: "en_US", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head>
    <Script id="consent-defaults" strategy="beforeInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);`}</Script>
    {adsenseClient ? <Script async crossOrigin="anonymous" id="google-adsense" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`} strategy="afterInteractive" /> : null}
  </head><body>{children}<WebVitals /></body>{gaId ? <GoogleAnalytics gaId={gaId} /> : null}</html>;
}
