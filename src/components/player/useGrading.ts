"use client";

import { useCallback, useRef, useState } from "react";
import type { ProgressState } from "@/lib/progress";

export type GradingSession = { asked: number; correct: number };

export type Grading = {
  /** Итог ответа на текущий вопрос: null — ещё не отвечено. */
  ok: boolean | null;
  /** Первая ошибка: показываем «попробуйте ещё раз», верный ответ скрыт. */
  pending: boolean;
  /** Сколько XP показать в отзыве. */
  gain: number;
  /** Счётчик ответов за сессию для итогового экрана. */
  session: GradingSession;
  /** Вопрос уже оценён — защита от повторного начисления. */
  answered: { current: boolean };
  grade: (correct: boolean, ids: string[], practice?: boolean) => void;
  miss: (ids: string[]) => void;
  /** Снимает подсказку «попробуйте ещё раз», возвращая варианты. */
  resume: () => void;
  /** Готовит оценку к новому вопросу. */
  reset: () => void;
};

/**
 * Оценка ответа: сколько XP начислить, что показать в отзыве и когда дать
 * вторую попытку. Состояние вопроса (что выбрано, что перетащено) сюда не
 * входит — этим занимается useQuestionSession.
 */
export function useGrading({
  state,
  activityKey,
  record,
}: {
  state: ProgressState;
  activityKey?: string;
  record: (itemIds: string[], correct: boolean, practiceFlag?: boolean, awardXp?: boolean) => number;
}): Grading {
  const [ok, setOk] = useState<boolean | null>(null);
  const [pending, setPending] = useState(false);
  const [gain, setGain] = useState(0);
  const [tries, setTries] = useState(0);
  const [session, setSession] = useState<GradingSession>({ asked: 0, correct: 0 });
  const answered = useRef(false);

  const grade = useCallback(
    (correct: boolean, ids: string[], practice?: boolean) => {
      if (answered.current) return;
      answered.current = true;
      const combo = correct ? state.combo + 1 : 0;
      const bonus = correct && combo > 0 && combo % 3 === 0 ? 5 : 0;
      const replay = Boolean(activityKey && state.completed.includes(activityKey));
      const already = ids.every((id) => (state.items[id]?.correct ?? 0) > 0);
      record(ids, correct, practice, !replay);
      setOk(correct);
      setPending(false);
      setGain(replay || already || !correct ? 0 : 10 + bonus);
      setSession((s) => ({ asked: s.asked + 1, correct: s.correct + (correct ? 1 : 0) }));
    },
    [state, activityKey, record],
  );

  const miss = useCallback(
    (ids: string[]) => {
      const nextTry = tries + 1;
      setTries(nextTry);
      if (nextTry < 2) {
        record(ids, false, true, false);
        setPending(true);
        setOk(null);
        return;
      }
      if (answered.current) return;
      answered.current = true;
      setOk(false);
      setPending(false);
      setGain(0);
      setSession((s) => ({ asked: s.asked + 1, correct: s.correct }));
    },
    [tries, record],
  );

  const resume = useCallback(() => setPending(false), []);

  const reset = useCallback(() => {
    setOk(null);
    setPending(false);
    setGain(0);
    setTries(0);
    answered.current = false;
  }, []);

  return { ok, pending, gain, session, answered, grade, miss, resume, reset };
}
