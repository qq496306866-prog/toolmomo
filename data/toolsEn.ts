export type EnglishToolCategory =
  | "AI Tools"
  | "Image Tools"
  | "PDF Tools"
  | "Text Tools"
  | "Ecommerce Tools"
  | "Video Tools"
  | "Developer Tools"
  | "Webmaster Tools"
  | "Life Tools";

export type EnglishToolItem = {
  name: string;
  description: string;
  category: EnglishToolCategory;
  href: string;
  icon: string;
  isPopular?: boolean;
  isLatest?: boolean;
};

export const englishCategoryTabs: EnglishToolCategory[] = [
  "AI Tools",
  "Image Tools",
  "PDF Tools",
  "Text Tools",
  "Ecommerce Tools",
  "Video Tools",
  "Developer Tools",
  "Webmaster Tools",
  "Life Tools",
];

export const englishTools: EnglishToolItem[] = [
  {
    name: "Product Title Optimizer",
    description: "Create listing title drafts for Amazon, Shopify, Etsy, eBay, Walmart, and Chinese marketplaces.",
    category: "Ecommerce Tools",
    href: "/en/tools/product-title",
    icon: "SEO",
    isPopular: true,
    isLatest: true,
  },
  {
    name: "Marketplace Image Presets",
    description: "Crop product images for Amazon, Shopify, Etsy, eBay, Walmart, Taobao, and more.",
    category: "Ecommerce Tools",
    href: "/en/tools/marketplace-image-sizes",
    icon: "IMG",
    isPopular: true,
    isLatest: true,
  },
  {
    name: "SKU Naming Helper",
    description: "Generate SKU combinations from colors, sizes, packs, and product options.",
    category: "Ecommerce Tools",
    href: "/en/tools/sku-helper",
    icon: "SKU",
    isPopular: true,
  },
  {
    name: "Image Compressor",
    description: "Compress JPG and PNG images for storefronts, product pages, and web assets.",
    category: "Image Tools",
    href: "/tools/image-compress",
    icon: "IMG",
    isPopular: true,
  },
  {
    name: "Image Resizer",
    description: "Resize images to fit platform requirements and product listing layouts.",
    category: "Image Tools",
    href: "/tools/image-resize",
    icon: "PX",
    isPopular: true,
  },
  {
    name: "JSON Formatter",
    description: "Format, minify, validate, and sort JSON data.",
    category: "Developer Tools",
    href: "/tools/json-format",
    icon: "{}",
    isPopular: true,
  },
  {
    name: "Regex Tester",
    description: "Test regular expressions, capture groups, match indexes, and replacement previews.",
    category: "Developer Tools",
    href: "/tools/regex-tester",
    icon: ".*",
    isLatest: true,
  },
  {
    name: "Color Converter",
    description: "Convert HEX, RGB, and HSL color values with a live preview.",
    category: "Developer Tools",
    href: "/tools/color-converter",
    icon: "RGB",
    isLatest: true,
  },
  {
    name: "Password Generator",
    description: "Generate secure passwords, PIN codes, and random strings locally in the browser.",
    category: "Developer Tools",
    href: "/tools/password-generator",
    icon: "KEY",
    isPopular: true,
  },
  {
    name: "UUID Generator",
    description: "Generate UUID v4 identifiers in bulk with copy and export support.",
    category: "Developer Tools",
    href: "/tools/uuid-generator",
    icon: "ID",
    isLatest: true,
  },
  {
    name: "Word Counter",
    description: "Count words, characters, paragraphs, and estimated reading time.",
    category: "Text Tools",
    href: "/tools/word-count",
    icon: "TXT",
    isPopular: true,
  },
  {
    name: "PDF Merge",
    description: "Merge multiple PDF files into one document in the browser.",
    category: "PDF Tools",
    href: "/tools/pdf-merge",
    icon: "PDF",
  },
];

export const englishPopularTools = englishTools.filter((tool) => tool.isPopular).slice(0, 8);
export const englishLatestTools = englishTools
  .filter((tool) => tool.isLatest)
  .slice(-6)
  .reverse();

export const englishToolsByCategory = englishCategoryTabs.reduce<Record<EnglishToolCategory, EnglishToolItem[]>>(
  (groups, category) => {
    groups[category] = englishTools.filter((tool) => tool.category === category);
    return groups;
  },
  {} as Record<EnglishToolCategory, EnglishToolItem[]>,
);
