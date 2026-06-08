import type { Metadata } from "next";
import { EnglishShell } from "@/components/en/EnglishShell";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { SkuHelperTool } from "@/components/tools/SkuHelperTool";

export const metadata: Metadata = {
  title: "SKU Naming Helper - Toolmomo English",
  description: "Generate SKU codes and option combinations for ecommerce product variants.",
};

const relatedTools = [
  {
    name: "Product Title Optimizer",
    href: "/en/tools/product-title",
    description: "Create marketplace-aware listing title drafts.",
  },
  {
    name: "Marketplace Image Presets",
    href: "/en/tools/marketplace-image-sizes",
    description: "Crop product images for major marketplaces.",
  },
  {
    name: "UUID Generator",
    href: "/tools/uuid-generator",
    description: "Generate random unique identifiers in bulk.",
  },
];

export default function EnglishSkuHelperPage() {
  return (
    <EnglishShell
      description="Enter colors, sizes, packs, and variants to generate spreadsheet-friendly SKU codes and names."
      title="SKU Naming Helper"
    >
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <div className="space-y-5">
          <SkuHelperTool locale="en" />
          <InfoPanel
            items={[
              "North American sellers often keep SKU codes short, uppercase, and readable by warehouse staff.",
              "Common option groups include color, size, pack count, material, and model compatibility.",
              "Use a stable prefix for each product family so inventory exports remain easy to scan.",
            ]}
            title="SKU conventions"
          />
        </div>
        <aside className="space-y-5">
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "Keep platform-facing variant names customer-friendly.",
              "Keep internal SKU codes consistent for fulfillment and reporting.",
              "Avoid changing SKU codes after orders or inventory records exist.",
            ]}
            title="Operations notes"
          />
        </aside>
      </section>
    </EnglishShell>
  );
}
