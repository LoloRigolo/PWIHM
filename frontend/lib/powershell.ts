import { spawn } from "child_process";

export async function runPowerShell({
    exe,
    args,
    timeoutMs = 300_000,
}: {
    exe: string;
    args: string[];
    timeoutMs?: number;
}): Promise<{ code: number; stdout: string; stderr: string }> {
    if (process.platform !== "win32") {
        throw new Error("L'exécution PowerShell requiert Windows (win32)");
    }

    return new Promise((resolve, reject) => {
        const child = spawn(exe, args, { windowsVerbatimArguments: true });

        let stdout = "";
        let stderr = "";

        child.stdout.on("data", (d) => (stdout += d.toString()))
            .on("error", (err) => (stderr += `
stdout error: ${String(err)}`));

        child.stderr.on("data", (d) => (stderr += d.toString()))
            .on("error", (err) => (stderr += `
stderr error: ${String(err)}`));

        const onClose = (code?: number | null) => {
            clearTimeout(timer);
            resolve({ code: code ?? 0, stdout, stderr });
        };

        const onError = (err: Error) => {
            clearTimeout(timer);
            reject(err);
        };

        child.on("close", onClose);
        child.on("error", onError);

        const timer = setTimeout(() => {
            try { child.kill("SIGTERM"); } catch { }
            resolve({ code: 124, stdout, stderr: stderr || "Timeout atteint" });
        }, timeoutMs);
    });
}