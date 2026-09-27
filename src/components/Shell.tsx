"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS, ACHIEVEMENTS_ENV, useProgress } from "@/lib/progress";

function brand(path: string, unit: string) {
  if (path === "/") return { kicker: "ENGLISH QUEST", title: "QUEST", sub: "English Quest" };
  if (path.startsWith("/env") || path.startsWith("/unit/environmental")) return { kicker: "UNIT 2", title: "NATURE", sub: "Environmental Issues" };
  if (path.startsWith("/unit/family") || path.startsWith("/module") || path === "/final") return { kicker: "UNIT 1", title: "FAMILY", sub: "English Quest" };
  if (unit === "unit2") return { kicker: "UNIT 2", title: "NATURE", sub: "Environmental Issues" };
  return { kicker: "UNIT 1", title: "FAMILY", sub: "English Quest" };
}

const links = [
  { href: "/", label: "Карта" },
  { href: "/glossary", label: "Словарь" },
  { href: "/review", label: "Повтор" },
  { href: "/progress", label: "Прогресс" },
  { href: "/achievements", label: "Награды" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const inTask = /^\/(env\/)?module\/[^/]+\/[^/]+/.test(path);
  const menu = inTask ? links.filter((l) => l.href !== "/glossary") : links;
  const { state, ready, headerXp, currentUnit } = useProgress();
  const [toast, setToast] = useState<string | null>(null);
  const seen = useRef<string[] | null>(null);
  useEffect(() => {
    if (path === "/" || path === "/unit/family" || path === "/unit/environmental") {
      sessionStorage.setItem("eq-hub", path);
    }
  }, [path]);
  useEffect(() => {
    if (!ready) return;
    if (seen.current === null) {
      seen.current = state.achievements;
      return;
    }
    const fresh = state.achievements.find((id) => !seen.current?.includes(id));
    seen.current = state.achievements;
    if (!fresh) return;
    const item = [...ACHIEVEMENTS, ...ACHIEVEMENTS_ENV].find((a) => a.id === fresh);
    setToast(item ? `${item.title}. ${item.text}` : fresh);
    const timer = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timer);
  }, [state.achievements, ready]);
  return (
    <div className="nav-safe mx-auto min-h-screen w-full max-w-6xl px-4 pt-4 sm:px-6">
      <header className="glass rise mb-5 flex items-center justify-between gap-3 rounded-3xl px-4 py-3 sm:px-5">
        <Link href="/" className="min-w-0">
          <div className="text-[11px] tracking-[0.22em] text-stone-500">{brand(path, currentUnit).kicker}</div>
          <div className="display truncate text-xl leading-none sm:text-2xl">{brand(path, currentUnit).title}</div>
          <div className="-mt-0.5 text-sm text-stone-600">{brand(path, currentUnit).sub}</div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {menu.map((l) => (
            <Link key={l.href} href={l.href} className={`rounded-full px-3 py-2 text-sm ${path === l.href ? "bg-stone-900 text-[#f4efe6]" : "text-stone-700"}`}>{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-sm">
          <Stat label="XP" value={String(headerXp)} />
          <Stat label="Лучшая серия" value={String(state.bestStreak)} />
          <Link href="/settings" className="grid h-11 w-11 place-items-center rounded-2xl bg-stone-900 text-sm text-[#f4efe6]" aria-label="Настройки">
            {state.name.slice(0, 1).toUpperCase()}
          </Link>
        </div>
      </header>
      {children}
      {toast ? <div className="fixed bottom-24 left-1/2 z-30 w-[min(92vw,24rem)] -translate-x-1/2 rounded-2xl bg-stone-900 px-4 py-3 text-sm text-[#f4efe6] shadow-lg md:bottom-6">{toast}</div> : null}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-900/10 bg-[#f7f3ec]/95 px-2 py-2 backdrop-blur md:hidden" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
        <ul className={`mx-auto grid max-w-lg gap-1 ${menu.length === 5 ? "grid-cols-5" : "grid-cols-4"}`}>
          {menu.map((l) => {
            const on = path === l.href;
            return (
              <li key={l.href}>
                <Link href={l.href} className={`block rounded-2xl px-0.5 py-2 text-center text-[11px] leading-tight ${on ? "bg-stone-900 text-[#f4efe6]" : "text-stone-700"}`}>
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function UnitSwitch() {
  const { currentUnit, selectUnit } = useProgress();
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <button type="button" data-unit="unit1" onClick={() => selectUnit("unit1")} className={`min-h-11 rounded-full px-4 text-sm ${currentUnit === "unit1" ? "bg-stone-900 text-[#f4efe6]" : "border border-stone-300"}`}>Family</button>
      <button type="button" data-unit="unit2" onClick={() => selectUnit("unit2")} className={`min-h-11 rounded-full px-4 text-sm ${currentUnit === "unit2" ? "bg-stone-900 text-[#f4efe6]" : "border border-stone-300"}`}>Environmental Issues</button>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="hidden min-w-16 rounded-2xl bg-white/70 px-3 py-1.5 text-right sm:block">
      <div className="text-[10px] tracking-widest text-stone-500">{label}</div>
      <div className="font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function hubBack(path: string) {
  if (path.startsWith("/env") || path === "/env/final") return "/unit/environmental";
  if (path.startsWith("/module") || path === "/final") return "/unit/family";
  if (path.startsWith("/unit/")) return "/";
  if (typeof sessionStorage !== "undefined") return sessionStorage.getItem("eq-hub") || "/";
  return "/";
}

export function TopBar({ title, meta, backHref }: { title: string; meta?: string; backHref?: string }) {
  const path = usePathname();
  const back = backHref ?? hubBack(path);
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <Link href={back} className="text-sm text-stone-600 underline-offset-4 hover:underline">← Назад</Link>
        <h1 className="mt-1 text-3xl sm:text-4xl">{title}</h1>
      </div>
      {meta ? <div className="text-sm text-stone-600">{meta}</div> : null}
    </div>
  );
}
