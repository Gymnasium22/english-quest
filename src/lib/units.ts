/**
 * Реестр юнитов — единственное место, где описан юнит: модули, ключ прогресса,
 * префикс маршрутов, подписи в шапке, набор достижений и правила их выдачи.
 * Добавление нового юнита сводится к импорту его данных и одной записи в UNITS.
 */

import { MODULES } from "@/data/unit1";
import { ENV_MODULES } from "@/data/unit2";
import { CAREER_MODULES } from "@/data/unit3";
import type { ModuleId } from "@/data/module-ids";
import {
  activitiesFor,
  allActivities,
  finalQuestions,
  findActivity,
  itemLabel,
  quickQuestions,
  reviewQuestions,
  type ActivityDef,
  type Question,
} from "@/lib/questions";
import {
  envActivities,
  envActivitiesFor,
  envFinal,
  envItemLabel,
  envQuick,
  envReview,
  findEnvActivity,
} from "@/lib/questions-env";
import {
  careerActivities,
  careerActivitiesFor,
  careerFinal,
  careerItemLabel,
  careerQuick,
  careerReview,
  findCareerActivity,
} from "@/lib/questions-career";
import type { ProgressState } from "@/lib/progress-state";
import { findListening, listeningForUnit } from "@/data/listening";

export type QuestUnit = "unit1" | "unit2" | "unit3";

export type UnitModule = {
  id: ModuleId;
  title: string;
  kicker: string;
  href: string;
  tone: string;
  accent: string;
  wash: string;
  countLabel: string;
};

export type AchievementDef = { id: string; title: string; titleEn?: string; text: string; kind?: "final" };

export type UnitBrand = { kicker: string; title: string; sub: string };

export type UnitSpec = {
  id: QuestUnit;
  /** Название юнита для интерфейса. */
  title: string;
  /** Подписи юнита в шапке. */
  brand: UnitBrand;
  /** Префикс маршрутов: "" | "/env" | "/career". */
  routePrefix: string;
  /** Страница со списком модулей. */
  hubHref: string;
  /** Ключ localStorage с прогрессом юнита. */
  storageKey: string;
  /** Цвет юнита в списке на главной. */
  accent: string;
  modules: readonly UnitModule[];
  activities: () => ActivityDef[];
  activitiesFor: (moduleId: string) => ActivityDef[];
  findActivity: (moduleId: string, activityId: string) => ActivityDef | undefined;
  quick: (seed: number) => Question[];
  review: (itemIds: string[]) => Question[];
  final: () => Question[];
  itemLabel: (id: string) => string;
  achievements: readonly AchievementDef[];
  /** Узнаёт юнит по адресу страницы. */
  matchesPath: (path: string) => boolean;
};

type AwardRule = {
  first: string;
  vocab: string;
  vocabThreshold: number;
  moduleAchievements: readonly (readonly [ModuleId, string])[];
  listen: string;
  final: string;
};

const AWARD_RULES: Record<QuestUnit, AwardRule> = {
  unit1: {
    first: "first-step",
    vocab: "vocab-master",
    vocabThreshold: 20,
    moduleAchievements: [
      ["idioms", "phrase-hunter"],
      ["collocations", "collocation-pro"],
      ["prepositions", "prep-pro"],
      ["word-building", "word-builder"],
    ],
    listen: "listen-family",
    final: "family-quest",
  },
  unit2: {
    first: "first-forecast",
    vocab: "nature-vocab",
    vocabThreshold: 15,
    moduleAchievements: [
      ["idioms", "idiom-ranger"],
      ["collocations", "collocation-climate"],
      ["prepositions", "prep-climate"],
      ["word-building", "word-family"],
    ],
    listen: "listen-env",
    final: "nature-quest",
  },
  unit3: {
    first: "first-apply",
    vocab: "career-vocab",
    vocabThreshold: 15,
    moduleAchievements: [
      ["idioms", "career-idioms"],
      ["collocations", "career-perks"],
      ["prepositions", "career-prep"],
      ["word-building", "career-forms"],
    ],
    listen: "listen-career",
    final: "career-quest",
  },
};

