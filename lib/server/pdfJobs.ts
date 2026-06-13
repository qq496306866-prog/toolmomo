import "server-only";

import { randomUUID } from "crypto";
import { mkdir, readFile, readdir, rm, stat, writeFile } from "fs/promises";
import path from "path";
import { getPdfTool, MAX_FILE_BYTES } from "@/data/pdfTools";

export type PdfJobStatus = "queued" | "processing" | "complete" | "failed" | "cancelled";
export type PdfJob = {
  id: string;
  tool: string;
  provider: string;
  status: PdfJobStatus;
  message: string;
  createdAt: number;
  expiresAt: number;
  ipHash: string;
  inputFiles: string[];
  outputFile?: string;
  outputName?: string;
  options: Record<string, unknown>;
  workerPid: number;
  error?: string;
};

const root = path.join(process.cwd(), ".toolmomo-jobs");
const limitsFile = path.join(root, "rate-limits.json");
const RETENTION_MS = 60 * 60 * 1000;

const jobDir = (id: string) => path.join(root, id);
const jobFile = (id: string) => path.join(jobDir(id), "job.json");
let rateLimitQueue: Promise<void> = Promise.resolve();

async function ensureRoot() { await mkdir(root, { recursive: true }); }

export async function saveJob(job: PdfJob) {
  await mkdir(jobDir(job.id), { recursive: true });
  await writeFile(jobFile(job.id), JSON.stringify(job, null, 2), "utf8");
}

export async function readJob(id: string) {
  if (!/^[a-f0-9-]{36}$/.test(id)) return null;
  try {
    const job = JSON.parse(await readFile(jobFile(id), "utf8")) as PdfJob;
    if (["queued", "processing"].includes(job.status) && job.workerPid !== process.pid) {
      job.status = "failed";
      job.message = "This job was interrupted by a server restart. Please try again.";
      job.error = job.message;
      await writeFile(jobFile(id), JSON.stringify(job, null, 2), "utf8");
    }
    return job;
  } catch { return null; }
}

export async function cleanupExpiredJobs() {
  await ensureRoot(); const now = Date.now();
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const job = await readJob(entry.name);
    if (!job || job.expiresAt <= now) await rm(path.join(root, entry.name), { recursive: true, force: true });
  }
}

export async function enforceRateLimit(ipHash: string) {
  const update = rateLimitQueue.then(async () => {
    await ensureRoot();
    const day = new Date().toISOString().slice(0, 10);
    let limits: Record<string, { day: string; count: number }> = {};
    try { limits = JSON.parse(await readFile(limitsFile, "utf8")); } catch {}
    const current = limits[ipHash]?.day === day ? limits[ipHash] : { day, count: 0 };
    if (current.count >= 5) throw new Error("Daily limit reached. Remote conversion tools allow 5 jobs per IP each day.");
    limits[ipHash] = { day, count: current.count + 1 };
    await writeFile(limitsFile, JSON.stringify(limits), "utf8");
  });
  rateLimitQueue = update.catch(() => undefined);
  await update;
}

function assertProviderConfigured(provider: string) {
  const configured = provider === "pdfco" ? process.env.PDFCO_API_KEY
    : provider === "cloudconvert" ? process.env.CLOUDCONVERT_API_KEY
      : provider === "deepl" ? process.env.DEEPL_API_KEY
        : null;
  if (!configured) throw new Error(`${provider} is not configured on the server.`);
}

export async function createJob(args: { tool: string; ipHash: string; files: File[]; options: Record<string, unknown> }) {
  const definition = getPdfTool(args.tool);
  if (!definition || definition.provider === "local") throw new Error("This tool does not use remote processing.");
  assertProviderConfigured(definition.provider);
  await cleanupExpiredJobs();
  const total = args.files.reduce((sum, file) => sum + file.size, 0);
  if (total > MAX_FILE_BYTES || args.files.some((file) => file.size > MAX_FILE_BYTES)) throw new Error("Files must be 50 MB or less in total.");
  const pdfFiles = args.files.filter((file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));
  if (pdfFiles.length) {
    const { PDFDocument } = await import("pdf-lib"); let pages = 0;
    for (const file of pdfFiles) pages += (await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true })).getPageCount();
    if (pages > 100) throw new Error("PDF jobs are limited to 100 pages.");
  }
  await enforceRateLimit(args.ipHash);
  const id = randomUUID(); await mkdir(jobDir(id), { recursive: true });
  const inputFiles: string[] = [];
  for (const [index, file] of args.files.entries()) {
    const extension = path.extname(file.name).toLowerCase().replace(/[^.a-z0-9]/g, "");
    const target = path.join(jobDir(id), `input-${index}${extension}`);
    await writeFile(target, Buffer.from(await file.arrayBuffer())); inputFiles.push(target);
  }
  const job: PdfJob = { id, tool: definition.slug, provider: definition.provider, status: "queued", message: "Waiting to start...", createdAt: Date.now(), expiresAt: Date.now() + RETENTION_MS, ipHash: args.ipHash, inputFiles, options: args.options, workerPid: process.pid };
  await saveJob(job);
  const deletionTimer = setTimeout(() => void rm(jobDir(id), { recursive: true, force: true }), RETENTION_MS);
  deletionTimer.unref();
  return job;
}

