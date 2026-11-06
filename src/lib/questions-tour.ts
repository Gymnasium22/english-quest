import { TOUR_IDIOMS, TOUR_VOCAB } from "@/data/unit4";
import type { ActivityDef, Question } from "@/lib/questions";
import { blankExample, chunk, optionsFor, shuffle } from "@/lib/question-kit";

function vocabActs(): ActivityDef[] {
  const poolT = TOUR_VOCAB.map((v) => v.translation);
  const poolE = TOUR_VOCAB.map((v) => v.english);
  const match: Question[] = chunk(TOUR_VOCAB, 4).map((group, i) => ({
    kind: "match",
    id: `t-match-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "Соедините слово и перевод.",
    pairs: group.map((g) => ({ id: g.id, left: g.english, right: g.translation })),
  }));
  const choice: Question[] = TOUR_VOCAB.map((v, i) => ({
    kind: "choice" as const,
    id: `t-ch-${v.id}`,
    itemId: v.id,
    prompt: v.english,
    options: optionsFor(v.translation, poolT, 4, i + 2),
    answer: v.translation,
    reveal: v.example,
  }));
  const fill: Question[] = TOUR_VOCAB.flatMap((v, i) => {
    const gap = blankExample(v.example, v.english);
    if (!gap) return [];
    return [{
      kind: "choice" as const,
      id: `t-fill-${v.id}`,
      itemId: v.id,
      prompt: `${gap.before}______${gap.after}`,
      options: optionsFor(v.english, poolE, 4, i + 5),
      answer: v.english,
      reveal: `${v.example} — ${v.translation}`,
    }];
  });
  const relax: Question[] = [
    {
      kind: "choice",
      id: "t-relax-unwind",
      itemId: "unwind",
      prompt: "If you need to ______, try the Algarve.",
      detail: "Синоним relax.",
      options: ["unwind", "trek", "restore", "undergo"],
      answer: "unwind",
      reveal: "unwind — расслабиться.",
    },
    {
      kind: "choice",
      id: "t-relax-easy",
      itemId: "take-it-easy",
      prompt: "On the beach you can ______.",
      options: ["take it easy", "get around", "rough it", "set out"],
      answer: "take it easy",
      reveal: "take it easy — не спешить, отдыхать.",
    },
    {
      kind: "choice",
      id: "t-relax-chill",
      itemId: "chill-out",
      prompt: "Laze around and ______ on the sand.",
      options: ["chill out", "stop off", "turn out", "soak up"],
      answer: "chill out",
      reveal: "chill out — расслабиться.",
    },
    {
      kind: "choice",
      id: "t-relax-batteries",
      itemId: "recharge-your-batteries",
      prompt: "A week away helps you ______.",
      options: ["recharge your batteries", "undergo restoration", "get around", "do your bit"],
      answer: "recharge your batteries",
      reveal: "recharge your batteries — восстановить силы.",
    },
  ];
  return [
    { id: "match", moduleId: "vocabulary", title: "Match", blurb: "", mechanic: "MATCH", heading: "Соедините слово и перевод", instruction: "Нажмите слово, затем перевод.", whatToDo: "", hint: "Слова из текстов про Алгарве, Китай и Прагу и синонимы relax.", questions: match },
    { id: "choose", moduleId: "vocabulary", title: "Choose", blurb: "", mechanic: "CHOOSE", heading: "Выберите перевод", instruction: "Выберите русский перевод.", whatToDo: "", hint: "unwind, take it easy, chill out и recharge your batteries — синонимы relax.", questions: choice },
    { id: "fill", moduleId: "vocabulary", title: "Fill", blurb: "", mechanic: "FILL THE GAP", heading: "Вставьте слово", instruction: "Выберите слово или выражение для пропуска.", whatToDo: "", hint: "Примеры взяты из трёх текстов и блока relax.", questions: [...relax, ...fill.slice(0, 12)] },
  ];
}

function idiomActs(): ActivityDef[] {
  const pool = TOUR_IDIOMS.map((p) => p.english);
  const match: Question[] = chunk(TOUR_IDIOMS, 4).filter((g) => g.length >= 3).map((group, i) => ({
    kind: "match" as const,
    id: `ti-m-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "Соедините значение и выражение.",
    pairs: group.map((g) => ({
      id: g.id,
      left: g.definition,
      right: g.id === "get-away-holiday" ? "get away — отпуск" : g.id === "get-away-leave" ? "get away — уйти" : g.english,
    })),
  }));
  const choice: Question[] = TOUR_IDIOMS.map((p, i) => ({
    kind: "choice" as const,
    id: `ti-ch-${p.id}`,
    itemId: p.id,
    prompt: p.id === "get-away-holiday" ? "Уехать в отпуск" : p.id === "get-away-leave" ? "Уйти с работы или сбежать" : p.definition,
    options: optionsFor(p.english, pool, 4, i + 4),
    answer: p.english,
    reveal: p.situation,
  }));
  const senses: Question[] = [
    {
      kind: "choice",
      id: "ti-away-holiday",
      itemId: "get-away-holiday",
      prompt: "We try to ______ in winter and go somewhere warm.",
      detail: "Отпуск.",
      options: ["get away", "rough it", "stop off", "do your bit"],
      answer: "get away",
      reveal: "get away — уехать в отпуск.",
    },
    {
      kind: "choice",
      id: "ti-away-leave",
      itemId: "get-away-leave",
      prompt: "She ______ from the office for a long weekend.",
      detail: "Уйти с работы или сбежать.",
      options: ["got away", "set out", "took her time", "stopped off"],
      answer: "got away",
      reveal: "get away — уйти с работы или сбежать.",
    },
  ];
  return [
    { id: "match", moduleId: "idioms", title: "Match", blurb: "", mechanic: "MATCH", heading: "Соедините значение и выражение", instruction: "Слева значение, справа выражение.", whatToDo: "", hint: "get away встречается дважды: отпуск и уход с работы.", questions: match },
    { id: "choose", moduleId: "idioms", title: "Choose", blurb: "", mechanic: "CHOOSE", heading: "Выберите выражение", instruction: "Выберите английское выражение по значению.", whatToDo: "", hint: "Два пункта get away различаются смыслом в задании.", questions: choice },
    { id: "gap", moduleId: "idioms", title: "Gap", blurb: "", mechanic: "FILL THE GAP", heading: "Два смысла get away", instruction: "Выберите форму, которая подходит по смыслу.", whatToDo: "", hint: "Первый пропуск — отпуск. Второй — уйти с работы.", questions: senses },
  ];
}

