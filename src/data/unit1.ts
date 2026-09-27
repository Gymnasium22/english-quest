export type Sense = {
  id: string;
  english: string;
  translation: string;
  example: string;
  note?: string;
};

export type Gloss = {
  id: string;
  english: string;
  definition: string;
  section: string;
};

export type Collocation = {
  id: string;
  english: string;
  translation: string;
  example: string;
  tokens: string[];
};

export type Phrase = {
  id: string;
  english: string;
  definition: string;
  example: string;
  opposite?: string;
  preposition: string;
};

export type Family = {
  id: string;
  verb: string;
  noun: string;
  verbExample: string;
  nounExample: string;
};

export const VOCAB: Sense[] = [
  { id: "abandoned", english: "abandoned", translation: "покинутый, заброшенный", example: "The abandoned child was found safe and sound." },
  { id: "adolescent", english: "adolescent", translation: "подросток", example: "Many adolescents find it hard to talk to their parents." },
  { id: "adopt", english: "adopt", translation: "усыновить, удочерить", example: "They decided to adopt a child from an orphanage." },
  { id: "adult", english: "adult", translation: "взрослый", example: "Some adults enjoy playing games just as much as children do." },
  { id: "ancestors", english: "ancestors", translation: "предки", example: "Our ancestors lived in this village many years ago." },
  { id: "background", english: "background", translation: "происхождение, прошлое (семья, образование, работа)", example: "Many people are proud of their family background." },
  { id: "belief", english: "belief", translation: "вера, убеждение", example: "They share a strong belief in family traditions." },
  { id: "breadwinner", english: "breadwinner", translation: "кормилец семьи", example: "After his father lost his job, Sam became the breadwinner." },
  { id: "breakdown", english: "breakdown", translation: "распад, разрыв (например, семьи)", example: "The breakdown of their marriage was hard on the whole family." },
  { id: "close-knit", english: "close-knit / tight-knit", translation: "сплочённый, дружный (о семье)", example: "They are a close-knit family and support each other." },
  { id: "couple", english: "couple", translation: "пара", example: "The couple has been married for ten years." },
  { id: "custom", english: "custom", translation: "обычай", example: "In my country, it's a custom to gather with family every Sunday." },
  { id: "daughter-in-law", english: "daughter-in-law", translation: "невестка", example: "My daughter-in-law is very kind and helpful." },
  { id: "father-in-law", english: "father-in-law", translation: "свёкор, тесть", example: "Nick's father-in-law taught him how to fix his car." },
  { id: "divorce", english: "divorce", translation: "развод", example: "The Bensons went through a difficult divorce last year." },
  { id: "family-bonds", english: "family bonds / family ties", translation: "семейные узы", example: "Strong family bonds help people get through tough times." },
  { id: "generation-gap", english: "generation gap", translation: "разрыв между поколениями", example: "The generation gap may lead to misunderstandings as the elderly and teenagers often see things differently." },
  { id: "grown-up", english: "grown-up", translation: "взрослый человек", example: "As a grown-up, you have to make your own decisions." },
  { id: "household", english: "household", translation: "домашнее хозяйство, семья", example: "Each household has different rules about chores." },
  { id: "husband", english: "husband", translation: "муж", example: "Miriam's husband works abroad but they call each other every day." },
  { id: "mature", english: "mature", translation: "зрелый, взрослый (по поведению)", example: "Greg is mature for his age and always thinks before he acts." },
  { id: "middle-aged", english: "middle-aged", translation: "средних лет", example: "The gym offers special classes for middle-aged people." },
  { id: "nursing-home", english: "nursing home", translation: "дом престарелых", example: "Some elderly people live in a nursing home because they need special care." },
  { id: "orphanage", english: "orphanage", translation: "детский дом, приют для сирот", example: "The twins grew up in an orphanage before finding a family." },
  { id: "sibling", english: "sibling", translation: "брат или сестра", example: "Many siblings have a love-hate relationship." },
  { id: "the-elderly", english: "the elderly", translation: "пожилые люди", example: "The elderly in our community often gather in the nearby park." },
  { id: "twin", english: "twin", translation: "близнец", example: "My twin and I look very similar but have different hobbies." },
  { id: "under-aged", english: "under-aged", translation: "несовершеннолетний", example: "The club doesn't allow under-aged visitors." },
  { id: "upset-adj", english: "upset", translation: "расстроенный", example: "She felt very upset after hearing the news about her cousin.", note: "adjective" },
  { id: "upset-verb", english: "upset", translation: "расстраивать", example: "The news of my parents' divorce upset me deeply.", note: "verb" },
  { id: "value-verb", english: "value", translation: "ценить", example: "In our family, we really value honesty and support.", note: "verb" },
  { id: "value-noun", english: "value", translation: "ценность, значимость", example: "This gift has sentimental value because it reminds me of my granny.", note: "noun" },
  { id: "wedding", english: "wedding", translation: "свадьба", example: "We're leaving for our honeymoon right after the wedding." },
];

