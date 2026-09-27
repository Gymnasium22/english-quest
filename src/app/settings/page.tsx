"use client";

import { useState } from "react";
import { useProgress } from "@/lib/progress";
import { TopBar } from "@/components/Shell";

export default function SettingsPage() {
  const { state, setName, setMotion, reset } = useProgress();
  const [ask, setAsk] = useState(false);
  return (
    <main>
      <TopBar title="Настройки" />
      <form className="glass grid max-w-lg gap-4 rounded-[1.8rem] p-5" onSubmit={(e) => e.preventDefault()}>
        <label className="grid gap-1 text-sm">
          Имя в профиле
          <input className="min-h-12 rounded-2xl border border-stone-300 bg-white px-3" value={state.name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="flex min-h-12 items-center gap-3 text-sm">
          <input type="checkbox" checked={state.reduceMotion} onChange={(e) => setMotion(e.target.checked)} />
          Меньше анимации
        </label>
        <p className="text-sm text-stone-600">Прогресс сохраняется в этом браузере.</p>
        {ask ? (
          <div className="rounded-2xl bg-rose-50 p-3 text-sm">
            Сбросить прогресс Family и Environmental Issues? Имя сохранится.
            <div className="mt-3 flex gap-2">
              <button type="button" className="min-h-11 rounded-full bg-stone-900 px-4 text-white" onClick={() => { reset(); setAsk(false); }}>Сбросить</button>
              <button type="button" className="min-h-11 rounded-full border border-stone-300 px-4" onClick={() => setAsk(false)}>Отмена</button>
            </div>
          </div>
        ) : (
          <button type="button" className="min-h-12 justify-self-start rounded-full border border-stone-300 px-4" onClick={() => setAsk(true)}>Сбросить прогресс</button>
        )}
      </form>
    </main>
  );
}
