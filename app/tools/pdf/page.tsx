import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { EnglishShell } from "@/components/en/EnglishShell";
import { ToolCatalog } from "@/components/site/ToolCatalog";
import { pdfCatalog } from "@/lib/catalogTools";
export default function PdfToolsPage() { return <EnglishShell title="PDF Tools" description="Edit common PDF tasks privately in your browser or use secure providers for complex conversions."><section className="mx-auto max-w-[1220px] px-5 pt-10"><AdSenseUnit slot={process.env.NEXT_PUBLIC_ADSENSE_CATEGORY_SLOT} /></section><section className="mx-auto max-w-[1220px] px-5 py-10"><ToolCatalog tools={pdfCatalog} /></section></EnglishShell>; }
