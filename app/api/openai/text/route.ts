import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getWriteTool } from "@/data/writeTools";
import { enforceRateLimit } from "@/lib/server/pdfJobs";
import { generateOpenAiText } from "@/lib/server/openaiText";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { tool?: string; input?: string; option?: string };
    const tool = getWriteTool(String(body.tool || ""));
    if (!tool || tool.provider !== "openai") throw new Error("Unknown AI writing tool.");
    const input = String(body.input || "").trim();
    if (!input) throw new Error("Enter some text or a brief first.");
    if (input.length > 20_000) throw new Error("AI writing input is limited to 20,000 characters.");

    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
    const ipHash = createHash("sha256").update(`${forwarded}:${process.env.RATE_LIMIT_SALT || "toolmomo"}`).digest("hex");
    await enforceRateLimit(ipHash);
    const output = await generateOpenAiText({ operation: tool.operation, input, option: body.option });
    return NextResponse.json({ output }, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to generate text.";
    const status = message.includes("Daily limit") ? 429 : message.includes("not configured") ? 503 : 400;
    return NextResponse.json({ error: message }, { status, headers: { "cache-control": "no-store" } });
  }
}
