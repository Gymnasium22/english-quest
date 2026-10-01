"use client";

import Link from "next/link";
import { CAREER_MODULES } from "@/data/unit3";
import { careerActivitiesFor } from "@/lib/questions-career";
import { useProgress } from "@/lib/progress";
import { Mark } from "@/components/Marks";

export default function CareerUnitPage() {
  const { state, moduleProgress, unitProgress, finalReady, tasksLeftForFinal, headerXp, selectUnit } = useProgress();
  const finalOpen = finalReady;
  return (
    <main>
      <section className="glass rise relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
        <p className="text-xs tracking-[0.28em] text-stone-500">UNIT 3</p>
        <h1 className="mt-3 max-w-xl text-5xl leading-[0.95] sm:text-7xl">Choosing a<br />Career</h1>
        <p className="mt-4 max-w-lg text-stone-700">Работа, собеседование и карьера.</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href="/career/module/vocabulary" className="inline-flex min-h-12 items-center rounded-full bg-stone-900 px-6 text-[#f4efe6]">Начать практику</Link>
          <Link href="/quick-practice" onClick={() => selectUnit("unit3")} className="inline-flex min-h-12 items-center rounded-full border border-stone-300 bg-white/70 px-5">Быстрая практика · 5</Link>
        </div>
        <div className="mt-8 max-w-md">
          <div className="mb-1 flex justify-between text-xs tracking-widest text-stone-500"><span>UNIT PROGRESS</span><span>{unitProgress}%</span></div>
          <div className="h-2 rounded-full bg-stone-900/10"><div className="h-full rounded-full bg-[#1F4E79]" style={{ width: `${unitProgress}%` }} /></div>
        </div>
        <div className="mt-4 flex gap-4 text-sm text-stone-600 sm:hidden">
          <span>XP {headerXp}</span>
          <span>Лучшая серия {state.bestStreak}</span>
          <span>Дни {state.dayStreak}</span>
        </div>
      </section>
      <ol className="mt-6 grid gap-4">
        {CAREER_MODULES.map((m, i) => {
          const pct = moduleProgress(m.id);
          const done = careerActivitiesFor(m.id).filter((a) => state.completed.includes(`${m.id}/${a.id}`)).length;
          const total = careerActivitiesFor(m.id).length;
          const status = pct === 100 ? "Пройдено" : "Доступно";
          return (
            <li key={m.id} className="glass group rise grid gap-4 rounded-3xl border-l-4 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-5" style={{ borderLeftColor: m.accent }}>
              <div className="rounded-2xl p-2" style={{ background: m.wash }}><Mark tone={m.tone} accent={m.accent} /></div>
              <div>
                <div className="text-xs tracking-[0.18em]" style={{ color: m.accent }}>0{i + 1} · {status}</div>
                <h2 className="text-2xl sm:text-3xl">{m.title}</h2>
                <p className="text-sm text-stone-600">{m.kicker} · {m.countLabel}</p>
                <p className="mt-2 text-sm">{done} из {total} заданий</p>
                <div className="mt-2 h-1.5 max-w-xs rounded-full bg-stone-900/10"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: m.accent }} /></div>
              </div>
              <Link href={m.href} className="inline-flex min-h-12 items-center justify-center rounded-full px-6 text-white" style={{ background: m.accent }}>Начать</Link>
            </li>
          );
        })}
        <li className="glass rounded-[1.8rem] p-5 sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="text-xs tracking-[0.18em] text-stone-500">{finalOpen || state.finalDone ? "Доступно" : "Закрыто"}</div>
            <h2 className="text-3xl">Final Career Challenge</h2>
            <p className="text-sm text-stone-600">{finalOpen ? "Смешанные задания из всех модулей Unit 3." : `Откроется после одного завершённого задания в каждом модуле. Осталось модулей: ${tasksLeftForFinal}.`}</p>
          </div>
          {finalOpen || state.finalDone ? (
            <Link href="/career/final" className="mt-4 inline-flex min-h-12 items-center rounded-full bg-[#1F4E79] px-6 text-white sm:mt-0">Начать</Link>
          ) : (
            <span className="mt-4 inline-flex min-h-12 items-center rounded-full bg-stone-200 px-6 text-stone-500 sm:mt-0">Закрыто</span>
          )}
        </li>
      </ol>
    </main>
  );
}
