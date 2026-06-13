import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { EnglishShell } from "@/components/en/EnglishShell";
import { ToolCatalog } from "@/components/site/ToolCatalog";
import { writeCatalog } from "@/lib/catalogTools";
export default function WriteToolsPage() { return <EnglishShell title="Write Tools" description="Use private browser text utilities or AI-assisted writing tools powered by the configured provider."><section className="mx-auto max-w-[1220px] px-5 pt-10"><AdSenseUnit slot={process.env.NEXT_PUBLIC_ADSENSE_CATEGORY_SLOT} /></section><section className="mx-auto max-w-[1220px] px-5 py-10"><ToolCatalog tools={writeCatalog} /></section></EnglishShell>; }
