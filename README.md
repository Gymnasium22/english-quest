# English Quest

Интерактивная практика английской лексики: три независимых курса — Unit 1 Family, Unit 2 Environmental Issues, Unit 3 Choosing a Career. Новые слова в задания не добавляются: весь контент соответствует исходным учебным материалам.

## Стек

Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS 4. Прогресс хранится в браузере (`localStorage`) — сервер и база данных не нужны.

## Установка и запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000

## Скрипты

| Скрипт | Что делает |
| --- | --- |
| `npm run dev` | Дев-сервер на http://localhost:3000 |
| `npm run build` | Production-сборка |
| `npm start` | Запуск собранного приложения |
| `npm run lint` | ESLint (flat config: `next/core-web-vitals` + `next/typescript`) |
| `npm run typecheck` | Проверка типов без эмита (`tsc --noEmit`) |

## Юниты

| Юнит | Тема | Модули |
| --- | --- | --- |
| Unit 1 | Family | Vocabulary — 33 значения · Idioms & Phrasal Verbs — 22 выражения · Collocations — 12 выражений · Prepositional Phrases — 30 фраз · Word Building — 25 пар |
| Unit 2 | Environmental Issues | Vocabulary — 47 единиц · Idioms & Phrasal Verbs — 22 выражения · Collocations — 38 сочетаний · Prepositional Phrases — 14 фраз · Word Building — 45 семей |
| Unit 3 | Choosing a Career | Vocabulary — 60 единиц · Idioms & Phrasal Verbs — 20 выражений · Collocations — 12 сочетаний · Prepositional Phrases — 6 фраз · Word Building — 11 пар |

Идентификаторы модулей одинаковы во всех юнитах: `vocabulary`, `idioms`, `collocations`, `prepositions`, `word-building`.

## Маршруты

Общие страницы работают с **выбранным юнитом** (переключатель юнита в шапке):

- `/` — дашборд, выбор юнита
- `/glossary` — словарь юнита; перевод открывается после первого верного ответа
- `/review` — слова, в которых были ошибки
- `/quick-practice` — 5 случайных вопросов
- `/progress` — прогресс по модулям
- `/achievements` — достижения
- `/settings` — имя ученика, уменьшение анимаций

Страницы юнитов и модулей (у каждого юнита свой префикс):

| Юнит | Хаб | Модуль | Задание | Финал |
| --- | --- | --- | --- | --- |
| Unit 1 | `/unit/family` | `/module/<slug>` | `/module/<slug>/<activity>` | `/final` |
| Unit 2 | `/unit/environmental` | `/env/module/<slug>` | `/env/module/<slug>/<activity>` | `/env/final` |
| Unit 3 | `/unit/career` | `/career/module/<slug>` | `/career/module/<slug>/<activity>` | `/career/final` |

## Механики заданий

MATCH (соединить пару), CHOOSE (выбрать вариант), FILL THE GAP (вставить слово), FLASHCARDS («знаю / нужно повторить»), WORD BUILDING (глагол → существительное, в том числе ввод текстом), WORD ORDER (собрать фразу), SORT (разложить по группам предлогов), STORY (вставить выражение во фрагмент истории). Аудио и озвучки нет — только чтение и выбор.

## Структура

- `src/data/unit1.ts`, `unit2.ts`, `unit3.ts` — контент юнитов
- `src/lib/questions.ts`, `questions-env.ts`, `questions-career.ts` — сборка заданий и вариантов ответа
- `src/lib/progress.ts` — XP, комбо, серии, достижения, статистика по словам (`localStorage`)
- `src/components/Player.tsx` — движок прохождения заданий
- `src/components/Shell.tsx` — шапка, переключатель юнита, нижняя навигация
- `src/lib/supabase.ts` — контракт будущих таблиц, клиент не подключён
- `src/app/**` — страницы (App Router)

## Прогресс

Состояние каждого юнита хранится отдельно: ключи `english-quest-unit1`, `english-quest-unit2`, `english-quest-unit3`; выбранный юнит — `english-quest-current-unit`. Считаются XP, комбо, лучшая серия, серия дней, статистика по каждому слову (верно/ошибки/нужно повторить) и достижения — всего 19: 7 в Unit 1, по 6 в Unit 2 и Unit 3. Страница `/achievements` показывает наборы всех трёх юнитов сразу.

## Переменные окружения

Пока не используются. Задел на синхронизацию прогресса через Supabase:

| Имя | Назначение |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL проекта |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | публичный anon-ключ |

Секретный service role в клиент не кладётся.

## Деплой на Vercel

Импортируйте репозиторий. Команда сборки `npm run build`, каталог Next.js по умолчанию. Переменные окружения пока не обязательны.

## Что не входит в репозиторий

Исходные учебные материалы и рабочие ТЗ лежат в корне проекта, но исключены через `.gitignore`: `unit 1 FAMILY.docx`, `UNIT*.md`, `Промпт*.txt`, `PROMPT-*.md`, а также `screen/`.
