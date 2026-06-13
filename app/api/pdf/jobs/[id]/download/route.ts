import { NextRequest, NextResponse } from "next/server";
import { getOutput, readJob } from "@/lib/server/pdfJobs";

export const runtime = "nodejs";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const job = await readJob((await params).id); if (!job || job.status !== "complete") return NextResponse.json({ error: "Result is not ready." }, { status: 404 });
  const output = await getOutput(job); if (!output) return NextResponse.json({ error: "Result expired." }, { status: 410 });
  return new NextResponse(output, { headers: { "content-type": "application/octet-stream", "content-disposition": `attachment; filename="${(job.outputName || "toolmomo-result").replace(/[^a-zA-Z0-9._-]/g, "-")}"`, "cache-control": "no-store" } });
}
