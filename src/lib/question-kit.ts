/**
 * Общие утилиты сборки заданий. До этого модуля одинаковые реализации лежали
 * в questions.ts, questions-env.ts и questions-career.ts и расходились при правках.
 */

/** Детерминированная перестановка: одинаковый seed даёт одинаковый порядок. */
export function shuffle<T>(list: T[], seed: number): T[] {
  const arr = [...list];
  let s = seed || 1;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Верный вариант плюс n − 1 дистрактор из пула, всё в детерминированном порядке. */
export function optionsFor(correct: string, pool: string[], n = 4, seed = 3): string[] {
  const rest = pool.filter((x) => x !== correct);
  return shuffle([correct, ...shuffle(rest, seed).slice(0, n - 1)], seed + 9);
}

/** Режет список на группы по size; хвост остаётся отдельной группой. */
export function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/** Группы по 3–4 элемента: хвост меньше трёх приклеивается к предыдущей группе. */
export function chunk34<T>(arr: T[]): T[][] {
  const out: T[][] = [];
  let i = 0;
  while (i < arr.length) {
    const left = arr.length - i;
    const size = left > 4 ? 3 : left;
    out.push(arr.slice(i, i + size));
    i += size;
  }
  if (out.length >= 2 && out[out.length - 1].length < 3) {
    const tail = out.pop()!;
    out[out.length - 1] = [...out[out.length - 1], ...tail];
  }
  return out.filter((g) => g.length >= 3);
}

export type BlankExample = { before: string; after: string };

/**
 * Ищет форму выражения в примере и возвращает текст до и после пропуска.
 *
 * `skipPlaceholders` отбрасывает формы с пометками sb/sth: так работает Unit 1,
 * где в пропуск идёт только самостоятельное слово. Unit 2 и Unit 3 этот фильтр
 * не применяют.
 */
export function blankExample(example: string, surface: string, options: { skipPlaceholders?: boolean } = {}): BlankExample | null {
  const parts = surface.split("/").map((s) => s.trim());
  const forms = options.skipPlaceholders
    ? parts.filter((s) => s && !s.includes("sb") && !s.includes("sth") && s.length > 2)
    : parts.filter((s) => s.length > 2);
  const ordered = [...forms].sort((a, b) => b.length - a.length);
  const lower = example.toLowerCase();
  for (const form of ordered) {
    const idx = lower.indexOf(form.toLowerCase());
    if (idx >= 0) {
      return { before: example.slice(0, idx), after: example.slice(idx + form.length) };
    }
  }
  return null;
}
