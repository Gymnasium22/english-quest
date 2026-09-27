"use client";

import { useEffect, useState } from "react";
import { quickQuestions } from "@/lib/questions";
import { Player } from "@/components/Player";
import { TopBar } from "@/components/Shell";

export default function QuickPage() {
  const [seed, setSeed] = useState(1);
  useEffect(() => {
    setSeed(Date.now() % 100000);
  }, []);
  const questions = quickQuestions(seed);
  return (
    <main>
      <TopBar title="Быстрая практика" meta="5 вопросов" />
      <Player key={seed} title="Быстрая практика" questions={questions} onReplay={() => setSeed(Date.now() % 100000)} />
    </main>
  );
}
