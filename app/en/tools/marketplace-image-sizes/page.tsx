import type { Metadata } from "next";
import { EnglishShell } from "@/components/en/EnglishShell";
import { EcommerceImagePresetTool } from "@/components/tools/EcommerceImagePresetTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";

export const metadata: Metadata = {
  title: "Marketplace Image Presets - Toolmomo English",
  description:
    "Crop product photos for Amazon, Shopify, Etsy, eBay, Walmart, Taobao, Tmall, JD, Pinduoduo, and Douyin.",
};

const relatedTools = [
  {
    name: "Product Title Optimizer",
    href: "/en/tools/product-title",
    description: "Create marketplace-aware listing title drafts.",
  },
  {
    name: "Image Compressor",
    href: "/tools/image-compress",
    description: "Compress JPG and PNG listing images.",
  },
  {
    name: "Image Resizer",
    href: "/tools/image-resize",
    description: "Resize images to fit storefront requirements.",
  },
];

export default function EnglishMarketplaceImageSizesPage() {
  return (
    <EnglishShell
      description="Upload a product image, choose a marketplace preset, and generate a centered listing image in the browser."
      title="Marketplace Image Presets"
    >
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <div className="space-y-5">
          <EcommerceImagePresetTool />
          <InfoPanel
            items={[
              "Amazon, Walmart, eBay, and Shopify product images commonly work well as high-resolution square assets.",
              "Etsy listing images often benefit from a wider lifestyle or product-context crop.",
              "Keep the product centered and leave safe space around the edges for marketplace thumbnails.",
            ]}
            title="Image guidance"
          />
        </div>
        <aside className="space-y-5">
          <RelatedTools tools={relatedTools} />
          <InfoPanel
            items={[
              "Images are processed locally in your browser.",
              "Official marketplace rules may change; confirm final requirements in the seller dashboard.",
              "Use clean lighting, a readable product shape, and minimal clutter for marketplace thumbnails.",
            ]}
            title="Seller notes"
          />
        </aside>
      </section>
    </EnglishShell>
  );
}
