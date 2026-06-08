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
  originalHref: string;
  icon: string;
  isPopular?: boolean;
  isLatest?: boolean;
};

export const englishCategoryTabs: EnglishToolCategory[] = [
  "Ecommerce Tools",
  "Developer Tools",
  "Image Tools",
  "PDF Tools",
  "Text Tools",
  "AI Tools",
  "Video Tools",
  "Webmaster Tools",
  "Life Tools",
];

export const englishTools: EnglishToolItem[] = [
  {
    name: "AI Copywriting Generator",
    description: "Create product copy, marketing blurbs, social captions, and short content drafts.",
    category: "AI Tools",
    href: "/en/tools/ai-copywriting",
    originalHref: "/tools/ai-copywriting",
    icon: "AI",
    isPopular: true,
  },
  {
    name: "AI Title Assistant",
    description: "Generate title ideas for social posts, ecommerce listings, and short videos.",
    category: "AI Tools",
    href: "/en/tools/ai-title",
    originalHref: "/tools/ai-title",
    icon: "TTL",
  },
  {
    name: "AI Keyword Expander",
    description: "Expand seed topics into search terms, selling-point keywords, and long-tail phrases.",
    category: "AI Tools",
    href: "/en/tools/ai-keywords",
    originalHref: "/tools/ai-keywords",
    icon: "KW",
  },
  {
    name: "Image Compressor",
    description: "Compress JPG and PNG images for storefronts, product pages, and web assets.",
    category: "Image Tools",
    href: "/en/tools/image-compress",
    originalHref: "/tools/image-compress",
    icon: "IMG",
    isPopular: true,
  },
  {
    name: "Image Resizer",
    description: "Resize images to fit platform requirements and product listing layouts.",
    category: "Image Tools",
    href: "/en/tools/image-resize",
    originalHref: "/tools/image-resize",
    icon: "PX",
    isPopular: true,
  },
  {
    name: "Image to WebP Converter",
    description: "Convert common image formats into lightweight WebP files.",
    category: "Image Tools",
    href: "/en/tools/image-webp",
    originalHref: "/tools/image-webp",
    icon: "WP",
  },
  {
    name: "ID Photo Background Changer",
    description: "Prepare ID photo background colors directly in the browser.",
    category: "Image Tools",
    href: "/en/tools/id-photo-bg",
    originalHref: "/tools/id-photo-bg",
    icon: "ID",
  },
  {
    name: "PDF Merge",
    description: "Merge multiple PDF files into one document in the browser.",
    category: "PDF Tools",
    href: "/en/tools/pdf-merge",
    originalHref: "/tools/pdf-merge",
    icon: "PDF",
  },
  {
    name: "PDF to Image",
    description: "Export PDF pages as clear image files.",
    category: "PDF Tools",
    href: "/en/tools/pdf-to-image",
    originalHref: "/tools/pdf-to-image",
    icon: "IMG",
  },
  {
    name: "PDF Split",
    description: "Split a PDF into multiple files by page ranges.",
    category: "PDF Tools",
    href: "/en/tools/pdf-split",
    originalHref: "/tools/pdf-split",
    icon: "CUT",
  },
  {
    name: "PDF Delete Pages",
    description: "Remove unwanted pages from a PDF and download the new file.",
    category: "PDF Tools",
    href: "/en/tools/pdf-delete-pages",
    originalHref: "/tools/pdf-delete-pages",
    icon: "DEL",
  },
  {
    name: "Image to PDF",
    description: "Combine JPG and PNG images into a PDF document.",
    category: "PDF Tools",
    href: "/en/tools/image-to-pdf",
    originalHref: "/tools/image-to-pdf",
    icon: "PDF",
    isPopular: true,
  },
  {
    name: "PDF Watermark",
    description: "Add text watermarks to PDF pages.",
    category: "PDF Tools",
    href: "/en/tools/pdf-watermark",
    originalHref: "/tools/pdf-watermark",
    icon: "WM",
  },
  {
    name: "Word Counter",
    description: "Count words, characters, paragraphs, lines, and estimated reading time.",
    category: "Text Tools",
    href: "/en/tools/word-count",
    originalHref: "/tools/word-count",
    icon: "TXT",
    isPopular: true,
  },
  {
    name: "Text Deduplicate",
    description: "Remove duplicated lines from names, keywords, lists, and content drafts.",
    category: "Text Tools",
    href: "/en/tools/text-deduplicate",
    originalHref: "/tools/text-deduplicate",
    icon: "DED",
  },
  {
    name: "Markdown Preview",
    description: "Preview Markdown formatting in real time.",
    category: "Text Tools",
    href: "/en/tools/markdown-preview",
    originalHref: "/tools/markdown-preview",
    icon: "MD",
  },
  {
    name: "Marketplace Image Presets",
    description: "Crop product images for Amazon, Shopify, Etsy, eBay, Walmart, Taobao, and more.",
    category: "Ecommerce Tools",
    href: "/en/tools/marketplace-image-sizes",
    originalHref: "/tools/taobao-main-image",
    icon: "IMG",
    isPopular: true,
    isLatest: true,
  },
  {
    name: "Product Title Optimizer",
    description: "Create listing title drafts for Amazon, Shopify, Etsy, eBay, Walmart, and Chinese marketplaces.",
    category: "Ecommerce Tools",
    href: "/en/tools/product-title",
    originalHref: "/tools/product-title",
    icon: "SEO",
    isPopular: true,
    isLatest: true,
  },
  {
    name: "SKU Naming Helper",
    description: "Generate SKU combinations from colors, sizes, packs, and product options.",
    category: "Ecommerce Tools",
    href: "/en/tools/sku-helper",
    originalHref: "/tools/sku-helper",
    icon: "SKU",
    isPopular: true,
  },
  {
    name: "Xiaohongshu Title Generator",
    description: "Create title ideas for lifestyle and social commerce content.",
    category: "Video Tools",
    href: "/en/tools/xhs-title",
    originalHref: "/tools/xhs-title",
    icon: "XHS",
  },
  {
    name: "Short Video Script Template",
    description: "Create short-form video script structures for talking-head, product, and sales content.",
    category: "Video Tools",
    href: "/en/tools/video-script",
    originalHref: "/tools/video-script",
    icon: "VID",
    isPopular: true,
  },
  {
    name: "Short Video Template Generator",
    description: "Generate previewable Remotion vertical video template data.",
    category: "Video Tools",
    href: "/en/tools/video-template",
    originalHref: "/tools/video-template",
    icon: "TPL",
  },
  {
    name: "Video Cover Title",
    description: "Create concise cover title phrases for short-form videos.",
    category: "Video Tools",
    href: "/en/tools/video-cover-title",
    originalHref: "/tools/video-cover-title",
    icon: "CVR",
  },
  {
    name: "JSON Formatter",
    description: "Format, minify, validate, and sort JSON data.",
    category: "Developer Tools",
    href: "/en/tools/json-format",
    originalHref: "/tools/json-format",
    icon: "{}",
    isPopular: true,
  },
  {
    name: "Base64 Encoder / Decoder",
    description: "Encode and decode Base64 text.",
    category: "Developer Tools",
    href: "/en/tools/base64",
    originalHref: "/tools/base64",
    icon: "64",
    isPopular: true,
  },
  {
    name: "URL Encoder / Decoder",
    description: "Encode, decode, and inspect URL parameters.",
    category: "Developer Tools",
    href: "/en/tools/url-encode",
    originalHref: "/tools/url-encode",
    icon: "URL",
  },
  {
    name: "Timestamp Converter",
    description: "Convert Unix timestamps and local date-time values.",
    category: "Developer Tools",
    href: "/en/tools/timestamp",
    originalHref: "/tools/timestamp",
    icon: "TIME",
  },
  {
    name: "Color Converter",
    description: "Convert HEX, RGB, and HSL color values with a live preview.",
    category: "Developer Tools",
    href: "/en/tools/color-converter",
    originalHref: "/tools/color-converter",
    icon: "RGB",
    isLatest: true,
  },
  {
    name: "Password Generator",
    description: "Generate secure passwords, PIN codes, and random strings locally in the browser.",
    category: "Developer Tools",
    href: "/en/tools/password-generator",
    originalHref: "/tools/password-generator",
    icon: "KEY",
    isPopular: true,
  },
  {
    name: "UUID Generator",
    description: "Generate UUID v4 identifiers in bulk with copy and export support.",
    category: "Developer Tools",
    href: "/en/tools/uuid-generator",
    originalHref: "/tools/uuid-generator",
    icon: "ID",
    isLatest: true,
  },
  {
    name: "Regex Tester",
    description: "Test regular expressions, capture groups, match indexes, and replacement previews.",
    category: "Developer Tools",
    href: "/en/tools/regex-tester",
    originalHref: "/tools/regex-tester",
    icon: ".*",
    isLatest: true,
  },
  {
    name: "ICP / Filing Lookup",
    description: "Collect basic website filing lookup links and domain information.",
    category: "Webmaster Tools",
    href: "/en/tools/icp-query",
    originalHref: "/tools/icp-query",
    icon: "WEB",
  },
  {
    name: "Meta Tag Generator",
    description: "Generate title, description, Open Graph, and social sharing meta tags.",
    category: "Webmaster Tools",
    href: "/en/tools/meta-generator",
    originalHref: "/tools/meta-generator",
    icon: "META",
  },
  {
    name: "HTTP Status Code Lookup",
    description: "Look up common HTTP status code meanings and usage scenarios.",
    category: "Webmaster Tools",
    href: "/en/tools/http-status",
    originalHref: "/tools/http-status",
    icon: "HTTP",
  },
  {
    name: "BMI Calculator",
    description: "Estimate BMI from height and weight for everyday reference.",
    category: "Life Tools",
    href: "/en/tools/bmi",
    originalHref: "/tools/bmi",
    icon: "BMI",
  },
];

export function getEnglishToolBySlug(slug: string) {
  return englishTools.find((tool) => tool.href === `/en/tools/${slug}`);
}

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