export const FATHER_TEXT =
  "I take after my father. We're both tall - that runs in the family - and we both have a passion for the outdoor life. I was brought up on a farm and always looked up to my father; so it was no surprise when I followed in his footsteps and joined him on the family farm. Basically farming is in my blood, and it's been our way of life for five generations. Working with Dad is great. He knows the business inside out, and enjoys showing me the ropes. And from his point of view, he likes to have someone younger with new ideas - even if they aren't that good!";

export const SISTERS_TEXT =
  "When my mother gave birth to twins, I don't suppose she knew what she was letting herself in for. Although I'm nothing like Elle, we were equally horrible. If she pulled my hair, I got my own back by hiding her favourite doll; she always burst into tears when I did that. And then we grew into even more difficult teenagers. We stayed out late, and were always getting into trouble at school for smoking, wearing make-up, or just being lazy. Our poor mother tried to turn a blind eye to some of our behaviour, but it wasn't easy. Then, by some miracle, we grew up. We're both quite nice now!";

export const FATHER: Gloss[] = [
  { id: "take-after", english: "take after sb", definition: "look or behave like an older member of your family.", section: "A Father and son" },
  { id: "run-in-the-family", english: "run in the family", definition: "be found very often in a family.", section: "A Father and son" },
  { id: "bring-up", english: "bring sb up", definition: "care for and teach a child until they are an adult (also bring so up to do sth).", section: "A Father and son" },
  { id: "look-up-to", english: "look up to sb", definition: "respect and admire sb.", section: "A Father and son" },
  { id: "footsteps", english: "follow in sb's footsteps", definition: "do the same job or activity as sb else who did it before you.", section: "A Father and son" },
  { id: "in-your-blood", english: "in your blood", definition: "If sth is in your blood, it is a strong part of your character.", section: "A Father and son" },
  { id: "way-of-life", english: "a way of life / sb's way of life", definition: "the behaviour and customs that are typical of a person or a group.", section: "A Father and son" },
  { id: "inside-out", english: "know sth inside out", definition: "have a lot of knowledge of sth (also know what you are talking about).", section: "A Father and son" },
  { id: "show-the-ropes", english: "show sb the ropes", definition: "INF show sb carefully what to do and how to do it.", section: "A Father and son" },
  { id: "point-of-view", english: "point of view", definition: "a way of looking at a situation; an opinion.", section: "A Father and son" },
];

export const SISTERS: Gloss[] = [
  { id: "give-birth", english: "give birth (to sb)", definition: "produce a baby.", section: "B Sisters" },
  { id: "let-yourself-in", english: "let yourself in for sth", definition: "INF involve yourself in sth that will probably be unpleasant or difficult.", section: "B Sisters" },
  { id: "nothing-like", english: "nothing like sb/sth", definition: "completely different from sb/sth (also not anything like sb/sth).", section: "B Sisters" },
  { id: "own-back", english: "get your own back (on sb)", definition: "INF do sth unpleasant to sb in return for sth unpleasant they did to you.", section: "B Sisters" },
  { id: "burst-into-tears", english: "burst into tears", definition: "suddenly start crying.", section: "B Sisters" },
  { id: "grow-into", english: "grow into sth", definition: "gradually develop into a particular kind of person.", section: "B Sisters" },
  { id: "get-into-trouble", english: "get into trouble (for sth)", definition: "get into a situation in which you may be punished.", section: "B Sisters" },
  { id: "blind-eye", english: "turn a blind eye (to sth)", definition: "pretend not to see or notice sth, usually sth bad (in this case, so that she didn't have to do anything about it).", section: "B Sisters" },
  { id: "grow-up", english: "grow up", definition: "develop into an adult.", section: "B Sisters" },
];

