const baseUrl = (process.env.SITE_URL || "https://toolmomo.com").replace(/\/$/, "");

const checks = [
  "/",
  "/tools",
  "/tools/pdf",
  "/tools/image",
  "/tools/write",
  "/tools/video",
  "/tools/file",
  "/tools/pdf-merge",
  "/tools/image/image-compress",
  "/tools/write/write-word-counter",
  "/privacy",
];

let failed = false;

for (const path of checks) {
  try {
    const response = await fetch(`${baseUrl}${path}`, { redirect: "follow" });
    const body = await response.text();
    const passed = response.ok && body.includes("<html lang=\"en\"");
    console.log(`${passed ? "PASS" : "FAIL"} ${response.status} ${path}`);
    if (!passed) failed = true;
  } catch (error) {
    failed = true;
    console.log(`FAIL ${path}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

try {
  const response = await fetch(`${baseUrl}/ads.txt`, { redirect: "error" });
  const body = (await response.text()).trim();
  const passed = response.ok && response.headers.get("content-type")?.includes("text/plain") && body === "google.com, pub-1935746779426009, DIRECT, f08c47fec0942fa0";
  console.log(`${passed ? "PASS" : "FAIL"} ${response.status} /ads.txt`);
  if (!passed) failed = true;
} catch (error) {
  failed = true;
  console.log(`FAIL /ads.txt: ${error instanceof Error ? error.message : String(error)}`);
}

try {
  const response = await fetch(`${baseUrl}/api/health`, { cache: "no-store" });
  const health = await response.json();
  const passed = response.ok && health.status === "ok" && health.service === "toolmomo";
  console.log(`${passed ? "PASS" : "FAIL"} ${response.status} /api/health version=${health.version || "unknown"}`);
  if (!passed) failed = true;
} catch (error) {
  failed = true;
  console.log(`FAIL /api/health: ${error instanceof Error ? error.message : String(error)}`);
}

if (failed) process.exit(1);
