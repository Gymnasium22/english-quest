"use client";

import { MODULES, type ModuleId } from "@/data/unit1";
import { ENV_MODULES } from "@/data/unit2";
import { activitiesFor } from "@/lib/questions";
import { envActivitiesFor } from "@/lib/questions-env";
import { usePathname } from "next/navigation";
import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ItemStat = { correct: number; wrong: number; practice: boolean };
export type ProgressState = {
  name: string;
  xp: number;
  bestStreak: number;
  combo: number;
  dayStreak: number;
  lastDay: string;
  completed: string[];
  items: Record<string, ItemStat>;
  achievements: string[];
  finalDone: boolean;
  reduceMotion: boolean;
  cursors: Record<string, number>;
};

const KEY1 = "english-quest-unit1";
const KEY2 = "english-quest-unit2";
const CURRENT = "english-quest-current-unit";

const empty = (): ProgressState => ({
  name: "Ученик",
  xp: 0,
  bestStreak: 0,
  combo: 0,
  dayStreak: 0,
  lastDay: "",
  completed: [],
  items: {},
  achievements: [],
  finalDone: false,
  reduceMotion: false,
  cursors: {},
});

function today() {
  return new Date().toISOString().slice(0, 10);
}

function loadKey(key: string): ProgressState {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return empty();
    const parsed = { ...empty(), ...JSON.parse(raw) };
    if (!parsed.name || parsed.name === "Learner") parsed.name = "Ученик";
    return parsed;
  } catch {
    return empty();
  }
}

export type QuestUnit = "unit1" | "unit2";

function pathUnit(path: string, stored: QuestUnit): QuestUnit {
  if (path.startsWith("/env") || path.startsWith("/unit/environmental")) return "unit2";
  if (path.startsWith("/unit/family") || path.startsWith("/module") || path === "/final") return "unit1";
  return stored;
}

function actsFor(unit: QuestUnit, id: string) {
  return unit === "unit2" ? envActivitiesFor(id) : activitiesFor(id);
}

function mods(unit: QuestUnit) {
  return unit === "unit2" ? ENV_MODULES : MODULES;
}

function awardFamily(s: ProgressState): string[] {
  const got = new Set(s.achievements);
  const add = (id: string) => got.add(id);
  const any = Object.values(s.items).some((i) => i.correct + i.wrong > 0) || s.completed.length > 0;
  if (any) add("first-step");
  const vocabCorrect = Object.values(s.items).filter((st) => st.correct >= 2).length;
  if (vocabCorrect >= 20) add("vocab-master");
  const done = (mod: ModuleId) => activitiesFor(mod).every((a) => s.completed.includes(`${mod}/${a.id}`));
  if (done("idioms")) add("phrase-hunter");
  if (done("collocations")) add("collocation-pro");
  if (done("word-building")) add("word-builder");
  if (done("prepositions")) add("prep-pro");
  if (s.finalDone) add("family-quest");
  return [...got];
}

function awardEnv(s: ProgressState): string[] {
  const got = new Set(s.achievements);
  const add = (id: string) => got.add(id);
  const any = Object.values(s.items).some((i) => i.correct + i.wrong > 0) || s.completed.length > 0;
  if (any) add("first-forecast");
  const vocabCorrect = Object.values(s.items).filter((st) => st.correct >= 2).length;
  if (vocabCorrect >= 15) add("nature-vocab");
  const done = (mod: string) => envActivitiesFor(mod).every((a) => s.completed.includes(`${mod}/${a.id}`));
  if (done("idioms")) add("idiom-ranger");
  if (done("collocations")) add("collocation-climate");
  if (done("word-building")) add("word-family");
  if (s.finalDone) add("nature-quest");
  return [...got];
}

