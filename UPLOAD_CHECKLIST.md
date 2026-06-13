# TOOLMOMO release checklist

## Before upload

- Run `npm ci`.
- Run `npm run build`.
- Confirm `.env.production` is not committed.
- Confirm all three provider keys and `RATE_LIMIT_SALT` are configured on the
  server.
- Confirm `.toolmomo-jobs` is not included in the upload.

## Deploy

```bash
cd /var/www/toolmomo
git pull
npm ci
npm run build
mkdir -p .toolmomo-jobs
chmod 700 .toolmomo-jobs
pm2 restart toolmomo --update-env
```

For a first deployment, use `pm2 start ecosystem.config.cjs` followed by
`pm2 save`.

## Verify

- `/` returns 200.
- `/tools` returns 200 and lists 46 tools.
- All `/tools/[slug]` URLs return 200.
- `/en` and `/en/tools/...` return 308 redirects.
- Unknown tool slugs return 404.
- `/sitemap.xml` includes root, tools, legal pages, and all 46 tools.
- Browser-local tools process and download without uploading files.
- Configured remote tools create, poll, and download jobs.
- Unconfigured remote tools are disabled.
- Private and metadata URLs are rejected by URL to PDF.
- PM2 is online and Nginx configuration passes `nginx -t`.
- Temporary job directories disappear after one hour.
