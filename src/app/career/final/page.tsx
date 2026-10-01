"use client";

import { useMemo, useState } from "react";
import { careerFinal } from "@/lib/questions-career";
import { CAREER_MODULES } from "@/data/unit3";
import { useProgress } from "@/lib/progress";
import { Player } from "@/components/Player";
import { TopBar } from "@/components/Shell";
import Link from "next/link";

export default function CareerFinalPage() {
  const { state, finalReady, tasksLeftForFinal } = useProgress();
  const open = finalReady || state.finalDone;
  const [started, setStarted] = useState(false);
  const questions = useMemo(() => careerFinal(), []);
  if (!open) {
    return (
      <main>
        <TopBar title="Final Career Challenge" />
        <p className="glass rounded-3xl p-6">Финальное задание откроется, когда в каждом модуле будет завершено хотя бы одно задание. Осталось модулей: {tasksLeftForFinal}. <Link href="/unit/career" className="underline">К карте юнита</Link></p>
      </main>
    );
  }
  return (
    <main>
      <TopBar title="Final Career Challenge" />
      {started ? (
        <Player title="Финал" questions={questions} finalMode onDoneHref="/unit/career" moduleList={CAREER_MODULES} />
      ) : (
        <section className="glass rounded-3xl p-6 sm:p-10">
          <h2 className="text-4xl">Final Career Challenge</h2>
          <p className="mt-3 max-w-xl text-stone-700">Смешанные задания из всех пяти модулей. Это финал Unit 3.</p>
          <button type="button" className="mt-6 min-h-12 rounded-full bg-[#1F4E79] px-6 text-white" onClick={() => setStarted(true)}>Начать испытание</button>
        </section>
      )}
    </main>
  );
}
