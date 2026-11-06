"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";

export default function HomePage() {
  const { familyProgress, envProgress, careerProgress, tourProgress, belarusProgress, headerXp, selectUnit } = useProgress();
  return (
    <main>
      <section className="glass rise rounded-[2rem] p-6 sm:p-10">
        <p className="text-xs tracking-[0.28em] text-stone-500">ENGLISH QUEST</p>
        <h1 className="mt-3 text-5xl leading-[0.95] sm:text-7xl">Выберите юнит</h1>
        <p className="mt-4 max-w-lg text-stone-700">Независимые курсы. Прогресс каждого хранится отдельно. Общий XP: {headerXp}.</p>
      </section>
      <ol className="mt-6 grid gap-4">
        <li className="glass rounded-3xl border-l-4 p-5 sm:flex sm:items-center sm:justify-between" style={{ borderLeftColor: "#C4622D" }}>
          <div>
            <div className="text-xs tracking-[0.18em] text-stone-500">UNIT 1</div>
            <h2 className="text-3xl">FAMILY</h2>
            <p className="text-sm text-stone-600">Семья, идиомы и словообразование</p>
            <p className="mt-2 text-sm">Прогресс {familyProgress}%</p>
            <div className="mt-2 h-1.5 max-w-xs rounded-full bg-stone-900/10"><div className="h-full rounded-full bg-[#C4622D]" style={{ width: `${familyProgress}%` }} /></div>
          </div>
          <Link href="/unit/family" onClick={() => selectUnit("unit1")} className="mt-4 inline-flex min-h-12 items-center rounded-full bg-[#C4622D] px-6 text-white sm:mt-0">Открыть</Link>
        </li>
        <li className="glass rounded-3xl border-l-4 p-5 sm:flex sm:items-center sm:justify-between" style={{ borderLeftColor: "#3E6B4F" }}>
          <div>
            <div className="text-xs tracking-[0.18em] text-stone-500">UNIT 2</div>
            <h2 className="text-3xl">ENVIRONMENTAL ISSUES</h2>
            <p className="text-sm text-stone-600">Природа, погода и экологические проблемы</p>
            <p className="mt-2 text-sm">Прогресс {envProgress}%</p>
            <div className="mt-2 h-1.5 max-w-xs rounded-full bg-stone-900/10"><div className="h-full rounded-full bg-[#3E6B4F]" style={{ width: `${envProgress}%` }} /></div>
          </div>
          <Link href="/unit/environmental" onClick={() => selectUnit("unit2")} className="mt-4 inline-flex min-h-12 items-center rounded-full bg-[#3E6B4F] px-6 text-white sm:mt-0">Открыть</Link>
        </li>
        <li className="glass rounded-3xl border-l-4 p-5 sm:flex sm:items-center sm:justify-between" style={{ borderLeftColor: "#1F4E79" }}>
          <div>
            <div className="text-xs tracking-[0.18em] text-stone-500">UNIT 3</div>
            <h2 className="text-3xl">CHOOSING A CAREER</h2>
            <p className="text-sm text-stone-600">Работа, собеседование и карьера</p>
            <p className="mt-2 text-sm">Прогресс {careerProgress}%</p>
            <div className="mt-2 h-1.5 max-w-xs rounded-full bg-stone-900/10"><div className="h-full rounded-full bg-[#1F4E79]" style={{ width: `${careerProgress}%` }} /></div>
          </div>
          <Link href="/unit/career" onClick={() => selectUnit("unit3")} className="mt-4 inline-flex min-h-12 items-center rounded-full bg-[#1F4E79] px-6 text-white sm:mt-0">Открыть</Link>
        </li>
        <li className="glass rounded-3xl border-l-4 p-5 sm:flex sm:items-center sm:justify-between" style={{ borderLeftColor: "#0F6E6A" }}>
          <div>
            <div className="text-xs tracking-[0.18em] text-stone-500">UNIT 4</div>
            <h2 className="text-3xl">TRAVEL</h2>
            <p className="text-sm text-stone-600">Путешествия и отдых</p>
            <p className="mt-2 text-sm">Прогресс {tourProgress}%</p>
            <div className="mt-2 h-1.5 max-w-xs rounded-full bg-stone-900/10"><div className="h-full rounded-full bg-[#0F6E6A]" style={{ width: `${tourProgress}%` }} /></div>
          </div>
          <Link href="/unit/tourism" onClick={() => selectUnit("unit4")} className="mt-4 inline-flex min-h-12 items-center rounded-full bg-[#0F6E6A] px-6 text-white sm:mt-0">Открыть</Link>
        </li>
        <li className="glass rounded-3xl border-l-4 p-5 sm:flex sm:items-center sm:justify-between" style={{ borderLeftColor: "#8E3A3A" }}>
          <div>
            <div className="text-xs tracking-[0.18em] text-stone-500">UNIT 6</div>
            <h2 className="text-3xl">BELARUS</h2>
            <p className="text-sm text-stone-600">Беларусь: страна, еда и места</p>
            <p className="mt-2 text-sm">Прогресс {belarusProgress}%</p>
            <div className="mt-2 h-1.5 max-w-xs rounded-full bg-stone-900/10"><div className="h-full rounded-full bg-[#8E3A3A]" style={{ width: `${belarusProgress}%` }} /></div>
          </div>
          <Link href="/unit/belarus" onClick={() => selectUnit("unit6")} className="mt-4 inline-flex min-h-12 items-center rounded-full bg-[#8E3A3A] px-6 text-white sm:mt-0">Открыть</Link>
        </li>
      </ol>
    </main>
  );
}
