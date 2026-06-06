const readyToolHrefs = new Set([
  "/tools/ai-copywriting",
  "/tools/ai-title",
  "/tools/ai-keywords",
  "/tools/word-count",
  "/tools/json-format",
  "/tools/base64",
  "/tools/url-encode",
  "/tools/timestamp",
  "/tools/text-deduplicate",
  "/tools/markdown-preview",
  "/tools/image-compress",
  "/tools/image-resize",
  "/tools/image-webp",
  "/tools/id-photo-bg",
  "/tools/pdf-merge",
  "/tools/pdf-to-image",
  "/tools/pdf-split",
  "/tools/pdf-delete-pages",
  "/tools/image-to-pdf",
  "/tools/pdf-watermark",
  "/tools/taobao-main-image",
  "/tools/product-title",
  "/tools/sku-helper",
  "/tools/xhs-title",
  "/tools/video-script",
  "/tools/video-cover-title",
  "/tools/icp-query",
  "/tools/http-status",
  "/tools/meta-generator",
  "/tools/bmi",
]);

export const readyToolPaths = Array.from(readyToolHrefs);

export function isToolReady(href: string) {
  return readyToolHrefs.has(href);
}

export const readyToolCount = readyToolHrefs.size;
