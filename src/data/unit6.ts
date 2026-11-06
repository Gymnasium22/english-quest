/** Unit 6 Belarus. Словарь, фразовые глаголы советов и коллокации еды и примет. Предлоги на S и суффиксы не входят. */

export type ByWord = { id: string; english: string; translation: string; example: string };

export const BY_VOCAB: ByWord[] = [
  { id: "total-area", english: "total area", translation: "общая площадь", example: "The total area of the country is mostly plains." },
  { id: "border", english: "border", translation: "граница", example: "Belarus has a border with Russia, Ukraine, Poland, Lithuania and Latvia." },
  { id: "stretch", english: "stretch", translation: "простираться", example: "Plains stretch across the country." },
  { id: "from-south-to-north", english: "from south to north", translation: "с юга на север", example: "The land stretches from south to north." },
  { id: "from-east-to-west", english: "from east to west", translation: "с востока на запад", example: "Rivers run from east to west." },
  { id: "plain", english: "plain", translation: "равнина", example: "Most of the country is a plain." },
  { id: "lake-country", english: "lake-country", translation: "озёрный край", example: "The north is lake-country." },
  { id: "depth", english: "depth", translation: "глубина", example: "The depth of the largest lake is well known." },
  { id: "transparent", english: "transparent", translation: "прозрачный", example: "The lake water looks transparent." },
  { id: "scenery", english: "scenery", translation: "пейзаж", example: "The forests give the country beautiful scenery." },
  { id: "elk", english: "elk", translation: "лось", example: "Elk live in the forests." },
  { id: "deer", english: "deer", translation: "олень", example: "You can see deer in the pushcha." },
  { id: "lynx", english: "lynx", translation: "рысь", example: "The lynx is a rare forest animal." },
  { id: "temperate-continental", english: "temperate-continental", translation: "умеренно-континентальный", example: "The climate is temperate-continental." },
  { id: "moderate", english: "moderate", translation: "умеренный", example: "Winters are moderate for this latitude." },
  { id: "distinct", english: "distinct", translation: "чёткий, ярко выраженный", example: "The four seasons are distinct." },
  { id: "annual", english: "annual", translation: "годовой", example: "The annual rainfall feeds the rivers." },
  { id: "average", english: "average", translation: "средний", example: "The average summer day is warm." },
  { id: "in-accordance-with", english: "in accordance with", translation: "в соответствии с", example: "Laws are passed in accordance with the constitution." },
  { id: "legislative", english: "legislative", translation: "законодательный", example: "Legislative power makes the laws." },
  { id: "executive", english: "executive", translation: "исполнительный", example: "Executive power runs the country." },
  { id: "judicial", english: "judicial", translation: "судебный", example: "Judicial power is the courts." },
  { id: "executive-power", english: "executive power", translation: "исполнительная власть", example: "Executive power is one branch of the state." },
  { id: "branch", english: "branch", translation: "ветвь (власти)", example: "There are three branches of power." },
  { id: "oil-mining", english: "oil mining", translation: "добыча нефти", example: "Oil mining is part of industry." },
  { id: "synthesize", english: "synthesize", translation: "синтезировать", example: "Plants synthesize fibre and chemicals." },
  { id: "fiber", english: "fiber", translation: "волокно", example: "Factories produce fiber." },
  { id: "fertilizer", english: "fertilizer", translation: "удобрение", example: "The country produces fertilizer." },
  { id: "pharmaceutical", english: "pharmaceutical", translation: "фармацевтический", example: "Pharmaceutical plants work near the cities." },
  { id: "remunerative", english: "remunerative", translation: "доходный", example: "Flax can be a remunerative crop." },
  { id: "flax", english: "flax", translation: "лён", example: "Farmers grow flax." },
  { id: "famous-for", english: "famous for", translation: "известный чем-то", example: "The country is famous for its forests and lakes." },
  { id: "hospitable", english: "hospitable", translation: "гостеприимный", example: "People here are hospitable." },
];