export const SPOTLIGHT_STAY = {
  text: "If you stay out, you continue to be away from your home, especially late at night. If you stay in, you stay at home and don't go out. And if you stay up, you go to bed later than usual.",
  items: [
    { id: "stay-out", english: "stay out", definition: "you continue to be away from your home, especially late at night." },
    { id: "stay-in", english: "stay in", definition: "you stay at home and don't go out." },
    { id: "stay-up", english: "stay up", definition: "you go to bed later than usual." },
  ],
};

export const COLLOCATIONS: Collocation[] = [
  { id: "break-the-news", english: "break the news to sb", translation: "сообщить новость кому-то (часто неприятную)", example: "We don't know how to break the news about the move to our grandparents.", tokens: ["break", "the", "news", "to", "sb"] },
  { id: "get-together-v", english: "get together", translation: "собираться вместе", example: "Let's get together this weekend and have dinner as a family.", tokens: ["get", "together"] },
  { id: "get-together-n", english: "a get-together", translation: "встреча, посиделки", example: "We had a small family get-together for my cousin's birthday.", tokens: ["a", "get-together"] },
  { id: "do-sth-wrong", english: "do sth wrong", translation: "сделать что-то неправильно / плохое", example: "If you do something wrong, it's better to admit it and say sorry.", tokens: ["do", "sth", "wrong"] },
  { id: "raise-children", english: "raise children", translation: "растить, воспитывать детей", example: "In a close-knit household, the whole family helps raise children together.", tokens: ["raise", "children"] },
  { id: "that-is-to-say", english: "that is to say", translation: "то есть, иначе говоря", example: "We'll celebrate at home, that is to say, just close family and friends.", tokens: ["that", "is", "to", "say"] },
  { id: "take-turns", english: "take turns / take it in turns", translation: "делать по очереди", example: "In our house we take turns cooking dinner; tonight it's my turn.", tokens: ["take", "turns"] },
  { id: "tell-the-truth", english: "tell the truth", translation: "говорить правду", example: "Please tell the truth, even if it's hard to do.", tokens: ["tell", "the", "truth"] },
  { id: "tell-a-secret", english: "tell a secret", translation: "рассказать секрет", example: "Never tell a secret that isn't yours.", tokens: ["tell", "a", "secret"] },
  { id: "say-goodbye", english: "say 'goodbye'", translation: "попрощаться", example: "They stayed at the door for ten minutes, unable to say 'goodbye'.", tokens: ["say", "goodbye"] },
  { id: "say-sorry", english: "say 'sorry'", translation: "извиниться", example: "He called his sister to say 'sorry' for shouting.", tokens: ["say", "sorry"] },
  { id: "say-yes", english: "say 'yes'", translation: "сказать «да»", example: "When he proposed, she smiled and said 'yes'.", tokens: ["say", "yes"] },
];

