"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { copyFor, type Question } from "@/lib/questions";
import { useProgress } from "@/lib/progress";
import { HintIcon } from "@/components/Marks";

type Copy = { mechanic: string; heading: string; instruction: string; whatToDo: string; hint: string };

function shuffled<T>(list: T[]): T[] {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function mixDeck(list: Question[]): Question[] {
  return shuffled(list).map((q) => {
    if (q.kind === "choice" || q.kind === "fill" || q.kind === "story") return { ...q, options: shuffled(q.options) };
    if (q.kind === "match") return { ...q, pairs: shuffled(q.pairs) };
    if (q.kind === "sort") return { ...q, cards: shuffled(q.cards) };
    if (q.kind === "order") return { ...q, tokens: shuffled(q.tokens) };
    return q;
  });
}

export function Player({
  title,
  questions,
  activityKey,
  onDoneHref = "/",
  finalMode = false,
  accent = "#1c1915",
  wash = "#f3ece3",
  copy,
  nextHref,
  onReplay,
}: {
  title: string;
  questions: Question[];
  activityKey?: string;
  onDoneHref?: string;
  finalMode?: boolean;
  accent?: string;
  wash?: string;
  copy?: Copy;
  nextHref?: string;
  onReplay?: () => void;
}) {
  const { record, completeActivity, completeFinal, setCursor, state, ready } = useProgress();
  const [deck] = useState(() => mixDeck(questions));
  const [step, setStep] = useState(0);
  const [rest, setRest] = useState(false);
  const [session, setSession] = useState({ asked: 0, correct: 0 });
  const startXp = useRef<number | null>(null);
  const answered = useRef(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);
  const [gain, setGain] = useState(0);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [order, setOrder] = useState<string[]>([]);
  const [bank, setBank] = useState<string[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [bucketPick, setBucketPick] = useState<Record<string, string>>({});
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [tries, setTries] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [pending, setPending] = useState(false);
  const [typed, setTyped] = useState("");
  const q = deck[step];
  const text = q ? (copy ?? copyFor(q)) : null;

  useEffect(() => {
    if (startXp.current === null && ready) startXp.current = state.xp;
  }, [ready, state.xp]);

  useEffect(() => {
    setPicked(null);
    setOk(null);
    setGain(0);
    setSelectedLeft(null);
    setPlaced({});
    setFlipped(false);
    setBucketPick({});
    setActiveCard(null);
    setTries(0);
    setShowHint(false);
    setPending(false);
    setTyped("");
    answered.current = false;
    if (q?.kind === "order") {
      setBank(q.tokens.map((t, i) => `${i}:${t}`));
      setOrder([]);
    }
  }, [step, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!q || q.kind === "match" || q.kind === "order" || q.kind === "sort" || q.kind === "flip") return;
      const opts = "options" in q ? q.options : [];
      const n = Number(e.key);
      if (n >= 1 && n <= opts.length && ok === null) choose(opts[n - 1]);
      if (e.key === "Enter" && ok !== null) next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const finished = step >= deck.length;

  function grade(correct: boolean, ids: string[], practice?: boolean) {
    if (answered.current) return;
    answered.current = true;
    const combo = correct ? state.combo + 1 : 0;
    const bonus = correct && combo > 0 && combo % 3 === 0 ? 5 : 0;
    record(ids, correct, practice);
    setOk(correct);
    setPending(false);
    setGain(correct ? 10 + bonus : 0);
    setSession((s) => ({ asked: s.asked + 1, correct: s.correct + (correct ? 1 : 0) }));
  }

  function miss(ids: string[]) {
    const nextTry = tries + 1;
    setTries(nextTry);
    setPicked(null);
    if (nextTry < 2) {
      setPending(true);
      setOk(null);
      return;
    }
    grade(false, ids);
  }

  function choose(option: string) {
    if (ok !== null || !q || pending) return;
    setPicked(option);
    if (q.kind === "choice" || q.kind === "fill" || q.kind === "story") {
      if (option === q.answer) grade(true, [q.itemId]);
      else miss([q.itemId]);
    }
  }

  function next() {
    setStep((s) => s + 1);
  }

  function finishIfLast() {
    const upcoming = step + 1;
    if (activityKey) setCursor(activityKey, upcoming >= deck.length ? 0 : upcoming);
    if (upcoming >= deck.length) {
      if (activityKey) completeActivity(activityKey);
      if (finalMode) completeFinal();
    }
    if (upcoming < deck.length && upcoming % 8 === 0) setRest(true);
    next();
  }

  if (!deck.length) {
    return <p className="glass rounded-3xl p-6">Здесь пока нечего повторять. Сначала пройдите задания и вернитесь сюда.</p>;
  }

  if (rest && !finished) {
    return (
      <section className="glass rise rounded-3xl p-6 sm:p-10">
        <p className="text-xs tracking-[0.2em]" style={{ color: accent }}>ПАУЗА</p>
        <h2 className="mt-2 text-4xl">Серия из 8 вопросов пройдена</h2>
        <p className="mt-3 text-stone-700">Дальше ещё {deck.length - step} вопросов. Если выйти сейчас, в следующий заход карточки начнутся сначала и в другом порядке.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="min-h-12 rounded-full px-6 text-white" style={{ background: accent }} onClick={() => setRest(false)}>Продолжить</button>
          <Link href={onDoneHref} className="inline-flex min-h-12 items-center rounded-full border border-stone-300 px-6">Продолжить позже</Link>
        </div>
      </section>
    );
  }

  if (finished) {
    const gained = Math.max(0, state.xp - (startXp.current ?? state.xp));
    const accuracy = session.asked ? Math.round((session.correct / session.asked) * 100) : 0;
    return (
      <section className="glass rise rounded-3xl p-6 sm:p-10">
        <p className="text-xs tracking-[0.2em] text-stone-500">ГОТОВО</p>
        <h2 className="mt-2 text-4xl">{finalMode ? "Unit 1 пройден" : title}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/80 p-4"><div className="text-xs text-stone-500">XP за серию</div><div className="text-3xl">+{gained}</div></div>
          <div className="rounded-2xl bg-white/80 p-4"><div className="text-xs text-stone-500">Точность</div><div className="text-3xl">{accuracy}%</div></div>
          <div className="rounded-2xl bg-white/80 p-4"><div className="text-xs text-stone-500">Лучшая серия</div><div className="text-3xl">{state.bestStreak}</div></div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={onDoneHref} className="inline-flex min-h-12 items-center rounded-full bg-stone-900 px-6 text-[#f4efe6]">К списку</Link>
          {nextHref ? <Link href={nextHref} className="inline-flex min-h-12 items-center rounded-full px-6 text-white" style={{ background: accent }}>Следующее задание</Link> : null}
          {onReplay ? <button type="button" className="min-h-12 rounded-full border border-stone-300 px-6" onClick={onReplay}>Ещё 5 вопросов</button> : null}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between text-sm text-stone-600">
        <span>{title}</span>
        <span>Вопрос {step + 1} из {deck.length} · XP {state.xp}</span>
      </div>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-stone-900/10">
        <div className="h-full transition-all" style={{ width: `${(step / deck.length) * 100}%`, background: accent }} />
      </div>
      <article className="glass rise rounded-3xl p-4 sm:p-8" key={q.id} style={{ boxShadow: `inset 4px 0 0 ${accent}` }}>
        {text ? (
          <header className="mb-5">
            <div className="text-xs tracking-[0.22em]" style={{ color: accent }}>{text.mechanic}</div>
            <h2 className="mt-1 text-2xl sm:text-3xl">{text.heading}</h2>
            <p className="mt-2 max-w-2xl text-base text-stone-700">{text.instruction}</p>
            <div className="mt-3 rounded-2xl px-3 py-2 text-sm text-stone-700" style={{ background: wash }}>
              <span className="mb-1 block text-[10px] tracking-[0.16em] text-stone-500">Что нужно сделать</span>
              {text.whatToDo}
            </div>
            <button type="button" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-300 px-3 text-sm" onClick={() => setShowHint((v) => !v)} style={{ color: accent }}>
              <HintIcon /> Подсказка
            </button>
            {showHint ? <p className="mt-2 text-sm text-stone-600">{text.hint}</p> : null}
          </header>
        ) : null}
        {q.kind === "choice" || q.kind === "fill" || q.kind === "story" ? (
          <ChoiceBlock q={q} picked={picked} ok={ok} locked={pending} onPick={choose} />
        ) : null}
        {q.kind === "type" ? (
          <div>
            <p className="en text-2xl" lang="en">{q.prompt}</p>
            <input
              className="mt-4 min-h-12 w-full rounded-2xl border border-stone-300 bg-white px-3"
              value={typed}
              disabled={ok !== null || pending}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter" || ok !== null) return;
                const n = typed.trim().toLowerCase();
                if (q.answers.includes(n)) grade(true, [q.itemId]);
                else miss([q.itemId]);
              }}
              placeholder="Напечатайте существительное"
              autoCapitalize="off"
              autoCorrect="off"
            />
            {ok === null && !pending ? (
              <button type="button" className="mt-4 min-h-12 rounded-full px-5 text-white" style={{ background: accent }} onClick={() => {
                const n = typed.trim().toLowerCase();
                if (q.answers.includes(n)) grade(true, [q.itemId]);
                else miss([q.itemId]);
              }}>Проверить</button>
            ) : null}
          </div>
        ) : null}
        {q.kind === "match" ? (
          <MatchBlock
            q={q}
            placed={placed}
            selectedLeft={selectedLeft}
            setSelectedLeft={setSelectedLeft}
            onPlace={(left, right) => {
              const nextPlaced = { ...placed, [left]: right };
              setPlaced(nextPlaced);
              setSelectedLeft(null);
              if (Object.keys(nextPlaced).length === q.pairs.length) {
                const good = q.pairs.every((p) => nextPlaced[p.left] === p.right);
                if (good) grade(true, q.itemIds);
                else { setPlaced({}); miss(q.itemIds); }
              }
            }}
            locked={ok !== null || pending}
          />
        ) : null}
        {q.kind === "flip" ? (
          <div>
            <button type="button" className="relative mx-auto block h-56 w-full max-w-md [perspective:800px]" onClick={() => setFlipped((f) => !f)} aria-label="Flip card">
              <div className={`flip relative h-full w-full ${flipped ? "on" : ""}`}>
                <div className="face absolute inset-0 grid place-items-center rounded-[1.6rem] bg-stone-900 p-6 text-center text-3xl text-[#f4efe6]">{q.front}</div>
                <div className="face back absolute inset-0 grid place-items-center rounded-[1.6rem] bg-white p-6 text-center">
                  <div>
                    <div className="text-2xl">{q.back}</div>
                    {q.example ? <p className="mt-3 text-sm text-stone-600">{q.example}</p> : null}
                  </div>
                </div>
              </div>
            </button>
            {ok === null ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button type="button" className="min-h-12 rounded-2xl bg-stone-900 text-[#f4efe6]" onClick={() => grade(true, [q.itemId], false)}>Знаю</button>
              <button type="button" className="min-h-12 rounded-2xl border border-stone-300" onClick={() => grade(false, [q.itemId], true)}>Нужно повторить</button>
            </div>
            ) : null}
          </div>
        ) : null}
        {q.kind === "order" ? (
          <div>
            <p className="text-sm text-stone-500">{q.prompt}</p>
            <div className="mt-4 flex min-h-16 flex-wrap gap-2 rounded-2xl border border-dashed border-stone-300 p-3">
              {order.map((token) => (
                <button key={token} type="button" className="min-h-11 rounded-xl bg-stone-900 px-3 text-[#f4efe6]" onClick={() => { if (ok !== null) return; setOrder(order.filter((t) => t !== token)); setBank([...bank, token]); }}>{token.split(":").slice(1).join(":")}</button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {bank.map((token) => (
                <button key={token} type="button" className="min-h-11 rounded-xl bg-white px-3 shadow" onClick={() => { if (ok !== null) return; setBank(bank.filter((t) => t !== token)); setOrder([...order, token]); }}>{token.split(":").slice(1).join(":")}</button>
              ))}
            </div>
            {ok === null && !pending ? (
              <button type="button" className="mt-4 min-h-12 rounded-full px-5 text-white" style={{ background: accent }} onClick={() => {
                const built = order.map((t) => t.split(":").slice(1).join(":"));
                if (built.join(" ") === q.answer.join(" ")) grade(true, [q.itemId]);
                else { setOrder([]); setBank(q.tokens.map((t, i) => `${i}:${t}`)); miss([q.itemId]); }
              }}>Проверить</button>
            ) : null}
          </div>
        ) : null}
        {q.kind === "sort" ? (
          <SortBlock q={q} bucketPick={bucketPick} activeCard={activeCard} setActiveCard={setActiveCard} locked={ok !== null || pending} onDrop={(card, bucket) => {
            const nextMap = { ...bucketPick, [card]: bucket };
            setBucketPick(nextMap);
            setActiveCard(null);
            if (Object.keys(nextMap).length === q.cards.length) {
              const good = q.cards.every((c) => nextMap[c.id] === c.bucket);
              if (good) grade(true, q.itemIds);
              else { setBucketPick({}); miss(q.itemIds); }
            }
          }} />
        ) : null}
        {pending ? (
          <div className="mt-5 rounded-2xl bg-amber-50 p-4">
            <div className="font-semibold">Попробуйте ещё раз</div>
            <p className="mt-1 text-sm text-stone-700">Это не совсем тот вариант. Обратите внимание на значение и попробуйте другой ответ. Правильный вариант пока скрыт.</p>
            <button type="button" className="mt-3 min-h-12 rounded-full px-5 text-white" style={{ background: accent }} onClick={() => setPending(false)}>Ещё попытка</button>
          </div>
        ) : null}
        {ok !== null ? (
          <Feedback ok={ok} gain={gain} text={revealOf(q)} answer={q.kind === "order" ? q.answer.join(" ") : q.kind === "type" ? q.answers.join(" / ") : "answer" in q ? q.answer : ""} onNext={finishIfLast} accent={accent} flip={q.kind === "flip"} />
        ) : null}
      </article>
    </section>
  );
}

function revealOf(q: Question): string {
  if (q.kind === "match") return q.pairs.map((p) => `${p.left} — ${p.right}`).join(" · ");
  if (q.kind === "sort") return q.cards.map((c) => `${c.label} → ${c.bucket}`).join(" · ");
  if (q.kind === "flip") return q.back;
  if (q.kind === "order" || q.kind === "type") return q.reveal;
  return q.reveal;
}

function ChoiceBlock({ q, picked, ok, locked, onPick }: { q: Extract<Question, { kind: "choice" | "fill" | "story" }>; picked: string | null; ok: boolean | null; locked: boolean; onPick: (o: string) => void }) {
  const prompt = q.kind === "fill" ? `${q.before}______${q.after}` : q.kind === "story" ? q.lead : q.prompt;
  const detail = "detail" in q ? q.detail : undefined;
  return (
    <div>
      <h2 className="en text-3xl leading-tight sm:text-5xl" lang="en" translate="no">{prompt}</h2>
      {detail ? <p className="mt-3 max-h-28 overflow-auto text-sm leading-relaxed text-stone-600" lang="en" translate="no">{detail}</p> : null}
      <div className="mt-5 grid gap-2">
        {q.options.map((o, i) => {
          const state = ok === null ? "" : o === q.answer ? "bg-emerald-700 text-white" : o === picked ? "bg-rose-800 text-white" : "opacity-70";
          return (
            <button key={`${o}-${i}`} type="button" disabled={ok !== null || locked} onClick={() => onPick(o)} className={`min-h-14 rounded-2xl border border-stone-200 bg-[#fffaf4] px-4 text-left text-base sm:text-lg ${state}`} lang="en" translate="no">
              <span className="mr-2 text-stone-400">{i + 1}</span>{o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MatchBlock({ q, placed, selectedLeft, setSelectedLeft, onPlace, locked }: {
  q: Extract<Question, { kind: "match" }>;
  placed: Record<string, string>;
  selectedLeft: string | null;
  setSelectedLeft: (v: string | null) => void;
  onPlace: (left: string, right: string) => void;
  locked: boolean;
}) {
  const [rights] = useState(() => shuffled(q.pairs.map((p) => p.right)));
  return (
    <div>
      <p className="text-sm text-stone-500">{q.prompt}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="grid gap-2">
          {q.pairs.map((p) => (
            <button key={p.id} type="button" disabled={locked || Boolean(placed[p.left])} draggable={!locked}
              onDragStart={() => setSelectedLeft(p.left)}
              onClick={() => setSelectedLeft(p.left)}
              className={`min-h-14 rounded-2xl px-3 text-left ${selectedLeft === p.left ? "bg-stone-900 text-[#f4efe6]" : "bg-white"} ${placed[p.left] ? "opacity-50" : ""}`}>
              {p.left}
              {placed[p.left] ? <span className="mt-1 block text-sm opacity-80">{placed[p.left]}</span> : null}
            </button>
          ))}
        </div>
        <div className="grid gap-2">
          {rights.map((r) => (
            <button key={r} type="button" disabled={locked}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => { if (selectedLeft) onPlace(selectedLeft, r); }}
              onClick={() => { if (selectedLeft) onPlace(selectedLeft, r); }}
              className="min-h-14 rounded-2xl border border-dashed border-stone-400 bg-[#f7f3ec] px-3 text-left">
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SortBlock({ q, bucketPick, activeCard, setActiveCard, onDrop, locked }: {
  q: Extract<Question, { kind: "sort" }>;
  bucketPick: Record<string, string>;
  activeCard: string | null;
  setActiveCard: (v: string | null) => void;
  onDrop: (card: string, bucket: string) => void;
  locked: boolean;
}) {
  return (
    <div>
      <p className="text-sm text-stone-500">{q.prompt}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {q.cards.filter((c) => !bucketPick[c.id]).map((c) => (
          <button key={c.id} type="button" draggable={!locked} onDragStart={() => setActiveCard(c.id)} onClick={() => setActiveCard(c.id)} className={`min-h-11 rounded-xl px-3 ${activeCard === c.id ? "bg-stone-900 text-[#f4efe6]" : "bg-white"}`}>{c.label}</button>
        ))}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {q.buckets.map((b) => (
          <button key={b} type="button" onDragOver={(e) => e.preventDefault()} onDrop={() => { if (activeCard) onDrop(activeCard, b); }} onClick={() => { if (activeCard) onDrop(activeCard, b); }} className="min-h-24 rounded-2xl border border-stone-200 bg-white/70 p-3 text-left">
            <div className="text-xs tracking-widest text-stone-500">{b.toUpperCase()}</div>
            <div className="mt-2 text-sm">{q.cards.filter((c) => bucketPick[c.id] === b).map((c) => c.label).join(", ")}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Feedback({ ok, gain, text, answer, onNext, accent, flip }: { ok: boolean; gain: number; text: string; answer: string; onNext: () => void; accent: string; flip: boolean }) {
  return (
    <div className={`mt-5 rounded-2xl p-4 ${ok ? "bg-emerald-50" : "bg-rose-50"}`}>
      <div className="font-semibold">{ok ? "Правильно" : flip ? "Нужна подсказка" : "Попытки закончились"} {ok ? `+${gain} XP` : ""}</div>
      {flip && !ok ? (
        <p className="mt-2 text-lg">{text}</p>
      ) : (
        <>
          <p className="mt-1 text-sm text-stone-700">{ok ? "Отлично. Вы выбрали верный ответ." : "Обратите внимание на значение."}</p>
          {!ok && answer ? <p className="mt-2 text-sm"><span className="text-stone-500">Правильный ответ: </span><strong lang="en" translate="no">{answer}</strong></p> : null}
          <p className="mt-1 text-sm text-stone-700" lang="en" translate="no">{text}</p>
        </>
      )}
      <button type="button" onClick={onNext} className="mt-3 min-h-12 rounded-full px-5 text-white" style={{ background: accent }}>Дальше</button>
    </div>
  );
}
