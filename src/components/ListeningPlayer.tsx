"use client";

import { useEffect, useRef, useState } from "react";
import type { ListeningTrack } from "@/data/listening";
import { Player } from "@/components/Player";
import { TopBar } from "@/components/Shell";
import { unitById } from "@/lib/units";
import { useProgress } from "@/lib/progress";

export function ListeningPlayer({ track }: { track: ListeningTrack }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const [playing, setPlaying] = useState(false);
  const spec = unitById(track.unit);
  const { state } = useProgress();
  const unlocked = state.completed.includes(`listen/${track.id}`);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => setProgress(el.duration ? el.currentTime / el.duration : 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onTime);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onPause);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onTime);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onPause);
    };
  }, []);

  const play = () => {
    const el = audioRef.current;
    if (!el) return;
    void el.play();
  };
  const pause = () => {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
  };
  const replay = () => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = 0;
    void el.play();
  };

  return (
    <main>
      <TopBar title="Аудирование" meta={track.title} />
      <section className="glass mb-5 rounded-3xl p-5 sm:p-8">
        <h2 className="text-3xl">{track.title}</h2>
        <audio ref={audioRef} src={track.file} preload="metadata" className="hidden" />
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className="min-h-12 rounded-full bg-stone-900 px-6 text-[#f4efe6]" onClick={play}>Слушать</button>
          <button type="button" className="min-h-12 rounded-full border border-stone-300 px-6" onClick={pause} disabled={!playing}>Пауза</button>
          <button type="button" className="min-h-12 rounded-full border border-stone-300 px-6" onClick={replay}>Ещё раз</button>
          {unlocked ? (
            <button type="button" className="min-h-12 rounded-full border border-stone-300 px-6" onClick={() => setShowText((v) => !v)}>{showText ? "Скрыть текст" : "Показать текст"}</button>
          ) : null}
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-900/10">
          <div className="h-full rounded-full bg-stone-900" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
        {unlocked && showText ? <p className="en mt-4 text-stone-800" lang="en">{track.transcript}</p> : null}
      </section>
      <Player
        title="Аудирование"
        questions={track.questions}
        activityKey={`listen/${track.id}`}
        onDoneHref={spec.hubHref}
        copy={{ mechanic: "CHOOSE", heading: "Прослушайте и выберите ответ.", instruction: "", whatToDo: "", hint: "Сначала прослушайте запись, затем отвечайте." }}
      />
    </main>
  );
}
