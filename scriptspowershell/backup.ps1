param(
  [Parameter(Mandatory=$true)][string]$path,
  [ValidateSet('full','diff','inc')][string]$level = 'full',
  [switch]$compress
)

Write-Host "Backup path=$path level=$level compress=$compress"