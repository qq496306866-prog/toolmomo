import type { PdfToolDefinition } from "@/data/pdfTools";
import type { ImageToolDefinition } from "@/data/imageTools";
import type { FileToolDefinition } from "@/data/fileTools";

const verifiedPdfRemote = new Set(["compress-pdf", "pdf-to-word"]);
export const isPdfIndexed = (tool: PdfToolDefinition) => tool.provider === "local" || verifiedPdfRemote.has(tool.slug);
export const isImageIndexed = (tool: ImageToolDefinition) => tool.provider === "local";
export const isFileIndexed = (tool: FileToolDefinition) => tool.provider === "local";
