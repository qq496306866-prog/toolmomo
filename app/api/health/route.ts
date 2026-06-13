export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    status: "ok",
    service: "toolmomo",
    version: process.env.APP_VERSION || "development",
    providers: {
      ai: Boolean(process.env.APIMART_API_KEY || process.env.OPENAI_API_KEY),
      pdfco: Boolean(process.env.PDFCO_API_KEY),
      cloudconvert: Boolean(process.env.CLOUDCONVERT_API_KEY),
      deepl: Boolean(process.env.DEEPL_API_KEY),
    },
    checkedAt: new Date().toISOString(),
  }, { headers: { "cache-control": "no-store" } });
}
