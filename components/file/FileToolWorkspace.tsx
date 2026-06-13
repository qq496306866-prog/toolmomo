"use client";

import { useEffect, useRef, useState } from "react";
import type { FileToolDefinition } from "@/data/fileTools";
import { createZip } from "@/lib/clientZip";

type Result = { name: string; blob: Blob; url: string };
const MAX_BYTES = 50 * 1024 * 1024;

function parseCsv(text: string) {
  const rows: string[][] = []; let row: string[] = []; let field = ""; let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) { if (character === '"' && text[index + 1] === '"') { field += '"'; index += 1; } else if (character === '"') quoted = false; else field += character; }
    else if (character === '"') quoted = true;
    else if (character === ",") { row.push(field); field = ""; }
    else if (character === "\n") { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += character;
  }
  if (field.length || row.length) { row.push(field.replace(/\r$/, "")); rows.push(row); }
  return rows.filter((item) => item.some((value) => value.length));
}

function csvEscape(value: unknown) { const text = String(value ?? ""); return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text; }
function csvString(rows: string[][]) { return rows.map((row) => row.map(csvEscape).join(",")).join("\r\n"); }
function xmlEscape(value: unknown) { return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;"); }
function safeTag(value: string) { const cleaned = value.trim().replace(/[^a-zA-Z0-9_.-]+/g, "_"); return /^[a-zA-Z_]/.test(cleaned) ? cleaned : `field_${cleaned || "value"}`; }
function valueToXml(name: string, value: unknown): string { const tag = safeTag(name); if (Array.isArray(value)) return value.map((item) => valueToXml(tag, item)).join(""); if (value && typeof value === "object") return `<${tag}>${Object.entries(value).map(([key, item]) => valueToXml(key, item)).join("")}</${tag}>`; return `<${tag}>${xmlEscape(value)}</${tag}>`; }
function elementToObject(element: Element): unknown { const children = Array.from(element.children); if (!children.length) return element.textContent || ""; const result: Record<string, unknown> = {}; for (const child of children) { const value = elementToObject(child); const current = result[child.tagName]; result[child.tagName] = current === undefined ? value : Array.isArray(current) ? [...current, value] : [current, value]; } return result; }
function parseXml(text: string) { const document = new DOMParser().parseFromString(text, "application/xml"); const error = document.querySelector("parsererror"); if (error || !document.documentElement) throw new Error("The XML document is not valid."); return document.documentElement; }

export function FileToolWorkspace({ tool }: { tool: FileToolDefinition }) {
  const [file, setFile] = useState<File | null>(null); const [results, setResults] = useState<Result[]>([]); const [rowsPerFile, setRowsPerFile] = useState(1000); const [message, setMessage] = useState(""); const [working, setWorking] = useState(false); const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => () => results.forEach((result) => URL.revokeObjectURL(result.url)), [results]);
  const publish = (outputs: Array<{ name: string; blob: Blob }>) => { results.forEach((result) => URL.revokeObjectURL(result.url)); setResults(outputs.map((output) => ({ ...output, url: URL.createObjectURL(output.blob) }))); setMessage(`${outputs.length} result${outputs.length === 1 ? "" : "s"} ready.`); };
  const choose = (selected: File | null) => { if (!selected) return; if (selected.size > MAX_BYTES) { setMessage("Files must be 50 MB or less."); return; } setFile(selected); publish([]); setMessage(""); };
  const run = async () => {
    if (!file) { setMessage("Choose a file first."); return; } setWorking(true); setMessage("Processing in your browser...");
    try {
      const text = await file.text();
      if (tool.operation === "split-csv") { const rows = parseCsv(text); if (rows.length < 2) throw new Error("The CSV must contain a header and at least one data row."); const [header, ...body] = rows; const outputs = []; for (let index = 0; index < body.length; index += rowsPerFile) outputs.push({ name: `csv-part-${outputs.length + 1}.csv`, blob: new Blob([csvString([header, ...body.slice(index, index + rowsPerFile)])], { type: "text/csv;charset=utf-8" }) }); publish(outputs); }
      if (tool.operation === "csv-to-json") { const [header, ...body] = parseCsv(text); if (!header) throw new Error("The CSV is empty."); const data = body.map((row) => Object.fromEntries(header.map((name, index) => [name || `column_${index + 1}`, row[index] || ""]))); publish([{ name: "converted.json", blob: new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }) }]); }
      if (tool.operation === "csv-to-xml") { const [header, ...body] = parseCsv(text); if (!header) throw new Error("The CSV is empty."); const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<records>\n${body.map((row) => `  <record>${header.map((name, index) => valueToXml(name || `column_${index + 1}`, row[index] || "")).join("")}</record>`).join("\n")}\n</records>`; publish([{ name: "converted.xml", blob: new Blob([xml], { type: "application/xml" }) }]); }
      if (tool.operation === "json-to-xml") { const data = JSON.parse(text) as unknown; const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${valueToXml("root", data)}`; publish([{ name: "converted.xml", blob: new Blob([xml], { type: "application/xml" }) }]); }
      if (tool.operation === "xml-to-json") { const root = parseXml(text); publish([{ name: "converted.json", blob: new Blob([JSON.stringify({ [root.tagName]: elementToObject(root) }, null, 2)], { type: "application/json" }) }]); }
      if (tool.operation === "xml-to-csv") { const root = parseXml(text); const records = Array.from(root.children); if (!records.length) throw new Error("The XML must contain repeated record elements."); const headers = Array.from(new Set(records.flatMap((record) => Array.from(record.children).map((child) => child.tagName)))); const rows = records.map((record) => headers.map((header) => record.querySelector(`:scope > ${CSS.escape(header)}`)?.textContent || "")); publish([{ name: "converted.csv", blob: new Blob([csvString([headers, ...rows])], { type: "text/csv;charset=utf-8" }) }]); }
    } catch (error) { setMessage(error instanceof Error ? error.message : "File processing failed."); }
    finally { setWorking(false); }
  };
  const downloadZip = async () => { const zip = await createZip(results.map(({ name, blob }) => ({ name, blob }))); const url = URL.createObjectURL(zip); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${tool.slug}.zip`; anchor.click(); URL.revokeObjectURL(url); };
  return <div className="rounded-[24px] border border-[#e3eaf2] bg-white p-5 shadow-[0_24px_70px_rgba(32,43,60,0.12)] sm:p-8"><button className="flex min-h-44 w-full flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-[#cfe0f5] bg-[#f5f8fd] px-5" onClick={() => inputRef.current?.click()} type="button"><span className="text-lg font-black">Choose a file</span><span className="mt-2 text-sm font-semibold text-[#728197]">Maximum 50 MB · processed in your browser</span><input accept={tool.accept} className="sr-only" onChange={(event) => choose(event.target.files?.[0] || null)} ref={inputRef} type="file" /></button>{file ? <div className="mt-4 text-sm font-bold text-[#58667a]">{file.name}</div> : null}{tool.operation === "split-csv" ? <label className="mt-5 block text-sm font-black">Rows per file<input className="mt-2 w-full rounded-[12px] border px-4 py-3" min="1" onChange={(event) => setRowsPerFile(Math.max(1, Number(event.target.value)))} type="number" value={rowsPerFile} /></label> : null}{message ? <div className="mt-5 rounded-[14px] bg-[#edf4fd] px-4 py-3 text-sm font-bold text-[#285f9f]">{message}</div> : null}<div className="mt-5 flex flex-wrap gap-3"><button className="rounded-full bg-[#2674d9] px-7 py-3 text-sm font-black text-white disabled:opacity-50" disabled={working} onClick={run} type="button">{working ? "Processing..." : `Run ${tool.name}`}</button>{results.length > 1 ? <button className="rounded-full bg-[#263244] px-7 py-3 text-sm font-black text-white" onClick={downloadZip} type="button">Download ZIP</button> : null}</div>{results.length ? <div className="mt-6 grid gap-3 sm:grid-cols-2">{results.map((result) => <a className="rounded-[12px] border border-[#dfe7f1] px-4 py-3 text-sm font-black" download={result.name} href={result.url} key={result.name}>Download {result.name}</a>)}</div> : null}</div>;
}
