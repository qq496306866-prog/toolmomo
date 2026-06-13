import type { Metadata } from "next";
import { EnglishToolWorkspace } from "@/components/en/EnglishToolWorkspace";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { ProductTitleTool } from "@/components/tools/ProductTitleTool";

export const metadata: Metadata = {
  title: "Product Title Optimizer - Toolmomo English",
  description:
    "Generate product title drafts for Amazon, Shopify, Etsy, eBay, Walmart, and other ecommerce marketplaces.",
};

const relatedTools = [
  {
    name: "Marketplace Image Presets",
    href: "/en/tools/marketplace-image-sizes",
    description: "Crop product images for major ecommerce marketplaces.",
  },
  {
    name: "SKU Naming Helper",
    href: "/en/tools/sku-helper",
    description: "Generate SKU combinations from product options.",
  },
  {
    name: "Image Compressor",
    href: "/en/tools/image-compressor",
    description: "Compress listing images and storefront assets.",
  },
];

export default function EnglishProductTitlePage() {
  return (
    <EnglishToolWorkspace
      actionLabel="Generate title drafts"
      category="Write Tools"
      description="Create marketplace-aware title drafts using product type, brand, selling points, target shopper, and use case."
      guidanceItems={[
        "Amazon titles usually start with the primary keyword and include key attributes such as size, color, count, material, and use case.",
        "Shopify titles should stay concise and readable because they appear in collections, search results, and SEO snippets.",
        "Etsy titles can use descriptive long-tail phrases around gift intent, occasion, style, material, and personalization.",
      ]}
      guidanceTitle="North American marketplace habits"
      relatedTools={relatedTools}
      secondaryPanel={
        <InfoPanel
          items={[
            "Avoid unsupported claims, keyword stuffing, and competitor brand names.",
            "Check each marketplace policy before publishing.",
            "Use real search terms and product attributes for the final title.",
          ]}
          title="Listing safety"
        />
      }
      title="Product Title Optimizer"
    >
      <ProductTitleTool locale="en" />
    </EnglishToolWorkspace>
  );
}
