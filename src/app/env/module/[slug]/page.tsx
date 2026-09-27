"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ENV_MODULES } from "@/data/unit2";
import { envActivitiesFor } from "@/lib/questions-env";
import { useProgress } from "@/lib/progress";
import { TopBar } from "@/components/Shell";
import { Mark } from "@/components/Marks";

export default function EnvModulePage() {
  const { slug } = useParams<{ slug: string }>();
  const mod = ENV_MODULES.find((m) => m.id === slug);
  const { state, moduleProgress, practiceIds } = useProgress();
  if (!mod) return <p>Модуль не найден.</p>;
  const acts = envActivitiesFor(mod.id);
  const needs = practiceIds.slice(0, 8);
  return (
    <main>
      <TopBar title={mod.title} meta={`${moduleProgress(mod.id)}%`} />
      <section className="glass mb-5 overflow-hidden rounded-3xl p-5 sm:p-8" style={{ boxShadow: `inset 4px 0 0 ${mod.accent}` }}>
        <div className="inline-block rounded-2xl p-2" style={{ background: mod.wash }}><Mark tone={mod.tone} accent={mod.accent} /></div>
        <p className="mt-3 text-xs tracking-[0.2em]" style={{ color: mod.accent }}>{mod.kicker}</p>
        <h2 className="text-4xl">{mod.countLabel}</h2>
        <p className="mt-2 text-stone-600">{acts.length} заданий · прогресс {moduleProgress(mod.id)}%</p>
        <Link href={`/env/module/${mod.id}/${acts[0]?.id ?? ""}`} className="mt-4 inline-flex min-h-12 items-center rounded-full px-6 text-white" style={{ background: mod.accent }}>Начать практику</Link>
      </section>
      <h3 className="mb-3 text-sm tracking-[0.16em] text-stone-500">Задания</h3>
      <ul className="grid gap-3">
        {acts.map((a, i) => {
          const done = state.completed.includes(`${mod.id}/${a.id}`);
          return (
            <li key={a.id}>
              <Link href={`/env/module/${mod.id}/${a.id}`} className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-4">
                <span className="min-w-0"><span className="mr-2 text-sm" style={{ color: mod.accent }}>0{i + 1}</span><strong>{a.mechanic}</strong><span className="mt-1 block text-sm font-normal text-stone-700">{a.heading}</span><span className="mt-1 block text-sm text-stone-500">Вопросов: {a.questions.length}</span></span>
                <span className="shrink-0 text-sm">{done ? "Готово" : "Открыть"}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <section className="mt-6">
        <h3 className="text-sm tracking-[0.16em] text-stone-500">Нужно повторить</h3>
        <p className="mt-2 text-stone-700">{needs.length ? needs.join(", ") : "Пока пусто."}</p>
      </section>
    </main>
  );
}
