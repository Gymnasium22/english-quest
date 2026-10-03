/**
 * Набор модулей одинаков во всех юнитах: различаются только заголовки, цвета
 * и ссылки. Раньше тип выводился из MODULES юнита 1, поэтому в других местах
 * приходилось писать `m.id as "vocabulary"`.
 */
export const MODULE_IDS = ["vocabulary", "idioms", "collocations", "prepositions", "word-building"] as const;

export type ModuleId = (typeof MODULE_IDS)[number];
