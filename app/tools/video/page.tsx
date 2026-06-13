import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { EnglishShell } from "@/components/en/EnglishShell";
import { ToolCatalog } from "@/components/site/ToolCatalog";
import { videoCatalog } from "@/lib/catalogTools";
export default function VideoToolsPage() { return <EnglishShell title="Video & Audio Tools" description="Secure media format conversions powered by CloudConvert. Temporary files are deleted after one hour."><section className="mx-auto max-w-[1220px] px-5 pt-10"><AdSenseUnit slot={process.env.NEXT_PUBLIC_ADSENSE_CATEGORY_SLOT} /></section><section className="mx-auto max-w-[1220px] px-5 py-10"><ToolCatalog tools={videoCatalog} /></section></EnglishShell>; }
