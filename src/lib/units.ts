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
import { findListening } from "@/data/listening";

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

export type AchievementDef = { id: string; title: string; text: string };

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
      ["word-building", "word-builder"],
      ["prepositions", "prep-pro"],
    ],
    final: "family-quest",
  },
  unit2: {
    first: "first-forecast",
    vocab: "nature-vocab",
    vocabThreshold: 15,
    moduleAchievements: [
      ["idioms", "idiom-ranger"],
      ["collocations", "collocation-climate"],
      ["word-building", "word-family"],
    ],
    final: "nature-quest",
  },
  unit3: {
    first: "first-apply",
    vocab: "career-vocab",
    vocabThreshold: 15,
    moduleAchievements: [
      ["idioms", "career-idioms"],
      ["collocations", "career-perks"],
      ["word-building", "career-forms"],
    ],
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
    { id: "first-step", title: "First Step", text: "Первое выполненное задание." },
    { id: "vocab-master", title: "Vocab Master", text: "Двадцать слов и выражений, которые вы верно вспомнили дважды." },
    { id: "phrase-hunter", title: "Phrase Hunter", text: "Завершён раздел Idioms & Phrasal Verbs." },
    { id: "collocation-pro", title: "Collocation Pro", text: "Завершён Collocation Collection." },
    { id: "word-builder", title: "Word Builder", text: "Завершён Word Building." },
    { id: "prep-pro", title: "Prep Pro", text: "Завершён модуль Prepositional Phrases." },
    { id: "family-quest", title: "Family Quest Complete", text: "Пройден весь Unit 1." },
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
    { id: "first-forecast", title: "First Forecast", text: "Первое выполненное задание юнита Environmental Issues." },
    { id: "nature-vocab", title: "Nature Vocab", text: "Пятнадцать единиц с повторно верными ответами." },
    { id: "idiom-ranger", title: "Idiom Ranger", text: "Завершён модуль Idioms & Phrasal Verbs." },
    { id: "collocation-climate", title: "Collocation Climate", text: "Завершён модуль Collocations." },
    { id: "word-family", title: "Word Family", text: "Завершён модуль Word Building." },
    { id: "nature-quest", title: "Nature Quest Complete", text: "Пройден юнит Environmental Issues." },
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
    { id: "first-apply", title: "First Apply", text: "Первое выполненное задание юнита Choosing a Career." },
    { id: "career-vocab", title: "Career Vocab", text: "Пятнадцать единиц с повторно верными ответами." },
    { id: "career-idioms", title: "Work Phrases", text: "Завершён модуль Idioms & Phrasal Verbs." },
    { id: "career-perks", title: "Perks Pro", text: "Завершён модуль Collocations." },
    { id: "career-forms", title: "Career Forms", text: "Завершён модуль Word Building." },
    { id: "career-quest", title: "Career Quest Complete", text: "Пройден юнит Choosing a Career." },
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
  const any = Object.values(state.items).some((item) => item.correct + item.wrong > 0) || state.completed.length > 0;
  if (any) got.add(rule.first);
  const vocabCorrect = Object.values(state.items).filter((item) => item.correct >= 2).length;
  if (vocabCorrect >= rule.vocabThreshold) got.add(rule.vocab);
  for (const [moduleId, achievement] of rule.moduleAchievements) {
    if (spec.activitiesFor(moduleId).every((activity) => state.completed.includes(`${moduleId}/${activity.id}`))) {
      got.add(achievement);
    }
  }
  if (state.finalDone) got.add(rule.final);
  return [...got];
}
