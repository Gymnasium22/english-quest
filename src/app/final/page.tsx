"use client";

import { useMemo } from "react";
import { finalQuestions } from "@/lib/questions";
import { useProgress } from "@/lib/progress";
import { Player } from "@/components/Player";
import { TopBar } from "@/components/Shell";
import Link from "next/link";

export default function FinalPage() {
  const { state, finalReady, tasksLeftForFinal } = useProgress();
  const open = finalReady || state.finalDone;
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
      <Player title="Финал" questions={questions} finalMode onDoneHref="/progress" />
    </main>
  );
}
