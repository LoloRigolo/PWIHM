"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackHeader({ onBack, label = "Retour" }: { onBack: () => void; label?: string }) {
    return (
        <header className="flex items-center gap-3">
            <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
                <h1 className="text-xl ">{label}</h1>
            </Button>
        </header>
    );
}