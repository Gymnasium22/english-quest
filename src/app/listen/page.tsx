"use client";

import Link from "next/link";
import { listeningForUnit } from "@/data/listening";
import { useProgress } from "@/lib/progress";
import { TopBar } from "@/components/Shell";
import { unitById } from "@/lib/units";

export default function ListenHubPage() {
  const { currentUnit, state } = useProgress();
  const spec = unitById(currentUnit);
  const tracks = listeningForUnit(currentUnit);
  return (
    <main>
      <TopBar title="Аудирование" meta={spec.title} />
      <p className="mb-4 text-sm text-stone-600">Прослушайте запись и выберите ответ. Не входит в условие финала.</p>
      <ul className="grid gap-3">
        {tracks.map((t, i) => {
          const done = state.completed.includes(`listen/${t.id}`);
          return (
            <li key={t.id}>
              <Link href={`/listen/${t.id}`} className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-4">
                <span>
                  <span className="text-sm text-stone-500">0{i + 1}</span>
                  <span className="mt-1 block">{t.title}</span>
                </span>
                <span className="text-sm">{done ? "Готово" : "Открыть"}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
