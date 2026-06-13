import { getPdfTool } from "@/data/pdfTools";
import { getVideoTool } from "@/data/videoTools";

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
  return getVideoTool(slug);
}
