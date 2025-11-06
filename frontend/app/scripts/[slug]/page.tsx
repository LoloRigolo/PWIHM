"use client";
import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Play, Square } from "lucide-react";
import { BackHeader } from "@/components/BackHeader";
import { ParamsForm } from "@/components/ParamsForm";
import { LogsPanel } from "@/components/LogsPanel";
import { useScriptForm } from "@/hooks/useScriptForm";
import { cancelProcess, onProcessEvents, runProcess } from "@/lib/process";
import { findScriptBySlug } from "@/lib/utils";

export default function ScriptRunnerPage() {
    const params = useParams<{ slug: string }>();
    const router = useRouter();

    const item = useMemo(() => findScriptBySlug(params.slug), [params.slug]);

    const { form, setField, logs, loading, setLogs, setLoading } = useScriptForm(item);
    useEffect(() => {
        if (!item) {
            router.replace("/");
            return;
        }

        const unsubscribe = onProcessEvents({
            onStdout: (data) => setLogs((prev) => prev + data),
            onStderr: (data) => setLogs((prev) => prev + `\n[stderr] ${data}`),
            onError: (message) => {
                setLogs((prev) => prev + `\nError: ${message}`);
                setLoading(false);
            },
            onDone: (code) => {
                setLogs((prev) => prev + `\n\nFinished with code ${code}`);
                setLoading(false);
            },
        });

        return () => unsubscribe();
    }, [item, router, setLogs, setLoading]);

    if (!item) return null;
    const runScriptLive = () => {
        setLogs("");
        setLoading(true);
        runProcess(item.slug, form);
    };
    const cancel = () => {
        cancelProcess(item.slug);
        setLoading(false);
    };
    return (
        <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
            <BackHeader onBack={() => router.back()} label="Retour" />
            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <Badge variant="secondary">Script</Badge>
                            <h2 className="text-2xl font-bold leading-tight">{item.title}</h2>
                            {item.description && (
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={runScriptLive} disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> En cours…
                                    </>
                                ) : (
                                    <>
                                        <Play className="mr-2 h-4 w-4" /> Lancer
                                    </>
                                )}
                            </Button>
                            <Button variant="destructive" onClick={cancel} disabled={!loading}>
                                <Square className="mr-2 h-4 w-4" /> Annuler
                            </Button>
                        </div>
                    </div>

                    {item.params && item.params.length > 0 && (
                        <div className="space-y-4">
                            <Separator />
                            <ParamsForm params={item.params} form={form} setField={setField} />
                        </div>
                    )}

                    <Separator />

                    <LogsPanel logs={logs} />
                </CardContent>
            </Card>
        </main>
    );
}