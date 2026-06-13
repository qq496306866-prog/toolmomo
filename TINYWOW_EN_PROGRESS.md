# TOOLMOMO PDF Product Progress

Last updated: 2026-06-13

## Current state

- English root site is live at `/`; `/en` is no longer a content namespace.
- 46 canonical PDF tools are registered under `/tools/[slug]`.
- 16 browser-local image tools are registered under `/tools/image/[slug]`.
- 6 browser-local structured file tools are registered under `/tools/file/[slug]`.
- Five-category navigation now exposes PDF, Image, Write, Video, and File.
- The old general-purpose tool site, tutorials, categories, deals, login,
  favorites, marketing pages, and Remotion demos have been removed.
- Contact, Privacy, and Disclaimer pages remain.
- `/en`, `/en/tools`, and `/en/tools/[slug]` use permanent redirects.
- Unknown tool slugs return 404.

## Processing

- Local tools: 21.
- Remote tools: 25.
- PDF.co tools: 8.
- CloudConvert tools: 16.
- DeepL tools: 1.

Remote jobs use random UUIDs, server-only API keys, a 50 MB total limit, a
100-page PDF limit, five jobs per IP per UTC day, and one-hour file retention.
Public URL capture rejects localhost, private networks, link-local addresses,
and cloud metadata addresses.

## Latest validation

```text
npm run build: passed
Generated pages: 59
PDF tool routes: 46
Duplicate slugs: 0
Legacy /en redirect: 308
Unknown tool route: 404
Provider status cache: no-store
Unconfigured remote provider response: 503
Private/metadata URL response: 400
Docker Compose configuration: valid
```

Latest multi-category build:

```text
Generated pages: 85
Production-ready tools: 68
Sitemap URLs: 77
Image routes: 16
File routes: 6
Invalid nested tool slug: 404
```

## Production requirements

Configure these values in `/var/www/toolmomo/.env.production` before enabling
remote tools:

```text
PDFCO_API_KEY=
CLOUDCONVERT_API_KEY=
DEEPL_API_KEY=
RATE_LIMIT_SALT=
```

Provider endpoints still require live-account tests with representative files
after valid keys and free-tier quotas are available.

## Next work

1. Commit and push the current workspace. Codex Git writes are currently
   blocked because the worktree index is outside the writable workspace and
   the desktop permission review is timing out.
2. Configure provider keys in staging.
3. Implement and validate the Write category with an AI provider and local
   text utilities.
4. Implement the first Video and remaining Excel/File conversions through
   CloudConvert.
5. Test local workflows in Chrome on desktop and mobile with normal, damaged,
   encrypted, 100-page, and near-50-MB files.
6. Deploy through PM2/Nginx, then verify temporary-file cleanup and provider
   usage dashboards.