async function uploadPdfCo(filePath: string, apiKey: string) {
  const name = path.basename(filePath);
  const presign = await fetch(`https://api.pdf.co/v1/file/upload/get-presigned-url?name=${encodeURIComponent(name)}&contenttype=application/octet-stream`, { headers: { "x-api-key": apiKey }, cache: "no-store" });
  const data = await presign.json() as { error?: boolean; message?: string; presignedUrl?: string; url?: string };
  if (!presign.ok || data.error || !data.presignedUrl || !data.url) throw new Error(data.message || "PDF.co upload could not be prepared.");
  const upload = await fetch(data.presignedUrl, { method: "PUT", body: await readFile(filePath), headers: { "content-type": "application/octet-stream" } });
  if (!upload.ok) throw new Error("PDF.co upload failed.");
  return data.url;
}

async function runPdfCo(job: PdfJob) {
  const key = process.env.PDFCO_API_KEY; if (!key) throw new Error("PDF.co is not configured. Add PDFCO_API_KEY on the server.");
  const tool = getPdfTool(job.tool); if (!tool?.endpoint) throw new Error("PDF.co endpoint is missing for this tool.");
  const isUrlTool = job.tool === "url-to-pdf";
  const sourceUrl = isUrlTool ? String(job.options.url || "") : await uploadPdfCo(job.inputFiles[0], key);
  const body: Record<string, unknown> = { url: sourceUrl, async: false, inline: false, expiration: 60, name: `${job.tool}.${tool.outputFormat}` };
  if (job.tool === "unlock-pdf") body.password = String(job.options.password || "");
  if (job.tool === "protect-pdf") { body.ownerPassword = String(job.options.password || ""); body.userPassword = String(job.options.password || ""); }
  const response = await fetch(`https://api.pdf.co${tool.endpoint}`, { method: "POST", headers: { "x-api-key": key, "content-type": "application/json" }, body: JSON.stringify(body), cache: "no-store" });
  const data = await response.json() as { error?: boolean; message?: string; url?: string; urls?: string[] };
  if (!response.ok || data.error) throw new Error(data.message || "PDF.co conversion failed.");
  const outputUrl = data.url || data.urls?.[0]; if (!outputUrl) throw new Error("PDF.co did not return a result file.");
  return { url: outputUrl, name: `${job.tool}.${tool.outputFormat}` };
}

