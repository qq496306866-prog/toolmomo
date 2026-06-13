export type LocalWriteOperation = "count" | "case" | "deduplicate" | "sort" | "find-replace" | "slug" | "clean" | "reverse";
export type AiWriteOperation = "rewrite" | "grammar" | "summarize" | "article" | "email" | "titles" | "social" | "translate";

type WriteToolBase = { slug: string; name: string; description: string; icon: string };
export type WriteToolDefinition = WriteToolBase & (
  | { provider: "local"; operation: LocalWriteOperation }
  | { provider: "openai"; operation: AiWriteOperation }
);

export const writeTools: WriteToolDefinition[] = [
  { slug: "write-word-counter", name: "Word Counter", description: "Count words, characters, sentences, paragraphs, and reading time.", icon: "123", provider: "local", operation: "count" },
  { slug: "write-case-converter", name: "Text Case Converter", description: "Convert text to upper, lower, title, or sentence case.", icon: "Aa", provider: "local", operation: "case" },
  { slug: "write-remove-duplicate-lines", name: "Remove Duplicate Lines", description: "Remove repeated lines while keeping their original order.", icon: "UNIQ", provider: "local", operation: "deduplicate" },
  { slug: "write-sort-lines", name: "Sort Lines", description: "Sort text lines alphabetically in either direction.", icon: "A-Z", provider: "local", operation: "sort" },
  { slug: "write-find-replace", name: "Find and Replace", description: "Replace every matching word or phrase in a block of text.", icon: "REPL", provider: "local", operation: "find-replace" },
  { slug: "write-slug-generator", name: "Slug Generator", description: "Turn a title into a clean URL slug.", icon: "URL", provider: "local", operation: "slug" },
  { slug: "write-text-cleaner", name: "Text Cleaner", description: "Normalize whitespace, line breaks, and invisible spacing.", icon: "CLEAN", provider: "local", operation: "clean" },
  { slug: "write-reverse-text", name: "Reverse Text", description: "Reverse text by characters, words, or lines.", icon: "REV", provider: "local", operation: "reverse" },
  { slug: "write-ai-rewriter", name: "AI Rewriter", description: "Rewrite text for clarity while preserving its meaning.", icon: "AI", provider: "openai", operation: "rewrite" },
  { slug: "write-grammar-checker", name: "Grammar Checker", description: "Correct grammar, spelling, and punctuation without changing your message.", icon: "ABC", provider: "openai", operation: "grammar" },
  { slug: "write-summarizer", name: "Text Summarizer", description: "Turn long text into a concise, useful summary.", icon: "SUM", provider: "openai", operation: "summarize" },
  { slug: "write-article-generator", name: "Article Generator", description: "Create a structured article draft from a topic or brief.", icon: "DOC", provider: "openai", operation: "article" },
  { slug: "write-email-writer", name: "Email Writer", description: "Draft a clear email from a short description of what you need.", icon: "MAIL", provider: "openai", operation: "email" },
  { slug: "write-title-generator", name: "Title Generator", description: "Generate strong title options for articles, videos, and products.", icon: "TITLE", provider: "openai", operation: "titles" },
  { slug: "write-social-caption", name: "Social Caption Generator", description: "Create platform-ready social captions with optional hashtags.", icon: "POST", provider: "openai", operation: "social" },
  { slug: "write-translator", name: "AI Translator", description: "Translate text naturally into your selected language.", icon: "TR", provider: "openai", operation: "translate" },
];

export const writeToolMap = new Map(writeTools.map((tool) => [tool.slug, tool]));
export const getWriteTool = (slug: string) => writeToolMap.get(slug);
