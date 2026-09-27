"use client";

import { useEffect, useMemo, useState } from "react";
import { COLLOCATIONS, FATHER, PREP_A, PREP_B, SISTERS, SPOTLIGHT_STAY, VOCAB, WORD_FAMILIES } from "@/data/unit1";
import { ENV_IDIOMS, ENV_PHRASALS, ENV_PREP, ENV_VOCAB } from "@/data/unit2";
import { TopBar, UnitSwitch } from "@/components/Shell";
import { useProgress } from "@/lib/progress";

type Row = { id: string; en: string; ru: string; extra?: string; group: string };

export default function GlossaryPage() {
  const { family, env, currentUnit } = useProgress();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("Все");
  useEffect(() => { setGroup("Все"); }, [currentUnit]);
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
  const rows = currentUnit === "unit2" ? envRows : familyRows;
  const items = currentUnit === "unit2" ? env.items : family.items;
  const groups = ["Все", ...new Set(rows.map((r) => r.group))];
  const q = query.trim().toLowerCase();
  const shown = rows.filter((r) => {
    const open = (items[r.id]?.correct ?? 0) > 0;
    const hay = open ? `${r.en} ${r.ru} ${r.extra ?? ""}` : r.en;
    return (group === "Все" || r.group === group) && (!q || hay.toLowerCase().includes(q));
  });
  return (
    <main>
      <TopBar title="Словарь" meta={String(shown.length)} />
      <UnitSwitch />
      <p className="mb-4 text-sm text-stone-600">Сейчас: {currentUnit === "unit2" ? "Environmental Issues" : "Family"}. Перевод и пример открываются после первого верного ответа в задании.</p>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input className="min-h-12 flex-1 rounded-2xl border border-stone-300 bg-white px-3" placeholder="Найти слово или перевод" value={query} onChange={(e) => { setQuery(e.target.value); }} />
        <select className="min-h-12 rounded-2xl border border-stone-300 bg-white px-3" value={group} onChange={(e) => setGroup(e.target.value)}>
          {groups.map((g) => <option key={g}>{g}</option>)}
        </select>
      </div>
      <ul className="grid gap-3">
        {shown.map((r) => {
          const open = (items[r.id]?.correct ?? 0) > 0;
          return (
          <li key={`${r.group}-${r.id}`} className="glass rounded-2xl p-4">
            <div className="text-xs tracking-widest text-stone-500">{r.group}</div>
            <h2 className="en mt-1 text-2xl">{r.en}</h2>
            {open ? <p className="mt-1 text-stone-800">{r.ru}</p> : <p className="mt-1 text-sm text-stone-500">Перевод откроется после верного ответа.</p>}
            {open && r.extra ? <p className="mt-2 text-sm text-stone-600">{r.extra}</p> : null}
          </li>
          );
        })}
      </ul>
    </main>
  );
}
