"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ScriptParam } from "@/lib/scripts";

interface ScriptItem {
    slug: string;
    title: string;
    description?: string;
    params?: ScriptParam[];
}

export function useScriptForm(item?: ScriptItem) {
    const [form, setForm] = useState<Record<string, string | number | boolean>>({});
    const [logs, setLogs] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!item) return;
        const next: Record<string, string | number | boolean> = {};

        if (item.params) {
            for (const p of item.params) {
                if (p.default !== undefined) {
                    next[p.key] = p.default as string;
                } else if (p.type === "checkbox") {
                    next[p.key] = false;
                } else {
                    next[p.key] = "";
                }
            }
        }
    }, [item]);

    const setField = useCallback((p: ScriptParam, val: any) => {
        setForm((f) => ({
            ...f,
            [p.key]: p.type === "number" ? Number(val) : val,
        }));
    }, []);

    const missingRequired = useMemo(() => {
        if (!item?.params) return [] as ScriptParam[];
        return item.params.filter(
            (p) => p.required && (form[p.key] === undefined || form[p.key] === "")
        );
    }, [item, form]);

    return { form, setField, missingRequired, logs, loading, setLogs, setLoading };
}