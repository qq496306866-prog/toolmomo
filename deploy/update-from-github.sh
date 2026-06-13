#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/toolmomo"
APP_NAME="toolmomo"

cd "$APP_DIR"

git pull --ff-only
export APP_VERSION="$(git rev-parse --short HEAD)"
npm ci
npm run build
mkdir -p .toolmomo-jobs
chmod 700 .toolmomo-jobs

if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 restart "$APP_NAME" --update-env
else
  pm2 start ecosystem.config.cjs
fi

pm2 save
