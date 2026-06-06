param(
  [string]$Site = "https://www.toolmomo.com",
  [string]$Sitemap = "https://www.toolmomo.com/sitemap.xml"
)

$ErrorActionPreference = "Stop"

if (-not $env:BAIDU_PUSH_TOKEN) {
  Write-Error "Please set BAIDU_PUSH_TOKEN before running this script."
}

$sitemapContent = Invoke-WebRequest -UseBasicParsing $Sitemap | Select-Object -ExpandProperty Content
$urls = [regex]::Matches($sitemapContent, "<loc>(.*?)</loc>") | ForEach-Object {
  $_.Groups[1].Value.Trim()
}

if (-not $urls.Count) {
  Write-Error "No URLs were found in sitemap: $Sitemap"
}

$endpoint = "https://data.zz.baidu.com/urls?site=$Site&token=$env:BAIDU_PUSH_TOKEN"
$body = ($urls -join "`n")

$response = Invoke-RestMethod -Method Post -Uri $endpoint -ContentType "text/plain" -Body $body
$response | ConvertTo-Json -Depth 5
