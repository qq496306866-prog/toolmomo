#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/toolmomo"
APP_NAME="toolmomo"

cd "$APP_DIR"

npm install
npm run build

if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 restart "$APP_NAME"
else
  pm2 start ecosystem.config.cjs
fi

pm2 save
