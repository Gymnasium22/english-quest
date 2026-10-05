export type Sense = {
  id: string;
  english: string;
  translation: string;
  example: string;
};

export const CAREER_VOCAB: Sense[] = [
  { id: "apply-for", english: "apply for sth", translation: "подавать заявку на что-л.", example: "I want to apply for a new job." },
  { id: "application", english: "application", translation: "заявка, заявление; применение", example: "Please fill out this application form." },
  { id: "be-based", english: "be based somewhere", translation: "базироваться где-л.", example: "Our main office is based in London." },
  { id: "vacancy", english: "vacancy", translation: "вакансия", example: "There is a vacancy for a manager." },
  { id: "work-permit", english: "work permit", translation: "разрешение на работу", example: "He needs a work permit to work here." },
  { id: "valid", english: "valid", translation: "действительный", example: "My passport is valid for another year." },
  { id: "advise", english: "advise sb", translation: "советовать кому-л.", example: "I would advise you to apply early." },
  { id: "advice", english: "advice", translation: "совет", example: "She gave me some good advice." },
  { id: "acknowledge", english: "acknowledge sth", translation: "подтверждать что-л.", example: "We acknowledge receipt of your letter." },
  { id: "acknowledgement", english: "acknowledgement", translation: "подтверждение", example: "I received an acknowledgement of my application." },
  { id: "process", english: "process", translation: "процесс", example: "The hiring process takes two weeks." },
  { id: "interview", english: "interview", translation: "собеседование", example: "I have a job interview tomorrow." },
  { id: "interviewer", english: "interviewer", translation: "интервьюер", example: "The interviewer asked me about my skills." },
  { id: "interview-sb", english: "interview sb", translation: "брать интервью у кого-л.", example: "They will interview three candidates today." },
  { id: "contact", english: "contact sb", translation: "связываться с кем-л.", example: "Please contact me by phone." },
  { id: "assess", english: "assess sth/sb", translation: "оценивать что-л./кого-л.", example: "They need to assess his skills." },
  { id: "assessment", english: "assessment", translation: "оценка", example: "The assessment of the candidates is complete." },
  { id: "give-feedback", english: "give sb feedback", translation: "давать кому-л. обратную связь", example: "The manager will give you feedback later." },
  { id: "candidate", english: "candidate", translation: "кандидат", example: "She is the best candidate for the job." },
  { id: "reference", english: "reference", translation: "рекомендация", example: "My old boss wrote me a reference." },
  { id: "referee", english: "referee", translation: "рекомендатель, поручитель", example: "I listed my professor as a referee." },
  { id: "confirmation", english: "confirmation", translation: "подтверждение", example: "I am waiting for a confirmation email." },
  { id: "confirm", english: "confirm", translation: "подтверждать", example: "Can you confirm your attendance?" },
  { id: "require", english: "require sth", translation: "требовать что-л.", example: "This job will require a lot of travel." },
  { id: "request", english: "request sth", translation: "запрашивать что-л.", example: "I will request a meeting with the boss." },
  { id: "subject-to", english: "subject to sth", translation: "при условии чего-л.", example: "The offer is subject to a reference check." },
  { id: "position", english: "position", translation: "должность", example: "He applied for the position of manager." },
  { id: "sector", english: "sector", translation: "сектор, отрасль", example: "Manufacturing is a key sector." },
  { id: "public-sector", english: "public sector", translation: "государственный сектор", example: "She works in the public sector." },
  { id: "private-sector", english: "private sector", translation: "частный сектор", example: "The private sector offers many jobs." },
  { id: "experience", english: "experience", translation: "опыт", example: "He has five years of experience in sales." },
  { id: "qualifications", english: "qualifications", translation: "квалификация", example: "You need good qualifications for this role." },
  { id: "engineering", english: "engineering", translation: "инженерия, инженерное дело", example: "She studied engineering at university." },
  { id: "military", english: "military", translation: "военная сфера, вооружённые силы", example: "He spent time in the military." },
  { id: "training", english: "training", translation: "обучение, подготовка", example: "The job includes paid training." },
  { id: "train-sb", english: "train sb", translation: "обучать кого-л.", example: "They will train the new staff." },
  { id: "publishing", english: "publishing", translation: "издательское дело", example: "He works in publishing." },
  { id: "publish", english: "publish sth", translation: "публиковать что-л.", example: "They publish new books every month." },
  { id: "manufacturing", english: "manufacturing", translation: "производство", example: "Manufacturing is important for the economy." },
  { id: "manufacture", english: "manufacture sth", translation: "производить что-л.", example: "This factory will manufacture cars." },
  { id: "management", english: "management", translation: "управление, менеджмент", example: "She has a degree in business management." },
  { id: "manage", english: "manage sb/sth", translation: "управлять кем-л./чем-л.", example: "He manages a team of ten people." },
  { id: "retail", english: "retail", translation: "розничная торговля", example: "She works in retail at a clothing store." },
  { id: "finance", english: "finance", translation: "финансы", example: "He works in the finance department." },
  { id: "recruitment", english: "recruitment", translation: "подбор персонала", example: "The recruitment process is very strict." },
  { id: "recruit", english: "recruit sb", translation: "нанимать кого-л.", example: "They plan to recruit new staff soon." },
  { id: "career", english: "career", translation: "карьера", example: "She wants a career in publishing." },
  { id: "job", english: "job", translation: "работа", example: "He found a new job as a waiter." },
  { id: "profession", english: "profession", translation: "профессия", example: "Teaching is a respected profession." },
  { id: "install", english: "install sth", translation: "устанавливать что-л.", example: "The plumber will install a new sink." },
  { id: "vehicle", english: "vehicle", translation: "транспортное средство", example: "A car is a type of vehicle." },
  { id: "electrical", english: "electrical", translation: "электрический", example: "The electrical wiring needs repair." },
  { id: "object", english: "object", translation: "предмет, объект", example: "A chair is a wooden object." },
  { id: "take-care-of", english: "take care of sb/sth", translation: "заботиться о ком-л./чём-л.", example: "A nanny will take care of the children." },
  { id: "care-for", english: "care for sb/sth", translation: "заботиться о ком-л./чём-л.; ухаживать", example: "She cares for her elderly parents." },
  { id: "make-arrangements", english: "make arrangements for sb/sth", translation: "организовывать что-л.", example: "The travel agent will make arrangements for your trip." },
  { id: "land", english: "land", translation: "земля, земельный участок", example: "He bought a piece of land to build a house." },
  { id: "import", english: "import sth", translation: "импортировать что-л.", example: "The UK must import many goods." },
  { id: "export", english: "export sth", translation: "экспортировать что-л.", example: "They export cars to Europe." },
  { id: "product", english: "product", translation: "продукт, товар", example: "This company makes a new product." },
];

