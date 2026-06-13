import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { EnglishShell } from "@/components/en/EnglishShell";
import { ToolCatalog } from "@/components/site/ToolCatalog";
import { imageCatalog } from "@/lib/catalogTools";
export default function ImageToolsPage() { return <EnglishShell title="Image Tools" description="Edit common images privately in your browser or convert advanced formats securely in the cloud."><section className="mx-auto max-w-[1220px] px-5 pt-10"><AdSenseUnit slot={process.env.NEXT_PUBLIC_ADSENSE_CATEGORY_SLOT} /></section><section className="mx-auto max-w-[1220px] px-5 py-10"><ToolCatalog tools={imageCatalog} /></section></EnglishShell>; }
