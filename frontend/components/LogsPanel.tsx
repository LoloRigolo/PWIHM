"use client";

export function LogsPanel({ logs }: { logs: string }) {
    return (
        <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Logs</h3>
            <pre className="rounded-md bg-muted p-4 text-sm whitespace-pre-wrap leading-relaxed min-h-[120px]">
                {logs || "(aucun log pour le moment)"}
            </pre>
        </div>
    );
}