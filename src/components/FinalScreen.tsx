"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Player } from "@/components/Player";
import { TopBar } from "@/components/Shell";
import { useProgress } from "@/lib/progress";
import { unitById, type QuestUnit } from "@/lib/units";

/**
 * Общий финальный экран юнита: закрытое состояние, приглашение и <Player>.
 * Различия исходных страниц — заголовок, текст приглашения, цвет кнопки,
 * адрес ссылки в закрытом состоянии и то, куда ведёт завершение финала
 * (Unit 1 → /progress, Unit 2 и 3 → хаб юнита). Всё это в FINAL_COPY.
 * moduleList, как и в исходниках, передают только Unit 2 и Unit 3.
 */
type FinalCopy = {
  title: string;
  intro: string;
  ctaClass: string;
  /** null — брать hubHref из реестра. */
  closedHref: string | null;
  closedLabel: string;
  /** null — брать hubHref из реестра. */
  onDoneHref: string | null;
};

const FINAL_COPY: Record<QuestUnit, FinalCopy> = {
  unit1: {
    title: "Final Family Challenge",
    intro: "Смешанные задания из всех пяти модулей. Это финал Unit 1.",
    ctaClass: "mt-6 min-h-12 rounded-full bg-[#8a3d4b] px-6 text-white",
    closedHref: "/",
    closedLabel: "К карте",
    onDoneHref: "/progress",
  },
  unit2: {
    title: "Final Nature Challenge",
    intro: "Смешанные задания из всех пяти модулей. Это финал Unit 2.",
    ctaClass: "mt-6 min-h-12 rounded-full bg-[#3E6B4F] px-6 text-white",
    closedHref: null,
    closedLabel: "К карте юнита",
    onDoneHref: null,
  },
  unit3: {
    title: "Final Career Challenge",
    intro: "Смешанные задания из всех пяти модулей. Это финал Unit 3.",
    ctaClass: "mt-6 min-h-12 rounded-full bg-[#1F4E79] px-6 text-white",
    closedHref: null,
    closedLabel: "К карте юнита",
    onDoneHref: null,
  },
  unit4: {
    title: "Final Travel Challenge",
    intro: "Смешанные задания из модулей словаря и идиом. Это финал Unit 4.",
    ctaClass: "mt-6 min-h-12 rounded-full bg-[#0F6E6A] px-6 text-white",
    closedHref: null,
    closedLabel: "К карте юнита",
    onDoneHref: null,
  },
  unit6: {
    title: "Final Belarus Challenge",
    intro: "Смешанные задания из модулей Unit 6. Это финал.",
    ctaClass: "mt-6 min-h-12 rounded-full bg-[#8E3A3A] px-6 text-white",
    closedHref: null,
    closedLabel: "К карте юнита",
    onDoneHref: null,
  },
};

export function FinalScreen({ unitId }: { unitId: QuestUnit }) {
  const spec = unitById(unitId);
  const copy = FINAL_COPY[unitId];
  const { state, finalReady, tasksLeftForFinal } = useProgress();
  const open = finalReady || state.finalDone;
  const [started, setStarted] = useState(false);
  const questions = useMemo(() => spec.final(), [spec]);
  const closedHref = copy.closedHref ?? spec.hubHref;
  const onDoneHref = copy.onDoneHref ?? spec.hubHref;
  if (!open) {
    return (
      <main>
        <TopBar title={copy.title} />
        <p className="glass rounded-3xl p-6">Финальное задание откроется, когда в каждом модуле будет завершено хотя бы одно задание. Осталось модулей: {tasksLeftForFinal}. <Link href={closedHref} className="underline">{copy.closedLabel}</Link></p>
      </main>
    );
  }
  return (
    <main>
      <TopBar title={copy.title} />
      {started ? (
        <Player title="Финал" questions={questions} finalMode onDoneHref={onDoneHref} moduleList={unitId === "unit1" ? undefined : spec.modules} />
      ) : (
        <section className="glass rounded-3xl p-6 sm:p-10">
          <h2 className="text-4xl">{copy.title}</h2>
          <p className="mt-3 max-w-xl text-stone-700">{copy.intro}</p>
          <button type="button" className={copy.ctaClass} onClick={() => setStarted(true)}>Начать испытание</button>
        </section>
      )}
    </main>
  );
}
