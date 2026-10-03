"use client";

import { usePathname } from "next/navigation";
import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ModuleId } from "@/data/module-ids";
import { emptyProgress, loadProgress, today, type ProgressState } from "@/lib/progress-state";
import { CURRENT_UNIT_KEY, UNITS, awardFor, unitById, unitForPath, type QuestUnit, type UnitSpec } from "@/lib/units";

export type { ItemStat, ProgressState } from "@/lib/progress-state";
export type { QuestUnit } from "@/lib/units";

type Api = {
  state: ProgressState;
  family: ProgressState;
  env: ProgressState;
  career: ProgressState;
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
  careerProgress: number;
  practiceIds: string[];
  masteredIds: string[];
  setCursor: (key: string, step: number) => void;
  reset: () => void;
  finalReady: boolean;
  tasksLeftForFinal: number;
  selectUnit: (u: QuestUnit) => void;
};

const Ctx = createContext<Api | null>(null);

function unitPct(state: ProgressState, spec: UnitSpec): number {
  const vals = spec.modules.map((module) => {
    const acts = spec.activitiesFor(module.id);
    if (!acts.length) return 0;
    return acts.filter((activity) => state.completed.includes(`${module.id}/${activity.id}`)).length / acts.length;
  });
  const base = Math.round((vals.reduce((a, b) => a + b, 0) / spec.modules.length) * 100);
  return state.finalDone ? 100 : base;
}

function initialStates(): Record<QuestUnit, ProgressState> {
  return Object.fromEntries(UNITS.map((unit) => [unit.id, emptyProgress()])) as Record<QuestUnit, ProgressState>;
}

