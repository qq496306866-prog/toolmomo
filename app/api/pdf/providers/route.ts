import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    pdfco: Boolean(process.env.PDFCO_API_KEY),
    cloudconvert: Boolean(process.env.CLOUDCONVERT_API_KEY),
    deepl: Boolean(process.env.DEEPL_API_KEY),
  }, { headers: { "cache-control": "no-store" } });
}