export const BY_PHRASALS: ByWord[] = [
  { id: "check-out", english: "check out", translation: "посмотреть, заглянуть", example: "Check out the lakes around Braslav." },
  { id: "discover", english: "discover", translation: "открыть для себя", example: "Discover Mir Castle on a day trip." },
  { id: "peek-into", english: "peek into", translation: "заглянуть внутрь", example: "Peek into the courtyards of Niasvizh." },
  { id: "sample", english: "sample", translation: "попробовать", example: "Sample traditional food at Dudutki." },
  { id: "witness-first-hand", english: "witness first-hand", translation: "увидеть своими глазами", example: "Witness first-hand the memorial at Khatyn." },
  { id: "hop-on", english: "hop on", translation: "запрыгнуть (на транспорт)", example: "Hop on a bus and see Minsk." },
  { id: "take-a-ride", english: "take a ride", translation: "прокатиться", example: "Take a ride through the old streets of Grodno." },
  { id: "grab", english: "grab", translation: "быстро взять", example: "Grab a coffee before you leave Lida." },
  { id: "wander", english: "wander", translation: "бродить", example: "Wander around the centre of Minsk." },
];

export const BY_COLLOS: ByWord[] = [
  { id: "perfect-cuppa", english: "the perfect cuppa", translation: "идеальная чашка чая", example: "Guests are offered the perfect cuppa." },
  { id: "smitten-with", english: "smitten with", translation: "без ума от", example: "Visitors are smitten with Belarusian hospitality." },
  { id: "off-putting", english: "off-putting", translation: "отталкивающий", example: "An empty table can feel off-putting before a meal." },
  { id: "which-reminds-me", english: "which reminds me", translation: "кстати, это напоминает мне", example: "Which reminds me, we still have olivier salad." },
  { id: "integral-part", english: "an integral part", translation: "неотъемлемая часть", example: "Hot soups are an integral part of the table." },
  { id: "conundrum", english: "conundrum", translation: "трудный вопрос, головоломка", example: "Which dish to serve first is a conundrum." },
  { id: "crucial-point", english: "the crucial point", translation: "самый важный момент", example: "The crucial point of the meal is the main dish." },
  { id: "interfere-with", english: "interfere with", translation: "мешать", example: "Do not let superstitions interfere with the meal." },
  { id: "corner-of-a-table", english: "sitting on the corner of a table", translation: "сидеть на углу стола", example: "Sitting on the corner of a table is an old sign." },
  { id: "eating-bread", english: "eating bread", translation: "есть хлеб", example: "Eating bread starts many family meals." },
  { id: "spilling-salt", english: "spilling salt", translation: "просыпать соль", example: "Spilling salt is a well-known sign." },
  { id: "dropping-dishes", english: "dropping dishes", translation: "ронять посуду", example: "Dropping dishes is another kitchen sign." },
  { id: "empty-bottles", english: "empty bottles", translation: "пустые бутылки", example: "Empty bottles are left off the festive table." },
  { id: "eating-off-a-knife", english: "eating off a knife", translation: "есть с ножа", example: "Eating off a knife is an old warning." },
  { id: "meat-in-aspic", english: "meat in aspic", translation: "мясо в желе, холодец", example: "Meat in aspic is served cold." },
  { id: "hot-soups", english: "hot soups", translation: "горячие супы", example: "Hot soups come before the main course." },
  { id: "okroshka", english: "okroshka", translation: "окрошка", example: "Okroshka is a cold summer soup." },
  { id: "shashlyk", english: "shashlyk", translation: "шашлык", example: "Shashlyk is cooked outdoors." },
  { id: "syrniki", english: "syrniki", translation: "сырники", example: "Syrniki are fried cheese cakes." },
  { id: "crepes", english: "crepes", translation: "блины", example: "Crepes are thin pancakes." },
  { id: "fruit-compote", english: "fruit compote", translation: "компот", example: "Fruit compote is a sweet drink." },
  { id: "olivier-salad", english: "olivier salad", translation: "салат оливье", example: "Olivier salad is on the holiday table." },
];

