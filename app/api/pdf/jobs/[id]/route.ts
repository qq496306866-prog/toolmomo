import { NextRequest, NextResponse } from "next/server";
import { cancelJob, readJob } from "@/lib/server/pdfJobs";

export const runtime = "nodejs";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const job = await readJob((await params).id); if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });
  return NextResponse.json({ id: job.id, status: job.status, message: job.message, error: job.error, expiresAt: job.expiresAt }, { headers: { "cache-control": "no-store" } });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const job = await cancelJob((await params).id); return job ? NextResponse.json({ status: job.status }) : NextResponse.json({ error: "Job not found." }, { status: 404 });
}
