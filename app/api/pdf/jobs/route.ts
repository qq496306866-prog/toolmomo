import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createJob, processJob } from "@/lib/server/pdfJobs";
import { assertPublicHttpUrl } from "@/lib/server/networkSafety";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData(); const tool = String(form.get("tool") || "");
    const files = form.getAll("files").filter((item): item is File => item instanceof File);
    const options = JSON.parse(String(form.get("options") || "{}")) as Record<string, unknown>;
    if (tool === "url-to-pdf") options.url = await assertPublicHttpUrl(String(options.url || ""));
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
    const ipHash = createHash("sha256").update(`${forwarded}:${process.env.RATE_LIMIT_SALT || "toolmomo"}`).digest("hex");
    const job = await createJob({ tool, files, options, ipHash }); void processJob(job.id);
    return NextResponse.json({ id: job.id, status: job.status }, { status: 202 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create job.";
    const status = message.includes("Daily limit") ? 429
      : message.includes("50 MB") ? 413
        : message.includes("not configured") ? 503
          : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