export const BY_MODULES = [
  { id: "vocabulary" as const, title: "Vocabulary", kicker: "Страна и хозяйство", href: "/belarus/module/vocabulary", tone: "green", accent: "#8E3A3A", wash: "#F6E4E2", countLabel: `${BY_VOCAB.length} единиц` },
  { id: "idioms" as const, title: "Phrasal verbs", kicker: "Шесть советов о местах", href: "/belarus/module/idioms", tone: "blue", accent: "#2C4C7C", wash: "#E4EAF3", countLabel: `${BY_PHRASALS.length} глаголов` },
  { id: "collocations" as const, title: "Collocations", kicker: "Еда и приметы", href: "/belarus/module/collocations", tone: "plum", accent: "#5C3D6E", wash: "#EFE6F3", countLabel: `${BY_COLLOS.length} сочетаний` },
];

export const BELARUS_COUNTRY_TEXT = `The official name of our country is the Republic of Belarus. Its total area is 207,600 square kilometres. It is situated nearly in the extreme western part of the East-European Plain within the basins of the Dnieper, the Western Dvina and the Upper Neman. It borders on Russia in the north and east, on Lithuania and Latvia in the north-west, on Poland in the west, and on Ukraine in the south. Belarus stretches for 560 kilometres from south to north and for 650 kilometres from east to west.

Its population is about 9.5 million people: 83 percent of Belarusians, 8 percent of Russians, 3 percent of Poles and 2 percent of Ukrainians. 76 percent of the population live in towns and cities.

Belarus is situated on a plain rising to hills, the highest of which is Mount Dzerzhinskaya, reaching 350 metres above sea level. There are more than 3,000 rivers in the country. The longest are the Dnieper, Neman, Western Dvina, Prypiat, Berezina, Sozh and Vilia. Belarus is called a lake-country. There are about 10,800 lakes here, noted for their great depth, transparent water and beautiful scenery. The largest of them is Lake Naroch. The largest forests in Belarus are called pushchas. There are elks and deer, wild boars and wolves, bears and foxes, beavers and lynxes in the forests. Pinewoods, mighty oak groves, birch groves and other mixed forests are the charm, wealth and pride of our homeland.

Belarus has a temperate-continental climate with moderate features, characteristic of Central Europe, with hot summers, long cold winters and very distinct seasons. The annual average temperature is about 7 degrees Celsius.

The capital of our country is Minsk. Its population is about one fifth of the country. Belarus consists of six regions: Minsk, Brest, Vitebsk, Gomel, Grodno and Mogilev.

The Republic of Belarus is a democratic social state with the rule of law. State power is divided into legislative, executive and judicial. Belarus is a presidential republic. The President is the head of state. The legislative body is the Parliament. The executive power is exercised by the Government. The Council of Ministers is the central body of state administration. The judicial power belongs to the courts. We have two official languages: Belarusian and Russian.

The most developed branches of industry are motor-car construction, machine-tool construction, bearing production, the electrical industry, oil mining and processing, production of synthetic fibre, fertilizers, the pharmaceutical industry, building materials, and light and food industries.

Natural conditions let the country produce milk, beef, pork, poultry, grain, potatoes, long-fibred flax and white beet. Our country is famous for its people, who are hospitable, tolerant, hard-working and friendly.`;

export const BELARUS_PLACES_TEXT =
  "Check out the lakes around Braslav. Discover Mir Castle, and peek into the courtyards of Niasvizh. Sample traditional food at Dudutki. Hop on a bus and wander around Minsk. Witness first-hand the memorial at Khatyn. Take a ride through the old streets of Grodno, and grab a coffee in Lida before you leave.";