let cache: ActivityDef[] | null = null;
export function tourActivities(): ActivityDef[] {
  if (!cache) cache = [...vocabActs(), ...idiomActs()];
  return cache;
}

export function tourActivitiesFor(moduleId: string): ActivityDef[] {
  return tourActivities().filter((a) => a.moduleId === moduleId);
}

export function findTourActivity(moduleId: string, activityId: string): ActivityDef | undefined {
  return tourActivities().find((a) => a.moduleId === moduleId && a.id === activityId);
}

export function tourQuick(seed: number): Question[] {
  const pool = tourActivities().flatMap((a) => a.questions.filter((q) => q.kind === "choice"));
  return shuffle(pool, seed).slice(0, 5);
}

export function tourFinal(): Question[] {
  const pool = tourActivities().flatMap((a) => a.questions.filter((q) => q.kind === "choice" || q.kind === "match"));
  return shuffle(pool, 21).slice(0, 12);
}

export function tourReview(itemIds: string[]): Question[] {
  const set = new Set(itemIds);
  const unique: Question[] = [];
  const seen = new Set<string>();
  for (const q of tourActivities().flatMap((a) => a.questions)) {
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

export function tourItemLabel(id: string): string {
  return TOUR_VOCAB.find((x) => x.id === id)?.english ?? TOUR_IDIOMS.find((x) => x.id === id)?.english ?? id;
}
