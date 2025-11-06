import { getSocket } from "@/lib/socket";

export type ProcessHandlers = {
    onStdout?: (data: string) => void;
    onStderr?: (data: string) => void;
    onError?: (message: string) => void;
    onDone?: (code: number) => void;
};

export function onProcessEvents(handlers: ProcessHandlers) {
    const socket = getSocket();

    const handleStdout = (data: string) => handlers.onStdout?.(data);
    const handleStderr = (data: string) => handlers.onStderr?.(data);
    const handleError = (err: { message: string }) => handlers.onError?.(err.message);
    const handleDone = ({ code }: { code: number }) => handlers.onDone?.(code);

    socket.off("ps_stdout");
    socket.off("ps_stderr");
    socket.off("ps_error");
    socket.off("ps_done");

    socket.on("ps_stdout", handleStdout);
    socket.on("ps_stderr", handleStderr);
    socket.on("ps_error", handleError);
    socket.on("ps_done", handleDone);

    return () => {
        socket.off("ps_stdout", handleStdout);
        socket.off("ps_stderr", handleStderr);
        socket.off("ps_error", handleError);
        socket.off("ps_done", handleDone);
    };
}

export function runProcess(scriptSlug: string, params: Record<string, unknown>) {
    const socket = getSocket();
    socket.emit("run_ps", { script: scriptSlug, params });
}

export function cancelProcess(scriptSlug: string) {
    const socket = getSocket();
    socket.emit("cancel_ps", { script: scriptSlug });
}