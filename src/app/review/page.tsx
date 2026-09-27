"use client";

import { reviewQuestions, itemLabel } from "@/lib/questions";
import { envItemLabel, envReview } from "@/lib/questions-env";
import { useProgress } from "@/lib/progress";
import { Player } from "@/components/Player";
import { TopBar, UnitSwitch } from "@/components/Shell";

export default function ReviewPage() {
  const { practiceIds, state, ready, currentUnit } = useProgress();
  const questions = currentUnit === "unit2" ? envReview(practiceIds) : reviewQuestions(practiceIds);
  const label = currentUnit === "unit2" ? envItemLabel : itemLabel;
  return (
    <main>
      <TopBar title="Повторение" meta={ready ? (practiceIds.length ? String(practiceIds.length) : "нет слов") : ""} />
      <UnitSwitch />
      <p className="mb-4 text-sm text-stone-600">Открыт юнит {currentUnit === "unit2" ? "Environmental Issues" : "Family"}.</p>
      {!ready ? <p className="text-sm text-stone-500">Загрузка…</p> : null}
      <ul className="mb-4 grid gap-2">
        {practiceIds.length ? practiceIds.map((id) => (
          <li key={id} className="flex items-center justify-between rounded-2xl bg-white/70 px-3 py-2 text-sm">
            <span>{label(id)}</span>
            <span className="text-stone-500">ошибок: {state.items[id]?.wrong ?? 0}</span>
          </li>
        )) : <li className="text-stone-700">Пока нет слов для повторения.</li>}
      </ul>
      {ready ? <Player key={`${currentUnit}-${practiceIds.join("|") || "empty"}`} title="Повторение" questions={questions} onDoneHref="/review" /> : null}
    </main>
  );
}
