"use client";

import { useParams } from "next/navigation";
import { Player } from "@/components/Player";
import { TopBar } from "@/components/Shell";
import { activityHref, unitById, type QuestUnit } from "@/lib/units";

/**
 * Общий экран задания: шапка и <Player> с копией текущего задания.
 * Три исходные страницы отличались только префиксом маршрута и передачей
 * moduleList: Unit 2 и Unit 3 передавали свой список модулей, а Unit 1
 * полагался на значение по умолчанию внутри <Player> — это тот же список
 * MODULES юнита 1, поэтому для него проп остаётся не заданным.
 */
export function ActivityScreen({ unitId }: { unitId: QuestUnit }) {
  const { slug, activity } = useParams<{ slug: string; activity: string }>();
  const spec = unitById(unitId);
  const found = spec.findActivity(slug, activity);
  const mod = spec.modules.find((m) => m.id === slug);
  if (!found || !mod) return <p>Задание не найдено.</p>;
  const acts = spec.activitiesFor(mod.id);
  const index = acts.findIndex((a) => a.id === found.id);
  const next = acts[index + 1];
  return (
    <main>
      <TopBar title={found.mechanic} meta={mod.title} />
      <Player
        title={found.mechanic}
        questions={found.questions}
        activityKey={`${slug}/${activity}`}
        onDoneHref={`${spec.routePrefix}/module/${slug}`}
        accent={mod.accent}
        copy={{ mechanic: found.mechanic, heading: found.heading, instruction: found.instruction, whatToDo: found.whatToDo, hint: found.hint }}
        nextHref={next ? activityHref(unitId, mod.id, next.id) : undefined}
        moduleList={unitId === "unit1" ? undefined : spec.modules}
      />
    </main>
  );
}
