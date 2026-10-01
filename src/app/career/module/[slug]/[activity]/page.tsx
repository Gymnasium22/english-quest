"use client";

import { useParams } from "next/navigation";
import { CAREER_MODULES } from "@/data/unit3";
import { careerActivitiesFor, findCareerActivity } from "@/lib/questions-career";
import { Player } from "@/components/Player";
import { TopBar } from "@/components/Shell";

export default function CareerActivityPage() {
  const { slug, activity } = useParams<{ slug: string; activity: string }>();
  const found = findCareerActivity(slug, activity);
  const mod = CAREER_MODULES.find((m) => m.id === slug);
  if (!found || !mod) return <p>Задание не найдено.</p>;
  const acts = careerActivitiesFor(mod.id);
  const index = acts.findIndex((a) => a.id === found.id);
  const next = acts[index + 1];
  return (
    <main>
      <TopBar title={found.mechanic} meta={mod.title} />
      <Player
        title={found.mechanic}
        questions={found.questions}
        activityKey={`${slug}/${activity}`}
        onDoneHref={`/career/module/${slug}`}
        accent={mod.accent}
        wash={mod.wash}
        copy={{ mechanic: found.mechanic, heading: found.heading, instruction: found.instruction, whatToDo: found.whatToDo, hint: found.hint }}
        nextHref={next ? `/career/module/${mod.id}/${next.id}` : undefined}
        moduleList={CAREER_MODULES}
      />
    </main>
  );
}
