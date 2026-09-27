import {
  ENV_COLLOS,
  ENV_FAMILIES,
  ENV_IDIOMS,
  ENV_PHRASALS,
  ENV_PREP,
  ENV_VOCAB,
  RAIN_SCALE,
  type EnvModuleId,
} from "@/data/unit2";
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
  const poolT = ENV_VOCAB.map((v) => v.translation);
  const poolE = ENV_VOCAB.map((v) => v.english);
  const match: Question[] = chunk(ENV_VOCAB, 4).map((group, i) => ({
    kind: "match",
    id: `e-match-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "Соедините слово и перевод.",
    pairs: group.map((g) => ({ id: g.id, left: g.english, right: g.translation })),
  }));
  const choice: Question[] = ENV_VOCAB.map((v, i) => ({
    kind: "choice" as const,
    id: `e-ch-${v.id}`,
    itemId: v.id,
    prompt: v.english,
    options: optionsFor(v.translation, poolT, 4, i + 2),
    answer: v.translation,
    reveal: v.example,
  }));
  const flip: Question[] = ENV_VOCAB.map((v) => ({
    kind: "flip" as const,
    id: `e-flip-${v.id}`,
    itemId: v.id,
    front: v.english,
    back: v.translation,
    example: v.example,
  }));
  const fill: Question[] = ENV_VOCAB.flatMap((v, i) => {
    const gap = blankExample(v.example, v.english.replace(/\(.*\)/, "").split("/")[0]);
    if (!gap) return [];
    const answer = v.english.replace(/\(.*\)/, "").split("/")[0].trim();
    return [{
      kind: "choice" as const,
      id: `e-fill-${v.id}`,
      itemId: v.id,
      prompt: `${gap.before}______${gap.after}`,
      options: optionsFor(answer, poolE.map((e) => e.replace(/\(.*\)/, "").split("/")[0].trim()), 4, i + 4),
      answer,
      reveal: `${v.example} — ${v.translation}`,
    }];
  });
  const rain: Question[] = [{
    kind: "sort",
    id: "e-rain-scale",
    itemIds: ["shower", "heavy-rain", "pour-down", "torrential-rain", "flood"],
    prompt: "",
    buckets: ["1", "2", "3", "4", "5"],
    cards: RAIN_SCALE.map((label, i) => ({ id: `rain-${i}`, label, bucket: String(i + 1) })),
  }];
  const weather: Question[] = [{
    kind: "choice",
    id: "e-weather-count",
    itemId: "weather-count",
    prompt: "We had ______ that day.",
    detail: "weather — неисчисляемое.",
    options: ["bad weather", "a bad weather", "bads weather", "the weathers"],
    answer: "bad weather",
    reveal: "Верно: We had bad weather that day.",
  }];
  return [
    { id: "match", moduleId: "vocabulary", title: "Match", blurb: "", mechanic: "MATCH", heading: "Соедините слово и перевод", instruction: "Нажмите слово, затем перевод.", whatToDo: "", hint: "Сначала найдите знакомые слова.", questions: match },
    { id: "choose", moduleId: "vocabulary", title: "Choose", blurb: "", mechanic: "CHOOSE", heading: "Выберите перевод", instruction: "Выберите русский перевод английского слова.", whatToDo: "", hint: "Сравните, о природе это слово или о погоде.", questions: choice },
    { id: "flashcards", moduleId: "vocabulary", title: "Flashcards", blurb: "", mechanic: "FLASHCARDS", heading: "Проверьте, помните ли вы слово", instruction: "Нажмите карточку, чтобы увидеть перевод.", whatToDo: "", hint: "Сначала вспомните значение сами.", questions: flip },
    { id: "fill", moduleId: "vocabulary", title: "Fill", blurb: "", mechanic: "FILL THE GAP", heading: "Вставьте слово в пропуск", instruction: "Выберите слово, которое подходит в предложение.", whatToDo: "", hint: "Прочитайте всё предложение.", questions: [...fill, ...weather] },
    { id: "rain", moduleId: "vocabulary", title: "Rain scale", blurb: "", mechanic: "SORT", heading: "Шкала дождя", instruction: "Разложите виды осадков от самого слабого к самому сильному. 1 — слабый, 5 — самый сильный.", whatToDo: "", hint: "Начинается с shower, заканчивается flood.", questions: rain },
  ];
}

function idiomActs(): ActivityDef[] {
  const all = [...ENV_IDIOMS, ...ENV_PHRASALS];
  const match: Question[] = chunk34(ENV_IDIOMS).map((group, i) => ({
    kind: "match" as const,
    id: `ei-m-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "",
    pairs: group.map((g) => ({ id: g.id, left: g.definition, right: g.english })),
  }));
  const broken: Question[] = [
    { kind: "choice", id: "br-rain", itemId: "come-rain-or-shine", prompt: "come rain or ______", options: ["shine", "wind", "luck", "flood"], answer: "shine", reveal: "come rain or shine" },
    { kind: "choice", id: "br-wood", itemId: "touch-wood", prompt: "touch ______", options: ["wood", "luck", "nature", "rain"], answer: "wood", reveal: "touch wood" },
    { kind: "choice", id: "br-blue", itemId: "out-of-the-blue", prompt: "out of the ______", options: ["blue", "rain", "luck", "wild"], answer: "blue", reveal: "out of the blue" },
    { kind: "choice", id: "br-straw", itemId: "draw-the-short-straw", prompt: "draw the short ______", options: ["straw", "luck", "stick", "row"], answer: "straw", reveal: "draw the short straw" },
    { kind: "choice", id: "br-fingers", itemId: "have-green-fingers", prompt: "have green ______", options: ["fingers", "hands", "luck", "thumbs"], answer: "fingers", reveal: "have green fingers" },
  ];
  const storyBits = [
    { id: "start-off", prompt: "The day will ______ with a bit of sunshine.", answer: "start off", options: ["start off", "die out", "pick up", "cloud over"] },
    { id: "make-the-most-of", prompt: "you'll need to ______ it because it'll soon cloud over", answer: "make the most of", options: ["make the most of", "look on the bright side", "pick up", "brighten up"] },
    { id: "cloud-over", prompt: "it'll soon ______", answer: "cloud over", options: ["cloud over", "brighten up", "die out", "pick up"] },
    { id: "the-chances-are", prompt: "by lunchtime ______ we'll all get a shower", answer: "the chances are", options: ["the chances are", "in a row", "here and there", "out of luck"] },
    { id: "die-out-weather", prompt: "The rain may ______ in the south", answer: "die out", options: ["die out", "start off", "pick up", "cloud over"] },
    { id: "brighten-up", prompt: "it could even ______ during the afternoon", answer: "brighten up", options: ["brighten up", "cloud over", "die out", "start off"] },
    { id: "here-and-there", prompt: "there will be more showers ______", answer: "here and there", options: ["here and there", "in a row", "out of luck", "in luck"] },
    { id: "out-of-luck", prompt: "I'm afraid you're ______", answer: "out of luck", options: ["out of luck", "in luck", "in a row", "here and there"] },
    { id: "in-a-row", prompt: "Friday could be the third wet day ______", answer: "in a row", options: ["in a row", "here and there", "out of luck", "the chances are"] },
    { id: "pick-up", prompt: "things may ______ by the weekend", answer: "pick up", options: ["pick up", "die out", "cloud over", "start off"] },
  ];
  const story: Question[] = storyBits.map((b) => ({
    kind: "story" as const,
    id: `st-${b.id}`,
    itemId: b.id,
    lead: b.prompt,
    options: b.options,
    answer: b.answer,
    reveal: ENV_PHRASALS.find((p) => p.id === b.id)?.translation ?? b.answer,
  }));
  void all;
  return [
    { id: "match", moduleId: "idioms", title: "Match", blurb: "", mechanic: "MATCH", heading: "Соедините определение и идиому", instruction: "Нажмите определение, затем идиому.", whatToDo: "", hint: "Сначала прочитайте все определения слева.", questions: match },
    { id: "broken", moduleId: "idioms", title: "Complete", blurb: "", mechanic: "FILL THE GAP", heading: "Дополните идиому", instruction: "Выберите пропущенное слово.", whatToDo: "", hint: "Вспомните устойчивую пару слов.", questions: broken },
    { id: "forecast", moduleId: "idioms", title: "Forecast", blurb: "", mechanic: "STORY", heading: "Прогноз погоды", instruction: "Выберите выражение, которое подходит в фрагмент прогноза.", whatToDo: "", hint: "Это прогноз: солнце, облака, дождь, выходные.", questions: story },
    { id: "choose", moduleId: "idioms", title: "Choose", blurb: "", mechanic: "CHOOSE", heading: "Выберите выражение по значению", instruction: "Прочитайте английское определение и выберите выражение.", whatToDo: "", hint: "Определение описывает одно выражение.", questions: ENV_PHRASALS.map((p, i) => ({
      kind: "choice" as const,
      id: `ph-ch-${p.id}`,
      itemId: p.id,
      prompt: p.definition,
      options: optionsFor(p.english, ENV_PHRASALS.map((x) => x.english), 4, i + 3),
      answer: p.english,
      reveal: p.translation,
    })) },
  ];
}

