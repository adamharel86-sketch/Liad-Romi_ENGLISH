import React, { useState } from "react";

// Lightweight "keep the kids out" gate for the parent area. Not real
// security (there's no backend / real auth in this demo app) - just a
// simple speed bump so a child clicking around doesn't wander into the
// parent dashboard by accident. The word is fixed ("admin") rather than a
// parent-configurable PIN, by design, to keep this dead simple.
const SESSION_KEY = "wordup:v1:parentGateOk";
const ADMIN_WORD = "admin";

export function ParentGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  });
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim().toLowerCase() === ADMIN_WORD) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
      setValue("");
    }
  }

  if (authed) return <>{children}</>;

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-ink-900/[0.03] via-white to-brand-50">
      <form
        onSubmit={submit}
        className="max-w-sm w-full bg-white rounded-3xl shadow-sm border border-ink-300/15 p-6 text-center animate-pop"
      >
        <div className="text-4xl mb-3">🔒</div>
        <h1 className="font-display text-xl font-bold text-ink-900 mb-1">אזור ההורים</h1>
        <p className="text-ink-500 text-sm mb-5">אזור זה מיועד להורים בלבד. הזינו את מילת הכניסה כדי להמשיך.</p>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="מילת כניסה"
          className={`w-full rounded-xl border px-4 py-2.5 text-center outline-none transition-colors mb-3 ${
            error ? "border-bad-500 focus:border-bad-500" : "border-ink-300/30 focus:border-brand-500"
          }`}
        />
        {error && <p className="text-bad-600 text-sm mb-3">מילת הכניסה שגויה, נסו שוב.</p>}
        <button
          type="submit"
          className="w-full rounded-xl bg-brand-500 text-white font-semibold py-2.5 hover:bg-brand-600 transition-colors"
        >
          כניסה
        </button>
      </form>
    </div>
  );
}
