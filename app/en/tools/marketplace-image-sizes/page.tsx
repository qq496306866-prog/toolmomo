import type { Metadata } from "next";
import { EnglishToolWorkspace } from "@/components/en/EnglishToolWorkspace";
import { EcommerceImagePresetTool } from "@/components/tools/EcommerceImagePresetTool";
import { InfoPanel } from "@/components/tools/InfoPanel";

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
    href: "/en/tools/image-compressor",
    description: "Compress JPG and PNG listing images.",
  },
  {
    name: "Image Resizer",
    href: "/en/tools/image-resizer",
    description: "Resize images to fit storefront requirements.",
  },
];

export default function EnglishMarketplaceImageSizesPage() {
  return (
    <EnglishToolWorkspace
      actionLabel="Create marketplace image crops"
      category="Image Tools"
      description="Upload a product image, choose a marketplace preset, and generate a centered listing image in the browser."
      guidanceItems={[
        "Amazon, Walmart, eBay, and Shopify product images commonly work well as high-resolution square assets.",
        "Etsy listing images often benefit from a wider lifestyle or product-context crop.",
        "Keep the product centered and leave safe space around the edges for marketplace thumbnails.",
      ]}
      guidanceTitle="Image guidance"
      relatedTools={relatedTools}
      secondaryPanel={
        <InfoPanel
          items={[
            "Images are processed locally in your browser.",
            "Official marketplace rules may change; confirm final requirements in the seller dashboard.",
            "Use clean lighting, a readable product shape, and minimal clutter for marketplace thumbnails.",
          ]}
          title="Seller notes"
        />
      }
      title="Marketplace Image Presets"
    >
      <EcommerceImagePresetTool locale="en" />
    </EnglishToolWorkspace>
  );
}
