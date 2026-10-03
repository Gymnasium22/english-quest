"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Question } from "@/lib/questions";
import type { Grading } from "@/components/player/useGrading";

/** Случайная перестановка списка — нужна и колоде, и перемешиванию внутри вопроса. */
export function shuffled<T>(list: T[]): T[] {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Перемешивает колоду и варианты внутри каждого вопроса. */
export function mixDeck(list: Question[]): Question[] {
  return shuffled(list).map((q) => {
    if (q.kind === "choice" || q.kind === "fill" || q.kind === "story") return { ...q, options: shuffled(q.options) };
    if (q.kind === "match") return { ...q, pairs: shuffled(q.pairs) };
    if (q.kind === "sort") return { ...q, cards: shuffled(q.cards) };
    if (q.kind === "order") return { ...q, tokens: shuffled(q.tokens) };
    return q;
  });
}

export type QuestionSession = {
  deck: Question[];
  step: number;
  q: Question;
  finished: boolean;
  rest: boolean;
  setRest: (value: boolean) => void;
  picked: string | null;
  setPicked: (value: string | null) => void;
  typed: string;
  setTyped: (value: string) => void;
  selectedLeft: string | null;
  setSelectedLeft: (value: string | null) => void;
  placed: Record<string, string>;
  setPlaced: (updater: (prev: Record<string, string>) => Record<string, string>) => void;
  order: string[];
  setOrder: (value: string[]) => void;
  bank: string[];
  setBank: (value: string[]) => void;
  flipped: boolean;
  setFlipped: (updater: (prev: boolean) => boolean) => void;
  bucketPick: Record<string, string>;
  setBucketPick: (updater: (prev: Record<string, string>) => Record<string, string>) => void;
  activeCard: string | null;
  setActiveCard: (value: string | null) => void;
  showHint: boolean;
  setShowHint: (updater: (prev: boolean) => boolean) => void;
  choose: (option: string) => void;
  next: () => void;
  finishIfLast: () => void;
};

/**
 * Ход прохождения: перемешанная колода, текущий вопрос, состояние ответа
 * (выбор, ввод, перетаскивание, порядок слов) и переходы между вопросами.
 */
export function useQuestionSession({
  questions,
  grading,
  activityKey,
  finalMode,
  onCursor,
  onActivityDone,
  onFinalDone,
}: {
  questions: Question[];
  grading: Grading;
  activityKey?: string;
  finalMode: boolean;
  onCursor: (key: string, step: number) => void;
  onActivityDone: (key: string) => void;
  onFinalDone: () => void;
}): QuestionSession {
  const [deck, setDeck] = useState<Question[]>(questions);
  const mixed = useRef(false);
  useEffect(() => {
    if (mixed.current) return;
    mixed.current = true;
    setDeck(mixDeck(questions));
  }, [questions]);

  const [step, setStep] = useState(0);
  const [rest, setRest] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [order, setOrder] = useState<string[]>([]);
  const [bank, setBank] = useState<string[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [bucketPick, setBucketPick] = useState<Record<string, string>>({});
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [typed, setTyped] = useState("");
  const q = deck[step];

  const { ok, pending, answered, grade, miss, reset: resetGrading } = grading;

  /** Ошибка всегда снимает подсветку выбранного варианта. */
  const wrong = useCallback(
    (ids: string[]) => {
      setPicked(null);
      miss(ids);
    },
    [miss],
  );

  useEffect(() => {
    setPicked(null);
    setSelectedLeft(null);
    setPlaced({});
    setFlipped(false);
    setBucketPick({});
    setActiveCard(null);
    setShowHint(false);
    setTyped("");
    resetGrading();
    if (q?.kind === "order") {
      setBank(q.tokens.map((t, i) => `${i}:${t}`));
      setOrder([]);
    }
  }, [step, q, resetGrading]);

  useEffect(() => {
    if (!q || q.kind !== "match") return;
    if (Object.keys(placed).length !== q.pairs.length) return;
    if (answered.current || pending || ok !== null) return;
    const good = q.pairs.every((p) => placed[p.left] === p.right);
    if (good) grade(true, q.itemIds);
    else {
      setPlaced({});
      wrong(q.itemIds);
    }
  }, [placed, q, pending, ok, answered, grade, wrong]);

  useEffect(() => {
    if (!q || q.kind !== "sort") return;
    if (Object.keys(bucketPick).length !== q.cards.length) return;
    if (answered.current || pending || ok !== null) return;
    const good = q.cards.every((c) => bucketPick[c.id] === c.bucket);
    if (good) grade(true, q.itemIds);
    else {
      setBucketPick({});
      wrong(q.itemIds);
    }
  }, [bucketPick, q, pending, ok, answered, grade, wrong]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!q || q.kind === "match" || q.kind === "order" || q.kind === "sort" || q.kind === "flip") return;
      const opts = "options" in q ? q.options : [];
      const n = Number(e.key);
      if (n >= 1 && n <= opts.length && ok === null && !pending && !answered.current) choose(opts[n - 1]);
      if (e.key === "Enter" && ok !== null) next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function choose(option: string) {
    if (ok !== null || !q || pending) return;
    setPicked(option);
    if (q.kind === "choice" || q.kind === "fill" || q.kind === "story") {
      if (option === q.answer) grade(true, [q.itemId]);
      else wrong([q.itemId]);
    }
  }

  function next() {
    setStep((s) => s + 1);
  }

  function finishIfLast() {
    const upcoming = step + 1;
    if (activityKey) onCursor(activityKey, upcoming >= deck.length ? 0 : upcoming);
    if (upcoming >= deck.length) {
      if (activityKey) onActivityDone(activityKey);
      if (finalMode) onFinalDone();
    }
    if (upcoming < deck.length && upcoming % 8 === 0) setRest(true);
    next();
  }

  return {
    deck,
    step,
    q,
    finished: step >= deck.length,
    rest,
    setRest,
    picked,
    setPicked,
    typed,
    setTyped,
    selectedLeft,
    setSelectedLeft,
    placed,
    setPlaced,
    order,
    setOrder,
    bank,
    setBank,
    flipped,
    setFlipped,
    bucketPick,
    setBucketPick,
    activeCard,
    setActiveCard,
    showHint,
    setShowHint,
    choose,
    next,
    finishIfLast,
  };
}