export const PREP_A: Phrase[] = [
  { id: "out-of-tune", english: "out of tune", definition: "singing or playing the wrong musical notes.", example: "Simon said I was out of tune, but I think I was the only one singing in tune.", opposite: "in tune", preposition: "out of" },
  { id: "in-tune", english: "in tune", definition: "OPP out of tune.", example: "Simon said I was out of tune, but I think I was the only one singing in tune.", opposite: "out of tune", preposition: "in" },
  { id: "off-duty", english: "off duty", definition: "(of nurses, police officers, etc.) not working at a particular time.", example: "The doctor's off duty right now, but he'll be back on duty at six.", opposite: "on duty", preposition: "off" },
  { id: "on-duty", english: "on duty", definition: "OPP off duty.", example: "The doctor's off duty right now, but he'll be back on duty at six.", opposite: "off duty", preposition: "on" },
  { id: "by-accident", english: "by accident", definition: "in a way that is not planned or organized.", example: "I don't know if he pushed her by accident, or whether he did it on purpose.", opposite: "on purpose", preposition: "by" },
  { id: "on-purpose", english: "on purpose", definition: "OPP by accident.", example: "I don't know if he pushed her by accident, or whether he did it on purpose.", opposite: "by accident", preposition: "on" },
  { id: "in-theory", english: "in theory", definition: "used to say what should happen or be true (often used when it doesn't happen or isn't true).", example: "In theory the plan sounds great, but I don't think it'll work in practice.", opposite: "in practice", preposition: "in" },
  { id: "in-practice", english: "in practice", definition: "used to say what really happens and what is really true.", example: "In theory the plan sounds great, but I don't think it'll work in practice.", opposite: "in theory", preposition: "in" },
  { id: "in-working-order", english: "in working order", definition: "(of a machine) functioning properly.", example: "The phones were in working order yesterday, but already two are out of order.", opposite: "out of order", preposition: "in" },
  { id: "out-of-order", english: "out of order", definition: "OPP in working order.", example: "The phones were in working order yesterday, but already two are out of order.", opposite: "in working order", preposition: "out of" },
  { id: "out-of-control", english: "out of control", definition: "impossible to manage or control.", example: "The crowd was getting out of control, but the police now have the situation under control.", opposite: "under control", preposition: "out of" },
  { id: "under-control", english: "under control", definition: "OPP out of control.", example: "The crowd was getting out of control, but the police now have the situation under control.", opposite: "out of control", preposition: "under" },
  { id: "in-season", english: "in season", definition: "growing in large amounts and ready to eat now.", example: "Tomatoes are in season now.", opposite: "out of season", preposition: "in" },
  { id: "out-of-season", english: "out of season", definition: "OPP in season.", example: "Tomatoes are in season now.", opposite: "in season", preposition: "out of" },
  { id: "in-luck", english: "in luck", definition: "lucky.", example: "I was in luck - there was one ticket left.", opposite: "out of luck", preposition: "in" },
  { id: "out-of-luck", english: "out of luck", definition: "OPP in luck.", example: "I was in luck - there was one ticket left.", opposite: "in luck", preposition: "out of" },
  { id: "in-sight", english: "in sight", definition: "able to be seen.", example: "The lion was just in sight.", opposite: "out of sight", preposition: "in" },
  { id: "out-of-sight", english: "out of sight", definition: "OPP in sight.", example: "The lion was just in sight.", opposite: "in sight", preposition: "out of" },
];

export const PREP_B: Phrase[] = [
  { id: "on-the-phone", english: "on the phone", definition: "1 by phone (as above). 2 using the phone now.", example: "I spoke to the solicitor on the phone this morning.", preposition: "on" },
  { id: "in-writing", english: "in writing", definition: "in the form of a letter, document, etc.", example: "She said they needed confirmation in writing, but promised to acknowledge it by return of post.", preposition: "in" },
  { id: "by-return", english: "by return (of post)", definition: "in the next available post (usually the next day).", example: "She said they needed confirmation in writing, but promised to acknowledge it by return of post.", preposition: "by" },
  { id: "in-confidence", english: "in confidence", definition: "If you talk to sb in confidence, they agree not to tell anyone else what you have said.", example: "Remember that you can speak to a counsellor in confidence, so if you have anything on your mind, come and see us at once.", preposition: "in" },
  { id: "on-your-mind", english: "on your mind", definition: "If you have sth on your mind, you are thinking and perhaps worrying about it.", example: "Remember that you can speak to a counsellor in confidence, so if you have anything on your mind, come and see us at once.", preposition: "on" },
  { id: "at-once", english: "at once", definition: "immediately. SYN straight away.", example: "Remember that you can speak to a counsellor in confidence, so if you have anything on your mind, come and see us at once.", preposition: "at" },
  { id: "at-length", english: "at length", definition: "for a long time and in detail.", example: "I questioned the two boys at length.", preposition: "at" },
  { id: "in-the-end", english: "in the end", definition: "finally.", example: "In the end, I decided that the books had been taken by mistake, although the only people who know for certain are the two boys themselves.", preposition: "in" },
  { id: "by-mistake", english: "by mistake", definition: "If you do sth by mistake, you do it accidentally.", example: "In the end, I decided that the books had been taken by mistake, although the only people who know for certain are the two boys themselves.", preposition: "by" },
  { id: "for-certain", english: "for certain", definition: "without doubt. SYN for sure.", example: "In the end, I decided that the books had been taken by mistake, although the only people who know for certain are the two boys themselves.", preposition: "for" },
  { id: "in-the-way", english: "in the/sb's way", definition: "stopping sb from moving or doing sth.", example: "I couldn't get to the shed very easily because the tree was in the way, and it looked out of place.", preposition: "in" },
  { id: "out-of-place", english: "out of place", definition: "not suitable for the place or situation sth is in.", example: "I couldn't get to the shed very easily because the tree was in the way, and it looked out of place.", preposition: "out of" },
];

