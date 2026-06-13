import type { Metadata } from "next";
import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { EnglishShell } from "@/components/en/EnglishShell";
import { ToolCatalog } from "@/components/site/ToolCatalog";
import { allCatalog } from "@/lib/catalogTools";

export const metadata: Metadata = { title: "243 Free Online Tools", description: "Browse PDF, Image, Write, Video, Audio, and File tools.", alternates: { canonical: "/tools" } };

export default function ToolsPage() {
  return <EnglishShell title="All Tools" description="Search 243 production tools across PDF, Image, Write, Video, Audio, and File."><section className="mx-auto max-w-[1220px] px-5 pt-10"><AdSenseUnit slot={process.env.NEXT_PUBLIC_ADSENSE_CATEGORY_SLOT} /></section><section className="mx-auto max-w-[1220px] px-5 py-10"><ToolCatalog tools={allCatalog} /></section></EnglishShell>;
}
