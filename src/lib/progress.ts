"use client";

import { MODULES, type ModuleId } from "@/data/unit1";
import { activitiesFor } from "@/lib/questions";
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

const KEY = "english-quest-unit1";

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

function load(): ProgressState {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    return { ...empty(), ...JSON.parse(raw) };
  } catch {
    return empty();
  }
}

type Api = {
  state: ProgressState;
  ready: boolean;
  setName: (name: string) => void;
  setMotion: (v: boolean) => void;
  record: (itemIds: string[], correct: boolean, practiceFlag?: boolean, awardXp?: boolean) => number;
  completeActivity: (key: string) => void;
  completeFinal: () => void;
  moduleProgress: (id: ModuleId) => number;
  unitProgress: number;
  practiceIds: string[];
  masteredIds: string[];
  setCursor: (key: string, step: number) => void;
  reset: () => void;
  finalReady: boolean;
  tasksLeftForFinal: number;
};

const Ctx = createContext<Api | null>(null);

function award(s: ProgressState): string[] {
  const got = new Set(s.achievements);
  const add = (id: string) => got.add(id);
  const any = Object.values(s.items).some((i) => i.correct + i.wrong > 0) || s.completed.length > 0;
  if (any) add("first-step");
  const vocabMaster = Object.entries(s.items).filter(([id, st]) => !id.includes("-") ? false : st.correct >= 2).length;
  const vocabCorrect = Object.values(s.items).filter((st) => st.correct >= 2).length;
  if (vocabCorrect >= 20) add("vocab-master");
  const done = (mod: ModuleId) => activitiesFor(mod).every((a) => s.completed.includes(`${mod}/${a.id}`));
  if (done("idioms")) add("phrase-hunter");
  if (done("collocations")) add("collocation-pro");
  if (done("word-building")) add("word-builder");
  if (s.finalDone) add("family-quest");
  void vocabMaster;
  return [...got];
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(empty);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const s = load();
    const d = today();
    if (s.lastDay && s.lastDay !== d) {
      const prev = new Date(s.lastDay);
      const now = new Date(d);
      const diff = (now.getTime() - prev.getTime()) / 86400000;
      if (diff > 1) s.dayStreak = 0;
    }
    setState(s);
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  const api = useMemo<Api>(() => {
    const moduleProgress = (id: ModuleId) => {
      const acts = activitiesFor(id);
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
    return {
      state,
      ready,
      setName: (name) => setState((s) => ({ ...s, name: name.slice(0, 24) || "Learner" })),
      setMotion: (reduceMotion) => setState((s) => ({ ...s, reduceMotion })),
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
      reset: () => setState(empty()),
      finalReady: MODULES.every((m) => activitiesFor(m.id).some((a) => state.completed.includes(`${m.id}/${a.id}`))),
      tasksLeftForFinal: MODULES.filter((m) => !activitiesFor(m.id).some((a) => state.completed.includes(`${m.id}/${a.id}`))).length,
      moduleProgress,
      get unitProgress() {
        const vals = MODULES.map((m) => moduleProgress(m.id));
        const base = Math.round(vals.reduce((a, b) => a + b, 0) / MODULES.length);
        return state.finalDone ? 100 : base;
      },
      practiceIds,
      masteredIds,
    };
  }, [state, ready]);

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
  { id: "family-quest", title: "Family Quest Complete", text: "Пройден весь Unit 1." },
];
