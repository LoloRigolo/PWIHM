export function buildArgsFromParams(params: Record<string, string> = {}) {
    const args: string[] = [];
    for (const [k, v] of Object.entries(params)) {
        if (typeof v === "boolean") {
            if (v) args.push(`-${k}`);
        } else if (v !== undefined && v !== null && v !== "") {
            args.push(`-${k}`, String(v));
        }
    }
    return args;
}