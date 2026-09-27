import {
  COLLOCATIONS,
  FATHER,
  PREP_A,
  PREP_B,
  SISTERS,
  SPOTLIGHT_STAY,
  VOCAB,
  WB_EX1,
  WB_EX2,
  WORD_FAMILIES,
  type ModuleId,
} from "@/data/unit1";

export type ChoiceQ = {
  kind: "choice";
  id: string;
  itemId: string;
  prompt: string;
  detail?: string;
  options: string[];
  answer: string;
  reveal: string;
};

export type FillQ = {
  kind: "fill";
  id: string;
  itemId: string;
  before: string;
  after: string;
  options: string[];
  answer: string;
  reveal: string;
};

export type MatchQ = {
  kind: "match";
  id: string;
  itemIds: string[];
  prompt: string;
  pairs: { id: string; left: string; right: string }[];
};

export type FlipQ = {
  kind: "flip";
  id: string;
  itemId: string;
  front: string;
  back: string;
  example?: string;
};

export type OrderQ = {
  kind: "order";
  id: string;
  itemId: string;
  prompt: string;
  tokens: string[];
  answer: string[];
  reveal: string;
};

export type SortQ = {
  kind: "sort";
  id: string;
  itemIds: string[];
  prompt: string;
  buckets: string[];
  cards: { id: string; label: string; bucket: string }[];
};

export type StoryQ = {
  kind: "story";
  id: string;
  itemId: string;
  lead: string;
  options: string[];
  answer: string;
  reveal: string;
};

export type TypeQ = {
  kind: "type";
  id: string;
  itemId: string;
  prompt: string;
  answers: string[];
  reveal: string;
};

export type Question = ChoiceQ | FillQ | MatchQ | FlipQ | OrderQ | SortQ | StoryQ | TypeQ;

export type ActivityDef = {
  id: string;
  moduleId: ModuleId;
  title: string;
  blurb: string;
  mechanic: string;
  heading: string;
  instruction: string;
  whatToDo: string;
  hint: string;
  questions: Question[];
};

export function copyFor(q: Question) {
  if (q.kind === "match") return { mechanic: "MATCH", heading: "Соедините пары", instruction: "Нажмите карточку слева, затем подходящий вариант справа. Можно перетащить.", whatToDo: "Соедините слово или выражение с переводом или значением.", hint: "Сначала прочитайте все карточки слева и найдите знакомую пару." };
  if (q.kind === "fill" || (q.kind === "choice" && q.prompt.includes("______"))) return { mechanic: "FILL THE GAP", heading: "Вставьте пропущенное слово", instruction: "Выберите слово, которое подходит по смыслу и грамматике.", whatToDo: "Вставьте подходящее слово в пропуск.", hint: "Посмотрите на слова вокруг пропуска: они подсказывают часть речи." };
  if (q.kind === "flip") return { mechanic: "FLASHCARDS", heading: "Проверьте, помните ли вы слово", instruction: "Нажмите на карточку, чтобы увидеть перевод и пример.", whatToDo: "Отметьте, помните вы это слово или его нужно повторить.", hint: "Сначала вспомните значение сами и только потом переворачивайте карточку." };
  if (q.kind === "type") return { mechanic: "WORD BUILDING", heading: "Напечатайте форму существительного", instruction: "Введите существительное к этому глаголу.", whatToDo: "Напечатайте существительное.", hint: "Если форм две, подойдёт любая из них." };
  if (q.kind === "order") return { mechanic: "WORD ORDER", heading: "Соберите правильное выражение", instruction: "Нажимайте слова в нужном порядке. Повторное нажатие возвращает слово назад.", whatToDo: "Составьте английскую фразу из частей.", hint: "Начните с глагола или с главного слова выражения." };
  if (q.kind === "sort") return { mechanic: "SORT", heading: "Распределите фразы по группам", instruction: "Выберите фразу, затем группу предлога.", whatToDo: "Отнесите каждую фразу к предлогу IN, ON, AT, BY или OUT OF.", hint: "Смотрите на первое слово фразы: это и есть предлог." };
  if (q.kind === "story") return { mechanic: "STORY", heading: "Продолжите историю", instruction: "Прочитайте фрагмент и выберите выражение, которое пропущено.", whatToDo: "Выберите выражение, которое подходит по смыслу.", hint: "Вспомните, о ком говорится в этом фрагменте истории." };
  return { mechanic: "CHOOSE", heading: "Выберите правильный вариант", instruction: "Один вариант подходит к заданию. Остальные — из этого же раздела.", whatToDo: "Выберите правильный вариант ответа.", hint: "Отбросьте варианты, которые относятся к другой теме раздела." };
}

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

