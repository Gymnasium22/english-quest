import type { Question } from "@/lib/questions";
import { FATHER_TEXT, SISTERS_TEXT } from "@/data/unit1";
import { FORECAST_TEXT } from "@/data/unit2";
import { BELARUS_COUNTRY_TEXT, BELARUS_PLACES_TEXT } from "@/data/unit6";

type UnitId = "unit1" | "unit2" | "unit3" | "unit4" | "unit6";

export type ListeningTrack = {
  id: string;
  unit: UnitId;
  file: string;
  title: string;
  transcript: string;
  questions: Question[];
};

function q(id: string, prompt: string, options: string[], answer: string): Question {
  return { kind: "choice", id, itemId: id, prompt, options, answer, reveal: answer };
}

export const LISTENING: ListeningTrack[] = [
  {
    id: "01-family-father",
    unit: "unit1",
    file: "/listening/01-family-father.mp3",
    title: "Father and son",
    transcript: FATHER_TEXT,
    questions: [
      q("listen-01-a", "Кого он напоминает?", ["father", "mother", "brother"], "father"),
      q("listen-01-b", "Где его вырастили?", ["on a farm", "in a city", "at school"], "on a farm"),
      q("listen-01-c", "Что отец знает досконально?", ["the business", "the weather", "the language"], "the business"),
    ],
  },
  {
    id: "02-family-sisters",
    unit: "unit1",
    file: "/listening/02-family-sisters.mp3",
    title: "Sisters",
    transcript: SISTERS_TEXT,
    questions: [
      q("listen-02-a", "Кто родился?", ["twins", "a son", "a cousin"], "twins"),
      q("listen-02-b", "Что она прятала?", ["her favourite doll", "a letter", "the keys"], "her favourite doll"),
      q("listen-02-c", "Что они делали вечером?", ["stayed out late", "stayed in", "went to bed early"], "stayed out late"),
    ],
  },
  {
    id: "03-family-opposites",
    unit: "unit1",
    file: "/listening/03-family-opposites.mp3",
    title: "Opposites",
    transcript: "The doctor's off duty right now, but he'll be back on duty at six. The phones were in working order yesterday, but already two are out of order. The crowd was getting out of control, but the police now have the situation under control.",
    questions: [
      q("listen-03-a", "Когда врач снова на смене?", ["at six", "at noon", "tomorrow"], "at six"),
      q("listen-03-b", "Что вчера работало?", ["the phones", "the car", "the radio"], "the phones"),
      q("listen-03-c", "Кто держит ситуацию?", ["the police", "the doctor", "the boys"], "the police"),
    ],
  },
  {
    id: "04-family-arrange",
    unit: "unit1",
    file: "/listening/04-family-arrange.mp3",
    title: "Arrange",
    transcript: "In the end, I decided that the books had been taken by mistake, although the only people who know for certain are the two boys themselves. She said they needed confirmation in writing, but promised to acknowledge it by return of post. I couldn't get to the shed very easily because the tree was in the way, and it looked out of place.",
    questions: [
      q("listen-04-a", "Как забрали книги?", ["by mistake", "on purpose", "by return"], "by mistake"),
      q("listen-04-b", "Что нужно было письменно?", ["confirmation", "a map", "a ticket"], "confirmation"),
      q("listen-04-c", "Что мешало пройти?", ["the tree", "the shed", "the solicitor"], "the tree"),
    ],
  },
  {
    id: "05-env-cold",
    unit: "unit2",
    file: "/listening/05-env-cold.mp3",
    title: "Cold weather",
    transcript: "Daytime temperatures are often quite mild, even in winter, but it can get freezing at night. In winter there are icy roads, and frost on the ground. In the north the ice doesn't melt until May or June.",
    questions: [
      q("listen-05-a", "Какая температура днём?", ["mild", "boiling", "freezing"], "mild"),
      q("listen-05-b", "Что на дорогах зимой?", ["icy roads", "floods", "a breeze"], "icy roads"),
      q("listen-05-c", "Когда тает лёд на севере?", ["May or June", "April", "August"], "May or June"),
    ],
  },
  {
    id: "06-env-hot",
    unit: "unit2",
    file: "/listening/06-env-hot.mp3",
    title: "Hot weather",
    transcript: "In a tropical climate it can be boiling hot, and heatwaves may be common.",
    questions: [
      q("listen-06-a", "Какой климат в первом предложении?", ["tropical", "arctic", "mild"], "tropical"),
      q("listen-06-b", "Какие бывают дни?", ["boiling hot", "freezing", "misty"], "boiling hot"),
      q("listen-06-c", "Что может быть частым?", ["heatwaves", "frost", "gales"], "heatwaves"),
    ],
  },
  {
    id: "07-env-wind",
    unit: "unit2",
    file: "/listening/07-env-wind.mp3",
    title: "Wind",
    transcript: "There was a very strong wind and my umbrella blew away. There was a gale that day, so we didn’t go sailing. People stayed indoors because there was a hurricane on the way.",
    questions: [
      q("listen-07-a", "Что унесло?", ["umbrella", "hat", "boat"], "umbrella"),
      q("listen-07-b", "Почему не пошли под парусом?", ["there was a gale", "it was hot", "the boat was new"], "there was a gale"),
      q("listen-07-c", "Почему сидели дома?", ["a hurricane was on the way", "it was night", "the beach was closed"], "a hurricane was on the way"),
    ],
  },
  {
    id: "08-env-forecast",
    unit: "unit2",
    file: "/listening/08-env-forecast.mp3",
    title: "Forecast",
    transcript: FORECAST_TEXT,
    questions: [
      q("listen-08-a", "Чем день начнётся?", ["sunshine", "snow", "a gale"], "sunshine"),
      q("listen-08-b", "Где дождь может прекратиться?", ["in the south", "in the north", "at sea"], "in the south"),
      q("listen-08-c", "Какой день может быть третьим дождливым?", ["Friday", "Monday", "Sunday"], "Friday"),
    ],
  },
  {
    id: "09-career-positive",
    unit: "unit3",
    file: "/listening/09-career-positive.mp3",
    title: "Positive experience",
    transcript: "I don't know how I got through the first weeks. Old Wilson used to give me a really hard time. I had to work all hours, and I got behind with everything. I wasn't sure I was up to the job. Tom stood by me. I have him to thank — he is fully qualified. They paid us next to nothing.",
    questions: [
      q("listen-09-a", "Кто усложнял работу?", ["old Wilson", "Alan", "Tom"], "old Wilson"),
      q("listen-09-b", "За что Том благодарен?", ["he is fully qualified", "he got the sack", "he left early"], "he is fully qualified"),
      q("listen-09-c", "Сколько почти платили?", ["next to nothing", "a bonus", "double"], "next to nothing"),
    ],
  },
  {
    id: "10-career-negative",
    unit: "unit3",
    file: "/listening/10-career-negative.mp3",
    title: "Negative experience",
    transcript: "They took him on at a firm selling farm machinery. It was a nine-to-five job, and they kept checking up on him. He wanted to hand in his notice. To make matters worse, they gave him the sack.",
    questions: [
      q("listen-10-a", "Куда его взяли?", ["a firm selling farm machinery", "a bank", "a school"], "a firm selling farm machinery"),
      q("listen-10-b", "Что он хотел подать?", ["his notice", "a reference", "a bill"], "his notice"),
      q("listen-10-c", "Что сделали раньше?", ["gave him the sack", "promoted him", "trained him"], "gave him the sack"),
    ],
  },
  {
    id: "11-career-freelance",
    unit: "unit3",
    file: "/listening/11-career-freelance.mp3",
    title: "Freelance",
    transcript: "There is no guaranteed income. The work can encroach upon home life and free time. You are not accountable to anyone but yourself.",
    questions: [
      q("listen-11-a", "Чего нет гарантированного?", ["income", "time", "skill"], "income"),
      q("listen-11-b", "Во что работа может вторгаться?", ["home life and free time", "the office", "the pension"], "home life and free time"),
      q("listen-11-c", "Перед кем он не отчитывается?", ["anyone but yourself", "his manager", "the team"], "anyone but yourself"),
    ],
  },
  {
    id: "12-career-team",
    unit: "unit3",
    file: "/listening/12-career-team.mp3",
    title: "Team",
    transcript: "A common goal helps team spirit. If someone doesn't fit in, it can be disruptive. A team can stifle individual enterprise and initiative.",
    questions: [
      q("listen-12-a", "Что помогает командному духу?", ["a common goal", "a bonus", "a vacancy"], "a common goal"),
      q("listen-12-b", "Если человек не вписывается, это может быть…", ["disruptive", "lucrative", "valid"], "disruptive"),
      q("listen-12-c", "Что команда может подавить?", ["individual enterprise and initiative", "holiday", "salary"], "individual enterprise and initiative"),
    ],
  },
  {
    id: "tour-listen-algarve",
    unit: "unit4",
    file: "/listening/tour-listen-algarve.mp3",
    title: "Unwind on the Algarve",
    transcript: "Unwind on the Algarve. If you need to unwind, try the Algarve in southern Portugal. Laze around on the golden, sandy beaches, soak up the atmosphere of traditional fishing villages like Alvor, or just go for a wander around Albufeira’s old town, which still retains its wonderful charm.",
    questions: [
      q("listen-algarve-a", "Куда ехать, если нужно unwind?", ["the Algarve", "Prague", "rural China"], "the Algarve"),
      q("listen-algarve-b", "Какая деревня названа?", ["Alvor", "Albufeira only", "Minsk"], "Alvor"),
      q("listen-algarve-c", "Что сохранил старый город?", ["its wonderful charm", "a castle", "a hotel"], "its wonderful charm"),
    ],
  },
  {
    id: "tour-listen-china",
    unit: "unit4",
    file: "/listening/tour-listen-china.mp3",
    title: "Off the beaten track",
    transcript: "Off the beaten track on the Great Wall of China. Our China trek offers a unique experience for the adventurous traveller who wants to get away from it all. Apart from the spectacular scenery, you will have the rare opportunity to camp in a remote part of rural China and experience local life in its most unspoilt state.",
    questions: [
      q("listen-china-a", "Где трек?", ["the Great Wall of China", "the Algarve", "Prague"], "the Great Wall of China"),
      q("listen-china-b", "Чего хочет путешественник?", ["get away from it all", "sit on a beach", "book a city break"], "get away from it all"),
      q("listen-china-c", "Где можно остановиться лагерем?", ["a remote part of rural China", "a fishing village", "a hotel in town"], "a remote part of rural China"),
    ],
  },
  {
    id: "tour-listen-prague",
    unit: "unit4",
    file: "/listening/tour-listen-prague.mp3",
    title: "City breaks in Prague",
    transcript: "City breaks in Prague. Prague is a stunning city, and this thriving capital of the Czech Republic makes a romantic and vibrant city-break destination. A stroll through Prague’s cobbled streets is wonderfully exciting: its architecture is remarkably diverse, and amazingly untouched by the Second World War, although Charles Bridge and the Astronomical Clock have recently been undergoing restoration.",
    questions: [
      q("listen-prague-a", "Какой это город?", ["Prague", "Albufeira", "Minsk"], "Prague"),
      q("listen-prague-b", "Какие улицы?", ["cobbled streets", "motorways", "beaches"], "cobbled streets"),
      q("listen-prague-c", "Что недавно реставрируют?", ["Charles Bridge and the Astronomical Clock", "the Great Wall", "a fishing village"], "Charles Bridge and the Astronomical Clock"),
    ],
  },
  {
    id: "tour-listen-britain",
    unit: "unit4",
    file: "/listening/tour-listen-britain.mp3",
    title: "A winter in England",
    transcript: "Joe Smith: We try to get away in winter and go somewhere warm, but this year we decided to stay in England, and it turned out to be a great success. We booked the hotel in advance — we just set out in the car, took our time, and stopped off whenever we found somewhere nice. After ten days we’d been all over the place. Getting around was so easy with few tourists about, and, it being out of season, we never had a problem finding a hotel. In fact, I got more out of this holiday than one where I just sit on a beach.",
    questions: [
      q("listen-britain-a", "Где они остались в этом году?", ["England", "Portugal", "France"], "England"),
      q("listen-britain-b", "Когда забронировали отель?", ["in advance", "on the last day", "out of season only"], "in advance"),
      q("listen-britain-c", "Почему легко было найти отель?", ["it was out of season", "the beach was full", "they went on horseback"], "it was out of season"),
    ],
  },
  {
    id: "tour-listen-riding",
    unit: "unit4",
    file: "/listening/tour-listen-riding.mp3",
    title: "Camping and riding",
    transcript: "Last year I went away on my own, so this year I thought it would make a change to go with a group. I chose a camping and riding holiday in France with four other people. I’m not very good at roughing it, and although I’d ridden once or twice before, I’d never spent a week on horseback. But I thought, why not? As it happened, the camping was very enjoyable. Everyone did their bit with the camping and the cooking, and riding’s a great way to see the countryside. You get off the beaten track so easily, and it’s lovely being out in the open air. It did me good, and I’d certainly go again.",
    questions: [
      q("listen-riding-a", "С кем поехали в этом году?", ["with a group", "alone", "with Joe Smith"], "with a group"),
      q("listen-riding-b", "Где был отдых?", ["France", "England", "China"], "France"),
      q("listen-riding-c", "Что делал каждый?", ["did their bit with the camping and the cooking", "booked a hotel", "stayed in the city"], "did their bit with the camping and the cooking"),
    ],
  },
  {
    id: "by-listen-country",
    unit: "unit6",
    file: "/listening/by-listen-country.mp3",
    title: "Belarus",
    transcript: BELARUS_COUNTRY_TEXT,
    questions: [
      q("listen-by-a", "Какая столица?", ["Minsk", "Grodno", "Brest"], "Minsk"),
      q("listen-by-b", "С кем есть граница?", ["Russia, Ukraine, Poland, Lithuania and Latvia", "only Russia", "only Poland"], "Russia, Ukraine, Poland, Lithuania and Latvia"),
      q("listen-by-c", "Какое самое большое озеро?", ["Naroch", "the Braslav lakes", "a river"], "Naroch"),
      q("listen-by-d", "Сколько областей?", ["six", "five", "seven"], "six"),
      q("listen-by-e", "Какие официальные языки?", ["Belarusian and Russian", "only Russian", "only Belarusian"], "Belarusian and Russian"),
    ],
  },
  {
    id: "by-listen-places",
    unit: "unit6",
    file: "/listening/by-listen-places.mp3",
    title: "Places to see",
    transcript: BELARUS_PLACES_TEXT,
    questions: [
      q("listen-by-f", "Что посмотреть у Браслава?", ["the lakes", "a memorial", "a castle only"], "the lakes"),
      q("listen-by-g", "Где попробовать еду?", ["Dudutki", "Khatyn", "the border"], "Dudutki"),
      q("listen-by-h", "Где прокатиться по старым улицам?", ["Grodno", "Naroch", "the plains"], "Grodno"),
    ],
  },
];

export function listeningForUnit(unit: UnitId): ListeningTrack[] {
  return LISTENING.filter((t) => t.unit === unit);
}

export function findListening(id: string): ListeningTrack | undefined {
  return LISTENING.find((t) => t.id === id);
}

export function listeningItemLabel(id: string): string | undefined {
  for (const t of LISTENING) {
    const q = t.questions.find((x) => ("itemId" in x && x.itemId === id) || x.id === id);
    if (q && "prompt" in q) return q.prompt;
  }
  return undefined;
}

export function listeningReview(unit: UnitId, itemIds: string[]): Question[] {
  const set = new Set(itemIds);
  return listeningForUnit(unit).flatMap((t) => t.questions).filter((q) => {
    const ids = "itemId" in q ? [q.itemId] : [];
    return ids.some((id) => set.has(id));
  });
}
