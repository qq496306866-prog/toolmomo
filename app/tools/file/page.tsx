import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { EnglishShell } from "@/components/en/EnglishShell";
import { ToolCatalog } from "@/components/site/ToolCatalog";
import { fileCatalog } from "@/lib/catalogTools";
export default function FileToolsPage() { return <EnglishShell title="File Tools" description="Convert CSV, JSON, XML, Excel, and OpenDocument formats locally or through secure cloud jobs."><section className="mx-auto max-w-[1220px] px-5 pt-10"><AdSenseUnit slot={process.env.NEXT_PUBLIC_ADSENSE_CATEGORY_SLOT} /></section><section className="mx-auto max-w-[1220px] px-5 py-10"><ToolCatalog tools={fileCatalog} /></section></EnglishShell>; }
