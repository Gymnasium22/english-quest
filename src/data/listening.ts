import type { Question } from "@/lib/questions";
import { FATHER_TEXT, SISTERS_TEXT } from "@/data/unit1";
import { FORECAST_TEXT } from "@/data/unit2";

type UnitId = "unit1" | "unit2" | "unit3";

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
