"use client";

import { useProgress } from "@/lib/progress";
import { SERIES_AWARD, UNITS, achievementStatus, seriesUnlocked } from "@/lib/units";
import { TopBar } from "@/components/Shell";

export default function AchievementsPage() {
  const { family, env, career } = useProgress();
  const states = { unit1: family, unit2: env, unit3: career };
  const days = Math.max(family.dayStreak, env.dayStreak, career.dayStreak);
  const seriesOn = seriesUnlocked([family.dayStreak, env.dayStreak, career.dayStreak]);
  return (
    <main>
      <TopBar title="Достижения" />
      {UNITS.map((unit) => (
        <section key={unit.id} className="mb-8">
          <h2 className="mb-3 text-sm tracking-[0.16em] text-stone-500">{unit.title.toUpperCase()}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {unit.achievements.map((achievement) => {
              const { on, label } = achievementStatus(unit.id, states[unit.id], achievement.id);
              const big = achievement.kind === "final";
              return (
                <li
                  key={achievement.id}
                  className={`rounded-[1.6rem] border p-5 ${big ? "sm:col-span-2 sm:p-8" : ""} ${on ? "border-stone-900 bg-stone-900 text-[#f4efe6]" : "border-stone-200 bg-white/70 text-stone-500"}`}
                >
                  <div className="text-xs tracking-[0.18em]">{label}</div>
                  <h2 className={`mt-2 text-inherit ${big ? "text-4xl" : "text-2xl"}`}>{achievement.title}</h2>
                  {achievement.titleEn ? <p className="mt-1 text-xs tracking-[0.12em] opacity-60">{achievement.titleEn}</p> : null}
                  <p className="mt-1 text-sm opacity-80">{achievement.text}</p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      <section className="mb-8">
        <h2 className="mb-3 text-sm tracking-[0.16em] text-stone-500">СЕРИЯ</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          <li className={`rounded-[1.6rem] border p-5 ${seriesOn ? "border-stone-900 bg-stone-900 text-[#f4efe6]" : "border-stone-200 bg-white/70 text-stone-500"}`}>
            <div className="text-xs tracking-[0.18em]">{seriesOn ? "Открыто" : `${Math.min(days, 3)} из 3`}</div>
            <h2 className="mt-2 text-2xl text-inherit">{SERIES_AWARD.title}</h2>
            <p className="mt-1 text-sm opacity-80">{SERIES_AWARD.text}</p>
          </li>
        </ul>
      </section>
    </main>
  );
}
