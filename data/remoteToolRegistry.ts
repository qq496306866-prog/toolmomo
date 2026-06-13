import { getPdfTool } from "@/data/pdfTools";
import { getVideoTool } from "@/data/videoTools";
import { getFileTool } from "@/data/fileTools";
import { getImageTool } from "@/data/imageTools";

export type RemoteToolDefinition = { slug: string; provider: "pdfco" | "cloudconvert" | "deepl"; outputFormat: string; inputFormat?: string; endpoint?: string };

export function getRemoteTool(slug: string): RemoteToolDefinition | undefined {
  const pdf = getPdfTool(slug);
  if (pdf && pdf.provider !== "local") {
    return {
      slug: pdf.slug,
      provider: pdf.provider,
      outputFormat: pdf.outputFormat,
      inputFormat: pdf.inputFormat,
      endpoint: pdf.endpoint,
    };
  }
  const video = getVideoTool(slug);
  if (video) return video;
  const file = getFileTool(slug);
  if (file?.provider === "cloudconvert") return file;
  const image = getImageTool(slug);
  if (image?.provider === "cloudconvert") return image;
  return undefined;
}
