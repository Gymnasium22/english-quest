"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Mark } from "@/components/Marks";
import { TopBar } from "@/components/Shell";
import { useProgress } from "@/lib/progress";
import { activityHref, unitById, type QuestUnit } from "@/lib/units";

/**
 * Общая страница модуля: шапка, карточка модуля, список заданий и блок повторения.
 * Unit 1 показывал kicker в верхнем регистре, полосу прогресса модуля, цвет у
 * подписи «Готово» и ссылку «К повторению» с другим текстом пустого списка —
 * эти различия описаны в MODULE_HUB_COPY.
 */
type ModuleHubCopy = {
  kickerUppercase: boolean;
  showModuleProgress: boolean;
  doneColored: boolean;
  reviewLink: boolean;
  needsEmpty: string;
};

const MODULE_HUB_COPY: Record<QuestUnit, ModuleHubCopy> = {
  unit1: {
    kickerUppercase: true,
    showModuleProgress: true,
    doneColored: true,
    reviewLink: true,
    needsEmpty: "Пока пусто. Здесь появятся слова, в которых вы ошиблись или которые отметили для повторения.",
  },
  unit2: {
    kickerUppercase: false,
    showModuleProgress: false,
    doneColored: false,
    reviewLink: false,
    needsEmpty: "Пока пусто.",
  },
  unit3: {
    kickerUppercase: false,
    showModuleProgress: false,
    doneColored: false,
    reviewLink: false,
    needsEmpty: "Пока пусто.",
  },
  unit4: {
    kickerUppercase: false,
    showModuleProgress: false,
    doneColored: false,
    reviewLink: false,
    needsEmpty: "Пока пусто.",
  },
  unit6: {
    kickerUppercase: false,
    showModuleProgress: false,
    doneColored: false,
    reviewLink: false,
    needsEmpty: "Пока пусто.",
  },
};

export function ModuleHub({ unitId }: { unitId: QuestUnit }) {
  const { slug } = useParams<{ slug: string }>();
  const spec = unitById(unitId);
  const copy = MODULE_HUB_COPY[unitId];
  const mod = spec.modules.find((m) => m.id === slug);
  const { state, moduleProgress, practiceIds } = useProgress();
  if (!mod) return <p>Модуль не найден.</p>;
  const acts = spec.activitiesFor(mod.id);
  const needs = practiceIds.slice(0, 8);
  const pct = moduleProgress(mod.id);
  return (
    <main>
      <TopBar title={mod.title} meta={`${pct}%`} />
      <section className="glass mb-5 overflow-hidden rounded-3xl p-5 sm:p-8" style={{ boxShadow: `inset 4px 0 0 ${mod.accent}` }}>
        <div className="inline-block rounded-2xl p-2" style={{ background: mod.wash }}><Mark tone={mod.tone} accent={mod.accent} /></div>
        <p className="mt-3 text-xs tracking-[0.2em]" style={{ color: mod.accent }}>{copy.kickerUppercase ? mod.kicker.toUpperCase() : mod.kicker}</p>
        <h2 className="text-4xl">{mod.countLabel}</h2>
        <p className="mt-2 text-stone-600">{acts.length} заданий · прогресс {pct}%</p>
        {copy.showModuleProgress ? (
          <div className="mt-3 h-1.5 max-w-xs rounded-full bg-stone-900/10"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: mod.accent }} /></div>
        ) : null}
        <Link href={activityHref(unitId, mod.id, acts[0]?.id ?? "")} className="mt-4 inline-flex min-h-12 items-center rounded-full px-6 text-white" style={{ background: mod.accent }}>Начать практику</Link>
      </section>
      <h3 className="mb-3 text-sm tracking-[0.16em] text-stone-500">Задания</h3>
      <ul className="grid gap-3">
        {acts.map((a, i) => {
          const done = state.completed.includes(`${mod.id}/${a.id}`);
          return (
            <li key={a.id}>
              <Link href={activityHref(unitId, mod.id, a.id)} className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-4">
                <span className="min-w-0">
                  <span className="text-sm" style={{ color: mod.accent }}>0{i + 1} · {a.mechanic}</span>
                  <span className="mt-1 block text-sm font-normal text-stone-700">{a.heading}</span>
                  <span className="mt-1 block text-sm text-stone-500">Вопросов: {a.questions.length}</span>
                </span>
                <span className="shrink-0 text-sm" style={copy.doneColored ? { color: done ? mod.accent : undefined } : undefined}>{done ? "Готово" : "Открыть"}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <section className="mt-6">
        <h3 className="text-sm tracking-[0.16em] text-stone-500">Нужно повторить</h3>
        <p className="mt-2 text-stone-700">{needs.length ? needs.join(", ") : copy.needsEmpty}</p>
        {copy.reviewLink ? <Link href="/review" className="mt-3 inline-flex min-h-11 items-center text-sm underline">К повторению</Link> : null}
      </section>
    </main>
  );
}
