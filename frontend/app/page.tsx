import { ScriptsGrid } from "@/components/ScriptsGrid";


export default function Home() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-center">PWIHM</h1>
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight">PowerShell Web IHM</h2>
                <p className="text-muted-foreground">Choisis un script à lancer.</p>
            </div>
            <ScriptsGrid />
        </main>
    );
}