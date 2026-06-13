# TOOLMOMO Product Progress

Last updated: 2026-06-13

## Completed catalog

- PDF: 46/46
- Image: 74/74
- Write: 53/53
- Video: 58/58
- File: 12/12
- Total production tools: 243

The English root site uses `/` and canonical `/tools/...` URLs. Legacy `/en`
routes redirect permanently. Navigation, search, sitemap, and category menus
all read from the same catalogs.

## Processing model

- Browser: local PDF editing, common image editing, CSV/JSON/XML, and text tools.
- APIMart or OpenAI: AI writing and language generation.
- PDF.co: PDF compression, OCR, security, tables, URL, and email conversion.
- CloudConvert: Office, ebook, spreadsheet, advanced image, video, and audio conversion.

Remote jobs use random UUIDs, server-only keys, a 50 MB total limit, a 100-page
PDF limit, five complex jobs per IP per UTC day, and one-hour file retention.

## Latest validation

```text
npm run build: passed
Generated pages: 260
Tool routes: 243
PDF: 46
Image: 74
Write: 53
Video: 58
File: 12
```

## Release checklist

1. Commit and push the workspace.
2. Run `bash deploy/update-from-github.sh` on the VPS.
3. Verify `/api/pdf/providers`, `/tools`, and one local, AI, CloudConvert, and PDF.co tool.
4. Monitor provider quotas and `.toolmomo-jobs` cleanup after deployment.
