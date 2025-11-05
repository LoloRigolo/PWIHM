"use client";
import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { SCRIPTS } from "@/lib/scripts";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Play } from "lucide-react";
import { BackHeader } from "@/components/BackHeader";
import { ParamsForm } from "@/components/ParamsForm";
import { LogsPanel } from "@/components/LogsPanel";
import { useScriptForm } from "@/hooks/useScriptForm";


export default function ScriptRunnerPage() {
    const params = useParams<{ slug: string }>();
    const router = useRouter();
    const item = useMemo(() => SCRIPTS.find((s) => s.slug === params.slug), [params.slug]);
    const { form, setField, runScript, logs, loading } = useScriptForm(item);

    if (!item) {
        router.replace("/");
        return null;
    }

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
                        <Button onClick={runScript} disabled={loading} className="shrink-0">
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