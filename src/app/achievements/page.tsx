"use client";

import { ACHIEVEMENTS, useProgress } from "@/lib/progress";
import { TopBar } from "@/components/Shell";

export default function AchievementsPage() {
  const { state } = useProgress();
  return (
    <main>
      <TopBar title="Достижения" />
      <ul className="grid gap-3 sm:grid-cols-2">
        {ACHIEVEMENTS.map((a) => {
          const on = state.achievements.includes(a.id);
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
