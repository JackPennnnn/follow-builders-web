import { format, formatDistanceToNowStrict, isValid } from "date-fns";
import { enUS } from "date-fns/locale";

export function formatRelative(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (!isValid(d)) return "";
  return formatDistanceToNowStrict(d, { addSuffix: true, locale: enUS });
}

export function formatAbsolute(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (!isValid(d)) return "";
  return format(d, "yyyy-MM-dd HH:mm");
}

export function formatCount(n: number | null | undefined): string {
  if (n == null) return "0";
  if (n >= 10000) return `${(n / 1000).toFixed(1)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function pickLatest(...isoDates: Array<string | undefined | null>) {
  let latest: Date | null = null;
  for (const iso of isoDates) {
    if (!iso) continue;
    const d = new Date(iso);
    if (!isValid(d)) continue;
    if (!latest || d > latest) latest = d;
  }
  return latest ? latest.toISOString() : null;
}
