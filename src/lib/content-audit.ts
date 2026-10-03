import {
  COLLOCATIONS,
  FATHER,
  MODULES,
  PREP_A,
  PREP_B,
  SISTERS,
  SPOTLIGHT_STAY,
  VOCAB,
  WORD_FAMILIES,
} from "@/data/unit1";
import {
  ENV_COLLOS,
  ENV_FAMILIES,
  ENV_IDIOMS,
  ENV_MODULES,
  ENV_NATURE_WB,
  ENV_PHRASALS,
  ENV_PREP,
  ENV_VOCAB,
} from "@/data/unit2";
import {
  CAREER_COLLOS,
  CAREER_FAMILIES,
  CAREER_IDIOMS,
  CAREER_KEY,
  CAREER_MODULES,
  CAREER_PREP,
  CAREER_VOCAB,
} from "@/data/unit3";
import { activitiesFor, type ActivityDef, type Question } from "@/lib/questions";
import { envActivitiesFor } from "@/lib/questions-env";
import { careerActivitiesFor } from "@/lib/questions-career";
import baseline from "@/lib/known-content-issues.json";

export type AuditLevel = "error" | "warning";

export type AuditIssue = {
  level: AuditLevel;
  /** Код проверки: по нему строится ключ известной проблемы. */
  code: string;
  unit: string;
  module: string;
  activity: string;
  where: string;
  message: string;
};

export type AuditStats = {
  unit: string;
  title: string;
  totalQuestions: number;
  modules: { id: string; total: number; activities: { id: string; questions: number }[] }[];
};

export type AuditReport = { issues: AuditIssue[]; stats: AuditStats[] };

/** Ключ проблемы без текста сообщения — чтобы формулировки можно было менять. */
export function issueKey(issue: AuditIssue): string {
  return [issue.unit, issue.module, issue.activity, issue.where, issue.code].join("|");
}

export function knownIssueKeys(): string[] {
  return baseline.keys;
}

export function splitIssues(issues: AuditIssue[]): { known: AuditIssue[]; unknown: AuditIssue[] } {
  const known = new Set(knownIssueKeys());
  const result: { known: AuditIssue[]; unknown: AuditIssue[] } = { known: [], unknown: [] };
  for (const issue of issues) {
    if (known.has(issueKey(issue))) result.known.push(issue);
    else result.unknown.push(issue);
  }
  return result;
}

/** Строка словаря в унифицированном виде — для общих проверок данных. */
type Row = { id: string; term?: string; meaning?: string; example?: string };

type Collection = { name: string; rows: Row[]; checkExample?: boolean };

export type UnitSpec = {
  id: "unit1" | "unit2" | "unit3";
  title: string;
  modules: readonly { id: string }[];
  activities: (moduleId: string) => ActivityDef[];
};

export const AUDIT_UNITS: UnitSpec[] = [
  { id: "unit1", title: "Family", modules: MODULES, activities: activitiesFor },
  { id: "unit2", title: "Environmental Issues", modules: ENV_MODULES, activities: envActivitiesFor },
  { id: "unit3", title: "Choosing a Career", modules: CAREER_MODULES, activities: careerActivitiesFor },
];

