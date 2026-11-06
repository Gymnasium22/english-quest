import { BY_COLLOS, BY_PHRASALS, BY_VOCAB } from "@/data/unit6";
import type { ActivityDef, Question } from "@/lib/questions";
import { blankExample, chunk, optionsFor, shuffle } from "@/lib/question-kit";

function wordActs(list: typeof BY_VOCAB, moduleId: ActivityDef["moduleId"], prefix: string, hint: string): ActivityDef[] {
  const poolT = list.map((v) => v.translation);
  const poolE = list.map((v) => v.english);
  const match: Question[] = chunk(list, 4).filter((g) => g.length >= 3).map((group, i) => ({
    kind: "match",
    id: `${prefix}-m-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "Соедините выражение и перевод.",
    pairs: group.map((g) => ({ id: g.id, left: g.english, right: g.translation })),
  }));
  const choice: Question[] = list.map((v, i) => ({
    kind: "choice" as const,
    id: `${prefix}-ch-${v.id}`,
    itemId: v.id,
    prompt: v.english,
    options: optionsFor(v.translation, poolT, 4, i + 2),
    answer: v.translation,
    reveal: v.example,
  }));
  const fill: Question[] = list.flatMap((v, i) => {
    const gap = blankExample(v.example, v.english);
    if (!gap) return [];
    return [{
      kind: "choice" as const,
      id: `${prefix}-fill-${v.id}`,
      itemId: v.id,
      prompt: `${gap.before}______${gap.after}`,
      options: optionsFor(v.english, poolE, 4, i + 6),
      answer: v.english,
      reveal: `${v.example} — ${v.translation}`,
    }];
  });
  return [
    { id: "match", moduleId, title: "Match", blurb: "", mechanic: "MATCH", heading: "Соедините выражение и перевод", instruction: "Нажмите выражение, затем перевод.", whatToDo: "", hint, questions: match },
    { id: "choose", moduleId, title: "Choose", blurb: "", mechanic: "CHOOSE", heading: "Выберите перевод", instruction: "Выберите русский перевод.", whatToDo: "", hint, questions: choice },
    { id: "fill", moduleId, title: "Fill", blurb: "", mechanic: "FILL THE GAP", heading: "Вставьте выражение", instruction: "Выберите выражение для пропуска.", whatToDo: "", hint, questions: fill.slice(0, 12) },
  ];
}

let cache: ActivityDef[] | null = null;
export function belarusActivities(): ActivityDef[] {
  if (!cache) {
    cache = [
      ...wordActs(BY_VOCAB, "vocabulary", "by", "Слова текста о стране."),
      ...wordActs(BY_PHRASALS, "idioms", "bp", "Советы про Браслав, Мир, Несвиж, Лиду, Дудутки, Минск, Хатынь и Гродно."),
      ...wordActs(BY_COLLOS, "collocations", "bc", "Еда и приметы. Без чужих городов."),
    ];
  }
  return cache;
}

export function belarusActivitiesFor(moduleId: string): ActivityDef[] {
  return belarusActivities().filter((a) => a.moduleId === moduleId);
}

export function findBelarusActivity(moduleId: string, activityId: string): ActivityDef | undefined {
  return belarusActivities().find((a) => a.moduleId === moduleId && a.id === activityId);
}

export function belarusQuick(seed: number): Question[] {
  const pool = belarusActivities().flatMap((a) => a.questions.filter((q) => q.kind === "choice"));
  return shuffle(pool, seed).slice(0, 5);
}

export function belarusFinal(): Question[] {
  const pool = belarusActivities().flatMap((a) => a.questions.filter((q) => q.kind === "choice" || q.kind === "match"));
  return shuffle(pool, 21).slice(0, 12);
}

export function belarusReview(itemIds: string[]): Question[] {
  const set = new Set(itemIds);
  const unique: Question[] = [];
  const seen = new Set<string>();
  for (const q of belarusActivities().flatMap((a) => a.questions)) {
    const ids = "itemIds" in q ? q.itemIds : "itemId" in q ? [q.itemId] : [];
    if (!ids.some((id) => set.has(id))) continue;
    const key = ids[0] ?? q.id;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(q);
    if (unique.length >= 12) break;
  }
  return unique;
}

export function belarusItemLabel(id: string): string {
  return [...BY_VOCAB, ...BY_PHRASALS, ...BY_COLLOS].find((x) => x.id === id)?.english ?? id;
}
