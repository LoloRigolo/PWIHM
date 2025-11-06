"use client";

export async function runPs(slug: string, params: Record<string, string>) {
    const res = await fetch(`/api/run-ps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script: slug, params }),
    });
    return res.json();
}