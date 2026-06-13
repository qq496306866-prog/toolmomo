import "server-only";
import { isIP } from "net";
import { lookup } from "dns/promises";

function isPrivateIp(hostname: string) {
  if (!isIP(hostname)) return false;
  return hostname === "127.0.0.1" || hostname === "0.0.0.0" || hostname === "169.254.169.254" || hostname.startsWith("10.") || hostname.startsWith("192.168.") || /^172\.(1[6-9]|2\d|3[01])\./.test(hostname) || hostname === "::1" || hostname.startsWith("fc") || hostname.startsWith("fd") || hostname.startsWith("fe80");
}

export async function assertPublicHttpUrl(value: string) {
  let url: URL;
  try { url = new URL(value); } catch { throw new Error("Enter a valid public URL."); }
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Only HTTP and HTTPS URLs are supported.");
  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || isPrivateIp(host)) throw new Error("Private and local network addresses are not allowed.");
  const addresses = await lookup(host, { all: true });
  if (!addresses.length || addresses.some((entry) => isPrivateIp(entry.address))) throw new Error("The URL must resolve to a public internet address.");
  return url.toString();
}
