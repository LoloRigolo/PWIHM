import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SCRIPTS } from "@/lib/scripts";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type ScriptItem = (typeof SCRIPTS)[number];

export function findScriptBySlug(slug: string | string[] | undefined) {
  if (!slug) return undefined;
  const key = Array.isArray(slug) ? slug[0] : slug;
  return SCRIPTS.find((s) => s.slug === key);
}