function colloActs(): ActivityDef[] {
  const pairs: Question[] = chunk(ENV_COLLOS.filter((c) => c.group !== "THREAT"), 4).slice(0, 6).map((group, i) => ({
    kind: "match" as const,
    id: `col-m-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "Соедините сочетание и группу.",
    pairs: group.map((g) => ({ id: g.id, left: g.english, right: g.group })),
  }));
  const choose: Question[] = [
    { kind: "choice", id: "c-risk", itemId: "take-a-risk", prompt: "______ a risk", options: ["take", "make", "do", "give"], answer: "take", reveal: "take a risk" },
    { kind: "choice", id: "c-luck", itemId: "wish-luck", prompt: "wish sb ______", options: ["luck", "risk", "weather", "nature"], answer: "luck", reveal: "wish sb luck" },
    { kind: "choice", id: "c-rain", itemId: "pour-with-rain", prompt: "pour ______ rain", options: ["with", "of", "on", "to"], answer: "with", reveal: "pour with rain" },
    { kind: "choice", id: "c-weather", itemId: "good-weather", prompt: "We had bad ______ that day.", options: ["weather", "a weather", "weathers", "the weather's"], answer: "weather", reveal: "good / bad weather; weather неисчисляемое." },
    { kind: "choice", id: "c-threat", itemId: "pose-a-threat", prompt: "pose a ______ (to)", options: ["threat", "luck", "weather", "sun"], answer: "threat", reveal: "pose a threat (to)" },
  ];
  const pairNo: Question[] = [
    { kind: "choice", id: "pn-1", itemId: "take-a-risk", prompt: "take a risk", detail: "Это устойчивое сочетание?", options: ["Пара", "Не пара"], answer: "Пара", reveal: "take a risk" },
    { kind: "choice", id: "pn-2", itemId: "make-a-risk", prompt: "make a risk", detail: "Это устойчивое сочетание из юнита?", options: ["Пара", "Не пара"], answer: "Не пара", reveal: "В юните: take a risk." },
    { kind: "choice", id: "pn-3", itemId: "under-the-weather", prompt: "under the weather", options: ["Пара", "Не пара"], answer: "Пара", reveal: "under the weather" },
    { kind: "choice", id: "pn-4", itemId: "do-a-luck", prompt: "do luck", options: ["Пара", "Не пара"], answer: "Не пара", reveal: "В юните: wish sb luck, bring you luck, push your luck." },
    { kind: "choice", id: "pn-5", itemId: "in-all-weathers", prompt: "in all weathers", options: ["Пара", "Не пара"], answer: "Пара", reveal: "in all weathers" },
  ];
  return [
    { id: "groups", moduleId: "collocations", title: "Groups", blurb: "", mechanic: "MATCH", heading: "Соедините сочетание и группу", instruction: "Нажмите сочетание, затем группу: LUCK, RISK, NATURE и другие.", whatToDo: "", hint: "Смотрите на главное слово: luck, risk, weather, nature.", questions: pairs },
    { id: "choose", moduleId: "collocations", title: "Choose", blurb: "", mechanic: "CHOOSE", heading: "Выберите слово в сочетании", instruction: "Выберите слово, которое входит в устойчивое сочетание.", whatToDo: "", hint: "Вспомните глагол: take, wish, pour.", questions: choose },
    { id: "pair", moduleId: "collocations", title: "Pair", blurb: "", mechanic: "PAIR OR NO PAIR", heading: "Пара или не пара", instruction: "Отметьте, есть ли такое сочетание в этом юните.", whatToDo: "", hint: "Неверные варианты специально похожи на настоящие.", questions: pairNo },
  ];
}

function prepActs(): ActivityDef[] {
  const withOpp = ENV_PREP.filter((p) => p.opposite);
  const opp: Question[] = withOpp.map((p, i) => ({
    kind: "choice" as const,
    id: `opp-${p.id}`,
    itemId: p.id,
    prompt: p.english,
    detail: p.meaning,
    options: optionsFor(p.opposite!, ENV_PREP.map((x) => x.english), 4, i + 2),
    answer: p.opposite!,
    reveal: `${p.english} ↔ ${p.opposite}`,
  }));
  const choose: Question[] = ENV_PREP.map((p, i) => ({
    kind: "choice" as const,
    id: `pr-${p.id}`,
    itemId: p.id,
    prompt: p.meaning,
    options: optionsFor(p.english, ENV_PREP.map((x) => x.english), 4, i + 1),
    answer: p.english,
    reveal: p.meaning,
  }));
  const match: Question[] = chunk(ENV_PREP, 4).map((group, i) => ({
    kind: "match" as const,
    id: `prm-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "Соедините фразу и значение.",
    pairs: group.map((g) => ({ id: g.id, left: g.english, right: g.meaning })),
  }));
  return [
    { id: "opposites", moduleId: "prepositions", title: "Opposites", blurb: "", mechanic: "CHOOSE", heading: "Найдите противоположную фразу", instruction: "Выберите фразу с противоположным значением.", whatToDo: "", hint: "Пары: in the wild / in captivity, in luck / out of luck.", questions: opp },
    { id: "choose", moduleId: "prepositions", title: "Choose", blurb: "", mechanic: "CHOOSE", heading: "Выберите фразу по значению", instruction: "Прочитайте значение и выберите предложную фразу.", whatToDo: "", hint: "Смотрите на предлог: in, under, by, against, out of.", questions: choose },
    { id: "match", moduleId: "prepositions", title: "Match", blurb: "", mechanic: "MATCH", heading: "Соедините фразу и значение", instruction: "Нажмите английскую фразу, затем русский перевод.", whatToDo: "", hint: "Сначала найдите короткие знакомые фразы.", questions: match },
  ];
}