type Api = {
  state: ProgressState;
  family: ProgressState;
  env: ProgressState;
  currentUnit: QuestUnit;
  headerXp: number;
  ready: boolean;
  setName: (name: string) => void;
  setMotion: (v: boolean) => void;
  record: (itemIds: string[], correct: boolean, practiceFlag?: boolean, awardXp?: boolean) => number;
  completeActivity: (key: string) => void;
  completeFinal: () => void;
  moduleProgress: (id: ModuleId) => number;
  unitProgress: number;
  familyProgress: number;
  envProgress: number;
  practiceIds: string[];
  masteredIds: string[];
  setCursor: (key: string, step: number) => void;
  reset: () => void;
  finalReady: boolean;
  tasksLeftForFinal: number;
  selectUnit: (u: QuestUnit) => void;
};

const Ctx = createContext<Api | null>(null);

function unitPct(s: ProgressState, unit: QuestUnit) {
  const list = mods(unit);
  const vals = list.map((m) => {
    const acts = actsFor(unit, m.id);
    if (!acts.length) return 0;
    return acts.filter((a) => s.completed.includes(`${m.id}/${a.id}`)).length / acts.length;
  });
  const base = Math.round((vals.reduce((a, b) => a + b, 0) / list.length) * 100);
  return s.finalDone ? 100 : base;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const path = usePathname() ?? "/";
  const [family, setFamily] = useState<ProgressState>(empty);
  const [env, setEnv] = useState<ProgressState>(empty);
  const [currentUnit, setCurrentUnit] = useState<QuestUnit>("unit1");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const f = loadKey(KEY1);
    const e = loadKey(KEY2);
    const stored = (localStorage.getItem(CURRENT) as QuestUnit) || "unit1";
    setFamily(f);
    setEnv(e);
    setCurrentUnit(pathUnit(path, stored));
    setReady(true);
  }, []);

  useEffect(() => {
    if (path.startsWith("/unit/environmental") || path.startsWith("/env")) {
      localStorage.setItem(CURRENT, "unit2");
      setCurrentUnit("unit2");
      return;
    }
    if (path.startsWith("/unit/family") || path.startsWith("/module") || path === "/final") {
      localStorage.setItem(CURRENT, "unit1");
      setCurrentUnit("unit1");
    }
  }, [path]);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY1, JSON.stringify(family));
  }, [family, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem(KEY2, JSON.stringify(env));
  }, [env, ready]);

  const state = currentUnit === "unit2" ? env : family;
  const setState = currentUnit === "unit2" ? setEnv : setFamily;
  const award = currentUnit === "unit2" ? awardEnv : awardFamily;

  const api = useMemo<Api>(() => {
    const moduleProgress = (id: ModuleId) => {
      const acts = actsFor(currentUnit, id);
      if (!acts.length) return 0;
      const n = acts.filter((a) => state.completed.includes(`${id}/${a.id}`)).length;
      return Math.round((n / acts.length) * 100);
    };
    const practiceIds = Object.entries(state.items)
      .filter(([, st]) => st.practice || st.wrong > st.correct)
      .map(([id]) => id);
    const masteredIds = Object.entries(state.items)
      .filter(([, st]) => !st.practice && st.correct >= 2 && st.correct > st.wrong)
      .map(([id]) => id);
    const list = mods(currentUnit);
    return {
      state,
      family,
      env,
      currentUnit,
      headerXp: family.xp + env.xp,
      ready,
      setName: (name) => {
        const n = name.trim().slice(0, 24) || "Ученик";
        setFamily((s) => ({ ...s, name: n }));
        setEnv((s) => ({ ...s, name: n }));
      },
      setMotion: (reduceMotion) => {
        setFamily((s) => ({ ...s, reduceMotion }));
        setEnv((s) => ({ ...s, reduceMotion }));
      },
      record: (itemIds, correct, practiceFlag, awardXp = true) => {
        let gained = 0;
        setState((s) => {
          const items = { ...s.items };
          itemIds.forEach((id) => {
            const prev = items[id] ?? { correct: 0, wrong: 0, practice: false };
            items[id] = {
              correct: prev.correct + (correct ? 1 : 0),
              wrong: prev.wrong + (correct ? 0 : 1),
              practice: practiceFlag ?? (correct ? false : true),
            };
          });
          if (!awardXp) {
            const next = { ...s, items };
            next.achievements = award(next);
            return next;
          }
          const combo = correct ? (s.combo ?? 0) + 1 : 0;
          const bonus = correct && combo > 0 && combo % 3 === 0 ? 5 : 0;
          gained = correct ? 10 + bonus : 0;
          const next = {
            ...s,
            combo,
            bestStreak: Math.max(s.bestStreak, combo),
            xp: s.xp + gained,
            items,
            lastDay: today(),
            dayStreak: s.lastDay === today() ? Math.max(s.dayStreak, 1) : s.lastDay ? s.dayStreak + 1 : 1,
          };
          next.achievements = award(next);
          return next;
        });
        return gained;
      },
      completeActivity: (key) =>
        setState((s) => {
          const completed = s.completed.includes(key) ? s.completed : [...s.completed, key];
          const bonus = s.completed.includes(key) ? 0 : 25;
          const next = { ...s, completed, xp: s.xp + bonus, lastDay: today() };
          next.achievements = award(next);
          return next;
        }),
      completeFinal: () =>
        setState((s) => {
          const next = { ...s, finalDone: true, xp: s.xp + (s.finalDone ? 0 : 50), lastDay: today() };
          next.achievements = award(next);
          return next;
        }),
      setCursor: (key, step) => setState((s) => ({ ...s, cursors: { ...s.cursors, [key]: step } })),
      reset: () => {
        setFamily((s) => ({ ...empty(), name: s.name, reduceMotion: s.reduceMotion }));
        setEnv((s) => ({ ...empty(), name: s.name, reduceMotion: s.reduceMotion }));
      },
      finalReady: list.every((m) => actsFor(currentUnit, m.id).some((a) => state.completed.includes(`${m.id}/${a.id}`))),
      tasksLeftForFinal: list.filter((m) => !actsFor(currentUnit, m.id).some((a) => state.completed.includes(`${m.id}/${a.id}`))).length,
      moduleProgress,
      unitProgress: unitPct(state, currentUnit),
      familyProgress: unitPct(family, "unit1"),
      envProgress: unitPct(env, "unit2"),
      practiceIds,
      masteredIds,
      selectUnit: (u) => {
        localStorage.setItem(CURRENT, u);
        setCurrentUnit(u);
      },
    };
  }, [state, ready, currentUnit, family, env]);

  return createElement(Ctx.Provider, { value: api }, children);
}

