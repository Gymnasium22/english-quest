"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { Mark } from "@/components/Marks";
import { useProgress } from "@/lib/progress";
import { finalHref, unitById, type QuestUnit } from "@/lib/units";
import { listeningForUnit } from "@/data/listening";

/**
 * Общий хаб юнита: герой, список модулей и вход в финальное испытание.
 * Три исходные страницы (Family / Environmental Issues / Choosing a Career)
 * отличались только текстами героя, подписью кнопки, цветом полосы прогресса,
 * анимацией карточек и текстами/цветом финального блока — они собраны в HUB_COPY.
 */
type HubCopy = {
  /** Заголовок героя: разбивка строк уникальна для каждого юнита. */
  heading: ReactNode;
  intro: string;
  startLabel: string;
  /** Класс полосы прогресса: в исходниках цвета различались. */
  progressClass: string;
  /** В Unit 1 карточки модулей несли rise/hover-анимацию, во 2 и 3 — нет. */
  animated: boolean;
  finalTitle: string;
  finalText: string;
  finalCtaClass: string;
};

function listenCountLabel(n: number) {
  if (n === 4) return "Четыре записи";
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} запись`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} записи`;
  return `${n} записей`;
}

const HUB_COPY: Record<QuestUnit, HubCopy> = {
  unit1: {
    heading: (
      <>
        Family
        <br />
        English Quest
      </>
    ),
    intro: "Пять модулей Unit 1: словарь, идиомы, коллокации, предлоги и word building.",
    startLabel: "Начать Unit 1",
    progressClass: "h-full rounded-full bg-[#1f6f6a]",
    animated: true,
    finalTitle: "Final Family Challenge",
    finalText: "Смешанные вопросы по всему Unit 1.",
    finalCtaClass: "mt-4 inline-flex min-h-12 items-center rounded-full bg-[#8a3d4b] px-6 text-white sm:mt-0",
  },
  unit2: {
    heading: (
      <>
        Environmental
        <br />
        Issues
      </>
    ),
    intro: "Природа, погода и экологические проблемы.",
    startLabel: "Начать практику",
    progressClass: "h-full rounded-full bg-[#3E6B4F]",
    animated: false,
    finalTitle: "Final Nature Challenge",
    finalText: "Смешанные задания из всех модулей Unit 2.",
    finalCtaClass: "mt-4 inline-flex min-h-12 items-center rounded-full bg-[#3E6B4F] px-6 text-white sm:mt-0",
  },
  unit3: {
    heading: (
      <>
        Choosing a
        <br />
        Career
      </>
    ),
    intro: "Работа, собеседование и карьера.",
    startLabel: "Начать практику",
    progressClass: "h-full rounded-full bg-[#1F4E79]",
    animated: false,
    finalTitle: "Final Career Challenge",
    finalText: "Смешанные задания из всех модулей Unit 3.",
    finalCtaClass: "mt-4 inline-flex min-h-12 items-center rounded-full bg-[#1F4E79] px-6 text-white sm:mt-0",
  },
  unit4: {
    heading: (
      <>
        Путешествия
        <br />
        и отдых
      </>
    ),
    intro: "Два модуля Unit 4: словарь и идиомы. Аудирование финал не открывает.",
    startLabel: "Начать практику",
    progressClass: "h-full rounded-full bg-[#0F6E6A]",
    animated: false,
    finalTitle: "Final Travel Challenge",
    finalText: "Смешанные задания из модулей Unit 4.",
    finalCtaClass: "mt-4 inline-flex min-h-12 items-center rounded-full bg-[#0F6E6A] px-6 text-white sm:mt-0",
  },
  unit6: {
    heading: (
      <>
        Беларусь
      </>
    ),
    intro: "Страна, еда и места: словарь, глаголы и коллокации.",
    startLabel: "Начать практику",
    progressClass: "h-full rounded-full bg-[#8E3A3A]",
    animated: false,
    finalTitle: "Final Belarus Challenge",
    finalText: "Смешанные задания из модулей Unit 6.",
    finalCtaClass: "mt-4 inline-flex min-h-12 items-center rounded-full bg-[#8E3A3A] px-6 text-white sm:mt-0",
  },
};

const CARD_CLASS = {
  plain: "glass group rise grid gap-4 rounded-3xl border-l-4 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-5",
  animated: "glass group rise grid gap-4 rounded-3xl border-l-4 p-4 transition hover:-translate-y-0.5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-5",
} as const;

const CARD_LINK_CLASS = {
  plain: "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-white",
  animated: "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-white transition group-hover:brightness-110",
} as const;

