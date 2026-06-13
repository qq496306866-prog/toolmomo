# TOOLMOMO Online Tools

TOOLMOMO is an English-first utility site built with Next.js App Router,
TypeScript, Tailwind CSS, `pdf-lib`, `pdfjs-dist`, browser Canvas APIs, APIMart,
PDF.co, and CloudConvert.

## Product scope

- 243 production tool routes: 46 PDF, 74 Image, 53 Write, 58 Video, and 12 File.
- Browser-local PDF editing, image editing, structured file, and text tools.
- APIMart-powered writing tools with server-only credentials.
- CloudConvert-powered Office, spreadsheet, image, video, and audio conversion.
- PDF.co-powered compression, OCR, security, table extraction, and URL/email PDF tools.
- A 50 MB upload limit, 100-page PDF limit, random job IDs, five complex jobs
  per IP per UTC day, and one-hour temporary-file retention.
- No user accounts, file history, or permanent source/result storage.

## Development

```bash
npm install
npm run dev
npm run build
```

## Provider configuration

```text
NEXT_PUBLIC_GA_ID=G-CQBC5LZQC3
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1935746779426009
NEXT_PUBLIC_ADSENSE_HOME_SLOT=
NEXT_PUBLIC_ADSENSE_CATEGORY_SLOT=
NEXT_PUBLIC_ADSENSE_TOOL_SLOT=
AI_PROVIDER=apimart
APIMART_API_KEY=
APIMART_BASE_URL=https://api.apimart.ai/v1
APIMART_TEXT_MODEL=gpt-5.2-pro
OPENAI_API_KEY=
OPENAI_TEXT_MODEL=gpt-5.4-mini
PDFCO_API_KEY=
CLOUDCONVERT_API_KEY=
DEEPL_API_KEY=
RATE_LIMIT_SALT=replace-with-a-long-random-secret
```

Provider keys are server-only. See `deploy/README.md` for Hostinger, PM2, and
Nginx deployment instructions and the AdSense/CMP launch checklist.

## Verification

After starting a production instance, run the public route and service checks:

```bash
SITE_URL=http://127.0.0.1:3000 npm run test:site
```

The `/api/health` endpoint reports the deployed version and provider readiness
without exposing API keys.