const UNIT1: UnitSpec = {
  id: "unit1",
  title: "Family",
  brand: { kicker: "UNIT 1", title: "FAMILY", sub: "English Quest" },
  routePrefix: "",
  hubHref: "/unit/family",
  storageKey: "english-quest-unit1",
  accent: "#C4622D",
  modules: MODULES,
  activities: allActivities,
  activitiesFor,
  findActivity,
  quick: quickQuestions,
  review: reviewQuestions,
  final: finalQuestions,
  itemLabel,
  matchesPath: (path) => path.startsWith("/unit/family") || path.startsWith("/module") || path === "/final",
  achievements: [
    { id: "first-step", title: "Первый шаг", titleEn: "First Step", text: "Первый верный ответ в юните Family." },
    { id: "vocab-master", title: "Словарь", titleEn: "Vocab Master", text: "20 единиц с повторно верным ответом." },
    { id: "phrase-hunter", title: "Идиомы", titleEn: "Phrase Hunter", text: "Завершён модуль Idioms & Phrasal Verbs." },
    { id: "collocation-pro", title: "Коллокации", titleEn: "Collocation Pro", text: "Завершён модуль Collocations." },
    { id: "prep-pro", title: "Предлоги", titleEn: "Prep Pro", text: "Завершён модуль Prepositional Phrases." },
    { id: "word-builder", title: "Словообразование", titleEn: "Word Builder", text: "Завершён модуль Word Building." },
    { id: "listen-family", title: "Аудирование", titleEn: "Listening", text: "Прослушаны и отвечены все 4 ролика юнита." },
    { id: "family-quest", title: "Юнит пройден", titleEn: "Family Quest Complete", text: "Пройден финал Unit 1.", kind: "final" },
  ],
};

const UNIT2: UnitSpec = {
  id: "unit2",
  title: "Environmental Issues",
  brand: { kicker: "UNIT 2", title: "NATURE", sub: "Environmental Issues" },
  routePrefix: "/env",
  hubHref: "/unit/environmental",
  storageKey: "english-quest-unit2",
  accent: "#3E6B4F",
  modules: ENV_MODULES,
  activities: envActivities,
  activitiesFor: envActivitiesFor,
  findActivity: findEnvActivity,
  quick: envQuick,
  review: envReview,
  final: envFinal,
  itemLabel: envItemLabel,
  matchesPath: (path) => path.startsWith("/unit/environmental") || path.startsWith("/env"),
  achievements: [
    { id: "first-forecast", title: "Первый шаг", titleEn: "First Forecast", text: "Первый верный ответ в юните Environmental Issues." },
    { id: "nature-vocab", title: "Словарь", titleEn: "Nature Vocab", text: "15 единиц с повторно верным ответом." },
    { id: "idiom-ranger", title: "Идиомы", titleEn: "Idiom Ranger", text: "Завершён модуль Idioms & Phrasal Verbs." },
    { id: "collocation-climate", title: "Коллокации", titleEn: "Collocation Climate", text: "Завершён модуль Collocations." },
    { id: "prep-climate", title: "Предлоги", titleEn: "Prep Pro", text: "Завершён модуль Prepositional Phrases." },
    { id: "word-family", title: "Словообразование", titleEn: "Word Family", text: "Завершён модуль Word Building." },
    { id: "listen-env", title: "Аудирование", titleEn: "Listening", text: "Прослушаны и отвечены все 4 ролика юнита." },
    { id: "nature-quest", title: "Юнит пройден", titleEn: "Nature Quest Complete", text: "Пройден финал Unit 2.", kind: "final" },
  ],
};

const UNIT3: UnitSpec = {
  id: "unit3",
  title: "Choosing a Career",
  brand: { kicker: "UNIT 3", title: "CAREER", sub: "Choosing a Career" },
  routePrefix: "/career",
  hubHref: "/unit/career",
  storageKey: "english-quest-unit3",
  accent: "#1F4E79",
  modules: CAREER_MODULES,
  activities: careerActivities,
  activitiesFor: careerActivitiesFor,
  findActivity: findCareerActivity,
  quick: careerQuick,
  review: careerReview,
  final: careerFinal,
  itemLabel: careerItemLabel,
  matchesPath: (path) => path.startsWith("/unit/career") || path.startsWith("/career"),
  achievements: [
    { id: "first-apply", title: "Первый шаг", titleEn: "First Apply", text: "Первый верный ответ в юните Choosing a Career." },
    { id: "career-vocab", title: "Словарь", titleEn: "Career Vocab", text: "15 единиц с повторно верным ответом." },
    { id: "career-idioms", title: "Идиомы", titleEn: "Work Phrases", text: "Завершён модуль Idioms & Phrasal Verbs." },
    { id: "career-perks", title: "Коллокации", titleEn: "Perks Pro", text: "Завершён модуль Collocations." },
    { id: "career-prep", title: "Предлоги", titleEn: "Prep Pro", text: "Завершён модуль Prepositional Phrases." },
    { id: "career-forms", title: "Словообразование", titleEn: "Career Forms", text: "Завершён модуль Word Building." },
    { id: "listen-career", title: "Аудирование", titleEn: "Listening", text: "Прослушаны и отвечены все 4 ролика юнита." },
    { id: "career-quest", title: "Юнит пройден", titleEn: "Career Quest Complete", text: "Пройден финал Unit 3.", kind: "final" },
  ],
};

