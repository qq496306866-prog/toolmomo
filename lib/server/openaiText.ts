import type { AiWriteOperation } from "@/data/writeTools";

const instructions: Record<AiWriteOperation, string> = {
  rewrite: "Rewrite the user's text for clarity and flow. Preserve the original meaning and factual claims. Return only the rewritten text.",
  grammar: "Correct grammar, spelling, punctuation, and awkward phrasing. Preserve the author's meaning and tone. Return only the corrected text.",
  summarize: "Summarize the user's text into concise paragraphs and useful bullet points when appropriate. Do not add facts.",
  article: "Create the content requested in the user's brief. Follow the requested language, genre, format, tone, and approximate length exactly. If the user asks for a story, write the story itself rather than an article about storytelling. Use headings only when appropriate to the requested format. Do not explain the task or add unrelated advice.",
  email: "Draft a clear email from the user's brief. Write in the language requested or, when unspecified, the language used by the user. Include a useful subject line and follow the requested tone. Avoid invented names or facts.",
  titles: "Generate 12 distinct, compelling title options in the language requested or used by the user. Keep them specific and avoid clickbait that the topic cannot support.",
  social: "Create 5 concise social media caption options in the language requested or used by the user. Follow any platform, tone, and length requirements. Add relevant hashtags sparingly and do not invent factual claims.",
  translate: "Translate the user's text into the requested target language. Preserve meaning, names, formatting, and tone. Return only the translation.",
  paragraph: "Write one focused, coherent paragraph from the user's topic or key points. Follow the requested language, tone, and length. Return only the paragraph.",
  story: "Write an original story that follows the user's requested language, genre, characters, tone, and approximate length. Write the story itself without commentary or writing advice.",
  essay: "Draft a structured essay that follows the user's thesis, language, academic level, and length requirements. Do not invent citations or sources.",
  blog: "Write a useful blog post draft for the specified audience. Follow the requested language and tone, use descriptive headings, and do not invent factual claims.",
  outline: "Create a logical hierarchical outline for the user's topic and intended format. Use concise headings and supporting points in the user's language.",
  conclusion: "Write a strong conclusion based only on the supplied content or points. Do not introduce unsupported new claims. Return only the conclusion.",
  introduction: "Write an engaging introduction for the supplied topic and audience. Follow the user's language and tone. Return only the introduction.",
  expand: "Expand the supplied notes into coherent prose while preserving meaning and factual claims. Follow the requested language and approximate length.",
  shorten: "Shorten the supplied text while preserving its essential meaning, facts, names, and tone. Return only the shortened text.",
  paraphrase: "Paraphrase the supplied text using fresh wording and sentence structure while preserving every material claim. Return only the paraphrase.",
  tone: "Rewrite the supplied text in the requested tone while preserving its meaning and factual claims. Return only the rewritten text.",
  "active-passive": "Convert the supplied writing between active and passive voice where grammatically appropriate. Preserve meaning and return only the converted text.",
  bullets: "Turn the supplied material into concise, logically grouped bullet points. Preserve facts and use the user's language.",
  faq: "Create a practical FAQ from the supplied topic or source text. Provide clear questions and concise answers without inventing unsupported facts.",
  questions: "Generate relevant questions for the requested purpose, difficulty, and audience. Do not include answers unless requested.",
  answers: "Answer the user's question directly and clearly in the user's language. Distinguish uncertainty and do not invent facts or sources.",
  "product-description": "Write an accurate, benefit-led product description using only the supplied product facts. Follow the requested marketplace, language, tone, and length.",
  "amazon-description": "Create an Amazon-style listing draft with a title, five benefit bullets, and a description using only supplied product facts. Do not add certifications or claims.",
  "seo-meta": "Generate 5 accurate SEO meta descriptions based on the supplied page topic and keywords. Keep each roughly 140-160 characters unless the user requests otherwise.",
  keywords: "Generate relevant keyword ideas for the supplied topic, grouped by search intent. Avoid claiming search volume or ranking data unless supplied.",
  "youtube-script": "Write a structured YouTube script for the supplied topic, audience, language, and duration. Include a concise hook, main sections, and closing call to action.",
  "video-description": "Write a clear video description from the supplied facts. Include a concise summary and optional chapters or calls to action only when information is provided.",
  "video-title": "Generate 15 specific video title options in the user's language. Avoid misleading clickbait and unsupported promises.",
  "instagram-caption": "Create 5 Instagram caption options in the user's language and requested tone. Add a small set of relevant hashtags without invented claims.",
  "facebook-post": "Create 5 readable Facebook post options from the user's brief. Follow the requested language, audience, and tone.",
  "linkedin-post": "Create 3 credible LinkedIn post options from the user's brief. Keep the voice professional and avoid invented achievements or statistics.",
  tweet: "Create 8 concise X post options that fit within 280 characters unless the user asks for a thread. Follow the user's language and avoid unsupported claims.",
  hashtags: "Generate a focused set of relevant hashtags grouped by broad, niche, and branded intent. Return hashtags only with short group labels.",
  slogan: "Generate 20 concise, memorable slogan options from the brand brief. Avoid trademarks, guarantees, and unsupported superiority claims.",
  "business-name": "Generate 20 distinctive business name ideas from the supplied industry, audience, and style. Add a one-line rationale and remind the user to check trademarks and domains.",
  bio: "Write 3 concise biography options from the supplied facts. Follow the requested platform, language, point of view, and tone without inventing credentials.",
  "cover-letter": "Draft a tailored cover letter using only the supplied job and experience details. Do not invent employers, skills, achievements, or contact information.",
  "resume-summary": "Write 5 concise resume summary options using only the supplied experience and skills. Avoid first-person pronouns unless requested.",
  "job-description": "Draft a clear job description with role summary, responsibilities, requirements, and optional preferred qualifications. Avoid discriminatory requirements.",
  "press-release": "Draft a factual press release from the supplied announcement details. Use placeholders for missing quotes, dates, contacts, or company facts rather than inventing them.",
  poem: "Write an original poem following the user's theme, language, tone, and requested form. Do not imitate living poets.",
  lyrics: "Write original song lyrics following the user's theme, language, genre-level characteristics, and structure. Do not imitate or closely mimic living artists or copyrighted songs.",
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
