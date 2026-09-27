"use client";

import { useMemo, useState } from "react";
import { finalQuestions } from "@/lib/questions";
import { useProgress } from "@/lib/progress";
import { Player } from "@/components/Player";
import { TopBar } from "@/components/Shell";
import Link from "next/link";

export default function FinalPage() {
  const { state, finalReady, tasksLeftForFinal } = useProgress();
  const open = finalReady || state.finalDone;
  const [started, setStarted] = useState(false);
  const questions = useMemo(() => finalQuestions(), []);
  if (!open) {
    return (
      <main>
        <TopBar title="Final Family Challenge" />
        <p className="glass rounded-3xl p-6">Финальное задание откроется, когда в каждом модуле будет завершено хотя бы одно задание. Осталось модулей: {tasksLeftForFinal}. <Link href="/" className="underline">К карте</Link></p>
      </main>
    );
  }
  return (
    <main>
      <TopBar title="Final Family Challenge" />
      {started ? (
        <Player title="Финал" questions={questions} finalMode onDoneHref="/progress" />
      ) : (
        <section className="glass rounded-3xl p-6 sm:p-10">
          <h2 className="text-4xl">Final Family Challenge</h2>
          <p className="mt-3 max-w-xl text-stone-700">Смешанные задания из всех пяти модулей. Это финал Unit 1.</p>
          <button type="button" className="mt-6 min-h-12 rounded-full bg-[#8a3d4b] px-6 text-white" onClick={() => setStarted(true)}>Начать испытание</button>
        </section>
      )}
    </main>
  );
}
