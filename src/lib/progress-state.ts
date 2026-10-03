/**
 * Состояние прогресса юнита и его сохранение. Вынесено из progress.ts, чтобы
 * реестр юнитов мог описывать достижения, не создавая циклический импорт.
 */

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

export function emptyProgress(): ProgressState {
  return {
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
  };
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Читает прогресс юнита; при любой проблеме с данными отдаёт пустое состояние. */
export function loadProgress(key: string): ProgressState {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return emptyProgress();
    const parsed = { ...emptyProgress(), ...JSON.parse(raw) };
    if (!parsed.name || parsed.name === "Learner") parsed.name = "Ученик";
    return parsed;
  } catch {
    return emptyProgress();
  }
}
