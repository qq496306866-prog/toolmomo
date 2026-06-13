import { tools } from "./tools";

const legacyReadyToolHrefs = [
  "/tools/ai-title",
  "/tools/ai-keywords",
  "/tools/word-counter",
  "/tools/json-formatter",
  "/tools/base64",
  "/tools/url-encode",
  "/tools/timestamp",
  "/tools/color-converter",
  "/tools/password-generator",
  "/tools/uuid-generator",
  "/tools/regex-tester",
  "/tools/text-deduplicate",
  "/tools/markdown-preview",
  "/tools/image-compress",
  "/tools/image-compressor",
  "/tools/image-resize",
  "/tools/image-resizer",
  "/tools/image-webp",
  "/tools/image-to-webp",
  "/tools/id-photo-bg",
  "/tools/pdf-merge",
  "/tools/pdf-to-image",
  "/tools/pdf-split",
  "/tools/pdf-delete-pages",
  "/tools/image-to-pdf",
  "/tools/pdf-watermark",
  "/tools/word-count",
  "/tools/json-format",
  "/tools/taobao-main-image",
  "/tools/ecommerce-image-size-tool",
  "/tools/product-title",
  "/tools/sku-helper",
  "/tools/xhs-title",
  "/tools/social-media-title-generator",
  "/tools/video-script",
  "/tools/video-template",
  "/tools/video-cover-title",
  "/tools/icp-query",
  "/tools/http-status",
  "/tools/meta-generator",
  "/tools/bmi",
];

const readyToolHrefs = new Set([...tools.map((tool) => tool.href), ...legacyReadyToolHrefs]);

export const readyToolPaths = Array.from(readyToolHrefs);

export function isToolReady(href: string) {
  return readyToolHrefs.has(href);
}

export const readyToolCount = readyToolHrefs.size;
