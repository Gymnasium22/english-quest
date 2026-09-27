# FAMILY English Quest

Интерактивная практика Unit 1 Family. Новые английские слова в задания не добавляются.

## Стек

Next.js 15, React 19, TypeScript, Tailwind CSS 4. Прогресс — `localStorage` (`english-quest-unit1`).

## Установка и запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000

## Production

```bash
npm run build
npm start
```

## Деплой на Vercel

Импортируйте репозиторий. Команда сборки `npm run build`, каталог Next.js по умолчанию. Переменные окружения пока не обязательны.

## Переменные окружения

| Имя | Назначение |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | будущий URL проекта |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | публичный ключ, только anon |

Секретный service role в клиент не кладётся.

## Структура

- `src/data/unit1.ts` — контент Unit 1
- `src/lib/questions.ts` — задания модулей
- `src/lib/progress.ts` — XP, серии, достижения
- `src/lib/supabase.ts` — контракт будущих таблиц
- `src/app` — dashboard, модули, review, quick practice, final, progress, achievements, settings

Маршруты: `/`, `/module/vocabulary`, `/module/idioms`, `/module/collocations`, `/module/prepositions`, `/module/word-building`, `/review`, `/quick-practice`, `/final`, `/progress`, `/achievements`, `/settings`.
