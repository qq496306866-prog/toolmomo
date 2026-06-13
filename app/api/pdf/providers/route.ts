import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    aiProvider: process.env.AI_PROVIDER === "apimart" ? "apimart" : "openai",
    openai: Boolean(process.env.OPENAI_API_KEY),
    apimart: Boolean(process.env.APIMART_API_KEY),
    pdfco: Boolean(process.env.PDFCO_API_KEY),
    cloudconvert: Boolean(process.env.CLOUDCONVERT_API_KEY),
    deepl: Boolean(process.env.DEEPL_API_KEY),
  }, { headers: { "cache-control": "no-store" } });
}
