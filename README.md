# TOOLMOMO Online Tools

TOOLMOMO is an English-first utility site built with Next.js App Router,
TypeScript, Tailwind CSS, `pdf-lib`, `pdfjs-dist`, and browser-native Canvas APIs.

The public site uses `/` and `/tools/...`. Legacy `/en` URLs permanently
redirect to their canonical root URLs.

## Product scope

- 46 PDF tool routes from one catalog in `data/pdfTools.ts`.
- 16 browser-local image tools for compression, resizing, cropping, conversion,
  visual effects, composition, and metadata.
- 6 browser-local file tools for CSV, JSON, and XML processing.
- 21 browser-local tools for editing, merging, splitting, rendering, signing,
  page management, text extraction, and image/PDF creation.
- 25 remote tools using PDF.co, CloudConvert, or DeepL.
- Unified upload, validation, processing, error, result, ZIP, and download UI.
- 50 MB and 100-page limits.
- Five remote jobs per IP per UTC day.
- Random job IDs and one-hour temporary-file retention.
- No user accounts or file history.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production verification:

```bash
npm run build
npm run start
```

## Provider configuration

Copy `.env.example` to `.env.local` for local use or create
`.env.production` on the VPS:

```text
PDFCO_API_KEY=
CLOUDCONVERT_API_KEY=
DEEPL_API_KEY=
RATE_LIMIT_SALT=replace-with-a-long-random-secret
```

Provider keys are server-only. Remote tool buttons remain disabled when their
provider is not configured.

## Main directories

- `app/tools/`: category directories and canonical tool routes.
- `app/api/pdf/`: provider status and job lifecycle endpoints.
- `components/pdf/`: homepage and unified tool workspace.
- `components/image/`: browser-local image processing workspace.
- `components/file/`: structured file conversion workspace.
- `data/pdfTools.ts`: the complete 46-tool catalog.
- `data/imageTools.ts` and `data/fileTools.ts`: validated non-PDF catalogs.
- `lib/server/`: job persistence, provider adapters, limits, and URL safety.
- `deploy/`: Hostinger VPS, PM2, and Nginx instructions.

## Deployment

See `deploy/README.md`. The application must run as a persistent Node/PM2
process; the remote job worker is not designed for serverless execution.

Repository: `https://github.com/qq496306866-prog/toolmomo.git`
