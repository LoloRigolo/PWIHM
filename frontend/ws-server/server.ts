import { createServer } from "node:http";
import { Server } from "socket.io";
import { buildArgsFromParams } from "./lib/utils"
import { spawn } from "node:child_process";
import path from "node:path";

const port = process.env.SOCKET_IO_PORT;
const psExe =
    process.env.POWERSHELL_EXE_PATH ||
    "C:/Windows/System32/WindowsPowerShell/v1.0/powershell.exe";
const baseDir =
    process.env.POWERSHELL_SCRIPTS_DIR ||
    "C:/scripts";

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://[::1]:3000"
        ],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    },
    serveClient: false,
});

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("run_ps", ({ script, params }) => {
        if (!script) {
            socket.emit("ps_error", { message: "Missing script" });
            return;
        }
        const file = path.join(baseDir, `${script}.ps1`);
        const psArgs = [
            "-NoProfile",
            "-ExecutionPolicy", "Bypass",
            "-File", file,
            ...buildArgsFromParams(params || {}),
            "-ScriptLoc", baseDir,
        ];

        console.log("child", psExe, psArgs.join(" "));
        const child = spawn(psExe, psArgs, { windowsVerbatimArguments: true });

        socket.emit("ps_start", { script });
        child.stdout.on("data", (d) => socket.emit("ps_stdout", d.toString()));
        child.stderr.on("data", (d) => socket.emit("ps_stderr", d.toString()));
        child.on("error", (err) => socket.emit("ps_error", { message: err.message }));
        child.on("close", (code) => socket.emit("ps_done", { code }));

        socket.once("cancel_ps", () => {
            try { child.kill(); } catch { }
            socket.emit("ps_done", { code: -1 });
        });
    });
});


httpServer.listen(port, () => {
    console.log(`Socket.IO server running on http://localhost:${port}`);
});