export const CAREER_IDIOMS = [
  { id: "get-through", english: "get through sth", definition: "справиться с трудной задачей", situation: "The first week was hard, but she managed to get through the training." },
  { id: "all-hours", english: "all hours", definition: "почти всё время, очень много часов", situation: "He works all hours to finish the project." },
  { id: "next-to-nothing", english: "next to nothing", definition: "почти ничего (почти без денег)", situation: "They paid him next to nothing in his first job." },
  { id: "be-up-to", english: "be up to sth", definition: "быть в состоянии, по силам", situation: "I don't think I am up to managing a team yet." },
  { id: "give-hard-time", english: "give sb a hard time", definition: "устраивать кому-л. тяжёлую жизнь, гонять по работе", situation: "The new manager gave the staff a hard time." },
  { id: "get-behind", english: "get behind (with sth)", definition: "отстать, не успевать", situation: "She got behind with her reports last month." },
  { id: "stand-by", english: "stand by sb", definition: "поддержать, не бросить", situation: "My colleagues stood by me during the interview process." },
  { id: "have-to-thank", english: "have sb to thank (for sth)", definition: "быть обязанным кому-л. (обычно за хорошее)", situation: "I have my referee to thank for this job." },
  { id: "make-it-career", english: "make it (as a teacher)", definition: "добиться успеха в профессии", situation: "She wants to make it as a teacher." },
  { id: "make-it-arrive", english: "make it (tomorrow)", definition: "успеть / смочь прийти", situation: "I can't make it tomorrow." },
  { id: "turn-down", english: "turn sb down", definition: "отказать", situation: "They turned her down after the interview." },
  { id: "take-on", english: "take sb on", definition: "взять на работу", situation: "The company will take on three new candidates." },
  { id: "nine-to-five", english: "nine-to-five", definition: "обычный рабочий день с девяти до пяти", situation: "He prefers a nine-to-five job in the public sector." },
  { id: "check-up-on", english: "check up on sb", definition: "проверять, как человек работает", situation: "The supervisor checks up on the new staff every hour." },
  { id: "hard-at-it", english: "hard at it", definition: "усердно работать", situation: "The team has been hard at it all week." },
  { id: "make-matters-worse", english: "to make matters/things worse", definition: "в довершение всего", situation: "To make matters worse, they got behind with the work." },
  { id: "deal-with", english: "deal with sb/sth", definition: "иметь дело с кем-л.; разбирать, решать (жалобы)", situation: "In retail you deal with customers all day." },
  { id: "cut-out-for", english: "be cut out for sth / to do sth", definition: "быть созданным для этой работы", situation: "She is cut out for a career in management." },
  { id: "hand-in-notice", english: "hand in your notice", definition: "подать заявление об уходе", situation: "He handed in his notice last Friday." },
  { id: "give-the-sack", english: "give sb the sack", definition: "уволить", situation: "The company gave him the sack after the assessment." },
];