function blankExample(example: string, surface: string): { before: string; after: string } | null {
  const forms = surface
    .split("/")
    .map((s) => s.trim())
    .filter((s) => s && !s.includes("sb") && !s.includes("sth") && s.length > 2);
  const ordered = [...forms].sort((a, b) => b.length - a.length);
  const lower = example.toLowerCase();
  for (const form of ordered) {
    const idx = lower.indexOf(form.toLowerCase());
    if (idx >= 0) {
      return { before: example.slice(0, idx), after: example.slice(idx + form.length) };
    }
  }
  return null;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function vocabActivities(): ActivityDef[] {
  const poolT = VOCAB.map((v) => v.translation);
  const poolE = VOCAB.map((v) => v.english);
  const match: Question[] = chunk(VOCAB, 4).map((group, i) => ({
    kind: "match",
    id: `vocab-match-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "Перетащите перевод к слову или нажмите слово, затем перевод.",
    pairs: group.map((g) => ({ id: g.id, left: g.english, right: g.translation })),
  }));
  const choice: Question[] = VOCAB.map((v, i) => ({
    kind: "choice",
    id: `vocab-choice-${v.id}`,
    itemId: v.id,
    prompt: v.english,
    detail: v.note ? `Отдельное значение: ${v.note === "verb" ? "глагол" : v.note === "noun" ? "существительное" : "прилагательное"}.` : undefined,
    options: optionsFor(v.translation, poolT, 4, i + 2),
    answer: v.translation,
    reveal: v.example,
  }));
  const flip: Question[] = VOCAB.map((v) => ({
    kind: "flip",
    id: `vocab-flip-${v.id}`,
    itemId: v.id,
    front: v.english,
    back: v.translation,
    example: v.example,
  }));
  const fill: Question[] = VOCAB.flatMap((v, i) => {
    const gap = blankExample(v.example, v.english.split("/")[0]);
    if (!gap) return [];
    const answer = v.english.split("/")[0].trim();
    return [{
      kind: "fill" as const,
      id: `vocab-fill-${v.id}`,
      itemId: v.id,
      before: gap.before,
      after: gap.after,
      options: optionsFor(answer, poolE.map((e) => e.split("/")[0].trim()), 4, i + 5),
      answer,
      reveal: `${v.example} — ${v.translation}`,
    }];
  });
  const context: Question[] = VOCAB.map((v, i) => {
    const gap = blankExample(v.example, v.english.split("/")[0]);
    const answer = v.english;
    return {
      kind: "choice" as const,
      id: `vocab-ctx-${v.id}`,
      itemId: v.id,
      prompt: gap ? `${gap.before}______${gap.after}` : v.example,
      detail: "Подберите слово по смыслу предложения.",
      options: optionsFor(answer, poolE, 4, i + 11),
      answer,
      reveal: `${v.translation}. ${v.example}`,
    };
  });
  return [
    { id: "match", moduleId: "vocabulary", title: "Match", blurb: "Слово и перевод", mechanic: "MATCH", heading: "Соедините слово и его перевод", instruction: "Перетащите каждый русский перевод к английскому слову или нажмите слово, затем перевод.", whatToDo: "Соедините английское слово с русским переводом.", hint: "Если у слова два значения, смотрите, глагол это или другая часть речи.", questions: match },
    { id: "translation", moduleId: "vocabulary", title: "Choose the translation", blurb: "Выберите перевод", mechanic: "CHOOSE", heading: "Выберите правильный перевод", instruction: "Выберите русский перевод английского слова.", whatToDo: "Один из четырёх вариантов — перевод из словаря Unit 1.", hint: "Сравните часть речи: глагол, существительное или прилагательное.", questions: choice },
    { id: "flashcards", moduleId: "vocabulary", title: "Flashcards", blurb: "I know it / Need practice", mechanic: "FLASHCARDS", heading: "Проверьте, помните ли вы слово", instruction: "Нажмите на карточку, чтобы увидеть перевод и пример.", whatToDo: "Нажмите «Знаю», если помните значение, или «Нужно повторить», если нет.", hint: "Произнесите перевод про себя до переворота карточки.", questions: flip },
    { id: "fill", moduleId: "vocabulary", title: "Fill the gap", blurb: "Предложения с пропуском", mechanic: "FILL THE GAP", heading: "Вставьте пропущенное слово", instruction: "Выберите слово, которое подходит по смыслу и грамматике.", whatToDo: "Вставьте слово в пропуск.", hint: "Прочитайте всё предложение целиком, затем смотрите на пропуск.", questions: fill },
    { id: "context", moduleId: "vocabulary", title: "Word in context", blurb: "Слово по смыслу", mechanic: "WORD IN CONTEXT", heading: "Подберите подходящее по смыслу слово", instruction: "По предложению с пропуском выберите английское слово.", whatToDo: "Найдите слово, которое подходит в это предложение.", hint: "Перевод появится после ответа. Пока опирайтесь на ситуацию в предложении.", questions: context },
  ];
}

function idiomActivities(): ActivityDef[] {
  const all = [...FATHER, ...SISTERS];
  const match: Question[] = chunk(all, 3).map((group, i) => ({
    kind: "match",
    id: `idiom-match-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "Соедините выражение и значение.",
    pairs: group.map((g) => ({ id: g.id, left: g.english, right: g.definition })),
  }));
  const fatherBits: { lead: string; answer: string; options: string[] }[] = [
    { lead: "I ______ after my father.", answer: "take", options: ["take", "run", "look", "follow"] },
    { lead: "We're both tall - that ______ in the family.", answer: "runs", options: ["runs", "takes", "brings", "shows"] },
    { lead: "I was ______ up on a farm.", answer: "brought", options: ["brought", "looked", "followed", "shown"] },
    { lead: "I always ______ up to my father.", answer: "looked", options: ["looked", "took", "ran", "followed"] },
    { lead: "I followed in his ______.", answer: "footsteps", options: ["footsteps", "blood", "ropes", "view"] },
    { lead: "Basically farming is in my ______.", answer: "blood", options: ["blood", "ropes", "view", "life"] },
    { lead: "it's been our ______ of life for five generations.", answer: "way", options: ["way", "point", "blood", "rope"] },
    { lead: "He knows the business ______ out.", answer: "inside", options: ["inside", "after", "up", "into"] },
    { lead: "He enjoys showing me the ______.", answer: "ropes", options: ["ropes", "footsteps", "blood", "view"] },
    { lead: "And from his ______ of view, he likes to have someone younger with new ideas.", answer: "point", options: ["point", "way", "blood", "rope"] },
  ];
  const complete: Question[] = fatherBits.map((b, i) => ({
    kind: "choice",
    id: `idiom-bit-${i}`,
    itemId: FATHER[i].id,
    prompt: b.lead,
    detail: undefined,
    options: b.options,
    answer: b.answer,
    reveal: `${FATHER[i].english} — ${FATHER[i].definition}`,
  }));
  const scene: Question[] = all.map((g, i) => ({
    kind: "choice",
    id: `scene-${g.id}`,
    itemId: g.id,
    prompt: g.definition,
    detail: "Какое выражение подходит к этому значению?",
    options: optionsFor(g.english, all.map((x) => x.english), 4, i + 4),
    answer: g.english,
    reveal: g.definition,
  }));
  const fatherLines = [
    "I ______ my father.",
    "We're both tall - that ______.",
    "I was ______ on a farm.",
    "I always ______ my father.",
    "I ______ and joined him on the family farm.",
    "Basically farming is ______.",
    "it's been ______ for five generations.",
    "He ______.",
    "He enjoys ______.",
    "And from his ______, he likes to have someone younger with new ideas.",
  ];
  const fatherStory: Question[] = FATHER.map((g, i) => ({
    kind: "story",
    id: `father-story-${g.id}`,
    itemId: g.id,
    lead: fatherLines[i] ?? g.english,
    options: optionsFor(g.english, FATHER.map((x) => x.english), 4, i + 2),
    answer: g.english,
    reveal: g.definition,
  }));
  const sisterBits = [
    { prompt: "When my mother ______ to twins.", answer: "gave birth", item: "give-birth" },
    { prompt: "I don't suppose she knew what she was ______.", answer: "letting herself in for", item: "let-yourself-in" },
    { prompt: "Although I'm ______ Elle, we were equally horrible.", answer: "nothing like", item: "nothing-like" },
    { prompt: "I got ______ by hiding her favourite doll.", answer: "my own back", item: "own-back" },
    { prompt: "she always ______ when I did that.", answer: "burst into tears", item: "burst-into-tears" },
    { prompt: "And then we ______ even more difficult teenagers.", answer: "grew into", item: "grow-into" },
    { prompt: "we were always ______ at school for smoking, wearing make-up, or just being lazy.", answer: "getting into trouble", item: "get-into-trouble" },
    { prompt: "Our poor mother tried to ______ to some of our behaviour, but it wasn't easy.", answer: "turn a blind eye", item: "blind-eye" },
    { prompt: "Then, by some miracle, we ______.", answer: "grew up", item: "grow-up" },
  ];
  const sistersStory: Question[] = sisterBits.map((b, i) => ({
    kind: "choice" as const,
    id: `sisters-${b.item}`,
    itemId: b.item,
    prompt: b.prompt,
    options: optionsFor(
      b.answer,
      ["gave birth", "letting herself in for", "nothing like", "my own back", "burst into tears", "grew into", "getting into trouble", "turn a blind eye", "grew up"],
      4,
      i + 6,
    ),
    answer: b.answer,
    reveal: SISTERS.find((s) => s.id === b.item)?.definition ?? "",
  }));
  const synonymPairs = [
    { id: "syn-inside", left: "know sth inside out", right: "know what you are talking about" },
    { id: "syn-nothing", left: "nothing like sb/sth", right: "not anything like sb/sth" },
    { id: "syn-bonds", left: "family bonds", right: "family ties" },
    { id: "syn-knit", left: "close-knit", right: "tight-knit" },
    { id: "syn-turns", left: "take turns", right: "take it in turns" },
    { id: "syn-once", left: "at once", right: "straight away" },
    { id: "syn-certain", left: "for certain", right: "for sure" },
  ];
  const synonymMatch: Question[] = chunk(synonymPairs, 3).map((group, i) => ({
    kind: "match",
    id: `syn-match-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "Соедините синонимы.",
    pairs: group,
  }));
  const stay: Question[] = SPOTLIGHT_STAY.items.map((s, i) => ({
    kind: "choice" as const,
    id: `stay-${s.id}`,
    itemId: s.id,
    prompt: s.definition,
    options: optionsFor(s.english, SPOTLIGHT_STAY.items.map((x) => x.english), 3, i + 1),
    answer: s.english,
    reveal: s.definition,
  }));
  return [
    { id: "match", moduleId: "idioms", title: "Match", blurb: "Выражение и значение", mechanic: "MATCH", heading: "Соедините фразу и её значение", instruction: "Перетащите каждое английское выражение к соответствующему значению.", whatToDo: "Соедините выражение и определение.", hint: "Ищите в определении глагол действия: look, respect, care, cry.", questions: match },
    { id: "complete", moduleId: "idioms", title: "Complete", blurb: "Father and son", mechanic: "STORY", heading: "Продолжите историю", instruction: "Прочитайте фрагмент и выберите пропущенное слово.", whatToDo: "Выберите слово, которое подходит по смыслу.", hint: "Это история про отца и сына на ферме.", questions: complete },
    { id: "scene", moduleId: "idioms", title: "Scene", blurb: "Значение", mechanic: "CHOOSE", heading: "Узнайте выражение по значению", instruction: "Прочитайте значение и выберите выражение.", whatToDo: "Одно выражение совпадает со значением на экране.", hint: "Значение описывает одно выражение из списка.", questions: scene },
    { id: "father", moduleId: "idioms", title: "Story · Father and son", blurb: "Текст по фрагментам", mechanic: "STORY", heading: "Продолжите историю", instruction: "Прочитайте фрагмент и выберите выражение, которое в нём используется.", whatToDo: "Выберите выражение, которое подходит по смыслу этого фрагмента.", hint: "В тексте отец и сын работают на семейной ферме.", questions: fatherStory },
    { id: "sisters", moduleId: "idioms", title: "Story · Sisters", blurb: "Story challenge", mechanic: "STORY", heading: "Продолжите историю", instruction: "В тексте Sisters пропущено выражение. Выберите его.", whatToDo: "Выберите выражение, которое подходит по смыслу.", hint: "История про двойняшек и их маму. Следите, кто действует.", questions: sistersStory },
    { id: "spotlight", moduleId: "idioms", title: "Spotlight", blurb: "stay out / stay in / stay up", mechanic: "CHOOSE", heading: "Выберите stay out, stay in или stay up", instruction: "Прочитайте объяснение и выберите подходящее выражение.", whatToDo: "Сопоставьте описание с одной из трёх фраз.", hint: "Out — не дома, in — дома, up — лечь спать позже обычного.", questions: stay },
    { id: "synonyms", moduleId: "idioms", title: "Find the synonym", blurb: "Синонимы", mechanic: "FIND THE SYNONYM", heading: "Найдите синонимы", instruction: "Соедините выражения, которые в этом курсе даны как синонимы или как два варианта одной фразы.", whatToDo: "Соедините пару синонимов.", hint: "Ищите помету also или два варианта через косую черту.", questions: synonymMatch },
  ];
}

function colloActivities(): ActivityDef[] {
  const match: Question[] = chunk(COLLOCATIONS, 4).map((group, i) => ({
    kind: "match",
    id: `col-match-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "Expression → translation",
    pairs: group.map((g) => ({ id: g.id, left: g.english, right: g.translation })),
  }));
  const fills: Question[] = COLLOCATIONS.flatMap((c, i) => {
    const surface = c.english.replace(/\(.*\)/, "").replace(/\/.*/, "").replace(/'/g, "").trim();
    const gap = blankExample(c.example.replace(/'/g, ""), surface.split(" ")[0].length > 3 ? surface : c.tokens[0]);
    const word = c.tokens.length > 2 ? c.tokens.slice(0, 2).join(" ") : c.english;
    const answer = c.english;
    return [{
      kind: "choice" as const,
      id: `col-fill-${c.id}`,
      itemId: c.id,
      prompt: gap ? `${gap.before}______${gap.after}` : c.example,
      detail: c.translation,
      options: optionsFor(answer, COLLOCATIONS.map((x) => x.english), 4, i + 3),
      answer,
      reveal: `${c.example} — ${c.translation}`,
    }];
  });
  const order: Question[] = COLLOCATIONS.map((c) => ({
    kind: "order",
    id: `col-order-${c.id}`,
    itemId: c.id,
    prompt: c.translation,
    tokens: shuffle(c.tokens, c.tokens.join("").length + 4),
    answer: c.tokens,
    reveal: `${c.english}. ${c.example}`,
  }));
  return [
    { id: "match", moduleId: "collocations", title: "Match", blurb: "Выражение и перевод", mechanic: "MATCH", heading: "Соедините выражение и перевод", instruction: "Перетащите русский перевод к английскому выражению.", whatToDo: "Соедините выражение и его перевод.", hint: "Смотрите на глагол: say, tell, take, break, raise.", questions: match },
    { id: "complete", moduleId: "collocations", title: "Complete", blurb: "Предложение с пропуском", mechanic: "FILL THE GAP", heading: "Вставьте выражение", instruction: "Выберите выражение, которое подходит в предложение.", whatToDo: "Вставьте выражение в пропуск.", hint: "Перевод подсказывает смысл, но не подсказывает английские слова.", questions: fills },
    { id: "choose", moduleId: "collocations", title: "Choose", blurb: "Какое выражение?", mechanic: "CHOOSE", heading: "Выберите подходящее выражение", instruction: "По предложению выберите выражение из подборки.", whatToDo: "Один вариант подходит в пропуск.", hint: "Ищите устойчивое сочетание, а не отдельное случайное слово.", questions: fills.map((q, i) => ({ ...q, id: `col-choose-${i}` })) },
    { id: "order", moduleId: "collocations", title: "Word order", blurb: "Соберите выражение", mechanic: "WORD ORDER", heading: "Соберите выражение в правильном порядке", instruction: "Нажимайте слова в правильном порядке.", whatToDo: "Соберите выражение из перемешанных слов.", hint: "Сверху дан русский перевод. Соберите английскую фразу.", questions: order },
  ];
}

function prepActivities(): ActivityDef[] {
  const pairs = PREP_A.filter((p) => p.opposite);
  const oppPool = PREP_A.map((x) => x.english);
  const opp: Question[] = pairs.map((p, i) => ({
    kind: "choice" as const,
    id: `opp-${p.id}`,
    itemId: p.id,
    prompt: p.english,
    detail: p.definition,
    options: optionsFor(p.opposite!, oppPool.filter((x) => x !== p.english), 4, i + 2),
    answer: p.opposite!,
    reveal: `${p.english} ↔ ${p.opposite}. ${p.example}`,
  }));
  const all = [...PREP_A, ...PREP_B];
  const complete: Question[] = PREP_B.map((p, i) => ({
    kind: "choice" as const,
    id: `prep-c-${p.id}`,
    itemId: p.id,
    prompt: `${p.preposition} ______`,
    detail: p.definition,
    options: optionsFor(p.english, PREP_B.map((x) => x.english), 4, i + 8),
    answer: p.english,
    reveal: `${p.example}`,
  }));
  const choose: Question[] = all.map((p, i) => ({
    kind: "choice" as const,
    id: `prep-ch-${p.id}`,
    itemId: p.id,
    prompt: p.definition,
    options: optionsFor(p.english, all.map((x) => x.english), 4, i + 1),
    answer: p.english,
    reveal: p.example,
  }));
  const buckets = ["in", "on", "at", "by", "out of"];
  const sortable = [...PREP_A, ...PREP_B].filter((p) => buckets.includes(p.preposition));
  const sort: Question[] = chunk(sortable, 6).map((group, i) => ({
    kind: "sort",
    id: `prep-sort-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "Распределите фразы по предлогу.",
    buckets,
    cards: group.map((g) => ({ id: g.id, label: g.english, bucket: g.preposition })),
  }));
  return [
    { id: "opposites", moduleId: "prepositions", title: "Find the opposite", blurb: "A · Opposites", mechanic: "CHOOSE", heading: "Найдите антонимы", instruction: "Выберите антоним к выделенной фразе.", whatToDo: "", hint: "Ищите фразу на ту же тему: duty, tune, control, theory.", questions: opp },
    { id: "complete", moduleId: "prepositions", title: "Complete the phrase", blurb: "Фразы с предлогом", mechanic: "COMPLETE THE PHRASE", heading: "Соберите фразу с предлогом", instruction: "Сверху указан предлог. Выберите фразу, которая с него начинается.", whatToDo: "Выберите фразу целиком.", hint: "Прочитайте значение: оно описывает одну фразу.", questions: complete },
    { id: "choose", moduleId: "prepositions", title: "Choose the phrase", blurb: "Значение", mechanic: "CHOOSE", heading: "Выберите верную фразу", instruction: "По значению выберите предложную фразу.", whatToDo: "Одно выражение совпадает со значением.", hint: "Если в значении есть синоним, он помогает узнать фразу.", questions: choose },
    { id: "sort", moduleId: "prepositions", title: "Sort", blurb: "IN · ON · AT · BY · OUT OF", mechanic: "SORT", heading: "Распределите фразы по группам", instruction: "Перетащите каждую фразу в группу её предлога или нажмите фразу, затем группу.", whatToDo: "Группы: IN, ON, AT, BY, OUT OF.", hint: "Группа совпадает с первым словом фразы.", questions: sort },
  ];
}

function wordActivities(): ActivityDef[] {
  const nouns = WORD_FAMILIES.map((w) => w.noun);
  const transformer: Question[] = WORD_FAMILIES.map((w, i) => ({
    kind: "choice" as const,
    id: `wb-tr-${w.id}`,
    itemId: w.id,
    prompt: w.verb,
    detail: "Форма существительного.",
    options: optionsFor(w.noun, nouns, 4, i + 3),
    answer: w.noun,
    reveal: `${w.verbExample} ${w.nounExample}`,
  }));
  const match: Question[] = chunk(WORD_FAMILIES, 4).map((group, i) => ({
    kind: "match",
    id: `wb-match-${i}`,
    itemIds: group.map((g) => g.id),
    prompt: "VERB → NOUN",
    pairs: group.map((g) => ({ id: g.id, left: g.verb, right: g.noun })),
  }));
  const verbs = WORD_FAMILIES.map((w) => w.verb);
  const ex1: Question[] = WB_EX1.map((row, i) => ({
    kind: "choice" as const,
    id: `wb-ex1-${i}`,
    itemId: row.answer,
    prompt: row.sentence,
    detail: "Выберите глагол из списка Unit 1.",
    options: optionsFor(row.answer, verbs, 4, i + 4),
    answer: row.answer,
    reveal: WORD_FAMILIES.find((w) => w.verb === row.answer)?.verbExample ?? row.answer,
  }));
  const ex2: Question[] = WB_EX2.map((row, i) => ({
    kind: "choice" as const,
    id: `wb-ex2-${i}`,
    itemId: row.answer,
    prompt: row.sentence,
    options: [...row.options],
    answer: row.answer,
    reveal: WORD_FAMILIES.find((w) => w.verb === row.answer)?.verbExample ?? row.answer,
  }));
  const builder: Question[] = WORD_FAMILIES.map((w) => ({
    kind: "type" as const,
    id: `wb-build-${w.id}`,
    itemId: w.id,
    prompt: `${w.verb} → noun`,
    answers: w.noun.split("/").map((part) => part.trim().toLowerCase()),
    reveal: `${w.noun}. ${w.nounExample}`,
  }));
  return [
    { id: "transformer", moduleId: "word-building", title: "Word transformer", blurb: "Verb → noun", mechanic: "WORD BUILDING", heading: "Образуйте существительное", instruction: "Из данного глагола выберите существительное.", whatToDo: "Один вариант — форма существительного.", hint: "Ищите существительное, а не форму с -ing или -ed, если для этого глагола нужна другая форма.", questions: transformer },
    { id: "family", moduleId: "word-building", title: "Word family", blurb: "Соедините пару", mechanic: "MATCH", heading: "Соедините глагол и существительное", instruction: "Перетащите форму существительного к глаголу.", whatToDo: "Соедините глагол и существительное.", hint: "Суффиксы -tion, -ment и -al часто образуют существительное.", questions: match },
    { id: "complete", moduleId: "word-building", title: "Complete the sentence", blurb: "Предложения с пропуском", mechanic: "FILL THE GAP", heading: "Вставьте глагол", instruction: "Выберите глагол, который подходит в предложение.", whatToDo: "Вставьте глагол в пропуск.", hint: "После approve и disapprove часто стоит of.", questions: [...ex2, ...ex1] },
    { id: "builder", moduleId: "word-building", title: "Word builder", blurb: "Напечатайте noun form", mechanic: "WORD BUILDING", heading: "Напечатайте форму существительного", instruction: "Введите существительное к этому глаголу.", whatToDo: "Напечатайте форму существительного.", hint: "Если в таблице две формы, подойдёт любая из них.", questions: builder },
  ];
}

let cache: ActivityDef[] | null = null;

export function allActivities(): ActivityDef[] {
  if (!cache) cache = [...vocabActivities(), ...idiomActivities(), ...colloActivities(), ...prepActivities(), ...wordActivities()];
  return cache;
}

export function activitiesFor(moduleId: string): ActivityDef[] {
  return allActivities().filter((a) => a.moduleId === moduleId);
}

export function findActivity(moduleId: string, activityId: string): ActivityDef | undefined {
  return allActivities().find((a) => a.moduleId === moduleId && a.id === activityId);
}

const KINDS = ["match", "choice", "fill", "order", "story"] as const;

export function finalQuestions(): Question[] {
  const pool = allActivities().flatMap((a) => a.questions.filter((q) => q.kind !== "flip" && q.kind !== "sort"));
  const buckets = new Map<string, Question[]>();
  pool.forEach((q) => {
    const k = q.kind;
    buckets.set(k, [...(buckets.get(k) ?? []), q]);
  });
  const out: Question[] = [];
  const order = ["match", "choice", "order", "story", "choice", "match"];
  const used = new Set<string>();
  let guard = 0;
  while (out.length < 18 && guard < 80) {
    const kind = order[out.length % order.length];
    const list = (buckets.get(kind) ?? []).filter((q) => !used.has(q.id));
    if (list.length) {
      const q = list[guard % list.length];
      used.add(q.id);
      out.push({ ...q, id: `final-${out.length}-${q.id}` });
    }
    guard++;
  }
  return out;
}

export function quickQuestions(seed: number): Question[] {
  const pool = allActivities().flatMap((a) => a.questions.filter((q) => q.kind === "choice"));
  return shuffle(pool, seed).slice(0, 5).map((q, i) => ({ ...q, id: `quick-${seed}-${i}` }));
}

export function reviewQuestions(itemIds: string[]): Question[] {
  if (!itemIds.length) return [];
  const set = new Set(itemIds);
  const pool = allActivities().flatMap((a) =>
    a.questions.filter((q) => {
      if (q.kind === "match" || q.kind === "sort") return q.itemIds.some((id) => set.has(id));
      if ("itemId" in q) return set.has(q.itemId);
      return false;
    }),
  );
  const unique: Question[] = [];
  const seen = new Set<string>();
  for (const q of pool) {
    const key = "itemId" in q ? q.itemId : q.id;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(q);
    if (unique.length >= 12) break;
  }
  return unique;
}

export function itemLabel(id: string): string {
  const v = VOCAB.find((x) => x.id === id);
  if (v) return v.english;
  const g = [...FATHER, ...SISTERS].find((x) => x.id === id);
  if (g) return g.english;
  const s = SPOTLIGHT_STAY.items.find((x) => x.id === id);
  if (s) return s.english;
  const c = COLLOCATIONS.find((x) => x.id === id);
  if (c) return c.english;
  const p = [...PREP_A, ...PREP_B].find((x) => x.id === id);
  if (p) return p.english;
  const w = WORD_FAMILIES.find((x) => x.id === id || x.verb === id);
  if (w) return w.verb;
  return id;
}

void KINDS;
