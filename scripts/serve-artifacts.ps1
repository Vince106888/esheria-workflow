param(
  [int]$Port = 8080
)

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

if (Get-Command python -ErrorAction SilentlyContinue) {
  Write-Host "Serving artifacts at http://localhost:$Port/artifacts/portal/index.html"
  python -m http.server $Port
  exit $LASTEXITCODE
}

if (Get-Command py -ErrorAction SilentlyContinue) {
  Write-Host "Serving artifacts at http://localhost:$Port/artifacts/portal/index.html"
  py -m http.server $Port
  exit $LASTEXITCODE
}

Write-Error "Python was not found. Install Python or run another static server from repo root."
exit 1
