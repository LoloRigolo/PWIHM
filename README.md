# PWIHM — PowerShell Web IHM

A lightweight and modern **web interface for running PowerShell scripts** remotely or locally, built with **Next.js 14**, **TypeScript**, and **shadcn/ui**.

> Repository: [https://github.com/LoloRigolo/PowerShellWebIHM.git](https://github.com/LoloRigolo/PowerShellWebIHM.git)

---

## Features

- Interactive web UI with shadcn components (cards, forms, badges, etc.)
- Execute PowerShell scripts from a secure backend
- Dynamic parameters: text, number, select, checkbox
- Real-time log display
- Environment-based configuration via `.env.local`
- Modular front-end architecture with `app/` router

---

## Tech Stack

| Layer     | Technology                                         |
| --------- | -------------------------------------------------- |
| Frontend  | Next.js 14 + TypeScript + TailwindCSS + shadcn/ui  |
| Backend   | Next.js API Routes (Node runtime)                  |
| Scripting | PowerShell (.ps1) execution via Node child_process |
| Styling   | TailwindCSS                                        |
| Icons     | lucide-react                                       |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/LoloRigolo/PowerShellWebIHM.git
cd PowerShellWebIHM
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file at the root:

```
POWERSHELL_EXE_PATH=C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe
POWERSHELL_SCRIPTS_DIR=C:\<FolderToRepo>\PowerShellWebIHM\scriptspowershell\
SOCKET_IO_PORT=3210
NEXT_PUBLIC_SOCKET_IO_PORT=3210
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

## Folder Structure

```
app/
 ├─ scripts/
 │   └─ [slug]/page.tsx  → Script execution page
 ├─ page.tsx             → Home page with scripts grid
components/
 ├─ ScriptsGrid.tsx
 ├─ ui/…                 → shadcn/ui components
lib/
 ├─ scripts.ts           → Script definitions & parameters
 ├─ socket.ts            → To get a socket at connexion
ws-server/
 ├─ lib/
 └─ server.ts            → web socket server config
```

---

## Example PowerShell Scripts

### `hello.ps1`

```powershell
Write-Host "Hello World from PowerShell!"
```

### `backup.ps1`

```powershell
param(
  [Parameter(Mandatory=$true)][string]$path,
  [ValidateSet('full','diff','inc')][string]$level = 'full',
  [switch]$compress
)
Write-Host "Backup path=$path level=$level compress=$compress"
```

## Logs

You can have logs by setup the param `ScriptLoc`

```powershell
param(
    [string]$name,
    [string]$ScriptLoc
)

$LogTime = Get-Date -Format "yyyy-MM-dd HH\Hmm"
$LogFile = "$ScriptLoc\logs\hellouser_$LogTime.log"

"Hello user log" | Out-File $LogFile -Force

$message = "Hello $name !"
$message | Out-File $LogFile -Force
Write-Host $message
```

---

## Security Notes

- The API should be protected behind authentication (not yet included)
- Only whitelisted scripts in `lib/scripts.ts` should be exposed
- Avoid user-supplied file paths

---

## License

MIT © [Lorenzo Cesana-Rale](https://github.com/LoloRigolo)
