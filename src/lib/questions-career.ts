import {
  CAREER_COLLOS,
  CAREER_FAMILIES,
  CAREER_IDIOMS,
  CAREER_KEY,
  CAREER_PREP,
  CAREER_VOCAB,
  type CareerModuleId,
} from "@/data/unit3";
import type { ActivityDef, Question } from "@/lib/questions";

function shuffle<T>(list: T[], seed: number): T[] {
  const arr = [...list];
  let s = seed || 1;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function optionsFor(correct: string, pool: string[], n = 4, seed = 3): string[] {
  const rest = pool.filter((x) => x !== correct);
  return shuffle([correct, ...shuffle(rest, seed).slice(0, n - 1)], seed + 9);
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function chunk34<T>(arr: T[]): T[][] {
  const out: T[][] = [];
  let i = 0;
  while (i < arr.length) {
    const left = arr.length - i;
    const size = left > 4 ? 3 : left;
    out.push(arr.slice(i, i + size));
    i += size;
  }
  if (out.length >= 2 && out[out.length - 1].length < 3) {
    const tail = out.pop()!;
    out[out.length - 1] = [...out[out.length - 1], ...tail];
  }
  return out.filter((g) => g.length >= 3);
}

function blankExample(example: string, surface: string): { before: string; after: string } | null {
  const forms = surface.split("/").map((s) => s.trim()).filter((s) => s.length > 2);
  const ordered = [...forms].sort((a, b) => b.length - a.length);
  const lower = example.toLowerCase();
  for (const form of ordered) {
    const idx = lower.indexOf(form.toLowerCase());
    if (idx >= 0) return { before: example.slice(0, idx), after: example.slice(idx + form.length) };
  }
  return null;
}

function vocabActs(): ActivityDef[] {
  const poolT = CAREER_VOCAB.map((v) => v.translation);
  const poolE = CAREER_VOCAB.map((v) => v.english.replace(/ sb| sth|\/sb|\/sth/g, "").trim());
  const match: Question[] = chunk(CAREER_VOCAB, 4).map((group, i) => ({
    kind: "match",
    id: `c-match-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "Соедините слово и перевод.",
    pairs: group.map((g) => ({ id: g.id, left: g.english, right: g.translation })),
  }));
  const choice: Question[] = CAREER_VOCAB.map((v, i) => ({
    kind: "choice" as const,
    id: `c-ch-${v.id}`,
    itemId: v.id,
    prompt: v.english,
    options: optionsFor(v.translation, poolT, 4, i + 2),
    answer: v.translation,
    reveal: v.example,
  }));
  const fill: Question[] = CAREER_VOCAB.flatMap((v, i) => {
    const surface = v.english.replace(/\(.*\)/, "").replace(/ sb\/sth| sb| sth|\/sb|\/sth/g, "").trim();
    const gap = blankExample(v.example, surface);
    if (!gap) return [];
    return [{
      kind: "choice" as const,
      id: `c-fill-${v.id}`,
      itemId: v.id,
      prompt: `${gap.before}______${gap.after}`,
      options: optionsFor(surface.split(" ")[0], poolE.map((e) => e.split(" ")[0]), 4, i + 4),
      answer: surface.split(" ")[0],
      reveal: `${v.example} — ${v.translation}`,
    }];
  });
  const advice: Question[] = [
    {
      kind: "choice",
      id: "c-advice-count",
      itemId: "advice",
      prompt: "She gave me some good ______.",
      detail: "advice — неисчисляемое. Не an advice.",
      options: ["advice", "an advice", "advise", "a advise"],
      answer: "advice",
      reveal: "Верно: She gave me some good advice.",
    },
    {
      kind: "choice",
      id: "c-advice-verb",
      itemId: "advise",
      prompt: "I would ______ you to apply early.",
      options: ["advise", "advice", "an advice", "advices"],
      answer: "advise",
      reveal: "advise — глагол; advice — существительное.",
    },
    {
      kind: "choice",
      id: "c-ref-ref",
      itemId: "referee",
      prompt: "I listed my professor as a ______.",
      options: ["referee", "reference", "interview", "vacancy"],
      answer: "referee",
      reveal: "referee — кто пишет рекомендацию; reference — сама рекомендация.",
    },
    {
      kind: "choice",
      id: "c-int-sb",
      itemId: "interview-sb",
      prompt: "They will ______ three candidates today.",
      options: ["interview", "interviewer", "advice", "vacancy"],
      answer: "interview",
      reveal: "interview sb — брать интервью; interview — собеседование.",
    },
  ];
  return [
    { id: "match", moduleId: "vocabulary", title: "Match", blurb: "", mechanic: "MATCH", heading: "Соедините слово и перевод", instruction: "Нажмите слово, затем перевод.", whatToDo: "", hint: "Не смешивайте advice и advise, reference и referee.", questions: match },
    { id: "choose", moduleId: "vocabulary", title: "Choose", blurb: "", mechanic: "CHOOSE", heading: "Выберите перевод", instruction: "Выберите русский перевод английского слова.", whatToDo: "", hint: "Это слова заявки, собеседования и работы.", questions: choice },
    { id: "fill", moduleId: "vocabulary", title: "Fill", blurb: "", mechanic: "FILL THE GAP", heading: "Вставьте слово в пропуск", instruction: "Выберите слово, которое подходит в предложение.", whatToDo: "", hint: "advice без артикля a.", questions: [...advice, ...fill.slice(0, 16)] },
  ];
}

function idiomActs(): ActivityDef[] {
  const match: Question[] = chunk34(CAREER_IDIOMS).map((group, i) => ({
    kind: "match" as const,
    id: `ci-m-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "",
    pairs: group.map((g) => ({ id: g.id, left: g.definition, right: g.english })),
  }));
  const gap: Question[] = [
    { kind: "choice", id: "ig-through", itemId: "get-through", prompt: "The first week was hard, but she managed to ______ the training.", options: ["get through", "hand in your notice", "give sb the sack", "turn sb down"], answer: "get through", reveal: "get through sth — справиться с трудной задачей." },
    { kind: "choice", id: "ig-notice", itemId: "hand-in-notice", prompt: "He decided to ______ last Friday.", options: ["hand in his notice", "get through", "take sb on", "stand by sb"], answer: "hand in his notice", reveal: "hand in your notice — подать заявление об уходе." },
    { kind: "choice", id: "ig-sack", itemId: "give-the-sack", prompt: "The company ______ after the assessment.", options: ["gave him the sack", "took him on", "stood by him", "got through him"], answer: "gave him the sack", reveal: "give sb the sack — уволить." },
    { kind: "choice", id: "ig-down", itemId: "turn-down", prompt: "They ______ after the interview.", options: ["turned her down", "took her on", "stood by her", "checked up on her"], answer: "turned her down", reveal: "turn sb down — отказать." },
    { kind: "choice", id: "ig-on", itemId: "take-on", prompt: "The company will ______ three new candidates.", options: ["take on", "turn down", "give the sack", "hand in notice"], answer: "take on", reveal: "take sb on — взять на работу." },
    { kind: "choice", id: "ig-make-as", itemId: "make-it-career", prompt: "She wants to ______ as a teacher.", options: ["make it", "get behind", "check up", "turn down"], answer: "make it", reveal: "make it — добиться успеха в профессии." },
    { kind: "choice", id: "ig-make-tom", itemId: "make-it-arrive", prompt: "I can't ______ tomorrow.", options: ["make it", "get through", "take on", "stand by"], answer: "make it", reveal: "make it — успеть / смочь прийти." },
    { kind: "choice", id: "ig-hours", itemId: "all-hours", prompt: "He works ______ to finish the project.", options: ["all hours", "nine-to-five", "next to nothing", "hard at it"], answer: "all hours", reveal: "all hours — почти всё время." },
  ];
  const choose: Question[] = CAREER_IDIOMS.map((p, i) => ({
    kind: "choice" as const,
    id: `ci-ch-${p.id}`,
    itemId: p.id,
    prompt: p.definition,
    options: optionsFor(p.english, CAREER_IDIOMS.map((x) => x.english), 4, i + 3),
    answer: p.english,
    reveal: p.situation,
  }));
  return [
    { id: "match", moduleId: "idioms", title: "Match", blurb: "", mechanic: "MATCH", heading: "Соедините ситуацию и выражение", instruction: "Нажмите описание слева, затем английское выражение справа.", whatToDo: "", hint: "make it имеет два смысла: преуспеть и суметь прийти.", questions: match },
    { id: "gap", moduleId: "idioms", title: "Fill", blurb: "", mechanic: "FILL THE GAP", heading: "Вставьте выражение", instruction: "Выберите выражение, которое подходит в предложение.", whatToDo: "", hint: "get through, hand in your notice, give sb the sack.", questions: gap },
    { id: "choose", moduleId: "idioms", title: "Choose", blurb: "", mechanic: "CHOOSE", heading: "Выберите выражение по значению", instruction: "Прочитайте значение и выберите выражение.", whatToDo: "", hint: "Одно значение — одно выражение.", questions: choose },
  ];
}

function colloActs(): ActivityDef[] {
  const match: Question[] = chunk(CAREER_COLLOS, 4).map((group, i) => ({
    kind: "match" as const,
    id: `cc-m-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "Соедините сочетание и значение.",
    pairs: group.map((g) => ({ id: g.id, left: g.english, right: g.translation })),
  }));
  const choose: Question[] = [
    { kind: "choice", id: "cc-pack", itemId: "benefits-package", prompt: "benefits ______", options: ["package", "leave", "canteen", "pension"], answer: "package", reveal: "benefits package" },
    { kind: "choice", id: "cc-mat", itemId: "maternity-leave", prompt: "maternity ______", options: ["leave", "package", "scheme", "allowance"], answer: "leave", reveal: "maternity leave / paternity leave" },
    { kind: "choice", id: "cc-hol", itemId: "holiday-entitlement", prompt: "30 days’ holiday ______", options: ["entitlement", "package", "scheme", "leave"], answer: "entitlement", reveal: "30 days’ holiday entitlement — be entitled to sth" },
    { kind: "choice", id: "cc-ben", itemId: "benefits", prompt: "benefits — SYN ______", options: ["perks", "leave", "scheme", "canteen"], answer: "perks", reveal: "benefits — плюсы сверх зарплаты; SYN perks" },
    { kind: "choice", id: "cc-rel", itemId: "relocation-allowance", prompt: "relocation ______", options: ["allowance", "leave", "package", "canteen"], answer: "allowance", reveal: "relocation allowance" },
    { kind: "choice", id: "cc-pen", itemId: "pension-scheme", prompt: "company pension ______", options: ["scheme", "leave", "package", "canteen"], answer: "scheme", reveal: "company pension scheme" },
    { kind: "choice", id: "cc-can", itemId: "canteen", prompt: "subsidized ______", options: ["canteen", "leave", "scheme", "package"], answer: "canteen", reveal: "subsidized canteen" },
    { kind: "choice", id: "cc-ent", itemId: "entitled-to", prompt: "be entitled ______ 30 days’ holiday", options: ["to", "for", "on", "with"], answer: "to", reveal: "be entitled to sth" },
  ];
  const order: Question[] = [
    { kind: "order", id: "cc-o1", itemId: "bonus-scheme", prompt: "Соберите сочетание.", tokens: ["performance-related", "bonus", "scheme"], answer: ["performance-related", "bonus", "scheme"], reveal: "performance-related bonus scheme" },
    { kind: "order", id: "cc-o2", itemId: "healthcare", prompt: "Соберите сочетание.", tokens: ["comprehensive", "healthcare", "provision"], answer: ["comprehensive", "healthcare", "provision"], reveal: "comprehensive healthcare provision" },
    { kind: "order", id: "cc-o3", itemId: "pension-scheme", prompt: "Соберите сочетание.", tokens: ["company", "pension", "scheme"], answer: ["company", "pension", "scheme"], reveal: "company pension scheme" },
  ];
  return [
    { id: "match", moduleId: "collocations", title: "Match", blurb: "", mechanic: "MATCH", heading: "Соедините бенефит и значение", instruction: "Нажмите английское сочетание, затем перевод.", whatToDo: "", hint: "Только бенефиты из этого юнита.", questions: match },
    { id: "choose", moduleId: "collocations", title: "Choose", blurb: "", mechanic: "CHOOSE", heading: "Дополните сочетание", instruction: "Выберите слово в benefits package, maternity leave, holiday entitlement.", whatToDo: "", hint: "Это плюсы сверх зарплаты.", questions: choose },
    { id: "order", moduleId: "collocations", title: "Order", blurb: "", mechanic: "WORD ORDER", heading: "Соберите сочетание", instruction: "Нажимайте слова в нужном порядке.", whatToDo: "", hint: "Начните с прилагательного или company.", questions: order },
  ];
}

function prepActs(): ActivityDef[] {
  const match: Question[] = [{
    kind: "match",
    id: "cp-m-0",
    itemIds: CAREER_PREP.map((p) => p.id),
    prompt: "",
    pairs: CAREER_PREP.map((p) => ({ id: p.id, left: p.meaning, right: p.english })),
  }];
  const choose: Question[] = [
    { kind: "choice", id: "cp-acc", itemId: "accountable-to", prompt: "accountable ______ sb", options: ["to", "into", "upon", "with"], answer: "to", reveal: "accountable to sb" },
    { kind: "choice", id: "cp-ins", itemId: "insight-into", prompt: "insight ______ sth", options: ["into", "to", "upon", "with"], answer: "into", reveal: "insight into sth" },
    { kind: "choice", id: "cp-enc", itemId: "encroach-upon", prompt: "encroach ______ sth", options: ["upon", "to", "into", "with"], answer: "upon", reveal: "encroach upon sth" },
    { kind: "choice", id: "cp-fit", itemId: "fit-in", prompt: "fit ______ with sb/sth", options: ["in", "on", "to", "upon"], answer: "in", reveal: "fit in (with sb/sth)" },
    { kind: "choice", id: "cp-rel", itemId: "rely-solely-on", prompt: "rely solely ______", options: ["on", "to", "into", "with"], answer: "on", reveal: "rely solely on" },
    { kind: "choice", id: "cp-col", itemId: "collaboration-with", prompt: "collaboration ______ sb", options: ["with", "to", "into", "upon"], answer: "with", reveal: "collaboration with sb" },
  ];
  const key: Question[] = CAREER_KEY.map((k, i) => ({
    kind: "choice" as const,
    id: `ck-${k.id}`,
    itemId: k.id,
    prompt: k.english,
    options: optionsFor(k.meaning, CAREER_KEY.map((x) => x.meaning), 4, i + 5),
    answer: k.meaning,
    reveal: k.english,
  }));
  return [
    { id: "match", moduleId: "prepositions", title: "Match", blurb: "", mechanic: "MATCH", heading: "Соедините значение и фразу", instruction: "Нажмите значение, затем английскую фразу.", whatToDo: "", hint: "accountable to, insight into, encroach upon, fit in with.", questions: match },
    { id: "choose", moduleId: "prepositions", title: "Choose", blurb: "", mechanic: "CHOOSE", heading: "Выберите предлог", instruction: "Выберите предлог в фразе.", whatToDo: "", hint: "to / into / upon / with / on / in.", questions: choose },
    { id: "key", moduleId: "prepositions", title: "Choose", blurb: "", mechanic: "CHOOSE", heading: "Слова из текстов", instruction: "Выберите значение английской единицы.", whatToDo: "", hint: "Это слова из текстов о плюсах и минусах работы.", questions: key },
  ];
}

function wordActs(): ActivityDef[] {
  const form: Question[] = CAREER_FAMILIES.map((f, i) => ({
    kind: "choice" as const,
    id: `cw-f-${f.id}`,
    itemId: f.id,
    prompt: `${f.base} → ______`,
    options: optionsFor(f.noun, CAREER_FAMILIES.map((x) => x.noun), 4, i + 2),
    answer: f.noun,
    reveal: f.example,
  }));
  const odd: Question[] = [
    { kind: "choice", id: "cw-adv", itemId: "advise", prompt: "Какая форма — существительное?", options: ["advice", "advise", "apply", "assess"], answer: "advice", reveal: "advice — существительное; advise — глагол." },
    { kind: "choice", id: "cw-app", itemId: "apply", prompt: "apply → ______", options: ["application", "advice", "actor", "exhibition"], answer: "application", reveal: "apply → application" },
    { kind: "choice", id: "cw-int", itemId: "interview", prompt: "Кто проводит собеседование?", options: ["interviewer", "interview", "advice", "vacancy"], answer: "interviewer", reveal: "interview → interviewer" },
    { kind: "choice", id: "cw-man", itemId: "manage", prompt: "manage → ______", options: ["management", "manufacturing", "publishing", "training"], answer: "management", reveal: "manage → management" },
    { kind: "choice", id: "cw-rec", itemId: "recruit", prompt: "recruit → ______", options: ["recruitment", "confirmation", "assessment", "acknowledgement"], answer: "recruitment", reveal: "recruit → recruitment" },
  ];
  const type: Question[] = CAREER_FAMILIES.map((f) => ({
    kind: "type" as const,
    id: `cw-t-${f.id}`,
    itemId: f.id,
    prompt: f.base,
    answers: [f.noun],
    reveal: `${f.base} → ${f.noun}`,
  }));
  return [
    { id: "form", moduleId: "word-building", title: "Form", blurb: "", mechanic: "CHOOSE", heading: "Выберите форму", instruction: "Выберите существительное или связанную форму к базе.", whatToDo: "", hint: "Только карьерные пары, не actor.", questions: form },
    { id: "odd", moduleId: "word-building", title: "Choose", blurb: "", mechanic: "CHOOSE", heading: "Выберите нужную форму", instruction: "Один вариант подходит к заданию.", whatToDo: "", hint: "advice неисчисляемое.", questions: odd },
    { id: "type", moduleId: "word-building", title: "Type", blurb: "", mechanic: "WORD BUILDING", heading: "Напечатайте форму", instruction: "Введите существительное или связанную форму к этому слову.", whatToDo: "", hint: "apply → application, advise → advice.", questions: type },
  ];
}

let cache: ActivityDef[] | null = null;
export function careerActivities(): ActivityDef[] {
  if (!cache) cache = [...vocabActs(), ...idiomActs(), ...colloActs(), ...prepActs(), ...wordActs()];
  return cache;
}

export function careerActivitiesFor(moduleId: string): ActivityDef[] {
  return careerActivities().filter((a) => a.moduleId === moduleId);
}

export function findCareerActivity(moduleId: string, activityId: string): ActivityDef | undefined {
  return careerActivities().find((a) => a.moduleId === moduleId && a.id === activityId);
}

export function careerQuick(seed: number): Question[] {
  const pool = careerActivities().flatMap((a) => a.questions.filter((q) => q.kind === "choice"));
  return shuffle(pool, seed).slice(0, 5);
}

export function careerFinal(): Question[] {
  const pool = careerActivities().flatMap((a) => a.questions.filter((q) => q.kind === "choice" || q.kind === "match"));
  return shuffle(pool, 21).slice(0, 12);
}

export function careerReview(itemIds: string[]): Question[] {
  const set = new Set(itemIds);
  const unique: Question[] = [];
  const seen = new Set<string>();
  for (const q of careerActivities().flatMap((a) => a.questions)) {
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

export function careerItemLabel(id: string): string {
  const v = CAREER_VOCAB.find((x) => x.id === id);
  if (v) return v.english;
  const i = CAREER_IDIOMS.find((x) => x.id === id);
  if (i) return i.english;
  const c = CAREER_COLLOS.find((x) => x.id === id);
  if (c) return c.english;
  const p = CAREER_PREP.find((x) => x.id === id);
  if (p) return p.english;
  const k = CAREER_KEY.find((x) => x.id === id);
  if (k) return k.english;
  const f = CAREER_FAMILIES.find((x) => x.id === id);
  if (f) return f.base;
  return id;
}

export function careerModuleList() {
  return ["vocabulary", "idioms", "collocations", "prepositions", "word-building"] as CareerModuleId[];
}
