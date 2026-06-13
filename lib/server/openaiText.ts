import type { AiWriteOperation } from "@/data/writeTools";

const instructions: Record<AiWriteOperation, string> = {
  rewrite: "Rewrite the user's text for clarity and flow. Preserve the original meaning and factual claims. Return only the rewritten text.",
  grammar: "Correct grammar, spelling, punctuation, and awkward phrasing. Preserve the author's meaning and tone. Return only the corrected text.",
  summarize: "Summarize the user's text into concise paragraphs and useful bullet points when appropriate. Do not add facts.",
  article: "Write a polished, well-structured English article draft from the user's topic or brief. Use a descriptive title and useful section headings.",
  email: "Draft a clear, professional email from the user's brief. Include a useful subject line. Avoid invented names or facts.",
  titles: "Generate 12 distinct, compelling title options from the user's topic. Keep them specific and avoid clickbait that the topic cannot support.",
  social: "Create 5 concise social media caption options from the user's brief. Add relevant hashtags sparingly and do not invent factual claims.",
  translate: "Translate the user's text into the requested target language. Preserve meaning, names, formatting, and tone. Return only the translation.",
};

type ResponsePayload = {
  output_text?: string;
  output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
  data?: { choices?: Array<{ message?: { content?: string } }> };
  error?: { message?: string };
};

export async function generateOpenAiText(args: { operation: AiWriteOperation; input: string; option?: string }) {
  const provider = process.env.AI_PROVIDER === "apimart" ? "apimart" : "openai";
  const apiKey = provider === "apimart" ? process.env.APIMART_API_KEY : process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error(`${provider === "apimart" ? "APIMart" : "OpenAI"} is not configured on the server.`);

  const option = args.option?.trim();
  const input = option ? `Target or style preference: ${option}\n\nUser text or brief:\n${args.input}` : args.input;
  const endpoint = provider === "apimart"
    ? `${(process.env.APIMART_BASE_URL || "https://api.apimart.ai/v1").replace(/\/$/, "")}/responses`
    : "https://api.openai.com/v1/responses";
  const body = provider === "apimart" ? {
    model: process.env.APIMART_TEXT_MODEL || "gpt-5.2-pro",
    input: [
      { role: "system", content: [{ type: "input_text", text: instructions[args.operation] }] },
      { role: "user", content: [{ type: "input_text", text: input }] },
    ],
    max_tokens: 2000,
    stream: false,
  } : {
    model: process.env.OPENAI_TEXT_MODEL || "gpt-5.4-mini",
    instructions: instructions[args.operation],
    input,
    max_output_tokens: 2000,
    store: false,
  };
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(90_000),
  });
  const payload = await response.json() as ResponsePayload;
  if (!response.ok) throw new Error(payload.error?.message || `OpenAI request failed (${response.status}).`);
  const text = payload.data?.choices?.[0]?.message?.content
    || payload.output_text
    || payload.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("").trim();
  if (!text) throw new Error(`${provider === "apimart" ? "APIMart" : "OpenAI"} returned an empty result. Please try again.`);
  return text;
}