export const WORD_FAMILIES: Family[] = [
  { id: "avoid", verb: "avoid", noun: "avoidance", verbExample: "You should avoid junk food if you want to stay healthy.", nounExample: "His avoidance of the problem made things worse." },
  { id: "approve", verb: "approve", noun: "approval", verbExample: "The committee will approve the budget tomorrow.", nounExample: "The project cannot start without the manager's approval." },
  { id: "breathe", verb: "breathe", noun: "breathing", verbExample: "It is hard to breathe in such polluted air.", nounExample: "Deep breathing helps reduce stress." },
  { id: "celebrate", verb: "celebrate", noun: "celebration", verbExample: "We always celebrate New Year with our family.", nounExample: "The celebration lasted until midnight." },
  { id: "communicate", verb: "communicate", noun: "communication", verbExample: "You need to communicate with your team regularly.", nounExample: "Good communication is the key to success." },
  { id: "consider", verb: "consider", noun: "consideration", verbExample: "Please consider my offer before you say no.", nounExample: "The plan is still under consideration." },
  { id: "contain", verb: "contain", noun: "container", verbExample: "This box contains old photographs.", nounExample: "Please put the food in a plastic container." },
  { id: "criticize", verb: "criticize", noun: "criticism", verbExample: "Don't criticize people behind their backs.", nounExample: "He received a lot of criticism for his decision." },
  { id: "decorate", verb: "decorate", noun: "decoration", verbExample: "We decorate the Christmas tree every year.", nounExample: "The decorations on the wall look beautiful." },
  { id: "disapprove", verb: "disapprove", noun: "disapproval", verbExample: "My parents disapprove of my new job.", nounExample: "She looked at him with disapproval." },
  { id: "divide", verb: "divide", noun: "division", verbExample: "Please divide the cake into eight pieces.", nounExample: "The division of labour made the work faster." },
  { id: "evaluate", verb: "evaluate", noun: "evaluation", verbExample: "The teacher will evaluate our essays next week.", nounExample: "The evaluation of the project took three days." },
  { id: "exhibit", verb: "exhibit", noun: "exhibition", verbExample: "The museum will exhibit ancient coins.", nounExample: "We visited an art exhibition last Sunday." },
  { id: "govern", verb: "govern", noun: "government / governor", verbExample: "The president governs the country with his team.", nounExample: "The government passed a new law." },
  { id: "interrupt", verb: "interrupt", noun: "interruption", verbExample: "Please don't interrupt me while I am speaking.", nounExample: "We worked all morning without any interruptions." },
  { id: "investigate", verb: "investigate", noun: "investigation", verbExample: "The police will investigate the robbery.", nounExample: "The investigation into the accident is still ongoing." },
  { id: "involve", verb: "involve", noun: "involvement", verbExample: "This project will involve a lot of teamwork.", nounExample: "His involvement in the scandal was obvious." },
  { id: "kill", verb: "kill", noun: "killing", verbExample: "The farmer had to kill the sick chicken.", nounExample: "The killing of rare animals is illegal." },
  { id: "propose", verb: "propose", noun: "proposal", verbExample: "She proposed a new plan at the meeting.", nounExample: "His proposal was accepted by everyone." },
  { id: "recognize", verb: "recognize", noun: "recognition", verbExample: "I didn't recognize you with your new haircut.", nounExample: "She received recognition for her hard work." },
  { id: "refer", verb: "refer", noun: "reference", verbExample: "He referred to the dictionary during the lesson.", nounExample: "The article has no references to the original source." },
  { id: "remove", verb: "remove", noun: "removal", verbExample: "Please remove your shoes before entering.", nounExample: "The removal of the old furniture took all day." },
  { id: "require", verb: "require", noun: "requirement", verbExample: "This job requires good communication skills.", nounExample: "The main requirement is a university degree." },
  { id: "shoot", verb: "shoot", noun: "shot", verbExample: "The soldier was ordered to shoot at the target.", nounExample: "The shot was heard from far away." },
  { id: "trade", verb: "trade", noun: "trade / trading", verbExample: "The two countries trade with each other.", nounExample: "Trading on the stock market can be risky." },
];

