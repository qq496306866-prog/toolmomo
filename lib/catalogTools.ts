import { pdfTools } from "@/data/pdfTools";
import { imageTools } from "@/data/imageTools";
import { writeTools } from "@/data/writeTools";
import { videoTools } from "@/data/videoTools";
import { fileTools } from "@/data/fileTools";
import type { CatalogTool } from "@/components/site/ToolCatalog";

const provider = (value: string): CatalogTool["provider"] => value === "local" ? "browser" : value === "openai" ? "ai" : "remote";
export const pdfCatalog = pdfTools.map((tool) => ({ ...tool, href: `/tools/${tool.slug}`, provider: provider(tool.provider), category: "PDF", color: "#ef5535", background: "#fff1ee" }));
export const imageCatalog = imageTools.map((tool) => ({ ...tool, href: `/tools/image/${tool.slug}`, provider: provider(tool.provider), category: "Image", color: "#147d78", background: "#e9f8f6" }));
export const writeCatalog = writeTools.map((tool) => ({ ...tool, href: `/tools/write/${tool.slug}`, provider: provider(tool.provider), category: "Write", color: "#6842b5", background: "#f1ebfc" }));
export const videoCatalog = videoTools.map((tool) => ({ ...tool, href: `/tools/video/${tool.slug}`, provider: "remote" as const, category: "Video", color: "#b72f61", background: "#fff0f5" }));
export const fileCatalog = fileTools.map((tool) => ({ ...tool, href: `/tools/file/${tool.slug}`, provider: provider(tool.provider), category: "File", color: "#285f9f", background: "#edf4fd" }));
export const allCatalog = [...pdfCatalog, ...imageCatalog, ...writeCatalog, ...videoCatalog, ...fileCatalog];
