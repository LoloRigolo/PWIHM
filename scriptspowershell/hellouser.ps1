param(
    [string]$name = "World",
    [string]$ScriptLoc
)

$LogTime = Get-Date -Format "yyyy-MM-dd HH\Hmm"
$LogFile = "$ScriptLoc\logs\hellouser_$LogTime.log"

"Hello user log" | Out-File $LogFile -Force

$message = "Hello $name !"
$message | Out-File $LogFile -Force
Write-Host $message