export const WB_EX1: { sentence: string; answer: string }[] = [
  { sentence: "I don't ______ of your decision to quit school.", answer: "disapprove" },
  { sentence: "The teacher will ______ our essays according to grammar and content.", answer: "evaluate" },
  { sentence: "Please don't ______ me while I'm speaking.", answer: "interrupt" },
  { sentence: "This box may ______ fragile items, so be careful.", answer: "contain" },
  { sentence: "We need to ______ the problem before we can solve it.", answer: "investigate" },
  { sentence: "She likes to ______ her room with flowers and posters.", answer: "decorate" },
  { sentence: "The government was elected to ______ the country.", answer: "govern" },
  { sentence: "You should ______ junk food if you want to stay healthy.", answer: "avoid" },
  { sentence: "I didn't ______ him at first because he had changed so much.", answer: "recognize" },
  { sentence: "The police are going to ______ the crime.", answer: "investigate" },
  { sentence: "Let's ______ her birthday with a big party.", answer: "celebrate" },
  { sentence: "He tried to ______ the bird but missed.", answer: "shoot" },
  { sentence: "This job will ______ a lot of patience and skill.", answer: "require" },
  { sentence: "Can you ______ this word to something you already know?", answer: "refer" },
  { sentence: "The company wants to ______ with other countries.", answer: "trade" },
  { sentence: "Please ______ your shoes before entering.", answer: "remove" },
  { sentence: "I ______ that we leave early to avoid traffic.", answer: "propose" },
  { sentence: "She began to ______ faster when she felt nervous.", answer: "breathe" },
  { sentence: "The artist will ______ his paintings at the gallery.", answer: "exhibit" },
  { sentence: "The river will ______ into two smaller streams here.", answer: "divide" },
  { sentence: "My parents ______ of my new boyfriend.", answer: "approve" },
  { sentence: "We should ______ all the options before deciding.", answer: "consider" },
  { sentence: "Good managers ______ clearly with their team.", answer: "communicate" },
  { sentence: "This project will ______ everyone in the department.", answer: "involve" },
  { sentence: "Don't ______ people just because they are different.", answer: "criticize" },
];

export const WB_EX2: { sentence: string; options: [string, string]; answer: string }[] = [
  { sentence: "The medicine must ______ no sugar.", options: ["contain", "communicate"], answer: "contain" },
  { sentence: "I ______ we take a short break.", options: ["propose", "remove"], answer: "propose" },
  { sentence: "She felt she had to ______ his rude behavior.", options: ["criticize", "celebrate"], answer: "criticize" },
  { sentence: "The manager will ______ our performance next week.", options: ["evaluate", "interrupt"], answer: "evaluate" },
  { sentence: "We need to ______ the cause of the accident.", options: ["investigate", "decorate"], answer: "investigate" },
  { sentence: "He tried to ______ answering my question.", options: ["avoid", "approve"], answer: "avoid" },
  { sentence: "The new law will ______ how companies handle data.", options: ["govern", "recognize"], answer: "govern" },
  { sentence: "Please ______ to the instructions on page five.", options: ["refer", "shoot"], answer: "refer" },
  { sentence: "They will ______ their art in the city museum.", options: ["exhibit", "divide"], answer: "exhibit" },
  { sentence: "I ______ of smoking in public places.", options: ["disapprove", "involve"], answer: "disapprove" },
];

export const MODULES = [
  { id: "vocabulary", title: "Vocabulary", kicker: "Слова и значения", href: "/module/vocabulary", tone: "orange", accent: "#C4622D", wash: "#F8E6D8", countLabel: "33 значения" },
  { id: "idioms", title: "Idioms & Phrasal Verbs", kicker: "Фразы из историй о семье", href: "/module/idioms", tone: "blue", accent: "#2C4C7C", wash: "#E4EAF3", countLabel: "22 выражения" },
  { id: "collocations", title: "Collocations", kicker: "Устойчивые сочетания", href: "/module/collocations", tone: "plum", accent: "#5C3D6E", wash: "#EFE6F3", countLabel: "12 выражений" },
  { id: "prepositions", title: "Prepositional Phrases", kicker: "Предложные выражения", href: "/module/prepositions", tone: "green", accent: "#3E6B4F", wash: "#E5F0E8", countLabel: "30 фраз" },
  { id: "word-building", title: "Word Building", kicker: "Глагол и существительное", href: "/module/word-building", tone: "burgundy", accent: "#8E3A3A", wash: "#F6E4E2", countLabel: "25 пар" },
] as const;

export type ModuleId = (typeof MODULES)[number]["id"];
