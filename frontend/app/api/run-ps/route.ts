import { NextResponse } from "next/server";
import path from "node:path";
import { buildArgsFromParams } from "@/lib/buildArgs";
import { runPowerShell } from "@/lib/powershell";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ Status: "OK" });
}

export async function POST(req: Request) {
  try {
    const json = await req.json();

    const baseDir = process.env.POWERSHELL_SCRIPTS_DIR || "C:/scripts";
    const psExe = process.env.POWERSHELL_EXE || "powershell.exe";
    const timeoutMs = Number(process.env.POWERSHELL_TIMEOUT_MS || 300_000); // 5 min par défaut

    const file = path.join(baseDir, `${json.script}.ps1`);

    const psArgs = [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-File",
      file,
      ...buildArgsFromParams(json.params || {}),
      "-ScriptLoc",
      baseDir
    ];

    const { code, stdout, stderr } = await runPowerShell({ exe: psExe, args: psArgs, timeoutMs });

    if (code === 0) {
      return NextResponse.json({ success: true, output: stdout });
    }

    return NextResponse.json(
      { success: false, output: stderr || stdout || `Exit code ${code}` },
      { status: 500 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { success: false, output: e?.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}