function collectionsFor(unitId: UnitSpec["id"]): Collection[] {
  if (unitId === "unit1") {
    return [
      { name: "VOCAB", rows: VOCAB.map((v) => ({ id: v.id, term: v.english, meaning: v.translation, example: v.example })), checkExample: true },
      { name: "FATHER", rows: FATHER.map((v) => ({ id: v.id, term: v.english, meaning: v.definition })) },
      { name: "SISTERS", rows: SISTERS.map((v) => ({ id: v.id, term: v.english, meaning: v.definition })) },
      { name: "SPOTLIGHT_STAY.items", rows: SPOTLIGHT_STAY.items.map((v) => ({ id: v.id, term: v.english, meaning: v.definition })) },
      { name: "COLLOCATIONS", rows: COLLOCATIONS.map((v) => ({ id: v.id, term: v.english, meaning: v.translation, example: v.example })), checkExample: true },
      { name: "PREP_A", rows: PREP_A.map((v) => ({ id: v.id, term: v.english, meaning: v.definition, example: v.example })), checkExample: true },
      { name: "PREP_B", rows: PREP_B.map((v) => ({ id: v.id, term: v.english, meaning: v.definition, example: v.example })), checkExample: true },
      { name: "WORD_FAMILIES", rows: WORD_FAMILIES.map((v) => ({ id: v.id, term: v.verb, meaning: v.noun, example: v.verbExample })), checkExample: true },
    ];
  }
  if (unitId === "unit2") {
    return [
      { name: "ENV_VOCAB", rows: ENV_VOCAB.map((v) => ({ id: v.id, term: v.english, meaning: v.translation, example: v.example })), checkExample: true },
      { name: "ENV_IDIOMS", rows: ENV_IDIOMS.map((v) => ({ id: v.id, term: v.english, meaning: v.definition })) },
      { name: "ENV_PHRASALS", rows: ENV_PHRASALS.map((v) => ({ id: v.id, term: v.english, meaning: v.definition })) },
      { name: "ENV_COLLOS", rows: ENV_COLLOS.map((v) => ({ id: v.id, term: v.english, meaning: v.group })) },
      { name: "ENV_PREP", rows: ENV_PREP.map((v) => ({ id: v.id, term: v.english, meaning: v.meaning })) },
      { name: "ENV_FAMILIES", rows: ENV_FAMILIES.map((v) => ({ id: v.id, term: v.base, meaning: v.members.join(", ") })) },
      {
        name: "ENV_NATURE_WB",
        rows: ENV_NATURE_WB.map((v) => ({
          id: v.id,
          term: v.base,
          meaning: v.forms.map((f) => f.english).join(", "),
          example: v.examples[0]?.text,
        })),
        checkExample: true,
      },
    ];
  }
  return [
    { name: "CAREER_VOCAB", rows: CAREER_VOCAB.map((v) => ({ id: v.id, term: v.english, meaning: v.translation, example: v.example })), checkExample: true },
    { name: "CAREER_IDIOMS", rows: CAREER_IDIOMS.map((v) => ({ id: v.id, term: v.english, meaning: v.definition, example: v.situation })), checkExample: true },
    { name: "CAREER_COLLOS", rows: CAREER_COLLOS.map((v) => ({ id: v.id, term: v.english, meaning: v.translation })) },
    { name: "CAREER_PREP", rows: CAREER_PREP.map((v) => ({ id: v.id, term: v.english, meaning: v.meaning })) },
    { name: "CAREER_KEY", rows: CAREER_KEY.map((v) => ({ id: v.id, term: v.english, meaning: v.meaning })) },
    { name: "CAREER_FAMILIES", rows: CAREER_FAMILIES.map((v) => ({ id: v.id, term: v.base, meaning: v.noun, example: v.example })), checkExample: true },
  ];
}

