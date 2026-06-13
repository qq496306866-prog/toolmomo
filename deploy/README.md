# TOOLMOMO VPS deployment

The production target is Hostinger VPS with Node.js, PM2, and Nginx. The app
must run as a persistent Node process because remote PDF jobs continue after
the create-job response has been returned.

## Environment

Create `/var/www/toolmomo/.env.production` and set:

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
PDFCO_API_KEY=
CLOUDCONVERT_API_KEY=
DEEPL_API_KEY=
RATE_LIMIT_SALT=replace-with-a-long-random-secret
```

Keep this file on the server only. Do not commit provider keys.

## Install and start

```bash
cd /var/www/toolmomo
npm ci
npm run build
mkdir -p .toolmomo-jobs
chmod 700 .toolmomo-jobs
pm2 start ecosystem.config.cjs
pm2 save
```

The `.toolmomo-jobs` directory contains temporary uploads, job metadata, and
download results. Jobs expire after one hour. The app performs cleanup on new
job creation; a periodic cleanup request or deployment health check is also
recommended on low-traffic installations.

## Update

```bash
cd /var/www/toolmomo
git pull
npm ci
npm run build
pm2 restart toolmomo --update-env
```

## Verify

```bash
curl -I http://127.0.0.1:3000/
curl -I http://127.0.0.1:3000/tools
curl -I http://127.0.0.1:3000/en
curl -I http://127.0.0.1:3000/sitemap.xml
curl -i http://127.0.0.1:3000/ads.txt
pm2 status
pm2 logs toolmomo --lines 100
```

Nginx should proxy `toolmomo.com` to `127.0.0.1:3000`. Use the supplied
`nginx-toolmomo.conf`, test with `sudo nginx -t`, then reload Nginx.

## AdSense launch checklist

1. Create responsive display units named `Toolmomo Home`, `Toolmomo Category`,
   and `Toolmomo Tool`, then place their slot IDs in `.env.production`.
2. In AdSense Auto ads, enable Anchor and Side rail formats only. Disable
   Vignette and automatic in-page placement because TOOLMOMO uses controlled
   manual slots around tool workflows.
3. In Privacy & messaging, publish a Google-certified European regulations
   message for EEA, UK, and Switzerland and a US states message where offered.
4. Verify the footer Cookie Settings button reopens the consent choices.
5. Confirm `/ads.txt` is authorized in AdSense before evaluating fill rate.
6. Use Tag Assistant to verify denied defaults before consent and granted
   updates after consent. Never create analytics events for ad clicks.
