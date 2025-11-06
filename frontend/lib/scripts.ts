export type ParamType = "text" | "number" | "password" | "select" | "checkbox";

export type ScriptParam = {
    key: string;
    label: string;
    type: ParamType;
    required?: boolean;
    placeholder?: string;
    options?: string[];
    default?: string | number | boolean;
};

export type ScriptItem = {
    slug: string;
    title: string;
    description?: string;
    params?: ScriptParam[];
};

export const SCRIPTS: ScriptItem[] = [
    {
        slug: "helloworld",
        title: "Hello",
        description: "Affiche \"Hello World from Powershell\"",
    },
    {
        slug: "hellouser",
        title: "Hello {User}",
        description: "Affiche \"Hello {user} !\"",
        params: [
            { key: "Name", label: "Prénom", type: "text", required: true, placeholder: "Toto" },
        ],
    },
    {
        slug: "showvms",
        title: "Show VMs",
        description: "Listes les VMs du folder QD",
        params: [
            { key: "username", label: "Username VSphere", type: "text", required: true },
            { key: "password", label: "Password VSphere", type: "password", required: true },
        ],
    },
    {
        slug: "backup",
        title: "Backup",
        description: "Déclenche un job de sauvegarde",
        params: [
            { key: "path", label: "Chemin à sauvegarder", type: "text", required: true, placeholder: "C:/data" },
            { key: "level", label: "Niveau", type: "select", options: ["full", "diff", "inc"], default: "full" },
            { key: "compress", label: "Compresser", type: "checkbox", default: true },
        ],
    },

];