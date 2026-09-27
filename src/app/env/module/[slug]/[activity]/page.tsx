"use client";

import { useParams } from "next/navigation";
import { ENV_MODULES } from "@/data/unit2";
import { envActivitiesFor, findEnvActivity } from "@/lib/questions-env";
import { Player } from "@/components/Player";
import { TopBar } from "@/components/Shell";

export default function EnvActivityPage() {
  const { slug, activity } = useParams<{ slug: string; activity: string }>();
  const found = findEnvActivity(slug, activity);
  const mod = ENV_MODULES.find((m) => m.id === slug);
  if (!found || !mod) return <p>Задание не найдено.</p>;
  const acts = envActivitiesFor(mod.id);
  const index = acts.findIndex((a) => a.id === found.id);
  const next = acts[index + 1];
  return (
    <main>
      <TopBar title={found.mechanic} meta={mod.title} />
      <Player
        title={found.mechanic}
        questions={found.questions}
        activityKey={`${slug}/${activity}`}
        onDoneHref={`/env/module/${slug}`}
        accent={mod.accent}
        wash={mod.wash}
        copy={{ mechanic: found.mechanic, heading: found.heading, instruction: found.instruction, whatToDo: found.whatToDo, hint: found.hint }}
        nextHref={next ? `/env/module/${mod.id}/${next.id}` : undefined}
        moduleList={ENV_MODULES}
      />
    </main>
  );
}