function mapStates(
  states: Record<QuestUnit, ProgressState>,
  fn: (state: ProgressState) => ProgressState,
): Record<QuestUnit, ProgressState> {
  return Object.fromEntries(UNITS.map((unit) => [unit.id, fn(states[unit.id])])) as Record<QuestUnit, ProgressState>;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const path = usePathname() ?? "/";
  const [states, setStates] = useState<Record<QuestUnit, ProgressState>>(initialStates);
  const [currentUnit, setCurrentUnit] = useState<QuestUnit>("unit1");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loaded = {} as Record<QuestUnit, ProgressState>;
    for (const unit of UNITS) loaded[unit.id] = loadProgress(unit.storageKey);
    const stored = (localStorage.getItem(CURRENT_UNIT_KEY) as QuestUnit) || "unit1";
    setStates(loaded);
    // Юнит из адреса выставляет следующий эффект: на общих страницах остаётся сохранённый.
    setCurrentUnit(stored);
    localStorage.setItem(CURRENT_UNIT_KEY, stored);
    setReady(true);
  }, []);

  useEffect(() => {
    const fromPath = unitForPath(path);
    if (!fromPath) return;
    localStorage.setItem(CURRENT_UNIT_KEY, fromPath);
    setCurrentUnit(fromPath);
  }, [path]);

  useEffect(() => {
    if (!ready) return;
    for (const unit of UNITS) localStorage.setItem(unit.storageKey, JSON.stringify(states[unit.id]));
  }, [states, ready]);

  const api = useMemo<Api>(() => {
    const current = states[currentUnit];
    const spec = unitById(currentUnit);
    const update = (updater: (state: ProgressState) => ProgressState) =>
      setStates((prev) => ({ ...prev, [currentUnit]: updater(prev[currentUnit]) }));
    const award = (state: ProgressState) => awardFor(currentUnit, state);

    const moduleProgress = (id: ModuleId) => {
      const acts = spec.activitiesFor(id);
      if (!acts.length) return 0;
      const done = acts.filter((activity) => current.completed.includes(`${id}/${activity.id}`)).length;
      return Math.round((done / acts.length) * 100);
    };
    const practiceIds = Object.entries(current.items)
      .filter(([, item]) => item.practice || item.wrong > item.correct)
      .map(([id]) => id);
    const masteredIds = Object.entries(current.items)
      .filter(([, item]) => !item.practice && item.correct >= 2 && item.correct > item.wrong)
      .map(([id]) => id);

    return {
      state: current,
      family: states.unit1,
      env: states.unit2,
      career: states.unit3,
      currentUnit,
      headerXp: states.unit1.xp + states.unit2.xp + states.unit3.xp,
      ready,
      setName: (name) => {
        const n = name.trim().slice(0, 24) || "Ученик";
        setStates((prev) => mapStates(prev, (state) => ({ ...state, name: n })));
      },
      setMotion: (reduceMotion) => setStates((prev) => mapStates(prev, (state) => ({ ...state, reduceMotion }))),
      record: (itemIds, correct, practiceFlag, awardXp = true) => {
        let gained = 0;
        update((state) => {
          const items = { ...state.items };
          itemIds.forEach((id) => {
            const prev = items[id] ?? { correct: 0, wrong: 0, practice: false };
            items[id] = {
              correct: prev.correct + (correct ? 1 : 0),
              wrong: prev.wrong + (correct ? 0 : 1),
              practice: practiceFlag ?? (correct ? false : true),
            };
          });
          const alreadyCorrect = itemIds.every((id) => (state.items[id]?.correct ?? 0) > 0);
          if (!awardXp) {
            const next = { ...state, items };
            next.achievements = award(next);
            return next;
          }
          const combo = correct ? (state.combo ?? 0) + 1 : 0;
          const bonus = correct && combo > 0 && combo % 3 === 0 ? 5 : 0;
          gained = correct && !alreadyCorrect ? 10 + bonus : 0;
          const next = {
            ...state,
            combo,
            bestStreak: Math.max(state.bestStreak, combo),
            xp: state.xp + gained,
            items,
            lastDay: today(),
            dayStreak: state.lastDay === today() ? Math.max(state.dayStreak, 1) : state.lastDay ? state.dayStreak + 1 : 1,
          };
          next.achievements = award(next);
          return next;
        });
        return gained;
      },
      completeActivity: (key) =>
        update((state) => {
          const completed = state.completed.includes(key) ? state.completed : [...state.completed, key];
          const bonus = state.completed.includes(key) ? 0 : 25;
          const next = { ...state, completed, xp: state.xp + bonus, lastDay: today() };
          next.achievements = award(next);
          return next;
        }),
      completeFinal: () =>
        update((state) => {
          const next = { ...state, finalDone: true, xp: state.xp + (state.finalDone ? 0 : 50), lastDay: today() };
          next.achievements = award(next);
          return next;
        }),
      setCursor: (key, step) => update((state) => ({ ...state, cursors: { ...state.cursors, [key]: step } })),
      reset: () =>
        setStates((prev) => mapStates(prev, (state) => ({ ...emptyProgress(), name: state.name, reduceMotion: state.reduceMotion }))),
      finalReady: spec.modules.every((module) =>
        spec.activitiesFor(module.id).some((activity) => current.completed.includes(`${module.id}/${activity.id}`)),
      ),
      tasksLeftForFinal: spec.modules.filter(
        (module) => !spec.activitiesFor(module.id).some((activity) => current.completed.includes(`${module.id}/${activity.id}`)),
      ).length,
      moduleProgress,
      unitProgress: unitPct(current, spec),
      familyProgress: unitPct(states.unit1, unitById("unit1")),
      envProgress: unitPct(states.unit2, unitById("unit2")),
      careerProgress: unitPct(states.unit3, unitById("unit3")),
      practiceIds,
      masteredIds,
      selectUnit: (u) => {
        localStorage.setItem(CURRENT_UNIT_KEY, u);
        setCurrentUnit(u);
      },
    };
  }, [states, ready, currentUnit]);

  return createElement(Ctx.Provider, { value: api }, children);
}

export function useProgress() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("progress");
  return ctx;
}
