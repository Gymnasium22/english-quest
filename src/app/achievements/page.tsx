"use client";

import { useProgress } from "@/lib/progress";
import { UNITS } from "@/lib/units";
import { TopBar } from "@/components/Shell";

export default function AchievementsPage() {
  const { family, env, career } = useProgress();
  const states = { unit1: family, unit2: env, unit3: career };
  return (
    <main>
      <TopBar title="Достижения" />
      {UNITS.map((unit) => (
        <section key={unit.id} className="mb-8">
          <h2 className="mb-3 text-sm tracking-[0.16em] text-stone-500">{unit.title.toUpperCase()}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {unit.achievements.map((achievement) => {
              const on = states[unit.id].achievements.includes(achievement.id);
              return (
                <li key={achievement.id} className={`rounded-[1.6rem] border p-5 ${on ? "border-stone-900 bg-stone-900 text-[#f4efe6]" : "border-stone-200 bg-white/70 text-stone-500"}`}>
                  <div className="text-xs tracking-[0.18em]">{on ? "Открыто" : "Закрыто"}</div>
                  <h2 className="mt-2 text-2xl text-inherit">{achievement.title}</h2>
                  <p className="mt-1 text-sm opacity-80">{achievement.text}</p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
