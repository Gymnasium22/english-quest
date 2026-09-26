"use client";

import { MODULES } from "@/data/unit1";
import { itemLabel } from "@/lib/questions";
import { useProgress } from "@/lib/progress";
import { TopBar } from "@/components/Shell";

export default function ProgressPage() {
  const { state, moduleProgress, practiceIds, masteredIds } = useProgress();
  const attempts = Object.values(state.items).reduce((a, s) => a + s.correct + s.wrong, 0);
  const correct = Object.values(state.items).reduce((a, s) => a + s.correct, 0);
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
  return (
    <main>
      <TopBar title="Прогресс" meta={`${state.xp} XP`} />
      <section className="grid gap-3 sm:grid-cols-3">
        <Card label="Точность" value={`${accuracy}%`} />
        <Card label="Лучшая серия" value={String(state.bestStreak)} />
        <Card label="Дней подряд" value={String(state.dayStreak)} />
      </section>
      <ul className="mt-5 grid gap-3">
        {MODULES.map((m) => (
          <li key={m.id} className="glass rounded-3xl p-4">
            <div className="flex justify-between"><span>{m.title}</span><span>{moduleProgress(m.id)}%</span></div>
            <div className="mt-2 h-2 rounded-full bg-stone-900/10"><div className="h-full rounded-full" style={{ width: `${moduleProgress(m.id)}%`, background: m.accent }} /></div>
          </li>
        ))}
      </ul>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <h2 className="text-xl">Уже получается</h2>
          <p className="mt-2 text-sm text-stone-700">{masteredIds.length ? masteredIds.map(itemLabel).join(", ") : "Пока нет слов, которые вы верно вспомнили дважды."}</p>
        </div>
        <div>
          <h2 className="text-xl">Нужно повторить</h2>
          <p className="mt-2 text-sm text-stone-700">{practiceIds.length ? practiceIds.map(itemLabel).join(", ") : "Список пока пуст."}</p>
        </div>
      </section>
    </main>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return <div className="glass rounded-3xl p-4"><div className="text-xs tracking-widest text-stone-500">{label}</div><div className="mt-1 text-3xl">{value}</div></div>;
}