export const CAREER_COLLOS = [
  { id: "benefits", english: "benefits", translation: "плюсы сверх зарплаты", syn: "perks" },
  { id: "benefits-package", english: "benefits package", translation: "пакет льгот" },
  { id: "relocation-allowance", english: "relocation allowance", translation: "компенсация переезда" },
  { id: "bonus-scheme", english: "performance-related bonus scheme", translation: "схема премий за результаты" },
  { id: "pension-scheme", english: "company pension scheme", translation: "корпоративная пенсионная схема" },
  { id: "maternity-leave", english: "maternity leave", translation: "декретный отпуск (матери)" },
  { id: "paternity-leave", english: "paternity leave", translation: "отпуск по уходу (отца)" },
  { id: "expenses", english: "expenses", translation: "расходы (travel/travelling expenses)" },
  { id: "holiday-entitlement", english: "30 days’ holiday entitlement", translation: "право на 30 дней отпуска" },
  { id: "entitled-to", english: "be entitled to sth", translation: "иметь право на что-л." },
  { id: "healthcare", english: "comprehensive healthcare provision", translation: "полное медицинское обеспечение" },
  { id: "canteen", english: "subsidized canteen", translation: "столовая со скидкой" },
];

export const CAREER_PREP = [
  { id: "accountable-to", english: "accountable to sb", meaning: "отчитываться перед кем-л." },
  { id: "insight-into", english: "insight into sth", meaning: "представление о чём-л." },
  { id: "rely-solely-on", english: "rely solely on", meaning: "полагаться только на" },
  { id: "encroach-upon", english: "encroach upon sth", meaning: "вторгаться (в личное время)" },
  { id: "fit-in", english: "fit in (with sb/sth)", meaning: "вписаться" },
  { id: "collaboration-with", english: "collaboration with sb", meaning: "сотрудничество с кем-л." },
];

export const CAREER_KEY = [
  { id: "pros-cons", english: "the pros and cons", meaning: "плюсы и минусы" },
  { id: "lucrative", english: "lucrative", meaning: "прибыльный" },
  { id: "juggle", english: "juggle sth", meaning: "совмещать, жонглировать делами" },
  { id: "guarantee", english: "guarantee", meaning: "гарантировать; гарантия" },
  { id: "additional", english: "additional", meaning: "дополнительный" },
  { id: "encounter", english: "encounter", meaning: "сталкиваться, встречать" },
  { id: "a-degree-of", english: "a degree of", meaning: "определённая степень" },
  { id: "common-goal", english: "common goal", meaning: "общая цель" },
  { id: "morale", english: "morale", meaning: "боевой дух, моральный настрой" },
  { id: "foster", english: "foster sth", meaning: "способствовать, развивать" },
  { id: "team-spirit", english: "team spirit", meaning: "командный дух" },
  { id: "mutual", english: "mutual", meaning: "взаимный" },
  { id: "fulfilling", english: "fulfilling", meaning: "приносящий удовлетворение" },
  { id: "value-sb", english: "value sb", meaning: "ценить кого-л." },
  { id: "pool-sth", english: "pool sth", meaning: "объединять (ресурсы)" },
  { id: "disruptive", english: "disruptive", meaning: "мешающий, разрушительный" },
  { id: "undermine", english: "undermine", meaning: "подрывать" },
  { id: "stifle", english: "stifle", meaning: "подавлять" },
  { id: "enterprise", english: "enterprise", meaning: "предприятие; предприимчивость" },
  { id: "initiative", english: "initiative", meaning: "инициатива" },
];