export function useProgress() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("progress");
  return ctx;
}

export const ACHIEVEMENTS = [
  { id: "first-step", title: "First Step", text: "Первое выполненное задание." },
  { id: "vocab-master", title: "Vocab Master", text: "Двадцать слов и выражений, которые вы верно вспомнили дважды." },
  { id: "phrase-hunter", title: "Phrase Hunter", text: "Завершён раздел Idioms & Phrasal Verbs." },
  { id: "collocation-pro", title: "Collocation Pro", text: "Завершён Collocation Collection." },
  { id: "word-builder", title: "Word Builder", text: "Завершён Word Building." },
  { id: "prep-pro", title: "Prep Pro", text: "Завершён модуль Prepositional Phrases." },
  { id: "family-quest", title: "Family Quest Complete", text: "Пройден весь Unit 1." },
];

export const ACHIEVEMENTS_ENV = [
  { id: "first-forecast", title: "First Forecast", text: "Первое выполненное задание юнита Environmental Issues." },
  { id: "nature-vocab", title: "Nature Vocab", text: "Пятнадцать единиц с повторно верными ответами." },
  { id: "idiom-ranger", title: "Idiom Ranger", text: "Завершён модуль Idioms & Phrasal Verbs." },
  { id: "collocation-climate", title: "Collocation Climate", text: "Завершён модуль Collocations." },
  { id: "word-family", title: "Word Family", text: "Завершён модуль Word Building." },
  { id: "nature-quest", title: "Nature Quest Complete", text: "Пройден юнит Environmental Issues." },
];
