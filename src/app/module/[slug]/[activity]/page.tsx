"use client";

import { useParams } from "next/navigation";
import { MODULES } from "@/data/unit1";
import { activitiesFor, findActivity } from "@/lib/questions";
import { Player } from "@/components/Player";
import { TopBar } from "@/components/Shell";

export default function ActivityPage() {
  const { slug, activity } = useParams<{ slug: string; activity: string }>();
  const found = findActivity(slug, activity);
  const mod = MODULES.find((m) => m.id === slug);
  if (!found || !mod) return <p>Задание не найдено.</p>;
  const acts = activitiesFor(mod.id);
  const index = acts.findIndex((a) => a.id === found.id);
  const next = acts[index + 1];
  return (
    <main>
      <TopBar title={found.mechanic} meta={mod.title} />
      <Player
        title={found.mechanic}
        questions={found.questions}
        activityKey={`${slug}/${activity}`}
        onDoneHref={`/module/${slug}`}
        accent={mod.accent}
        wash={mod.wash}
        copy={{ mechanic: found.mechanic, heading: found.heading, instruction: found.instruction, whatToDo: found.whatToDo, hint: found.hint }}
        nextHref={next ? `/module/${mod.id}/${next.id}` : undefined}
      />
    </main>
  );
}
