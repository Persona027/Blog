param([Parameter(Mandatory=$true)][string]$TaskName)
$ErrorActionPreference = 'Stop'
$projectDirectory = Split-Path -Parent $PSScriptRoot
$env:npm_config_cache = Join-Path $projectDirectory '.cache/npm'
$env:TEMP = Join-Path $projectDirectory '.tmp'
$env:TMP = $env:TEMP
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path $projectDirectory '.cache/playwright'
$env:npm_config_userconfig = Join-Path $projectDirectory '.npmrc'
Push-Location $projectDirectory
try { & npm.cmd run $TaskName; if ($LASTEXITCODE -ne 0) { throw "Task failed: $TaskName" } } finally { Pop-Location }
