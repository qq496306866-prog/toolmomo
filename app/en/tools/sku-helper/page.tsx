import type { Metadata } from "next";
import { EnglishToolWorkspace } from "@/components/en/EnglishToolWorkspace";
import { InfoPanel } from "@/components/tools/InfoPanel";
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
    href: "/en/tools/uuid-generator",
    description: "Generate random unique identifiers in bulk.",
  },
];

export default function EnglishSkuHelperPage() {
  return (
    <EnglishToolWorkspace
      actionLabel="Generate SKU combinations"
      category="File Tools"
      description="Enter colors, sizes, packs, and variants to generate spreadsheet-friendly SKU codes and names."
      guidanceItems={[
        "North American sellers often keep SKU codes short, uppercase, and readable by warehouse staff.",
        "Common option groups include color, size, pack count, material, and model compatibility.",
        "Use a stable prefix for each product family so inventory exports remain easy to scan.",
      ]}
      guidanceTitle="SKU conventions"
      relatedTools={relatedTools}
      secondaryPanel={
        <InfoPanel
          items={[
            "Keep platform-facing variant names customer-friendly.",
            "Keep internal SKU codes consistent for fulfillment and reporting.",
            "Avoid changing SKU codes after orders or inventory records exist.",
          ]}
          title="Operations notes"
        />
      }
      title="SKU Naming Helper"
    >
      <SkuHelperTool locale="en" />
    </EnglishToolWorkspace>
  );
}