export function UnitHub({ unitId }: { unitId: QuestUnit }) {
  const spec = unitById(unitId);
  const copy = HUB_COPY[unitId];
  const { state, moduleProgress, unitProgress, finalReady, tasksLeftForFinal, headerXp, selectUnit } = useProgress();
  useEffect(() => {
    selectUnit(unitId);
    sessionStorage.setItem("eq-hub", spec.hubHref);
  }, [unitId, spec.hubHref, selectUnit]);
  const finalOpen = finalReady;
  const cardClass = copy.animated ? CARD_CLASS.animated : CARD_CLASS.plain;
  const cardLinkClass = copy.animated ? CARD_LINK_CLASS.animated : CARD_LINK_CLASS.plain;
  return (
    <main>
      <section className="glass rise relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
        <p className="text-xs tracking-[0.28em] text-stone-500">{spec.brand.kicker}</p>
        <h1 className="mt-3 max-w-xl text-5xl leading-[0.95] sm:text-7xl">{copy.heading}</h1>
        <p className="mt-4 max-w-lg text-stone-700">{copy.intro}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href={spec.modules[0].href} className="inline-flex min-h-12 items-center rounded-full bg-stone-900 px-6 text-[#f4efe6]">{copy.startLabel}</Link>
          <Link href="/quick-practice" onClick={() => selectUnit(unitId)} className="inline-flex min-h-12 items-center rounded-full border border-stone-300 bg-white/70 px-5">Быстрая практика · 5</Link>
        </div>
        <div className="mt-8 max-w-md">
          <div className="mb-1 flex justify-between text-xs tracking-widest text-stone-500"><span>UNIT PROGRESS</span><span>{unitProgress}%</span></div>
          <div className="h-2 rounded-full bg-stone-900/10"><div className={copy.progressClass} style={{ width: `${unitProgress}%` }} /></div>
        </div>
        <div className="mt-4 flex gap-4 text-sm text-stone-600 sm:hidden">
          <span>XP {headerXp}</span>
          <span>Лучшая серия {state.bestStreak}</span>
          <span>Дни {state.dayStreak}</span>
        </div>
      </section>
      <ol className="mt-6 grid gap-4">
        {spec.modules.map((m, i) => {
          const pct = moduleProgress(m.id);
          const acts = spec.activitiesFor(m.id);
          const done = acts.filter((a) => state.completed.includes(`${m.id}/${a.id}`)).length;
          const total = acts.length;
          const status = pct === 100 ? "Пройдено" : "Доступно";
          return (
            <li key={m.id} className={cardClass} style={copy.animated ? { animationDelay: `${i * 40}ms`, borderLeftColor: m.accent } : { borderLeftColor: m.accent }}>
              <div className="rounded-2xl p-2" style={{ background: m.wash }}><Mark tone={m.tone} accent={m.accent} /></div>
              <div>
                <div className="text-xs tracking-[0.18em]" style={{ color: m.accent }}>0{i + 1} · {status}</div>
                <h2 className="text-2xl sm:text-3xl">{m.title}</h2>
                <p className="text-sm text-stone-600">{m.kicker} · {m.countLabel}</p>
                <p className="mt-2 text-sm">{done} из {total} заданий</p>
                <div className="mt-2 h-1.5 max-w-xs rounded-full bg-stone-900/10"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: m.accent }} /></div>
              </div>
              <Link href={m.href} className={cardLinkClass} style={{ background: m.accent }}>Начать</Link>
            </li>
          );
        })}
        {(() => {
          const tracks = listeningForUnit(unitId);
          const done = tracks.filter((t) => state.completed.includes(`listen/${t.id}`)).length;
          const wash = spec.modules[0]?.wash ?? "#F8E6D8";
          return (
            <li className={cardClass} style={copy.animated ? { animationDelay: `${spec.modules.length * 40}ms`, borderLeftColor: spec.accent } : { borderLeftColor: spec.accent }}>
              <div className="rounded-2xl p-2" style={{ background: wash }}><Mark tone="blue" accent={spec.accent} /></div>
              <div>
                <div className="text-xs tracking-[0.18em]" style={{ color: spec.accent }}>{String(spec.modules.length + 1).padStart(2, "0")} · Доступно</div>
                <h2 className="text-2xl sm:text-3xl">Аудирование</h2>
                <p className="text-sm text-stone-600">{listenCountLabel(tracks.length)}</p>
                <p className="mt-2 text-sm">{done} из {tracks.length} заданий</p>
                <div className="mt-2 h-1.5 max-w-xs rounded-full bg-stone-900/10"><div className="h-full rounded-full" style={{ width: `${tracks.length ? Math.round((done / tracks.length) * 100) : 0}%`, background: spec.accent }} /></div>
              </div>
              <Link href="/listen" onClick={() => selectUnit(unitId)} className={cardLinkClass} style={{ background: spec.accent }}>Начать</Link>
            </li>
          );
        })()}
        <li className="glass rounded-[1.8rem] p-5 sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="text-xs tracking-[0.18em] text-stone-500">{finalOpen || state.finalDone ? "Доступно" : "Закрыто"}</div>
            <h2 className="text-3xl">{copy.finalTitle}</h2>
            <p className="text-sm text-stone-600">{finalOpen ? copy.finalText : `Откроется после одного завершённого задания в каждом модуле. Осталось модулей: ${tasksLeftForFinal}.`}</p>
          </div>
          {finalOpen || state.finalDone ? (
            <Link href={finalHref(unitId)} className={copy.finalCtaClass}>Начать</Link>
          ) : (
            <span className="mt-4 inline-flex min-h-12 items-center rounded-full bg-stone-200 px-6 text-stone-500 sm:mt-0">Закрыто</span>
          )}
        </li>
      </ol>
    </main>
  );
}
