@echo off
cd /d "%~dp0"

if exist .next (
  echo Cleaning Next.js cache...
  rmdir /s /q .next
)

if not exist node_modules (
  echo Installing dependencies...
  npm install
)

echo Starting Next.js dev server...
npm run dev

pause