function wordActs(): ActivityDef[] {
  const pick: Question[] = ENV_FAMILIES.map((f, i) => ({
    kind: "choice" as const,
    id: `wb-${f.id}`,
    itemId: f.id,
    prompt: f.base,
    detail: "Выберите слово из этой семьи.",
    options: optionsFor(f.members[0], [...f.members, "occure", "aware", "hazard"].filter((x) => x !== f.members[0]), 4, i + 2),
    answer: f.members[0],
    reveal: `${f.base}: ${f.members.join(", ")}`,
  }));
  const error: Question[] = [
    { kind: "choice", id: "er-occur", itemId: "occur", prompt: "Какая форма написана неверно?", options: ["occurrence", "occure", "recur", "recurrence"], answer: "occure", reveal: "occur, не occure." },
    { kind: "choice", id: "er-ext", itemId: "extinct", prompt: "ecology → ?", options: ["ecologist", "occure", "hazard", "aware"], answer: "ecologist", reveal: "ecology — ecologist, ecological." },
    { kind: "choice", id: "er-wild", itemId: "wild", prompt: "wild → wildlife / wilderness / ______", options: ["wildly", "occure", "aware", "hazard"], answer: "wildly", reveal: "wild: wilderness, wildlife, wildly." },
    { kind: "choice", id: "er-fort", itemId: "fortune", prompt: "fortune → ?", options: ["misfortune", "favouritism", "occure", "hazard"], answer: "misfortune", reveal: "fortune: misfortune, fortunate, unfortunate, fortunately, unfortunately." },
  ];
  const type: Question[] = [
    { kind: "type", id: "t-eco", itemId: "ecology", prompt: "ecology → человек, который этим занимается", answers: ["ecologist"], reveal: "ecologist" },
    { kind: "type", id: "t-ext", itemId: "extinct", prompt: "extinct → существительное", answers: ["extinction"], reveal: "extinction" },
    { kind: "type", id: "t-threat", itemId: "threat", prompt: "threat → глагол", answers: ["threaten"], reveal: "threaten" },
    { kind: "type", id: "t-occur", itemId: "occur", prompt: "occur → существительное", answers: ["occurrence"], reveal: "occurrence" },
    { kind: "type", id: "t-risk", itemId: "risk", prompt: "risk → прилагательное", answers: ["risky"], reveal: "risky" },
  ];
  return [
    { id: "form", moduleId: "word-building", title: "Form", blurb: "", mechanic: "WORD BUILDING", heading: "Выберите форму от основы", instruction: "Дана основа. Выберите слово из её семьи.", whatToDo: "", hint: "Не выбирайте occure — такой формы нет.", questions: pick },
    { id: "error", moduleId: "word-building", title: "Error", blurb: "", mechanic: "CHOOSE", heading: "Найдите ошибку в образовании", instruction: "Выберите неверную форму или верного члена семьи, как сказано в вопросе.", whatToDo: "", hint: "occur пишется без e на конце основы в occur.", questions: error },
    { id: "type", moduleId: "word-building", title: "Type", blurb: "", mechanic: "WORD BUILDING", heading: "Напечатайте форму", instruction: "Введите нужную форму от основы.", whatToDo: "", hint: "ecology → ecologist; extinct → extinction.", questions: type },
  ];
}

