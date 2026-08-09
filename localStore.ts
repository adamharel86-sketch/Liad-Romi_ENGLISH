// Thin, namespaced wrapper around localStorage so the rest of the app
// never touches window.localStorage directly. Swapping this file for a
// real backend/API client later requires no changes anywhere else.

const NS = "wordup:v1:";

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(NS + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(NS + key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable (e.g. private mode) - fail silently,
    // the app should keep working in-memory for the session.
  }
}

export function removeKey(key: string): void {
  try {
    window.localStorage.removeItem(NS + key);
  } catch {
    /* noop */
  }
}

export function allKeysWithPrefix(prefix: string): string[] {
  const out: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (k && k.startsWith(NS + prefix)) out.push(k.slice(NS.length));
  }
  return out;
}

export function todayISODate(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function daysBetween(dateA: string, dateB: string): number {
  const a = new Date(dateA + "T00:00:00");
  const b = new Date(dateB + "T00:00:00");
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}