export const CAREER_FAMILIES = [
  { id: "apply", base: "apply", noun: "application", example: "I want to apply for a new job. / Please fill out this application form." },
  { id: "advise", base: "advise", noun: "advice", example: "I would advise you to apply early. / She gave me some good advice." },
  { id: "acknowledge", base: "acknowledge", noun: "acknowledgement", example: "We acknowledge receipt of your letter. / I received an acknowledgement of my application." },
  { id: "assess", base: "assess", noun: "assessment", example: "They need to assess his skills. / The assessment of the candidates is complete." },
  { id: "confirm", base: "confirm", noun: "confirmation", example: "Can you confirm your attendance? / I am waiting for a confirmation email." },
  { id: "interview", base: "interview", noun: "interviewer", example: "I have a job interview tomorrow. / The interviewer asked me about my skills." },
  { id: "recruit", base: "recruit", noun: "recruitment", example: "They plan to recruit new staff soon. / The recruitment process is very strict." },
  { id: "manufacture", base: "manufacture", noun: "manufacturing", example: "This factory will manufacture cars. / Manufacturing is important for the economy." },
  { id: "publish", base: "publish", noun: "publishing", example: "They publish new books every month. / He works in publishing." },
  { id: "manage", base: "manage", noun: "management", example: "He manages a team of ten people. / She has a degree in business management." },
  { id: "train", base: "train", noun: "training", example: "They will train the new staff. / The job includes paid training." },
];