let cache: ActivityDef[] | null = null;

export function envActivities(): ActivityDef[] {
  if (!cache) cache = [...vocabActs(), ...idiomActs(), ...colloActs(), ...prepActs(), ...wordActs()];
  return cache;
}

export function envActivitiesFor(moduleId: string): ActivityDef[] {
  return envActivities().filter((a) => a.moduleId === moduleId);
}

export function findEnvActivity(moduleId: string, activityId: string): ActivityDef | undefined {
  return envActivities().find((a) => a.moduleId === moduleId && a.id === activityId);
}

export function envQuick(seed: number): Question[] {
  const pool = envActivities().flatMap((a) => a.questions.filter((q) => q.kind === "choice"));
  return shuffle(pool, seed).slice(0, 5);
}

export function envFinal(): Question[] {
  const pool = envActivities().flatMap((a) => a.questions.filter((q) => q.kind === "choice" || q.kind === "match"));
  return shuffle(pool, 21).slice(0, 12);
}

export function envReview(itemIds: string[]): Question[] {
  const set = new Set(itemIds);
  const unique: Question[] = [];
  const seen = new Set<string>();
  for (const q of envActivities().flatMap((a) => a.questions)) {
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

export function envItemLabel(id: string): string {
  const v = ENV_VOCAB.find((x) => x.id === id);
  if (v) return v.english;
  const i = [...ENV_IDIOMS, ...ENV_PHRASALS].find((x) => x.id === id);
  if (i) return i.english;
  const c = ENV_COLLOS.find((x) => x.id === id);
  if (c) return c.english;
  const p = ENV_PREP.find((x) => x.id === id);
  if (p) return p.english;
  const f = ENV_FAMILIES.find((x) => x.id === id);
  if (f) return f.base;
  return id;
}

export function envModuleList() {
  return ["vocabulary", "idioms", "collocations", "prepositions", "word-building"] as EnvModuleId[];
}
