"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ScriptParam } from "@/lib/scripts";


export type FormValue = string | number | boolean;
export type FormState = Record<string, FormValue>;


export function ParamsForm({
    params,
    form,
    setField,
}: {
    params: ScriptParam[];
    form: FormState;
    setField: (p: ScriptParam, val: FormValue) => void;
}) {
    return (
        <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Paramètres</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {params.map((p) => (
                    <div key={p.key} className="space-y-2">
                        <Label htmlFor={p.key}>
                            {p.label}
                            {p.required && <span className="text-destructive"> *</span>}
                        </Label>

                        {(p.type === "text" || p.type === "number" || p.type === "password") && (
                            <Input
                                id={p.key}
                                type={p.type === "number" ? "number" : p.type}
                                placeholder={p.placeholder}
                                value={(form[p.key] as any) ?? ""}
                                onChange={(e) =>
                                    setField(
                                        p,
                                        p.type === "number"
                                            ? Number(e.target.value)
                                            : e.target.value
                                    )
                                }
                            />
                        )}

                        {p.type === "select" && (
                            <Select
                                onValueChange={(v) => setField(p, v)}
                                value={(form[p.key] as string) ?? (p.default as string) ?? undefined}
                            >
                                <SelectTrigger id={p.key}>
                                    <SelectValue placeholder={p.placeholder || "Choisir"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {p.options?.map((opt) => (
                                        <SelectItem key={opt} value={opt}>
                                            {opt}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {p.type === "checkbox" && (
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={p.key}
                                    checked={Boolean(form[p.key])}
                                    onCheckedChange={(v) => setField(p, Boolean(v))}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}