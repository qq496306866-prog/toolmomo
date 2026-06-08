import type { Metadata } from "next";
import { EnglishShell } from "@/components/en/EnglishShell";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { ProductTitleTool } from "@/components/tools/ProductTitleTool";
import { RelatedTools } from "@/components/tools/RelatedTools";

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
    href: "/tools/image-compress",
    description: "Compress listing images and storefront assets.",
  },
];

export default function EnglishProductTitlePage() {
  return (
    <EnglishShell
      description="Create marketplace-aware title drafts using product type, brand, selling points, target shopper, and use case."
      title="Product Title Optimizer"
    >
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <div className="space-y-5">
          <ProductTitleTool locale="en" />
          <InfoPanel
            items={[
              "Amazon titles usually start with the primary keyword and include key attributes such as size, color, count, material, and use case.",
              "Shopify titles should stay concise and readable because they appear in collections, search results, and SEO snippets.",
              "Etsy titles can use descriptive long-tail phrases around gift intent, occasion, style, material, and personalization.",
            ]}
            title="North American marketplace habits"
          />
        </div>
        <aside className="space-y-5">
          <RelatedTools title="Related tools" tools={relatedTools} />
          <InfoPanel
            items={[
              "Avoid unsupported claims, keyword stuffing, and competitor brand names.",
              "Check each marketplace policy before publishing.",
              "Use real search terms and product attributes for the final title.",
            ]}
            title="Listing safety"
          />
        </aside>
      </section>
    </EnglishShell>
  );
}
