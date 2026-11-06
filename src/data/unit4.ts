/** Unit 4 Tourism. Только глоссарий трёх текстов, синонимы relax и идиомы из UNIT4-TOURISM.md. */

export type TourWord = { id: string; english: string; translation: string; example: string };
export type TourPhrase = { id: string; english: string; definition: string; situation: string };

export const TOUR_VOCAB: TourWord[] = [
  { id: "stunning", english: "stunning", translation: "потрясающий", example: "Prague is a stunning city." },
  { id: "thriving", english: "thriving", translation: "процветающий", example: "This thriving capital makes a romantic city-break destination." },
  { id: "vibrant", english: "vibrant", translation: "живой, яркий", example: "Prague makes a romantic and vibrant city-break destination." },
  { id: "cobbled-streets", english: "cobbled streets", translation: "мощёные улицы", example: "A stroll through Prague’s cobbled streets is wonderfully exciting." },
  { id: "remarkably", english: "remarkably", translation: "удивительно, замечательно", example: "Its architecture is remarkably diverse." },
  { id: "diverse", english: "diverse", translation: "разнообразный", example: "Its architecture is remarkably diverse." },
  { id: "undergo", english: "undergo", translation: "подвергаться", example: "Charles Bridge and the Astronomical Clock have recently been undergoing restoration." },
  { id: "restoration", english: "restoration", translation: "реставрация", example: "Charles Bridge has recently been undergoing restoration." },
  { id: "laze-around", english: "laze around", translation: "лениться, ничего не делать", example: "Laze around on the golden, sandy beaches." },
  { id: "soak-up", english: "soak up", translation: "впитывать (атмосферу)", example: "Soak up the atmosphere of traditional fishing villages like Alvor." },
  { id: "go-for-a-wander", english: "go for a wander", translation: "прогуляться без цели", example: "Just go for a wander around Albufeira’s old town." },
  { id: "retain", english: "retain", translation: "сохранять", example: "Albufeira’s old town still retains its wonderful charm." },
  { id: "charm", english: "charm", translation: "очарование", example: "The old town still retains its wonderful charm." },
  { id: "off-the-beaten-track", english: "off the beaten track", translation: "в стороне от проторенных маршрутов", example: "Off the beaten track on the Great Wall of China." },
  { id: "trek", english: "trek", translation: "поход, трек", example: "Our China trek offers a unique experience." },
  { id: "unique", english: "unique", translation: "уникальный", example: "Our China trek offers a unique experience for the adventurous traveller." },
  { id: "get-away-from-it-all", english: "get away from it all", translation: "уехать от всего, отдохнуть от суеты", example: "The traveller who wants to get away from it all." },
  { id: "remote", english: "remote", translation: "отдалённый", example: "Camp in a remote part of rural China." },
  { id: "unspoilt", english: "unspoilt", translation: "нетронутый", example: "Experience local life in its most unspoilt state." },
  { id: "remarkable", english: "remarkable", translation: "замечательный", example: "The old town is remarkable for its charm." },
  { id: "restore", english: "restore", translation: "реставрировать, восстанавливать", example: "They plan to restore Charles Bridge." },
  { id: "wander", english: "wander", translation: "бродить", example: "Go for a wander around the old town." },
  { id: "charming", english: "charming", translation: "очаровательный", example: "The fishing village is charming." },
  { id: "unwind", english: "unwind", translation: "расслабиться", example: "If you need to unwind, try the Algarve in southern Portugal." },
  { id: "take-it-easy", english: "take it easy", translation: "не спешить, отдыхать", example: "On the beach you can take it easy." },
  { id: "chill-out", english: "chill out", translation: "расслабиться", example: "Laze around and chill out on the sand." },
  { id: "recharge-your-batteries", english: "recharge your batteries", translation: "восстановить силы", example: "A week away helps you recharge your batteries." },
];

export const TOUR_IDIOMS: TourPhrase[] = [
  { id: "turn-out", english: "turn out", definition: "оказаться", situation: "It turned out to be a great success." },
  { id: "in-advance", english: "in advance", definition: "заранее", situation: "We booked the hotel in advance." },
  { id: "set-out", english: "set out", definition: "отправиться в путь", situation: "We just set out in the car." },
  { id: "take-your-time", english: "take your time", definition: "не торопиться", situation: "We took our time and stopped off whenever we found somewhere nice." },
  { id: "stop-off", english: "stop off", definition: "заехать по пути", situation: "We stopped off whenever we found somewhere nice." },
  { id: "all-over-the-place", english: "all over the place", definition: "повсюду, по разным местам", situation: "After ten days we’d been all over the place." },
  { id: "get-around", english: "get around", definition: "передвигаться", situation: "Getting around was so easy with few tourists about." },
  { id: "out-of-season", english: "out of season", definition: "не в сезон", situation: "It being out of season, we never had a problem finding a hotel." },
  { id: "get-sth-out-of-sth", english: "get sth out of sth", definition: "извлечь пользу из чего-то", situation: "I got more out of this holiday than one where I just sit on a beach." },
  { id: "get-away-holiday", english: "get away", definition: "уехать в отпуск", situation: "We try to get away in winter and go somewhere warm." },
  { id: "get-away-leave", english: "get away", definition: "уйти с работы или сбежать", situation: "She got away from the office for a long weekend." },
  { id: "go-away", english: "go away", definition: "уехать", situation: "Last year I went away on my own." },
  { id: "make-a-change", english: "make a change", definition: "внести перемену", situation: "I thought it would make a change to go with a group." },
  { id: "rough-it", english: "rough it", definition: "жить по-походному", situation: "I’m not very good at roughing it." },
  { id: "once-or-twice", english: "once or twice", definition: "разок-другой", situation: "I’d ridden once or twice before." },
  { id: "on-horseback", english: "on horseback", definition: "верхом", situation: "I’d never spent a week on horseback." },
  { id: "as-it-happened", english: "as it happened", definition: "как оказалось", situation: "As it happened, the camping was very enjoyable." },
  { id: "do-your-bit", english: "do your bit", definition: "внести свою лепту", situation: "Everyone did their bit with the camping and the cooking." },
  { id: "in-the-open-air", english: "in the open air", definition: "на свежем воздухе", situation: "It’s lovely being out in the open air." },
];

export const TOUR_MODULES = [
  { id: "vocabulary" as const, title: "Vocabulary", kicker: "Три текста и синонимы relax", href: "/tour/module/vocabulary", tone: "orange", accent: "#0F6E6A", wash: "#E3F3F1", countLabel: `${TOUR_VOCAB.length} единиц` },
  { id: "idioms" as const, title: "Idioms", kicker: "Отпуск и дорога", href: "/tour/module/idioms", tone: "blue", accent: "#1F4E79", wash: "#E4EAF3", countLabel: `${TOUR_IDIOMS.length} выражений` },
];
