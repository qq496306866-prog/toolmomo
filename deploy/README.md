# TOOLMOMO VPS deployment

The production target is Hostinger VPS with Node.js, PM2, and Nginx. The app
must run as a persistent Node process because remote PDF jobs continue after
the create-job response has been returned.

## Environment

Create `/var/www/toolmomo/.env.production` and set:

```text
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
pm2 status
pm2 logs toolmomo --lines 100
```

Nginx should proxy `toolmomo.com` to `127.0.0.1:3000`. Use the supplied
`nginx-toolmomo.conf`, test with `sudo nginx -t`, then reload Nginx.
