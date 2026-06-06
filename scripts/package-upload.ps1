param(
  [string]$Output = "toolmomo-upload.zip"
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$outputPath = Join-Path $root $Output
$tempDir = Join-Path $env:TEMP ("toolmomo-upload-" + [guid]::NewGuid().ToString("N"))

$excludeDirs = @(
  ".git",
  ".next",
  "node_modules",
  "out",
  "dist",
  "coverage"
)

$excludeDirPrefixes = @(
  ".next-broken-"
)

$excludeFiles = @(
  "tsconfig.tsbuildinfo",
  "npm-debug.log",
  "yarn-debug.log",
  "yarn-error.log",
  "pnpm-debug.log"
)

if (Test-Path $outputPath) {
  Remove-Item -LiteralPath $outputPath -Force
}

New-Item -ItemType Directory -Path $tempDir | Out-Null

try {
  Get-ChildItem -LiteralPath $root -Force | ForEach-Object {
    $name = $_.Name
    $isExcludedDir = $_.PSIsContainer -and (
      $excludeDirs -contains $name -or
      ($excludeDirPrefixes | Where-Object { $name.StartsWith($_) })
    )
    $isExcludedFile = -not $_.PSIsContainer -and (
      $excludeFiles -contains $name -or
      $name.EndsWith(".zip")
    )

    if (-not $isExcludedDir -and -not $isExcludedFile) {
      Copy-Item -LiteralPath $_.FullName -Destination $tempDir -Recurse -Force
    }
  }

  Compress-Archive -Path (Join-Path $tempDir "*") -DestinationPath $outputPath -Force
  Write-Host "Created $outputPath"
} finally {
  if (Test-Path $tempDir) {
    Remove-Item -LiteralPath $tempDir -Recurse -Force
  }
}
