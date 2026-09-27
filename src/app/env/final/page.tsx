"use client";

import { useMemo, useState } from "react";
import { envFinal } from "@/lib/questions-env";
import { ENV_MODULES } from "@/data/unit2";
import { useProgress } from "@/lib/progress";
import { Player } from "@/components/Player";
import { TopBar } from "@/components/Shell";
import Link from "next/link";

export default function EnvFinalPage() {
  const { state, finalReady, tasksLeftForFinal } = useProgress();
  const open = finalReady || state.finalDone;
  const [started, setStarted] = useState(false);
  const questions = useMemo(() => envFinal(), []);
  if (!open) {
    return (
      <main>
        <TopBar title="Final Nature Challenge" />
        <p className="glass rounded-3xl p-6">Финальное задание откроется, когда в каждом модуле будет завершено хотя бы одно задание. Осталось модулей: {tasksLeftForFinal}. <Link href="/unit/environmental" className="underline">К карте юнита</Link></p>
      </main>
    );
  }
  return (
    <main>
      <TopBar title="Final Nature Challenge" />
      {started ? (
        <Player title="Финал" questions={questions} finalMode onDoneHref="/unit/environmental" moduleList={ENV_MODULES} />
      ) : (
        <section className="glass rounded-3xl p-6 sm:p-10">
          <h2 className="text-4xl">Final Nature Challenge</h2>
          <p className="mt-3 max-w-xl text-stone-700">Смешанные задания из всех пяти модулей. Это финал Unit 2.</p>
          <button type="button" className="mt-6 min-h-12 rounded-full bg-[#3E6B4F] px-6 text-white" onClick={() => setStarted(true)}>Начать испытание</button>
        </section>
      )}
    </main>
  );
}
