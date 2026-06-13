"use client";
import { useEffect, useRef, useState } from "react";
import { trackToolEvent } from "@/lib/clientAnalytics";

type RemoteTool = { slug: string; name: string; provider: "cloudconvert"; accept: string; outputFormat: string };
export function RemoteConversionWorkspace({ tool }: { tool: RemoteTool }) {
  const [file, setFile] = useState<File | null>(null); const [configured, setConfigured] = useState(false); const [checked, setChecked] = useState(false); const [working, setWorking] = useState(false); const [message, setMessage] = useState(""); const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { const controller = new AbortController(); fetch("/api/pdf/providers", { cache: "no-store", signal: controller.signal }).then((response) => response.json()).then((providers) => setConfigured(Boolean(providers.cloudconvert))).catch(() => setConfigured(false)).finally(() => setChecked(true)); return () => controller.abort(); }, []);
  const choose = (selected: File | null) => { if (!selected) return; if (selected.size > 50 * 1024 * 1024) { setMessage("Files must be 50 MB or less."); return; } setFile(selected); setMessage(""); };
  const run = async () => {
    if (!file) { setMessage("Choose a file first."); return; }
    trackToolEvent("tool_start", tool.slug, "remote"); setWorking(true); setMessage("Creating a secure conversion job...");
    try {
      const form = new FormData(); form.append("tool", tool.slug); form.append("files", file); form.append("options", "{}");
      const response = await fetch("/api/pdf/jobs", { method: "POST", body: form }); const created = await response.json(); if (!response.ok) throw new Error(created.error || "Unable to create the conversion job.");
      for (let attempt = 0; attempt < 160; attempt += 1) { await new Promise((resolve) => setTimeout(resolve, 1500)); const current = await fetch(`/api/pdf/jobs/${created.id}`, { cache: "no-store" }).then((result) => result.json()); if (current.status === "failed") throw new Error(current.error || "Conversion failed."); if (current.status === "complete") { trackToolEvent("tool_success", tool.slug, "remote"); trackToolEvent("download_result", tool.slug, "remote"); window.location.href = `/api/pdf/jobs/${created.id}/download`; setMessage("Your download is ready."); return; } setMessage(current.message || "Processing..."); }
      throw new Error("The conversion timed out.");
    } catch (error) { const detail = error instanceof Error ? error.message : "Conversion failed."; trackToolEvent("tool_error", tool.slug, "remote", detail); setMessage(detail); } finally { setWorking(false); }
  };
  return <div className="rounded-[18px] border border-[#e3eaf2] bg-white p-5 shadow-[0_24px_70px_rgba(32,43,60,0.12)] sm:p-8"><button className="flex min-h-44 w-full flex-col items-center justify-center rounded-[14px] border-2 border-dashed border-[#f0c9d7] bg-[#fff7fa] px-5" onClick={() => inputRef.current?.click()} type="button"><span className="text-lg font-black">Choose a file</span><span className="mt-2 text-sm font-semibold text-[#728197]">Maximum 50 MB · deleted automatically after one hour</span><input accept={tool.accept} className="sr-only" onChange={(event) => choose(event.target.files?.[0] || null)} ref={inputRef} type="file" /></button>{file ? <div className="mt-4 flex justify-between text-sm font-bold"><span>{file.name}</span><span className="text-[#728197]">{(file.size / 1024 / 1024).toFixed(2)} MB</span></div> : null}{checked && !configured ? <div className="mt-5 rounded-[10px] bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">CloudConvert is not configured on the server.</div> : null}{message ? <div className="mt-5 rounded-[10px] bg-[#fff0f5] px-4 py-3 text-sm font-bold text-[#a33e61]">{message}</div> : null}<button className="mt-5 rounded-[8px] bg-[#d83e73] px-7 py-3 text-sm font-black text-white disabled:opacity-50" disabled={!checked || !configured || working} onClick={run} type="button">{working ? "Processing..." : `Convert to ${tool.outputFormat.toUpperCase()}`}</button></div>;
}