/** Убирает пометки словаря: (…), sb, sth, варианты через слэш. */
export function surfaceOf(term: string): string {
  return term
    .replace(/\(.*?\)/g, " ")
    .replace(/\b(?:sb|sth)\b/g, " ")
    .replace(/\//g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * Эвристика: пример содержит слово или его основу. Учитывает простые формы
 * (become → becomes), но не морфологию вроде die → dying, поэтому результат
 * считается предупреждением, а не ошибкой.
 */
export function exampleHasTerm(term: string, example: string): boolean {
  const surface = surfaceOf(term);
  if (!surface) return true;
  const hay = example.toLowerCase();
  if (hay.includes(surface)) return true;
  const head = surface.split(" ")[0];
  return head.length >= 3 && hay.includes(head);
}

function normalized(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

type Push = (code: string, message: string) => void;

function checkOptions(options: string[], answer: string, push: Push): void {
  if (options.length < 2) push("options-too-few", `вариантов меньше двух (${options.length})`);
  const seen = new Set<string>();
  for (const option of options) {
    if (!option.trim()) push("option-empty", "пустой вариант ответа");
    const key = normalized(option);
    if (seen.has(key)) push("option-duplicate", `вариант «${option}» повторяется`);
    seen.add(key);
  }
  if (!answer.trim()) push("answer-empty", "пустой верный ответ");
  else if (!options.some((option) => option === answer)) push("answer-not-in-options", `верного ответа «${answer}» нет среди вариантов`);
}

function checkQuestion(q: Question, push: Push, warn: Push): void {
  if (!q.id.trim()) push("question-id-empty", "пустой id вопроса");

  if (q.kind === "choice" || q.kind === "fill" || q.kind === "story") {
    checkOptions(q.options, q.answer, push);
    if (q.kind === "choice" && !q.prompt.trim()) push("prompt-empty", "пустая формулировка задания");
    if (q.kind === "fill" && !`${q.before}${q.after}`.trim()) push("fill-empty", "пустое предложение с пропуском");
    if (q.kind === "story" && !q.lead.trim()) push("story-empty", "пустой фрагмент истории");
  }

  if (q.kind === "match") {
    if (q.pairs.length < 2) push("match-too-few-pairs", `пар меньше двух (${q.pairs.length})`);
    const ids = new Set<string>();
    const lefts = new Set<string>();
    const rights = new Set<string>();
    for (const pair of q.pairs) {
      if (!pair.id.trim()) push("match-pair-id-empty", "пустой id пары");
      if (ids.has(pair.id)) push("match-pair-id-duplicate", `id пары «${pair.id}» повторяется`);
      ids.add(pair.id);
      if (!pair.left.trim() || !pair.right.trim()) push("match-pair-incomplete", `неполная пара «${pair.left} / ${pair.right}»`);
      const left = normalized(pair.left);
      const right = normalized(pair.right);
      // Левая часть обязана быть уникальной: оценка идёт по ней.
      if (lefts.has(left)) push("match-left-duplicate", `левая часть «${pair.left}» повторяется — пары неразличимы`);
      // Повтор правой части допустим (несколько фраз в одну группу), но даёт
      // одинаковые кнопки и одинаковые React-ключи.
      if (rights.has(right)) warn("match-right-duplicate", `правая часть «${pair.right}» повторяется`);
      lefts.add(left);
      rights.add(right);
    }
  }

  if (q.kind === "flip") {
    if (!q.front.trim() || !q.back.trim()) push("flip-empty", "пустая лицевая или обратная сторона карточки");
  }

  if (q.kind === "order") {
    if (q.tokens.length < 2) push("order-too-few-tokens", `слов меньше двух (${q.tokens.length})`);
    if (q.tokens.some((token) => !token.trim())) push("order-token-empty", "пустое слово в наборе");
    if (!q.answer.length || q.answer.some((token) => !token.trim())) push("order-answer-empty", "пустой верный порядок слов");
  }

  if (q.kind === "type") {
    if (!q.prompt.trim()) push("type-prompt-empty", "пустая подсказка для ввода");
    if (!q.answers.length || q.answers.some((a) => !a.trim())) push("type-answers-empty", "пустой список верных ответов");
  }

  if (q.kind === "sort") {
    if (q.buckets.length < 2) push("sort-too-few-buckets", `групп меньше двух (${q.buckets.length})`);
    if (!q.cards.length) push("sort-no-cards", "нет карточек для распределения");
    const cardIds = new Set<string>();
    for (const card of q.cards) {
      if (cardIds.has(card.id)) push("sort-card-id-duplicate", `id карточки «${card.id}» повторяется`);
      cardIds.add(card.id);
      if (!card.label.trim()) push("sort-card-label-empty", "пустая подпись карточки");
      if (!q.buckets.includes(card.bucket)) push("sort-card-bucket-unknown", `группа «${card.bucket}» карточки «${card.label}» отсутствует в списке групп`);
    }
  }

  const refs = "itemIds" in q ? q.itemIds : [q.itemId];
  for (const ref of refs) {
    if (!ref.trim()) push("item-ref-empty", "пустая ссылка на элемент словаря");
  }
}

export function auditContent(): AuditReport {
  const issues: AuditIssue[] = [];
  const stats: AuditStats[] = [];

  for (const unit of AUDIT_UNITS) {
    const known = new Set<string>();
    const seenInCollection = new Set<string>();

    for (const collection of collectionsFor(unit.id)) {
      for (const row of collection.rows) {
        const add = (level: AuditLevel, code: string, where: string, message: string) =>
          issues.push({ level, code, unit: unit.id, module: collection.name, activity: "", where, message });

        if (!row.id.trim()) add("error", "item-id-empty", collection.name, "пустой id элемента");
        if (seenInCollection.has(row.id)) add("error", "item-id-duplicate", row.id, "id элемента повторяется внутри набора");
        seenInCollection.add(row.id);
        known.add(row.id);

        if (row.term !== undefined && !row.term.trim()) add("error", "term-empty", row.id, "пустое английское выражение");
        if (row.meaning !== undefined && !row.meaning.trim()) add("error", "meaning-empty", row.id, "пустой перевод или значение");
        if (collection.checkExample && row.term && row.example) {
          if (!row.example.trim()) add("warning", "example-empty", row.id, "пустой пример");
          else if (!exampleHasTerm(row.term, row.example)) {
            add("warning", "example-missing-term", row.id, `в примере нет слова «${row.term}»`);
          }
        }
      }
      seenInCollection.clear();
    }

    const unitStats: AuditStats = { unit: unit.id, title: unit.title, totalQuestions: 0, modules: [] };

    for (const mod of unit.modules) {
      const activities = unit.activities(mod.id);
      const activityIds = new Set<string>();
      const moduleStats = { id: mod.id, total: 0, activities: [] as { id: string; questions: number }[] };

      for (const activity of activities) {
        const push: Push = (code, message) =>
          issues.push({ level: "error", code, unit: unit.id, module: mod.id, activity: activity.id, where: activity.id, message });
        const warn: Push = (code, message) =>
          issues.push({ level: "warning", code, unit: unit.id, module: mod.id, activity: activity.id, where: activity.id, message });

        if (!activity.id.trim()) push("activity-id-empty", "пустой id задания");
        if (activityIds.has(activity.id)) push("activity-id-duplicate", `id задания «${activity.id}» повторяется в модуле`);
        activityIds.add(activity.id);
        if (!activity.questions.length) push("activity-empty", "в задании нет вопросов");
        if (!activity.mechanic.trim() || !activity.heading.trim()) push("activity-meta-empty", "не заполнены mechanic или heading");

        const questionIds = new Set<string>();
        for (const q of activity.questions) {
          if (questionIds.has(q.id)) push("question-id-duplicate", `id вопроса «${q.id}» повторяется в задании`);
          questionIds.add(q.id);

          const inQuestion: Push = (code, message) => push(code, `вопрос ${q.id}: ${message}`);
          const warnInQuestion: Push = (code, message) => warn(code, `вопрос ${q.id}: ${message}`);
          checkQuestion(q, inQuestion, warnInQuestion);

          const refs = "itemIds" in q ? q.itemIds : [q.itemId];
          for (const ref of refs) {
            if (ref && !known.has(ref)) {
              warnInQuestion("item-ref-unknown", `ссылка на неизвестный элемент словаря «${ref}»`);
            }
          }
        }

        moduleStats.activities.push({ id: activity.id, questions: activity.questions.length });
        moduleStats.total += activity.questions.length;
        unitStats.totalQuestions += activity.questions.length;
      }

      unitStats.modules.push(moduleStats);
    }

    stats.push(unitStats);
  }

  return { issues, stats };
}

export type Snapshot = {
  units: {
    id: string;
    modules: {
      id: string;
      activities: {
        id: string;
        mechanic: string;
        questions: { id: string; kind: string; answer?: string | string[]; options?: string[] }[];
      }[];
    }[];
  }[];
};

function snapshotAnswer(q: Question): string | string[] | undefined {
  if (q.kind === "choice" || q.kind === "fill" || q.kind === "story") return q.answer;
  if (q.kind === "order") return q.answer;
  if (q.kind === "type") return q.answers;
  return undefined;
}

function snapshotOptions(q: Question): string[] | undefined {
  if (q.kind === "choice" || q.kind === "fill" || q.kind === "story") return q.options;
  return undefined;
}

/** Полный слепок сгенерированных вопросов — эталон для проверки неизменности поведения. */
export function buildSnapshot(): Snapshot {
  return {
    units: AUDIT_UNITS.map((unit) => ({
      id: unit.id,
      modules: unit.modules.map((mod) => ({
        id: mod.id,
        activities: unit.activities(mod.id).map((activity) => ({
          id: activity.id,
          mechanic: activity.mechanic,
          questions: activity.questions.map((q) => ({
            id: q.id,
            kind: q.kind,
            answer: snapshotAnswer(q),
            options: snapshotOptions(q),
          })),
        })),
      })),
    })),
  };
}
