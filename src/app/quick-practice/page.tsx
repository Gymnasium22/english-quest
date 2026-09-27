"use client";

import { useEffect, useState } from "react";
import { quickQuestions } from "@/lib/questions";
import { envQuick } from "@/lib/questions-env";
import { Player } from "@/components/Player";
import { TopBar } from "@/components/Shell";
import { useProgress } from "@/lib/progress";

export default function QuickPage() {
  const [seed, setSeed] = useState(1);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    setSeed(Date.now() % 100000);
  }, []);
  const { currentUnit } = useProgress();
  const questions = currentUnit === "unit2" ? envQuick(seed) : quickQuestions(seed);
  return (
    <main>
      <TopBar title="Быстрая практика" meta="5 вопросов" />
      {started ? (
        <Player key={seed} title="Быстрая практика" questions={questions} onReplay={() => setSeed(Date.now() % 100000)} />
      ) : (
        <section className="glass rounded-3xl p-6 sm:p-10">
          <h2 className="text-4xl">Быстрая практика</h2>
          <p className="mt-3 max-w-xl text-stone-700">{currentUnit === "unit2" ? "5 случайных вопросов по материалу Unit 2 Environmental Issues." : "5 случайных вопросов по материалу Unit 1 Family."}</p>
          <button type="button" className="mt-6 min-h-12 rounded-full bg-stone-900 px-6 text-[#f4efe6]" onClick={() => setStarted(true)}>Начать</button>
        </section>
      )}
    </main>
  );
}
