import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useStudentContext } from "../../context/StudentContext";
import { NAV_ITEMS, PARENT_NAV_ITEM } from "./navConfig";
import { Pill } from "../ui/Pill";

export function AppShell() {
  const { activeStudent } = useStudentContext();
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);

  if (!activeStudent) return <Outlet />;

  const primaryItems = NAV_ITEMS.filter((i) => i.primary);
  const secondaryItems = NAV_ITEMS.filter((i) => !i.primary);

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-60 shrink-0 border-l border-ink-300/15 bg-white/70 backdrop-blur-sm h-screen sticky top-0 py-5 px-3">
        <button
          onClick={() => navigate("/welcome")}
          className="flex items-center gap-3 rounded-2xl p-3 hover:bg-brand-50 transition-colors text-right"
        >
          <span className="text-3xl">{activeStudent.avatar}</span>
          <span className="flex-1">
            <div className="font-bold text-ink-900">{activeStudent.name}</div>
            <div className="text-xs text-ink-500">החלפת פרופיל</div>
          </span>
        </button>

        <div className="flex gap-2 px-3 mt-2 mb-4">
          <Pill emoji="⭐" tone="sun">{activeStudent.xp} XP</Pill>
          <Pill emoji="🔥" tone="coral">{activeStudent.streakDays} ימים</Pill>
        </div>

        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-thin">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 font-semibold transition-colors",
                  isActive ? "bg-brand-500 text-white shadow-sm" : "text-ink-700 hover:bg-brand-50",
                ].join(" ")
              }
            >
              <span className="text-xl">{item.emoji}</span>
              <span>{item.labelHe}</span>
            </NavLink>
          ))}
        </nav>

        <NavLink
          to={PARENT_NAV_ITEM.path}
          className={({ isActive }) =>
            [
              "flex items-center gap-3 rounded-xl px-3 py-2.5 font-semibold transition-colors mt-2 border-t border-ink-300/15 pt-4",
              isActive ? "bg-ink-900 text-white" : "text-ink-500 hover:bg-ink-900/5",
            ].join(" ")
          }
        >
          <span className="text-xl">{PARENT_NAV_ITEM.emoji}</span>
          <span>{PARENT_NAV_ITEM.labelHe}</span>
        </NavLink>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-ink-300/15 sticky top-0 z-30">
          <button onClick={() => navigate("/welcome")} className="flex items-center gap-2">
            <span className="text-2xl">{activeStudent.avatar}</span>
            <span className="font-bold text-ink-900">{activeStudent.name}</span>
          </button>
          <div className="flex gap-1.5">
            <Pill emoji="⭐" tone="sun">{activeStudent.xp}</Pill>
            <Pill emoji="🔥" tone="coral">{activeStudent.streakDays}</Pill>
          </div>
        </header>

        <main className="flex-1 min-w-0 pb-24 md:pb-0">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-ink-300/15 flex items-stretch shadow-[0_-4px_16px_rgba(41,22,112,0.08)]">
          {primaryItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  "flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-semibold",
                  isActive ? "text-brand-600" : "text-ink-500",
                ].join(" ")
              }
            >
              <span className="text-xl">{item.emoji}</span>
              <span>{item.labelHe}</span>
            </NavLink>
          ))}
          <button
            onClick={() => setMoreOpen(true)}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-semibold text-ink-500"
          >
            <span className="text-xl">⋯</span>
            <span>עוד</span>
          </button>
        </nav>

        {moreOpen && (
          <div className="fixed inset-0 z-40 bg-ink-900/40 flex items-end md:hidden" onClick={() => setMoreOpen(false)}>
            <div dir="rtl" className="bg-white w-full rounded-t-3xl p-4 pb-8 animate-pop" onClick={(e) => e.stopPropagation()}>
              <div className="w-10 h-1.5 bg-ink-300/30 rounded-full mx-auto mb-4" />
              <div className="grid grid-cols-4 gap-3">
                {[...secondaryItems, PARENT_NAV_ITEM].map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMoreOpen(false)}
                    className="flex flex-col items-center gap-1 rounded-2xl p-3 hover:bg-brand-50 text-ink-700"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-xs font-semibold text-center">{item.labelHe}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
