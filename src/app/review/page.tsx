"use client";

import { reviewQuestions, itemLabel } from "@/lib/questions";
import { envItemLabel, envReview } from "@/lib/questions-env";
import { useProgress } from "@/lib/progress";
import { Player } from "@/components/Player";
import { TopBar } from "@/components/Shell";

export default function ReviewPage() {
  const { practiceIds, state, ready, currentUnit } = useProgress();
  const questions = currentUnit === "unit2" ? envReview(practiceIds) : reviewQuestions(practiceIds);
  const label = currentUnit === "unit2" ? envItemLabel : itemLabel;
  if (!ready) {
    return (
      <main>
        <TopBar title="Повторение" />
      </main>
    );
  }
  return (
    <main>
      <TopBar title="Повторение" meta={practiceIds.length ? String(practiceIds.length) : "нет слов"} />
      <ul className="mb-4 grid gap-2">
        {practiceIds.length ? practiceIds.map((id) => (
          <li key={id} className="flex items-center justify-between rounded-2xl bg-white/70 px-3 py-2 text-sm">
            <span>{label(id)}</span>
            <span className="text-stone-500">ошибок: {state.items[id]?.wrong ?? 0}</span>
          </li>
        )) : <li className="text-stone-700">Пока нет слов для повторения.</li>}
      </ul>
      <Player key={practiceIds.join("|") || "empty"} title="Повторение" questions={questions} onDoneHref="/review" />
    </main>
  );
}
