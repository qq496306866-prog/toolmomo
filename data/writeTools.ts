export type LocalWriteOperation = "count" | "case" | "deduplicate" | "sort" | "find-replace" | "slug" | "clean" | "reverse";
export type AiWriteOperation =
  | "rewrite" | "grammar" | "summarize" | "article" | "email" | "titles" | "social" | "translate"
  | "paragraph" | "story" | "essay" | "blog" | "outline" | "conclusion" | "introduction" | "expand"
  | "shorten" | "paraphrase" | "tone" | "active-passive" | "bullets" | "faq" | "questions" | "answers"
  | "product-description" | "amazon-description" | "seo-meta" | "keywords" | "youtube-script" | "video-description"
  | "video-title" | "instagram-caption" | "facebook-post" | "linkedin-post" | "tweet" | "hashtags" | "slogan"
  | "business-name" | "bio" | "cover-letter" | "resume-summary" | "job-description" | "press-release" | "poem" | "lyrics";

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
  { slug: "write-paragraph-generator", name: "Paragraph Generator", description: "Generate a focused paragraph from a topic or key points.", icon: "PARA", provider: "openai", operation: "paragraph" },
  { slug: "write-story-generator", name: "Story Generator", description: "Create an original story that follows your language, genre, and length.", icon: "STORY", provider: "openai", operation: "story" },
  { slug: "write-essay-writer", name: "Essay Writer", description: "Draft a structured essay from a topic and requirements.", icon: "ESSAY", provider: "openai", operation: "essay" },
  { slug: "write-blog-post-generator", name: "Blog Post Generator", description: "Create a useful, reader-friendly blog post draft.", icon: "BLOG", provider: "openai", operation: "blog" },
  { slug: "write-outline-generator", name: "Outline Generator", description: "Build a logical outline for an article, essay, or presentation.", icon: "LIST", provider: "openai", operation: "outline" },
  { slug: "write-conclusion-generator", name: "Conclusion Generator", description: "Write a strong conclusion from your existing content or key points.", icon: "END", provider: "openai", operation: "conclusion" },
  { slug: "write-introduction-generator", name: "Introduction Generator", description: "Create an engaging introduction for your topic.", icon: "INTRO", provider: "openai", operation: "introduction" },
  { slug: "write-text-expander", name: "Text Expander", description: "Develop short notes into fuller, coherent writing.", icon: "MORE", provider: "openai", operation: "expand" },
  { slug: "write-text-shortener", name: "Text Shortener", description: "Make text shorter while retaining its essential meaning.", icon: "LESS", provider: "openai", operation: "shorten" },
  { slug: "write-paraphrasing-tool", name: "Paraphrasing Tool", description: "Express existing text in fresh wording without changing its meaning.", icon: "PARA", provider: "openai", operation: "paraphrase" },
  { slug: "write-tone-changer", name: "Tone Changer", description: "Rewrite text in a professional, friendly, formal, or concise tone.", icon: "TONE", provider: "openai", operation: "tone" },
  { slug: "write-active-passive-converter", name: "Active Passive Converter", description: "Convert writing between active and passive voice where appropriate.", icon: "VOICE", provider: "openai", operation: "active-passive" },
  { slug: "write-bullet-point-generator", name: "Bullet Point Generator", description: "Turn text or notes into clear, scannable bullet points.", icon: "BUL", provider: "openai", operation: "bullets" },
  { slug: "write-faq-generator", name: "FAQ Generator", description: "Generate useful questions and answers from a topic or source text.", icon: "FAQ", provider: "openai", operation: "faq" },
  { slug: "write-question-generator", name: "Question Generator", description: "Create relevant study, interview, or discussion questions.", icon: "Q", provider: "openai", operation: "questions" },
  { slug: "write-answer-generator", name: "Answer Generator", description: "Draft a direct, well-explained answer to a question.", icon: "A", provider: "openai", operation: "answers" },
  { slug: "write-product-description", name: "Product Description Generator", description: "Create benefit-led product descriptions from product details.", icon: "SHOP", provider: "openai", operation: "product-description" },
  { slug: "write-amazon-description", name: "Amazon Description Generator", description: "Draft marketplace-ready titles, bullets, and descriptions.", icon: "AMZ", provider: "openai", operation: "amazon-description" },
  { slug: "write-seo-meta-description", name: "SEO Meta Description", description: "Generate concise search-friendly meta descriptions.", icon: "SEO", provider: "openai", operation: "seo-meta" },
  { slug: "write-keyword-generator", name: "Keyword Generator", description: "Create relevant keyword ideas grouped by search intent.", icon: "KEY", provider: "openai", operation: "keywords" },
  { slug: "write-youtube-script", name: "YouTube Script Generator", description: "Draft a structured video script from a topic and audience.", icon: "YT", provider: "openai", operation: "youtube-script" },
  { slug: "write-video-description", name: "Video Description Generator", description: "Write a clear video description with useful calls to action.", icon: "DESC", provider: "openai", operation: "video-description" },
  { slug: "write-video-title", name: "Video Title Generator", description: "Generate specific and compelling video title options.", icon: "V-T", provider: "openai", operation: "video-title" },
  { slug: "write-instagram-caption", name: "Instagram Caption Generator", description: "Create concise Instagram captions and relevant hashtags.", icon: "IG", provider: "openai", operation: "instagram-caption" },
  { slug: "write-facebook-post", name: "Facebook Post Generator", description: "Draft engaging Facebook posts from a short brief.", icon: "FB", provider: "openai", operation: "facebook-post" },
  { slug: "write-linkedin-post", name: "LinkedIn Post Generator", description: "Write credible professional posts for LinkedIn.", icon: "IN", provider: "openai", operation: "linkedin-post" },
  { slug: "write-tweet-generator", name: "Tweet Generator", description: "Create concise post options that fit current X text limits.", icon: "POST", provider: "openai", operation: "tweet" },
  { slug: "write-hashtag-generator", name: "Hashtag Generator", description: "Generate a focused set of relevant hashtags.", icon: "#", provider: "openai", operation: "hashtags" },
  { slug: "write-slogan-generator", name: "Slogan Generator", description: "Create memorable slogan options from a brand brief.", icon: "TAG", provider: "openai", operation: "slogan" },
  { slug: "write-business-name-generator", name: "Business Name Generator", description: "Generate distinctive business name ideas with short rationales.", icon: "BIZ", provider: "openai", operation: "business-name" },
  { slug: "write-bio-generator", name: "Bio Generator", description: "Write a concise personal or professional biography.", icon: "BIO", provider: "openai", operation: "bio" },
  { slug: "write-cover-letter", name: "Cover Letter Generator", description: "Draft a tailored cover letter from role and experience details.", icon: "JOB", provider: "openai", operation: "cover-letter" },
  { slug: "write-resume-summary", name: "Resume Summary Generator", description: "Create a focused professional summary for a resume.", icon: "CV", provider: "openai", operation: "resume-summary" },
  { slug: "write-job-description", name: "Job Description Generator", description: "Draft a clear job description with responsibilities and requirements.", icon: "HR", provider: "openai", operation: "job-description" },
  { slug: "write-press-release", name: "Press Release Generator", description: "Create a factual press release draft from announcement details.", icon: "PR", provider: "openai", operation: "press-release" },
  { slug: "write-poem-generator", name: "Poem Generator", description: "Write an original poem from your theme, form, and tone.", icon: "POEM", provider: "openai", operation: "poem" },
  { slug: "write-lyrics-generator", name: "Lyrics Generator", description: "Create original song lyrics without imitating living artists.", icon: "LYR", provider: "openai", operation: "lyrics" },
];

export const writeToolMap = new Map(writeTools.map((tool) => [tool.slug, tool]));
export const getWriteTool = (slug: string) => writeToolMap.get(slug);
