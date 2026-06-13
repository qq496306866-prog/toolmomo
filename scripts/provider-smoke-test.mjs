import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const baseUrl = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");

async function createFixture() {
  const document = await PDFDocument.create();
  const font = await document.embedFont(StandardFonts.Helvetica);
  const page = document.addPage([612, 792]);
  page.drawText("TOOLMOMO provider smoke test", { x: 54, y: 720, size: 22, font, color: rgb(0.12, 0.17, 0.24) });
  page.drawText("Generated automatically. Contains no user data.", { x: 54, y: 680, size: 12, font });
  return new Blob([await document.save()], { type: "application/pdf" });
}

async function runJob(tool, expectedExtension) {
  const form = new FormData();
  form.append("tool", tool);
  form.append("options", "{}");
  form.append("files", await createFixture(), "toolmomo-provider-test.pdf");

  const created = await fetch(`${baseUrl}/api/pdf/jobs`, { method: "POST", body: form });
  const creation = await created.json();
  if (!created.ok) throw new Error(`${tool}: create failed (${created.status}) ${creation.error || ""}`);

  for (let attempt = 0; attempt < 120; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const statusResponse = await fetch(`${baseUrl}/api/pdf/jobs/${creation.id}`, { cache: "no-store" });
    const status = await statusResponse.json();
    if (status.status === "failed") throw new Error(`${tool}: ${status.error || "provider job failed"}`);
    if (status.status === "complete") {
      const download = await fetch(`${baseUrl}/api/pdf/jobs/${creation.id}/download`, { cache: "no-store" });
      const bytes = new Uint8Array(await download.arrayBuffer());
      const disposition = download.headers.get("content-disposition") || "";
      if (!download.ok || !bytes.length || !disposition.toLowerCase().includes(expectedExtension)) {
        throw new Error(`${tool}: invalid download (${download.status}, ${bytes.length} bytes, ${disposition})`);
      }
      console.log(`${tool}: PASS (${bytes.length} bytes, job ${creation.id})`);
      return;
    }
  }
  throw new Error(`${tool}: timed out`);
}

const providers = await fetch(`${baseUrl}/api/pdf/providers`, { cache: "no-store" }).then((response) => response.json());
console.log(`Testing ${baseUrl}`, providers);

if (!providers.pdfco || !providers.cloudconvert) {
  throw new Error("PDF.co and CloudConvert must both be configured before running this test.");
}

await runJob("compress-pdf", ".pdf");
await runJob("pdf-to-word", ".docx");
