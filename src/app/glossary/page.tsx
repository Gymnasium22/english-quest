"use client";

import { useMemo, useState } from "react";
import { COLLOCATIONS, FATHER, PREP_A, PREP_B, SISTERS, SPOTLIGHT_STAY, VOCAB, WORD_FAMILIES } from "@/data/unit1";
import { ENV_IDIOMS, ENV_PHRASALS, ENV_PREP, ENV_VOCAB } from "@/data/unit2";
import { TopBar } from "@/components/Shell";
import { useProgress } from "@/lib/progress";

type Row = { id: string; en: string; ru: string; extra?: string; group: string };

function Section({ title, rows, items, query }: { title: string; rows: Row[]; items: Record<string, { correct: number }>; query: string }) {
  const q = query.trim().toLowerCase();
  const shown = rows.filter((r) => {
    const open = (items[r.id]?.correct ?? 0) > 0;
    const hay = open ? `${r.en} ${r.ru} ${r.extra ?? ""}` : r.en;
    return !q || hay.toLowerCase().includes(q);
  });
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-sm tracking-[0.16em] text-stone-500">{title}</h2>
      <ul className="grid gap-3">
        {shown.map((r) => {
          const open = (items[r.id]?.correct ?? 0) > 0;
          return (
            <li key={`${title}-${r.group}-${r.id}`} className="glass rounded-2xl p-4">
              <div className="text-xs tracking-widest text-stone-500">{r.group}</div>
              <h3 className="en mt-1 text-2xl">{r.en}</h3>
              {open ? <p className="mt-1 text-stone-800">{r.ru}</p> : <p className="mt-1 text-sm text-stone-500">Перевод откроется после верного ответа.</p>}
              {open && r.extra ? <p className="mt-2 text-sm text-stone-600">{r.extra}</p> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function GlossaryPage() {
  const { family, env } = useProgress();
  const [query, setQuery] = useState("");
  const familyRows = useMemo<Row[]>(() => [
    ...VOCAB.map((v) => ({ id: v.id, en: v.english, ru: v.translation, extra: v.example, group: "Vocabulary" })),
    ...FATHER.map((v) => ({ id: v.id, en: v.english, ru: v.definition, group: "Father and son" })),
    ...SISTERS.map((v) => ({ id: v.id, en: v.english, ru: v.definition, group: "Sisters" })),
    ...SPOTLIGHT_STAY.items.map((v) => ({ id: v.id, en: v.english, ru: v.definition, extra: SPOTLIGHT_STAY.text, group: "Spotlight" })),
    ...COLLOCATIONS.map((v) => ({ id: v.id, en: v.english, ru: v.translation, extra: v.example, group: "Collocations" })),
    ...[...PREP_A, ...PREP_B].map((v) => ({ id: v.id, en: v.english, ru: v.definition, extra: v.example, group: "Prepositions" })),
    ...WORD_FAMILIES.map((v) => ({ id: v.id, en: `${v.verb} → ${v.noun}`, ru: v.nounExample, extra: v.verbExample, group: "Word building" })),
  ], []);
  const envRows = useMemo<Row[]>(() => [
    ...ENV_VOCAB.map((v) => ({ id: v.id, en: v.english, ru: v.translation, extra: v.example, group: "Vocabulary" })),
    ...ENV_IDIOMS.map((v) => ({ id: v.id, en: v.english, ru: v.translation, extra: v.definition, group: "Idioms" })),
    ...ENV_PHRASALS.map((v) => ({ id: v.id, en: v.english, ru: v.translation, extra: v.definition, group: "Phrasal verbs" })),
    ...ENV_PREP.map((v) => ({ id: v.id, en: v.english, ru: v.meaning, group: "Prepositions" })),
  ], []);
  return (
    <main>
      <TopBar title="Словарь" />
      <p className="mb-4 text-sm text-stone-600">Перевод и пример открываются после первого верного ответа в задании.</p>
      <input className="mb-6 min-h-12 w-full rounded-2xl border border-stone-300 bg-white px-3" placeholder="Найти слово или перевод" value={query} onChange={(e) => setQuery(e.target.value)} />
      <Section title="Family" rows={familyRows} items={family.items} query={query} />
      <Section title="Environmental Issues" rows={envRows} items={env.items} query={query} />
    </main>
  );
}