/** Порядок важен: по нему юнит ищется по адресу и строится список на главной. */
export const UNITS: readonly UnitSpec[] = [UNIT1, UNIT2, UNIT3];

export const ALL_ACHIEVEMENTS: readonly AchievementDef[] = UNITS.flatMap((unit) => [...unit.achievements]);

export const CURRENT_UNIT_KEY = "english-quest-current-unit";

export function unitById(id: QuestUnit): UnitSpec {
  return UNITS.find((unit) => unit.id === id) ?? UNIT1;
}

/** Юнит, к которому относится адрес; null — оставить сохранённый. */
export function unitForPath(path: string): QuestUnit | null {
  if (path.startsWith("/listen/")) {
    const id = path.slice("/listen/".length);
    return findListening(id)?.unit ?? null;
  }
  return UNITS.find((unit) => unit.matchesPath(path))?.id ?? null;
}

export function moduleHref(unit: QuestUnit, moduleId: string): string {
  const spec = unitById(unit);
  return spec.modules.find((module) => module.id === moduleId)?.href ?? spec.hubHref;
}

export function activityHref(unit: QuestUnit, moduleId: string, activityId: string): string {
  return `${unitById(unit).routePrefix}/module/${moduleId}/${activityId}`;
}

export function finalHref(unit: QuestUnit): string {
  return `${unitById(unit).routePrefix}/final`;
}

/** Пересчитывает достижения юнита по правилам из AWARD_RULES. */
export function awardFor(unit: QuestUnit, state: ProgressState): string[] {
  const spec = unitById(unit);
  const rule = AWARD_RULES[unit];
  const got = new Set(state.achievements);
  const anyCorrect = Object.values(state.items).some((item) => item.correct > 0);
  if (anyCorrect) got.add(rule.first);
  const vocabCorrect = Object.values(state.items).filter((item) => item.correct >= 2).length;
  if (vocabCorrect >= rule.vocabThreshold) got.add(rule.vocab);
  for (const [moduleId, achievement] of rule.moduleAchievements) {
    if (spec.activitiesFor(moduleId).every((activity) => state.completed.includes(`${moduleId}/${activity.id}`))) {
      got.add(achievement);
    }
  }
  const tracks = listeningForUnit(unit);
  if (tracks.length && tracks.every((track) => state.completed.includes(`listen/${track.id}`))) got.add(rule.listen);
  if (state.finalDone) got.add(rule.final);
  return [...got];
}

export function achievementStatus(unit: QuestUnit, state: ProgressState, id: string): { on: boolean; label: string } {
  const spec = unitById(unit);
  const rule = AWARD_RULES[unit];
  const on = state.achievements.includes(id);
  if (id === rule.first) {
    const n = Object.values(state.items).some((item) => item.correct > 0) ? 1 : 0;
    return { on, label: on ? "Открыто" : `${n} из 1` };
  }
  if (id === rule.vocab) {
    const n = Object.values(state.items).filter((item) => item.correct >= 2).length;
    return { on, label: on ? "Открыто" : `${Math.min(n, rule.vocabThreshold)} из ${rule.vocabThreshold}` };
  }
  if (id === rule.listen) {
    const tracks = listeningForUnit(unit);
    const n = tracks.filter((track) => state.completed.includes(`listen/${track.id}`)).length;
    return { on, label: on ? "Открыто" : `${n} из ${tracks.length} роликов` };
  }
  if (id === rule.final) {
    return { on, label: on ? "Открыто" : "финал ещё не пройден" };
  }
  const pair = rule.moduleAchievements.find(([, achievement]) => achievement === id);
  if (pair) {
    const acts = spec.activitiesFor(pair[0]);
    const n = acts.filter((activity) => state.completed.includes(`${pair[0]}/${activity.id}`)).length;
    return { on, label: on ? "Открыто" : `${n} из ${acts.length} заданий модуля` };
  }
  return { on, label: on ? "Открыто" : "ещё не завершён" };
}

export const SERIES_AWARD = { id: "three-days", title: "3 дня подряд", text: "Заходили в квест три дня подряд." };

export function seriesUnlocked(dayStreaks: number[]): boolean {
  return Math.max(0, ...dayStreaks) >= 3;
}