export const CAREER_ACTOR_WB = [
  {
    id: "actor",
    base: "actor",
    forms: [{ english: "actor", ru: "актёр", example: "Barry Keoghan is widely regarded as one of the most talented young actors of his generation." }],
  },
  {
    id: "admire",
    base: "admire",
    forms: [
      { english: "admirer", ru: "поклонник", example: "Lisa’s admirers queued for hours outside the concert venue to see her in person." },
      { english: "admiration", ru: "восхищение", example: "Fans express their admiration for a celebrity by attending every live show." },
      { english: "admirable", ru: "восхитительный, достойный восхищения", example: "It is admirable that Little Simz has built her entire career independently." },
    ],
  },
  {
    id: "adore",
    base: "adore",
    forms: [{ english: "adorable", ru: "очаровательный, обаятельный", example: "Fans found it absolutely adorable when the pop star brought her younger sister on stage." }],
  },
  {
    id: "art",
    base: "art",
    forms: [
      { english: "artist", ru: "артист; художник", example: "A real artist continues to create even when no one is watching." },
      { english: "artistic", ru: "художественный, творческий", example: "Some of the most artistic musicians are not the most commercially successful." },
      { english: "artistically", ru: "с творческой точки зрения", example: "A performer who develops artistically will always outlast those who simply rely on their initial popularity." },
    ],
  },
  {
    id: "collect",
    base: "collect",
    forms: [
      { english: "collector", ru: "коллекционер", example: "Tyler, the Creator is a collector of vintage clothing." },
      { english: "collection", ru: "коллекция", example: "Vampire Weekend shot their music video for Classical among the National Gallery’s art collection." },
    ],
  },
  {
    id: "compose",
    base: "compose",
    forms: [
      { english: "composer", ru: "композитор", example: "Ludwig Göransson is the composer of the iconic theme from The Mandalorian." },
      { english: "composition", ru: "музыкальное произведение; сочинение", example: "John Williams’ composition for Star Wars is one of the most instantly recognisable pieces of music ever written." },
    ],
  },
  {
    id: "dedicate",
    base: "dedicate",
    forms: [{ english: "dedication", ru: "преданность делу; посвящение", example: "Meryl Streep’s dedication to her craft is legendary." }],
  },
  {
    id: "define",
    base: "define",
    forms: [
      { english: "definition", ru: "определение; понятие", example: "In today’s world, the definition of being famous has changed completely." },
      { english: "indefinite", ru: "неопределённый", example: "The album’s release date was listed as indefinite." },
      { english: "definitely", ru: "определённо, точно", example: "That single is definitely worth a second listen." },
      { english: "indefinitely", ru: "на неопределённый срок", example: "The event has been postponed indefinitely due to lack of interest." },
    ],
  },
  {
    id: "edit",
    base: "edit",
    forms: [
      { english: "editor", ru: "редактор", example: "Anna Wintour served as editor-in-chief of American Vogue for 37 years." },
      { english: "edition", ru: "выпуск, издание; редакция", example: "The limited edition of the album came with a handwritten note from the artist." },
    ],
  },
  {
    id: "exhibit",
    base: "exhibit",
    forms: [
      { english: "exhibitor", ru: "участник выставки; экспонент", example: "An exhibitor’s success depends not only on the work itself but also on how they present their work." },
      { english: "exhibition", ru: "выставка, экспозиция", example: "Many celebrities visit art exhibitions privately before they open to the public." },
    ],
  },
  {
    id: "express",
    base: "express",
    forms: [
      { english: "expression", ru: "выражение", example: "Joaquin Phoenix’s facial expression in Joker communicates depths of emotion." },
      { english: "expressive", ru: "выразительный", example: "Joaquin Phoenix is one of the most expressive actors of his generation." },
    ],
  },
  {
    id: "fame",
    base: "fame",
    forms: [
      { english: "famous", ru: "знаменитый, известный", example: "The most famous celebrities often say they feel like themselves when nobody recognises them." },
      { english: "infamous", ru: "печально известный", example: "Some celebrities become infamous for a single controversial moment." },
    ],
  },
  {
    id: "fascinate",
    base: "fascinate",
    forms: [{ english: "fascination", ru: "восхищение; увлечённость", example: "A celebrity who maintains an air of mystery only deepens their audience’s fascination." }],
  },
  {
    id: "follow",
    base: "follow",
    forms: [{ english: "follower", ru: "подписчик; последователь", example: "Gaining a thousand followers feels exciting at first, but keeping their trust is far harder." }],
  },
  {
    id: "success",
    base: "success",
    forms: [
      { english: "successfully", ru: "успешно", example: "The influencer successfully turned her online following into a thriving business." },
      { english: "unsuccessfully", ru: "безуспешно", example: "The manager unsuccessfully tried to keep the story out of the press." },
    ],
  },
  {
    id: "true",
    base: "true",
    forms: [{ english: "untrue", ru: "неправдивый, ложный", example: "The celebrity’s team released a statement calling the tabloid story completely untrue." }],
  },
];

export const CAREER_MODULES = [
  { id: "vocabulary", title: "Vocabulary", kicker: "Слова заявки и работы", href: "/career/module/vocabulary", tone: "orange", accent: "#C4622D", wash: "#F8E6D8", countLabel: "60 единиц" },
  { id: "idioms", title: "Idioms & Phrasal Verbs", kicker: "Опыт работы, увольнение, отказ", href: "/career/module/idioms", tone: "blue", accent: "#2C4C7C", wash: "#E4EAF3", countLabel: "20 выражений" },
  { id: "collocations", title: "Collocations", kicker: "Бенефиты и пакет льгот", href: "/career/module/collocations", tone: "plum", accent: "#5C3D6E", wash: "#EFE6F3", countLabel: "12 сочетаний" },
  { id: "prepositions", title: "Prepositional Phrases", kicker: "Фразы из текстов о плюсах и минусах", href: "/career/module/prepositions", tone: "green", accent: "#3E6B4F", wash: "#E5F0E8", countLabel: "6 фраз" },
  { id: "word-building", title: "Word Building", kicker: "Карьера и сцена", href: "/career/module/word-building", tone: "burgundy", accent: "#8E3A3A", wash: "#F6E4E2", countLabel: "11 пар и 30 форм" },
] as const;

export type CareerModuleId = (typeof CAREER_MODULES)[number]["id"];
