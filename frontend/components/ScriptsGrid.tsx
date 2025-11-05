"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { SCRIPTS } from "@/lib/scripts";


export function ScriptsGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SCRIPTS.map((s) => (
                <Link key={s.slug} href={`/scripts/${s.slug}`}>
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="flex flex-col gap-3 p-6 justify-between min-h-[220px]">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant="secondary">Script</Badge>
                                    {s.params && s.params.length > 0 && <Badge>Paramètres</Badge>}
                                </div>
                                <h3 className="text-xl font-semibold leading-tight">{s.title}</h3>
                                {s.description && (
                                    <p className="text-sm text-muted-foreground line-clamp-3">{s.description}</p>
                                )}
                            </div>
                            <div className="flex justify-end underline-offset-4 hover:underline">
                                <div className="inline-flex items-center gap-2 text-sm font-medium ">
                                    Ouvrir <ArrowRight className="h-4 w-4" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))
            }
        </div >
    );
}