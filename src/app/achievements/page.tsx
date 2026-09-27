"use client";

import { ACHIEVEMENTS, ACHIEVEMENTS_ENV, useProgress } from "@/lib/progress";
import { TopBar } from "@/components/Shell";

export default function AchievementsPage() {
  const { family, env } = useProgress();
  return (
    <main>
      <TopBar title="Достижения" />
      <h2 className="mb-3 text-sm tracking-[0.16em] text-stone-500">FAMILY</h2>
      <ul className="mb-8 grid gap-3 sm:grid-cols-2">
        {ACHIEVEMENTS.map((a) => {
          const on = family.achievements.includes(a.id);
          return (
            <li key={a.id} className={`rounded-[1.6rem] border p-5 ${on ? "border-stone-900 bg-stone-900 text-[#f4efe6]" : "border-stone-200 bg-white/70 text-stone-500"}`}>
              <div className="text-xs tracking-[0.18em]">{on ? "Открыто" : "Закрыто"}</div>
              <h2 className="mt-2 text-2xl text-inherit">{a.title}</h2>
              <p className="mt-1 text-sm opacity-80">{a.text}</p>
            </li>
          );
        })}
      </ul>
      <h2 className="mb-3 text-sm tracking-[0.16em] text-stone-500">ENVIRONMENTAL ISSUES</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {ACHIEVEMENTS_ENV.map((a) => {
          const on = env.achievements.includes(a.id);
          return (
            <li key={a.id} className={`rounded-[1.6rem] border p-5 ${on ? "border-stone-900 bg-stone-900 text-[#f4efe6]" : "border-stone-200 bg-white/70 text-stone-500"}`}>
              <div className="text-xs tracking-[0.18em]">{on ? "Открыто" : "Закрыто"}</div>
              <h2 className="mt-2 text-2xl text-inherit">{a.title}</h2>
              <p className="mt-1 text-sm opacity-80">{a.text}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