async function runCloudConvert(job: PdfJob) {
  const key = process.env.CLOUDCONVERT_API_KEY; if (!key) throw new Error("CloudConvert is not configured. Add CLOUDCONVERT_API_KEY on the server.");
  const tool = getPdfTool(job.tool); if (!tool) throw new Error("Unknown conversion tool.");
  const inputFormat = path.extname(job.inputFiles[0]).slice(1).toLowerCase() || tool.inputFormat;
  const response = await fetch("https://api.cloudconvert.com/v2/jobs", { method: "POST", headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" }, body: JSON.stringify({ tasks: { import: { operation: "import/upload" }, convert: { operation: "convert", input: "import", input_format: inputFormat, output_format: tool.outputFormat }, export: { operation: "export/url", input: "convert" } } }), cache: "no-store" });
  const created = await response.json() as { data?: { id: string; tasks: Array<{ name: string; result?: { form?: { url: string; parameters: Record<string, string> } } }> }; message?: string };
  if (!response.ok || !created.data) throw new Error(created.message || "CloudConvert job creation failed.");
  const uploadTask = created.data.tasks.find((task) => task.name === "import"); const form = uploadTask?.result?.form;
  if (!form) throw new Error("CloudConvert upload form is missing.");
  const uploadBody = new FormData(); Object.entries(form.parameters).forEach(([name, value]) => uploadBody.append(name, value));
  uploadBody.append("file", new Blob([await readFile(job.inputFiles[0])]), path.basename(job.inputFiles[0]));
  const upload = await fetch(form.url, { method: "POST", body: uploadBody }); if (!upload.ok) throw new Error("CloudConvert upload failed.");
  for (let attempt = 0; attempt < 120; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const current = await fetch(`https://api.cloudconvert.com/v2/jobs/${created.data.id}`, { headers: { Authorization: `Bearer ${key}` }, cache: "no-store" });
    const payload = await current.json() as { data?: { status: string; tasks: Array<{ name: string; status: string; message?: string; result?: { files?: Array<{ filename: string; url: string }> } }> } };
    if (payload.data?.status === "error") throw new Error(payload.data.tasks.find((task) => task.status === "error")?.message || "CloudConvert conversion failed.");
    const file = payload.data?.tasks.find((task) => task.name === "export")?.result?.files?.[0];
    if (file) return { url: file.url, name: file.filename || `${job.tool}.${tool.outputFormat}` };
  }
  throw new Error("CloudConvert timed out.");
}

async function runDeepL(job: PdfJob) {
  const key = process.env.DEEPL_API_KEY; if (!key) throw new Error("DeepL is not configured. Add DEEPL_API_KEY on the server.");
  const base = key.endsWith(":fx") ? "https://api-free.deepl.com" : "https://api.deepl.com";
  const form = new FormData(); form.append("file", new Blob([await readFile(job.inputFiles[0])]), "document.pdf"); form.append("target_lang", String(job.options.targetLanguage || "EN"));
  const response = await fetch(`${base}/v2/document`, { method: "POST", headers: { Authorization: `DeepL-Auth-Key ${key}` }, body: form });
  const created = await response.json() as { document_id?: string; document_key?: string; message?: string };
  if (!response.ok || !created.document_id || !created.document_key) throw new Error(created.message || "DeepL document upload failed.");
  const documentBody = JSON.stringify({ document_key: created.document_key });
  for (let attempt = 0; attempt < 120; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const status = await fetch(`${base}/v2/document/${created.document_id}`, { method: "POST", headers: { Authorization: `DeepL-Auth-Key ${key}`, "content-type": "application/json" }, body: documentBody });
    const current = await status.json() as { status?: string; message?: string };
    if (current.status === "error") throw new Error(current.message || "DeepL translation failed.");
    if (current.status === "done") return { url: `${base}/v2/document/${created.document_id}/result`, name: "translated.pdf", deepLKey: created.document_key };
  }
  throw new Error("DeepL translation timed out.");
}

export async function processJob(id: string) {
  const job = await readJob(id); if (!job || job.status === "cancelled") return;
  job.status = "processing"; job.message = `Processing with ${job.provider}...`; await saveJob(job);
  try {
    const remote = job.provider === "pdfco" ? await runPdfCo(job) : job.provider === "cloudconvert" ? await runCloudConvert(job) : await runDeepL(job);
    if ((await readJob(id))?.status === "cancelled") return;
    let response: Response;
    if ("deepLKey" in remote) response = await fetch(remote.url, { method: "POST", headers: { Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify({ document_key: remote.deepLKey }) });
    else response = await fetch(remote.url);
    if (!response.ok) throw new Error("The provider result could not be downloaded.");
    if ((await readJob(id))?.status === "cancelled") return;
    const outputFile = path.join(jobDir(id), "result" + path.extname(remote.name)); await writeFile(outputFile, Buffer.from(await response.arrayBuffer()));
    job.outputFile = outputFile; job.outputName = remote.name; job.status = "complete"; job.message = "Your result is ready."; await saveJob(job);
  } catch (error) { job.status = "failed"; job.error = error instanceof Error ? error.message : "Conversion failed."; job.message = job.error; await saveJob(job); }
}

export async function cancelJob(id: string) { const job = await readJob(id); if (!job) return null; job.status = "cancelled"; job.message = "Job cancelled."; await saveJob(job); return job; }

export async function getOutput(job: PdfJob) {
  if (!job.outputFile) return null;
  try { const info = await stat(job.outputFile); if (!info.isFile()) return null; return await readFile(job.outputFile); } catch { return null; }
}

const cleanupTimer = setInterval(() => void cleanupExpiredJobs(), 10 * 60 * 1000);
cleanupTimer.unref();
