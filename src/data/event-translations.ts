import type { Lang } from '@/i18n/config';

export interface EventTextTranslation {
  title: string;
  subtitle: string;
  description: string;
  transport: string;
  tickets: Record<string, { name: string; features: string[] }>;
  faq: { question: string; answer: string }[];
  genres: Record<string, string>;
}

const translations: Partial<Record<Lang, Record<string, EventTextTranslation>>> = {
  en: {
    'kollarovci-slezskoostravsky-hrad-2026': {
      title: 'Kollárovci – Slezskoostravský Castle',
      subtitle: 'An unforgettable evening under the open sky with the legendary Slovak band',
      description: `Kollárovci are coming to Ostrava!!! An unforgettable evening under the open sky in the courtyard of Slezskoostravský Castle with the legendary Slovak band that has been connecting generations since 1997.

Cimbalom, violins and vocals that will get everyone dancing — that's Kollárovci. A spirited performance full of energy, legendary hits and an atmosphere you'll fall in love with. A concert under the stars in the unique setting of a medieval castle.

1st wave of tickets is sold out! Don't hesitate to buy 2nd wave tickets before it's too late!!!`,
      transport: 'Tram no. 6, 12 – Slezskoostravská radnice stop, 10-minute walk. Parking at Vodafone Arena (15-minute walk).',
      tickets: {
        't1-1': { name: 'Standard (2nd wave)', features: ['Event entry', 'Standing in castle courtyard'] },
        't1-2': { name: 'VIP standing in front of stage', features: ['Event entry', 'VIP standing right in front of stage', 'Best view'] },
        't1-3': { name: 'VIP terrace', features: ['Event entry', 'Exclusive VIP terrace', 'Premium view', 'VIP bar'] },
      },
      faq: [
        { question: 'From what age is entry allowed?', answer: 'The event is accessible to all age groups. Children under 10 enter free when accompanied by an adult.' },
        { question: 'What if it rains?', answer: 'The event takes place in all weather conditions. We recommend bringing a rain poncho. In case of extreme weather, follow updates on social media.' },
        { question: 'When do the gates open?', answer: 'The castle gates open at 17:00.' },
      ],
      genres: {},
    },
    'hradni-oldies-festival-2026': {
      title: 'Castle Oldies Festival 2026',
      subtitle: 'A full day of legends, immortal hits and amazing atmosphere',
      description: `Summer, castle and the biggest hits of the 70s, 80s and 90s!!! The Castle Oldies Festival returns to the courtyard of Slezskoostravský Castle with a lineup that will blow your mind. Village People, Michal David & band, East 17 and Tublatanka — four legends on one stage.

The medieval walls will resonate with disco beats, pop-rock anthems and dance hits that will never be forgotten. From afternoon to night — eight hours of non-stop entertainment with a food court, retro drinks and an atmosphere that will take you back in time.

This is a festival for all generations!!! Slezskoostravský Castle offers a unique setting that no other festival in the Czech Republic can match.`,
      transport: 'Tram no. 6, 12 – Slezskoostravská radnice stop, 10-minute walk. Parking at Vodafone Arena (15-minute walk).',
      tickets: {
        't2-1': { name: 'Standard', features: ['Festival entry', 'Access to all stages', 'Food court'] },
        't2-2': { name: 'VIP standing in front of stage', features: ['Festival entry', 'VIP standing right in front of stage', 'Best view of main stage'] },
        't2-3': { name: 'VIP terrace', features: ['Festival entry', 'Exclusive VIP terrace', 'Premium view', 'VIP bar', 'Comfortable seating'] },
      },
      faq: [
        { question: 'Is the festival suitable for children?', answer: 'Yes! The festival is suitable for all age groups.' },
        { question: 'What to bring?', answer: 'We recommend comfortable clothing and footwear, a rain poncho (open-air), sunglasses. Personal food and drinks are not allowed.' },
      ],
      genres: {
        'Disco': 'Disco',
        'Pop': 'Pop',
        'Pop / R&B': 'Pop / R&B',
        'Rock': 'Rock',
      },
    },
    'dj-bobo-adventure-ostrava-2026': {
      title: 'DJ BoBo – Great Adventure / Arena Tour 2026',
      subtitle: 'Experience the show that changes everything',
      description: `DJ BoBo returns to Ostrava with the spectacular Arena Tour 2026!!! Great Adventure brings to the Ostravar Arena a show that changes everything. Get ready for the biggest hits, fireworks, choreography and a mega-production that made DJ BoBo one of the most successful European pop-dance icons.

Everybody, Chihuahua, Freedom and dozens of other hits in a spectacular new rendition. Laser show, LED walls, dance ensemble — this is not a concert, this is an experience!!!

Ostrava is one of the few stops in the Czech Republic. Don't hesitate to buy your tickets!`,
      transport: 'Tram no. 1, 2, 11 – Městský stadion stop. Parking P1 (Cinstar) 200m from the arena.',
      tickets: {
        't3-1': { name: 'Tribune', features: ['Show entry', 'Tribune seat', 'Access to bars'] },
        't3-2': { name: 'VIP Tribune', features: ['Show entry', 'Premium seat', 'VIP bar', 'Better view'] },
        't3-3': { name: 'Golden Seating', features: ['Show entry', 'Best seats in the arena', 'Private entrance', 'Welcome drink', 'VIP bar'] },
      },
      faq: [
        { question: 'From what age is entry allowed?', answer: 'The event is accessible from 12 years. Children under 15 must be accompanied by an adult.' },
        { question: 'Can I bring my own drinks?', answer: 'No, personal drinks are not allowed. Bars with a wide selection are available in the arena.' },
        { question: 'When do the gates open?', answer: 'The arena gates open at 18:30, 90 minutes before the show starts.' },
      ],
      genres: {},
    },
    'festacek-ostrava-2026': {
      title: 'Fesťáček Ostrava 2026',
      subtitle: 'The biggest children\'s festival full of music, fun and unforgettable experiences for the whole family',
      description: `Fesťáček is coming to Ostrava!!! One of the biggest children's festivals in the Czech Republic, attracting thousands of children and families every year. Live concerts by popular children's performers, interactive activities, educational zones and entertainment attractions.

Bouncy castles, face painting, train rides, balloon activities, clowns, mascots, carousels, petting zoo, foam parties, trampolines and much more!!!

Organizers emphasize creating unforgettable family experiences through music, entertainment and education. Download the Fesťáček app for up-to-date festival information.`,
      transport: 'Public transit stop Bělský les. Parking available near the venue.',
      tickets: {
        't4-1': { name: '3rd wave', features: ['Festival entry', 'Access to all zones', 'All attractions included'] },
        't4-2': { name: 'At the venue', features: ['Festival entry', 'Access to all zones', 'All attractions included'] },
      },
      faq: [
        { question: 'Is the festival suitable for young children?', answer: 'Yes! The festival is designed for children of all age groups. Children under 3 enter free.' },
        { question: 'What\'s included in the ticket price?', answer: 'The ticket includes festival entry, access to all zones and attractions including bouncy castles, trampolines, carousels and other activities.' },
        { question: 'Can I bring my own food?', answer: 'Personal food and drinks are not allowed. A food court with options for children and adults is available at the festival.' },
      ],
      genres: {
        'Dětský program': 'Children\'s program',
      },
    },
    'steel-rave-ostrava-2026': {
      title: 'Steel Rave Ostrava 2026 — Scooter, DJ Antoine & more',
      subtitle: 'The biggest rave festival in Ostrava with the legendary Scooter!!!',
      description: `Steel Rave Ostrava!!! The legendary Scooter is heading to Ostravar Arena, bringing a mega-show full of energy, lasers and unforgettable hits. Hyper Hyper, How Much Is the Fish, Fire and dozens of other hits you know by heart.

On one stage: Scooter, DJ Antoine, Merlin and Vanesa Hardt & Doom — four names that guarantee non-stop party from the first beat to the last.

Ticket pre-sale starts on Monday!!! Be there when Ostrava experiences the biggest rave festival of the year.`,
      transport: 'Tram no. 1, 2, 11 – Městský stadion stop. Parking P1 (Cinstar) 200m from the arena.',
      tickets: {},
      faq: [
        { question: 'When does the pre-sale start?', answer: 'Ticket pre-sale starts on Monday. Follow our website and social media for more information.' },
        { question: 'When do the gates open?', answer: 'Ostravar Arena gates open at 16:00.' },
        { question: 'From what age is entry allowed?', answer: 'The event is accessible from 15 years. Persons under 18 must be accompanied by an adult.' },
      ],
      genres: {
        'Rave / Techno': 'Rave / Techno',
        'Dance / House': 'Dance / House',
        'Dance': 'Dance',
        'DJ Set': 'DJ Set',
      },
    },
  },

  uk: {
    'kollarovci-slezskoostravsky-hrad-2026': {
      title: 'Kollárovci – Сілезькоостравський замок',
      subtitle: 'Незабутній вечір під відкритим небом з легендарним словацьким гуртом',
      description: `Kollárovci їдуть до Острави!!! Незабутній вечір під відкритим небом на подвір'ї Сілезькоостравського замку з легендарним словацьким гуртом, який з 1997 року об'єднує покоління.

Цимбали, скрипки та вокал, що змусить танцювати кожного — це Kollárovci. Темпераментний виступ, сповнений енергії, легендарних хітів та атмосфери, яку ви полюбите. Концерт під зірками в унікальних декораціях середньовічного замку.

1-ша хвиля квитків розпродана! Не зволікайте з покупкою 2-ї хвилі, поки не пізно!!!`,
      transport: 'Трамвай № 6, 12 – зупинка Slezskoostravská radnice, 10 хвилин пішки. Паркування біля Vodafone Arena (15 хвилин пішки).',
      tickets: {
        't1-1': { name: 'Стандарт (2-га хвиля)', features: ['Вхід на захід', 'Стоячі місця на подвір\'ї замку'] },
        't1-2': { name: 'VIP стоячі перед сценою', features: ['Вхід на захід', 'VIP стоячі місця прямо перед сценою', 'Найкращий огляд'] },
        't1-3': { name: 'VIP тераса', features: ['Вхід на захід', 'Ексклюзивна VIP тераса', 'Преміальний огляд', 'VIP бар'] },
      },
      faq: [
        { question: 'З якого віку дозволений вхід?', answer: 'Захід доступний для всіх вікових категорій. Діти до 10 років безкоштовно в супроводі дорослої особи.' },
        { question: 'Що робити, якщо буде дощ?', answer: 'Захід відбудеться за будь-якої погоди. Рекомендуємо взяти дощовик. У разі екстремальної погоди слідкуйте за інформацією в соціальних мережах.' },
        { question: 'Коли відкриваються ворота?', answer: 'Ворота замку відкриваються о 17:00.' },
      ],
      genres: {},
    },
    'hradni-oldies-festival-2026': {
      title: 'Фестиваль Castle Oldies 2026',
      subtitle: 'Цілий день легенд, безсмертних хітів та чудової атмосфери',
      description: `Літо, замок і найбільші хіти 70-х, 80-х та 90-х!!! Фестиваль Castle Oldies повертається на подвір'я Сілезькоостравського замку з лайнапом, від якого закрутиться голова. Village People, Michal David & band, East 17 та Tublatanka — чотири легенди на одній сцені.

Середньовічні мури зазвучать диско-бітами, поп-рок гімнами та танцювальними хітами, які неможливо забути. Від обіду до ночі — вісім годин безперервних розваг з фуд-кортом, ретро-напоями та атмосферою, що перенесе вас у часі.

Це фестиваль для всіх поколінь!!! Сілезькоостравський замок пропонує унікальні декорації, яких немає на жодному іншому фестивалі в Чехії.`,
      transport: 'Трамвай № 6, 12 – зупинка Slezskoostravská radnice, 10 хвилин пішки. Паркування біля Vodafone Arena (15 хвилин пішки).',
      tickets: {
        't2-1': { name: 'Стандарт', features: ['Вхід на фестиваль', 'Доступ до всіх сцен', 'Фуд-корт'] },
        't2-2': { name: 'VIP стоячі перед сценою', features: ['Вхід на фестиваль', 'VIP стоячі місця прямо перед сценою', 'Найкращий огляд на головну сцену'] },
        't2-3': { name: 'VIP тераса', features: ['Вхід на фестиваль', 'Ексклюзивна VIP тераса', 'Преміальний огляд', 'VIP бар', 'Зручні місця для сидіння'] },
      },
      faq: [
        { question: 'Чи підходить фестиваль для дітей?', answer: 'Так! Фестиваль підходить для всіх вікових категорій.' },
        { question: 'Що взяти з собою?', answer: 'Рекомендуємо зручний одяг та взуття, дощовик (open-air), сонцезахисні окуляри. Власна їжа та напої заборонені.' },
      ],
      genres: {
        'Disco': 'Диско',
        'Pop': 'Поп',
        'Pop / R&B': 'Поп / R&B',
        'Rock': 'Рок',
      },
    },
    'dj-bobo-adventure-ostrava-2026': {
      title: 'DJ BoBo – Great Adventure / Arena Tour 2026',
      subtitle: 'Відчуй шоу, яке змінює все',
      description: `DJ BoBo повертається до Острави з грандіозним Arena Tour 2026!!! Great Adventure привезе до Ostravar Arena шоу, яке змінює все. Приготуйтесь до найбільших хітів, феєрверків, хореографії та мега-продукції, яка зробила DJ BoBo однією з найуспішніших європейських поп-денс ікон.

Everybody, Chihuahua, Freedom та десятки інших хітів у новому грандіозному виконанні. Лазерне шоу, LED-екрани, танцювальний ансамбль — це не концерт, це враження!!!

Острава — одна з небагатьох зупинок у Чеській Республіці. Не зволікайте з покупкою квитків!`,
      transport: 'Трамвай № 1, 2, 11 – зупинка Městský stadion. Паркування P1 (Cinstar) 200 м від арени.',
      tickets: {
        't3-1': { name: 'Трибуна', features: ['Вхід на шоу', 'Місце на трибуні', 'Доступ до барів'] },
        't3-2': { name: 'VIP Трибуна', features: ['Вхід на шоу', 'Преміальне місце', 'VIP бар', 'Кращий огляд'] },
        't3-3': { name: 'Golden Seating', features: ['Вхід на шоу', 'Найкращі місця в залі', 'Приватний вхід', 'Welcome drink', 'VIP бар'] },
      },
      faq: [
        { question: 'З якого віку дозволений вхід?', answer: 'Захід доступний з 12 років. Діти до 15 років повинні бути в супроводі дорослої особи.' },
        { question: 'Чи можна принести власні напої?', answer: 'Ні, власні напої заборонені. В арені є бари з широким вибором.' },
        { question: 'Коли відкриваються ворота?', answer: 'Ворота арени відкриваються о 18:30, тобто за 90 хвилин до початку шоу.' },
      ],
      genres: {},
    },
    'festacek-ostrava-2026': {
      title: 'Fesťáček Ostrava 2026',
      subtitle: 'Найбільший дитячий фестиваль, сповнений музики, розваг та незабутніх вражень для всієї родини',
      description: `Fesťáček їде до Острави!!! Один з найбільших дитячих фестивалів у Чехії, який щороку приваблює тисячі дітей та сімей. Живі концерти популярних дитячих виконавців, інтерактивні заняття, освітні зони та розважальні атракціони.

Надувні замки, малювання на обличчі, поїздки на паровозику, заняття з кульками, клоуни, маскоти, каруселі, контактний зоопарк, пінні вечірки, батути та багато іншого!!!

Організатори роблять акцент на створенні незабутніх сімейних вражень через музику, розваги та навчання. Завантажте додаток Fesťáček для актуальної інформації про фестиваль.`,
      transport: 'Зупинка громадського транспорту Bělský les. Паркування поблизу території.',
      tickets: {
        't4-1': { name: '3-тя хвиля', features: ['Вхід на фестиваль', 'Доступ до всіх зон', 'Усі атракціони включені'] },
        't4-2': { name: 'На місці', features: ['Вхід на фестиваль', 'Доступ до всіх зон', 'Усі атракціони включені'] },
      },
      faq: [
        { question: 'Чи підходить фестиваль для маленьких дітей?', answer: 'Так! Фестиваль призначений для дітей усіх вікових категорій. Наймолодші діти до 3 років — вхід безкоштовний.' },
        { question: 'Що входить у вартість квитка?', answer: 'Квиток включає вхід на фестиваль, доступ до всіх зон та атракціонів, включаючи надувні замки, батути, каруселі та інші активності.' },
        { question: 'Чи можна принести власну їжу?', answer: 'Власна їжа та напої заборонені. На фестивалі є фуд-корт з пропозиціями для дітей та дорослих.' },
      ],
      genres: {
        'Dětský program': 'Дитяча програма',
      },
    },
    'steel-rave-ostrava-2026': {
      title: 'Steel Rave Ostrava 2026 — Scooter, DJ Antoine та інші',
      subtitle: 'Найбільший рейв-фестиваль в Остраві з легендарним Scooter!!!',
      description: `Steel Rave Ostrava!!! Легендарний Scooter прямує до Ostravar Arena і привезе з собою мега-шоу, сповнене енергії, лазерів та незабутніх хітів. Hyper Hyper, How Much Is the Fish, Fire та десятки інших хітів, які ви знаєте напам'ять.

На одній сцені виступлять Scooter, DJ Antoine, Merlin та Vanesa Hardt & Doom — чотири імені, що гарантують безперервну вечірку від першого біту до останнього.

Попередній продаж квитків починається в понеділок!!! Будьте там, коли Острава переживе найбільший рейв-фестиваль року.`,
      transport: 'Трамвай № 1, 2, 11 – зупинка Městský stadion. Паркування P1 (Cinstar) 200 м від арени.',
      tickets: {},
      faq: [
        { question: 'Коли починається попередній продаж?', answer: 'Попередній продаж квитків починається в понеділок. Слідкуйте за нашим сайтом та соціальними мережами для додаткової інформації.' },
        { question: 'Коли відкриваються ворота?', answer: 'Ворота Ostravar Arena відкриваються о 16:00.' },
        { question: 'З якого віку дозволений вхід?', answer: 'Захід доступний з 15 років. Особи до 18 років повинні бути в супроводі дорослої особи.' },
      ],
      genres: {
        'Rave / Techno': 'Рейв / Техно',
        'Dance / House': 'Денс / Хаус',
        'Dance': 'Денс',
        'DJ Set': 'DJ Сет',
      },
    },
  },

  sk: {
    'kollarovci-slezskoostravsky-hrad-2026': {
      title: 'Kollárovci – Slezskoostravský hrad',
      subtitle: 'Nezabudnuteľný večer pod otvoreným nebom s legendárnou slovenskou kapelou',
      description: `Kollárovci prichádzajú do Ostravy!!! Nezabudnuteľný večer pod otvoreným nebom na nádvorí Slezskoostravského hradu s legendárnou slovenskou kapelou, ktorá od roku 1997 spája generácie.

Cimbal, husle a vokály, ktoré roztancujú každého — to sú Kollárovci. Temperamentné vystúpenie plné energie, legendárnych hitov a atmosféry, ktorú si zamilujete. Koncert pod hviezdami v jedinečnej kulise stredovekého hradu.

1. vlna vstupeniek je vypredaná! Neváhajte s nákupom 2. vlny, kým nie je neskoro!!!`,
      transport: 'Električka č. 6, 12 – zastávka Slezskoostravská radnice, 10 minút chôdze. Parkovisko pri Vodafone aréne (15 minút chôdze).',
      tickets: {
        't1-1': { name: 'Standard (2. vlna)', features: ['Vstup na akciu', 'Státie na nádvorí hradu'] },
        't1-2': { name: 'VIP státie pred pódiom', features: ['Vstup na akciu', 'VIP státie priamo pred pódiom', 'Najlepší výhľad'] },
        't1-3': { name: 'VIP terasa', features: ['Vstup na akciu', 'Exkluzívna VIP terasa', 'Prémiový výhľad', 'VIP bar'] },
      },
      faq: [
        { question: 'Od koľkých rokov je vstup?', answer: 'Akcia je prístupná pre všetky vekové kategórie. Deti do 10 rokov zadarmo v sprievode dospelej osoby.' },
        { question: 'Čo ak bude pršať?', answer: 'Akcia sa koná za každého počasia. Odporúčame vziať si pršiplášť. V prípade extrémneho počasia sledujte informácie na sociálnych sieťach.' },
        { question: 'Kedy sa otvárajú brány?', answer: 'Brány hradu sa otvárajú o 17:00.' },
      ],
      genres: {},
    },
    'hradni-oldies-festival-2026': {
      title: 'Hradný Oldies Festival 2026',
      subtitle: 'Celý deň legiend, nesmrteľných hitov a skvelej atmosféry',
      description: `Leto, hrad a najväčšie hity 70., 80. a 90. rokov!!! Hradný Oldies Festival sa vracia na nádvorie Slezskoostravského hradu s line-upom, z ktorého sa vám zatočí hlava. Village People, Michal David & band, East 17 a Tublatanka — štyri legendy na jednom pódiu.

Stredoveké hradby sa rozoznejú disco beatmi, pop-rockovými hymnami a tanečnými hitmi, na ktoré sa nezabúda. Od popoludnia do noci — osem hodín nonstop zábavy s food courtom, retro drinkmi a atmosférou, ktorá vás vráti v čase.

Toto je festival pre všetky generácie!!! Slezskoostravský hrad ponúka jedinečnú kulisu, ktorú žiadny iný festival v Česku nemá.`,
      transport: 'Električka č. 6, 12 – zastávka Slezskoostravská radnice, 10 minút chôdze. Parkovisko pri Vodafone aréne (15 minút chôdze).',
      tickets: {
        't2-1': { name: 'Standard', features: ['Vstup na festival', 'Prístup ku všetkým stage', 'Food court'] },
        't2-2': { name: 'VIP státie pred pódiom', features: ['Vstup na festival', 'VIP státie priamo pred pódiom', 'Najlepší výhľad na hlavnú stage'] },
        't2-3': { name: 'VIP terasa', features: ['Vstup na festival', 'Exkluzívna VIP terasa', 'Prémiový výhľad', 'VIP bar', 'Pohodlné sedenie'] },
      },
      faq: [
        { question: 'Je festival vhodný pre deti?', answer: 'Áno! Festival je vhodný pre všetky vekové kategórie.' },
        { question: 'Čo si vziať so sebou?', answer: 'Odporúčame pohodlné oblečenie a obuv, pršiplášť (open-air), slnečné okuliare. Vlastné jedlo a pitie nie je povolené.' },
      ],
      genres: {
        'Disco': 'Disco',
        'Pop': 'Pop',
        'Pop / R&B': 'Pop / R&B',
        'Rock': 'Rock',
      },
    },
    'dj-bobo-adventure-ostrava-2026': {
      title: 'DJ BoBo – Great Adventure / Arena Tour 2026',
      subtitle: 'Zažite show, ktorá zmení všetko',
      description: `DJ BoBo sa vracia do Ostravy s veľkolepou Arena Tour 2026!!! Great Adventure privezie do Ostravar Arény show, ktorá zmení všetko. Pripravte sa na najväčšie hity, ohňostroje, choreografie a mega-produkciu, ktorá z DJ BoBa urobila jednu z najúspešnejších európskych pop-dance ikon.

Everybody, Chihuahua, Freedom a desiatky ďalších hitov v novom veľkolepom prevedení. Laserová show, LED steny, tanečný ensemble — toto nie je koncert, toto je zážitok!!!

Ostrava je jednou z mála zastávok v Českej republike. Neváhajte s nákupom vstupeniek!`,
      transport: 'Električka č. 1, 2, 11 – zastávka Městský stadion. Parkovanie P1 (Cinstar) 200 m od arény.',
      tickets: {
        't3-1': { name: 'Tribúna', features: ['Vstup na show', 'Sedadlo na tribúne', 'Prístup k barom'] },
        't3-2': { name: 'VIP Tribúna', features: ['Vstup na show', 'Prémiové sedadlo', 'VIP bar', 'Lepší výhľad'] },
        't3-3': { name: 'Golden Seating', features: ['Vstup na show', 'Najlepšie sedadlá v hale', 'Privátny vchod', 'Welcome drink', 'VIP bar'] },
      },
      faq: [
        { question: 'Od koľkých rokov je vstup?', answer: 'Akcia je prístupná od 12 rokov. Deti do 15 rokov musia byť v sprievode dospelej osoby.' },
        { question: 'Môžem si priniesť vlastné nápoje?', answer: 'Nie, vlastné nápoje nie sú povolené. V aréne sú k dispozícii bary so širokou ponukou.' },
        { question: 'Kedy sa otvárajú brány?', answer: 'Brány arény sa otvárajú o 18:30, teda 90 minút pred začiatkom show.' },
      ],
      genres: {},
    },
    'festacek-ostrava-2026': {
      title: 'Fesťáček Ostrava 2026',
      subtitle: 'Najväčší detský festival plný hudby, zábavy a nezabudnuteľných zážitkov pre celú rodinu',
      description: `Fesťáček prichádza do Ostravy!!! Jeden z najväčších detských festivalov v Česku, ktorý každoročne priťahuje tisíce detí a rodín. Živé koncerty obľúbených detských interpretov, interaktívne aktivity, vzdelávacie zóny a zábavné atrakcie.

Skákacie hrady, maľovanie na tvár, jazdy vláčikom, balónikové aktivity, klauni, maskoti, kolotoče, kontaktná zoo, penové party, trampolíny a veľa ďalšieho!!!

Organizátori kladú dôraz na vytváranie nezabudnuteľných rodinných zážitkov prostredníctvom hudby, zábavy a vzdelávania. Stiahnite si aplikáciu Fesťáček pre aktuálne informácie o festivale.`,
      transport: 'MHD zastávka Bělský les. Parkovanie v okolí areálu.',
      tickets: {
        't4-1': { name: '3. vlna', features: ['Vstup na festival', 'Prístup ku všetkým zónam', 'Všetky atrakcie v cene'] },
        't4-2': { name: 'Na mieste', features: ['Vstup na festival', 'Prístup ku všetkým zónam', 'Všetky atrakcie v cene'] },
      },
      faq: [
        { question: 'Je festival vhodný pre malé deti?', answer: 'Áno! Festival je určený pre deti všetkých vekových kategórií. Najmenšie deti do 3 rokov majú vstup zadarmo.' },
        { question: 'Čo je v cene vstupenky?', answer: 'Vstupenka zahŕňa vstup na festival, prístup ku všetkým zónam a atrakciám vrátane skákacích hradov, trampolín, kolotočov a ďalších aktivít.' },
        { question: 'Môžem si priniesť vlastné jedlo?', answer: 'Vlastné jedlo a pitie nie je povolené. Na festivale je k dispozícii food court s ponukou pre deti aj dospelých.' },
      ],
      genres: {
        'Dětský program': 'Detský program',
      },
    },
    'steel-rave-ostrava-2026': {
      title: 'Steel Rave Ostrava 2026 — Scooter, DJ Antoine a ďalší',
      subtitle: 'Najväčší rave festival v Ostrave s legendárnym Scooterom!!!',
      description: `Steel Rave Ostrava!!! Legendárny Scooter mieri do Ostravar Arény a privezie so sebou megashow plnú energie, laserov a nezabudnuteľných hitov. Hyper Hyper, How Much Is the Fish, Fire a desiatky ďalších hitov, ktoré poznáte naspamäť.

Na jednom pódiu sa predstavia Scooter, DJ Antoine, Merlin a Vanesa Hardt & Doom — štyri mená, ktoré zaručujú nonstop párty od prvého beatu po posledný.

Predpredaj vstupeniek začína v pondelok!!! Buďte pri tom, keď Ostrava zažije najväčší rave festival roka.`,
      transport: 'Električka č. 1, 2, 11 – zastávka Městský stadion. Parkovanie P1 (Cinstar) 200 m od arény.',
      tickets: {},
      faq: [
        { question: 'Kedy začína predpredaj?', answer: 'Predpredaj vstupeniek štartuje v pondelok. Sledujte naše stránky a sociálne siete pre viac informácií.' },
        { question: 'Kedy sa otvárajú brány?', answer: 'Brány Ostravar Arény sa otvárajú o 16:00.' },
        { question: 'Od koľkých rokov je vstup?', answer: 'Akcia je prístupná od 15 rokov. Osoby do 18 rokov musia byť v sprievode dospelej osoby.' },
      ],
      genres: {
        'Rave / Techno': 'Rave / Techno',
        'Dance / House': 'Dance / House',
        'Dance': 'Dance',
        'DJ Set': 'DJ Set',
      },
    },
  },

  pl: {
    'kollarovci-slezskoostravsky-hrad-2026': {
      title: 'Kollárovci – Zamek Slezskoostravský',
      subtitle: 'Niezapomniany wieczór pod gołym niebem z legendarnym słowackim zespołem',
      description: `Kollárovci jadą do Ostrawy!!! Niezapomniany wieczór pod gołym niebem na dziedzińcu zamku Slezskoostravský z legendarnym słowackim zespołem, który od 1997 roku łączy pokolenia.

Cymbały, skrzypce i wokal, który roztańczy każdego — to Kollárovci. Temperamentny występ pełen energii, legendarnych hitów i atmosfery, którą pokochacie. Koncert pod gwiazdami w unikatowej scenerii średniowiecznego zamku.

1. fala biletów wyprzedana! Nie zwlekaj z zakupem 2. fali, zanim będzie za późno!!!`,
      transport: 'Tramwaj nr 6, 12 – przystanek Slezskoostravská radnice, 10 minut pieszo. Parking przy Vodafone Arena (15 minut pieszo).',
      tickets: {
        't1-1': { name: 'Standard (2. fala)', features: ['Wstęp na wydarzenie', 'Miejsca stojące na dziedzińcu zamku'] },
        't1-2': { name: 'VIP stojące przed sceną', features: ['Wstęp na wydarzenie', 'VIP miejsca stojące tuż przed sceną', 'Najlepszy widok'] },
        't1-3': { name: 'VIP taras', features: ['Wstęp na wydarzenie', 'Ekskluzywny VIP taras', 'Premiumowy widok', 'VIP bar'] },
      },
      faq: [
        { question: 'Od jakiego wieku jest wstęp?', answer: 'Wydarzenie jest dostępne dla wszystkich grup wiekowych. Dzieci do 10 lat wchodzą za darmo w towarzystwie osoby dorosłej.' },
        { question: 'Co jeśli będzie padać?', answer: 'Wydarzenie odbywa się w każdych warunkach pogodowych. Zalecamy zabranie peleryny przeciwdeszczowej. W przypadku ekstremalnej pogody śledź informacje w mediach społecznościowych.' },
        { question: 'Kiedy otwierają się bramy?', answer: 'Bramy zamku otwierają się o 17:00.' },
      ],
      genres: {},
    },
    'hradni-oldies-festival-2026': {
      title: 'Castle Oldies Festival 2026',
      subtitle: 'Cały dzień legend, nieśmiertelnych hitów i wspaniałej atmosfery',
      description: `Lato, zamek i największe hity lat 70., 80. i 90.!!! Castle Oldies Festival wraca na dziedziniec zamku Slezskoostravský z line-upem, od którego zakręci Ci się w głowie. Village People, Michal David & band, East 17 i Tublatanka — cztery legendy na jednej scenie.

Średniowieczne mury rozbrzmią disco beatami, pop-rockowymi hymnami i tanecznymi hitami, których nie da się zapomnieć. Od popołudnia do nocy — osiem godzin nieprzerwanej zabawy z food courtem, retro drinkami i atmosferą, która przeniesie Cię w czasie.

To festiwal dla wszystkich pokoleń!!! Zamek Slezskoostravský oferuje unikatową scenerię, której nie ma żaden inny festiwal w Czechach.`,
      transport: 'Tramwaj nr 6, 12 – przystanek Slezskoostravská radnice, 10 minut pieszo. Parking przy Vodafone Arena (15 minut pieszo).',
      tickets: {
        't2-1': { name: 'Standard', features: ['Wstęp na festiwal', 'Dostęp do wszystkich scen', 'Food court'] },
        't2-2': { name: 'VIP stojące przed sceną', features: ['Wstęp na festiwal', 'VIP miejsca stojące tuż przed sceną', 'Najlepszy widok na główną scenę'] },
        't2-3': { name: 'VIP taras', features: ['Wstęp na festiwal', 'Ekskluzywny VIP taras', 'Premiumowy widok', 'VIP bar', 'Wygodne miejsca siedzące'] },
      },
      faq: [
        { question: 'Czy festiwal jest odpowiedni dla dzieci?', answer: 'Tak! Festiwal jest odpowiedni dla wszystkich grup wiekowych.' },
        { question: 'Co zabrać ze sobą?', answer: 'Zalecamy wygodne ubranie i obuwie, pelerynę (open-air), okulary przeciwsłoneczne. Własne jedzenie i napoje nie są dozwolone.' },
      ],
      genres: {
        'Disco': 'Disco',
        'Pop': 'Pop',
        'Pop / R&B': 'Pop / R&B',
        'Rock': 'Rock',
      },
    },
    'dj-bobo-adventure-ostrava-2026': {
      title: 'DJ BoBo – Great Adventure / Arena Tour 2026',
      subtitle: 'Przeżyj show, które zmienia wszystko',
      description: `DJ BoBo wraca do Ostrawy z wielkolepą Arena Tour 2026!!! Great Adventure przywiezie do Ostravar Areny show, które zmienia wszystko. Przygotuj się na największe hity, pokazy pirotechniczne, choreografie i mega-produkcję, która uczyniła DJ BoBo jedną z najodniejszych europejskich ikon pop-dance.

Everybody, Chihuahua, Freedom i dziesiątki innych hitów w nowym, wspaniałym wykonaniu. Laser show, ekrany LED, zespół taneczny — to nie jest koncert, to doświadczenie!!!

Ostrawa jest jednym z nielicznych przystanków w Czechach. Nie zwlekaj z zakupem biletów!`,
      transport: 'Tramwaj nr 1, 2, 11 – przystanek Městský stadion. Parking P1 (Cinstar) 200 m od areny.',
      tickets: {
        't3-1': { name: 'Trybuna', features: ['Wstęp na show', 'Miejsce na trybunie', 'Dostęp do barów'] },
        't3-2': { name: 'VIP Trybuna', features: ['Wstęp na show', 'Premiumowe miejsce', 'VIP bar', 'Lepszy widok'] },
        't3-3': { name: 'Golden Seating', features: ['Wstęp na show', 'Najlepsze miejsca w hali', 'Prywatne wejście', 'Welcome drink', 'VIP bar'] },
      },
      faq: [
        { question: 'Od jakiego wieku jest wstęp?', answer: 'Wydarzenie jest dostępne od 12 lat. Dzieci do 15 lat muszą być w towarzystwie osoby dorosłej.' },
        { question: 'Czy mogę przynieść własne napoje?', answer: 'Nie, własne napoje nie są dozwolone. W arenie dostępne są bary z szeroką ofertą.' },
        { question: 'Kiedy otwierają się bramy?', answer: 'Bramy areny otwierają się o 18:30, czyli 90 minut przed rozpoczęciem show.' },
      ],
      genres: {},
    },
    'festacek-ostrava-2026': {
      title: 'Fesťáček Ostrava 2026',
      subtitle: 'Największy festiwal dla dzieci pełen muzyki, zabawy i niezapomnianych przeżyć dla całej rodziny',
      description: `Fesťáček jedzie do Ostrawy!!! Jeden z największych festiwali dla dzieci w Czechach, który co roku przyciąga tysiące dzieci i rodzin. Koncerty na żywo popularnych wykonawców dla dzieci, interaktywne zajęcia, strefy edukacyjne i atrakcje rozrywkowe.

Dmuchane zamki, malowanie twarzy, przejażdżki pociągiem, zabawy z balonami, klauni, maskotki, karuzele, zoo kontaktowe, pianowe imprezy, trampoliny i wiele więcej!!!

Organizatorzy kładą nacisk na tworzenie niezapomnianych rodzinnych przeżyć poprzez muzykę, rozrywkę i edukację. Pobierz aplikację Fesťáček, aby uzyskać aktualne informacje o festiwalu.`,
      transport: 'Przystanek komunikacji miejskiej Bělský les. Parking w okolicach terenu.',
      tickets: {
        't4-1': { name: '3. fala', features: ['Wstęp na festiwal', 'Dostęp do wszystkich stref', 'Wszystkie atrakcje w cenie'] },
        't4-2': { name: 'Na miejscu', features: ['Wstęp na festiwal', 'Dostęp do wszystkich stref', 'Wszystkie atrakcje w cenie'] },
      },
      faq: [
        { question: 'Czy festiwal jest odpowiedni dla małych dzieci?', answer: 'Tak! Festiwal jest przeznaczony dla dzieci w każdym wieku. Najmłodsze dzieci do 3 lat wchodzą za darmo.' },
        { question: 'Co jest w cenie biletu?', answer: 'Bilet obejmuje wstęp na festiwal, dostęp do wszystkich stref i atrakcji, w tym dmuchanych zamków, trampolin, karuzeli i innych aktywności.' },
        { question: 'Czy mogę przynieść własne jedzenie?', answer: 'Własne jedzenie i napoje nie są dozwolone. Na festiwalu dostępny jest food court z ofertą dla dzieci i dorosłych.' },
      ],
      genres: {
        'Dětský program': 'Program dla dzieci',
      },
    },
    'steel-rave-ostrava-2026': {
      title: 'Steel Rave Ostrava 2026 — Scooter, DJ Antoine i więcej',
      subtitle: 'Największy festiwal rave w Ostrawie z legendarnym Scooterem!!!',
      description: `Steel Rave Ostrava!!! Legendarny Scooter zmierza do Ostravar Areny i przywiezie ze sobą mega-show pełne energii, laserów i niezapomnianych hitów. Hyper Hyper, How Much Is the Fish, Fire i dziesiątki innych hitów, które znasz na pamięć.

Na jednej scenie wystąpią Scooter, DJ Antoine, Merlin i Vanesa Hardt & Doom — cztery nazwiska gwarantujące nonstop imprezę od pierwszego beatu do ostatniego.

Przedsprzedaż biletów rusza w poniedziałek!!! Bądź tam, gdy Ostrawa przeżyje największy festiwal rave roku.`,
      transport: 'Tramwaj nr 1, 2, 11 – przystanek Městský stadion. Parking P1 (Cinstar) 200 m od areny.',
      tickets: {},
      faq: [
        { question: 'Kiedy zaczyna się przedsprzedaż?', answer: 'Przedsprzedaż biletów rusza w poniedziałek. Śledź naszą stronę i media społecznościowe, aby uzyskać więcej informacji.' },
        { question: 'Kiedy otwierają się bramy?', answer: 'Bramy Ostravar Areny otwierają się o 16:00.' },
        { question: 'Od jakiego wieku jest wstęp?', answer: 'Wydarzenie jest dostępne od 15 lat. Osoby poniżej 18 lat muszą być w towarzystwie osoby dorosłej.' },
      ],
      genres: {
        'Rave / Techno': 'Rave / Techno',
        'Dance / House': 'Dance / House',
        'Dance': 'Dance',
        'DJ Set': 'DJ Set',
      },
    },
  },
};

export function getEventTranslation(slug: string, lang: Lang): EventTextTranslation | undefined {
  return translations[lang]?.[slug];
}
