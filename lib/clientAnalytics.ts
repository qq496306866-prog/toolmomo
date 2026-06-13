declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

export type ToolEvent = "tool_start" | "tool_success" | "tool_error" | "download_result";

export function trackToolEvent(event: ToolEvent, tool: string, category: string, detail?: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, { tool_name: tool, tool_category: category, detail: detail?.slice(0, 100) });
}
