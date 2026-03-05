import type { EventData } from '@/types';

export const events: EventData[] = [
  {
    id: '1',
    slug: 'kollarovci-slezskoostravsky-hrad-2026',
    title: 'Kollárovci – Slezskoostravský hrad',
    subtitle: 'Nezapomenutelný večer pod otevřeným nebem s legendární slovenskou kapelou',
    category: 'koncert',
    date: '2026-05-15',
    time: '17:00',
    endTime: '23:00',
    venue: {
      name: 'Slezskoostravský hrad',
      address: 'Hradní 1, 710 00 Slezská Ostrava',
      city: 'Ostrava',
      mapQuery: 'Slezskoostravský+hrad+Ostrava',
      transport: 'Tramvaj č. 6, 12 – zastávka Slezskoostravská radnice, 10 minut chůze. Parkoviště u Vodafone arény (15 minut chůze).',
    },
    description: `Kollárovci přijíždějí do Ostravy!!! Nezapomenutelný večer pod otevřeným nebem na nádvoří Slezskoostravského hradu s legendární slovenskou kapelou, která od roku 1997 spojuje generace.

Cimbál, housle a vokály, které roztančí každého — to jsou Kollárovci. Temperamentní vystoupení plné energie, legendárních hitů a atmosféry, kterou si zamilujete. Koncert pod hvězdami v jedinečné kulise středověkého hradu.

1. vlna vstupenek je vyprodána! Neváhejte s nákupem 2. vlny, než bude pozdě!!!`,
    image: 'https://storage.googleapis.com/prod-ticketlive/2025/11/zvetsena/ljfd.jpg',
    gallery: [],
    tickets: [
      {
        id: 't1-1',
        name: 'Standard (2. vlna)',
        price: 890,
        originalPrice: 690,
        features: ['Vstup na akci', 'Stání na nádvoří hradu'],
        available: 280,
        total: 500,
        purchaseUrl: 'https://www.ticketlive.cz/cs/event/kollarovci-slezskoostravsky-hrad-ostrava-15-05-2026',
      },
      {
        id: 't1-2',
        name: 'VIP stání před pódiem',
        price: 990,
        features: ['Vstup na akci', 'VIP stání přímo před pódiem', 'Nejlepší výhled'],
        available: 120,
        total: 200,
        highlighted: true,
        purchaseUrl: 'https://www.ticketlive.cz/cs/event/kollarovci-slezskoostravsky-hrad-ostrava-15-05-2026',
      },
      {
        id: 't1-3',
        name: 'VIP terasa',
        price: 2390,
        features: ['Vstup na akci', 'Exkluzivní VIP terasa', 'Prémiový výhled', 'VIP bar'],
        available: 30,
        total: 50,
        purchaseUrl: 'https://www.ticketlive.cz/cs/event/kollarovci-slezskoostravsky-hrad-ostrava-15-05-2026',
      },
    ],
    status: 'on-sale',
    totalCapacity: 3000,
    ticketsSold: 1800,
    featured: false,
    faq: [
      { question: 'Od kolika let je vstup?', answer: 'Akce je přístupná pro všechny věkové kategorie. Děti do 10 let zdarma v doprovodu dospělé osoby.' },
      { question: 'Co když bude pršet?', answer: 'Akce se koná za každého počasí. Doporučujeme vzít si pláštěnku. V případě extrémního počasí sledujte informace na sociálních sítích.' },
      { question: 'Kdy se otevírají brány?', answer: 'Brány hradu se otevírají v 17:00.' },
    ],
  },
  {
    id: '2',
    slug: 'hradni-oldies-festival-2026',
    title: 'Hradní Oldies Festival 2026',
    subtitle: 'Celý den legend, nesmrtelných hitů a skvělé atmosféry',
    category: 'festival',
    date: '2026-05-16',
    time: '15:00',
    endTime: '23:00',
    venue: {
      name: 'Slezskoostravský hrad',
      address: 'Hradní 1, 710 00 Slezská Ostrava',
      city: 'Ostrava',
      mapQuery: 'Slezskoostravský+hrad+Ostrava',
      transport: 'Tramvaj č. 6, 12 – zastávka Slezskoostravská radnice, 10 minut chůze. Parkoviště u Vodafone arény (15 minut chůze).',
    },
    description: `Léto, hrad a největší hity 70., 80. a 90. let!!! Hradní Oldies Festival se vrací na nádvoří Slezskoostravského hradu s line-upem, ze kterého se vám zatočí hlava. Village People, Michal David & band, East 17 a Tublatanka — čtyři legendy na jednom pódiu.

Středověké hradby se rozezní disco beaty, pop-rockovými hymny a tanečními hity, na které se nezapomíná. Od odpoledne do noci — osm hodin nonstop zábavy s food courtem, retro drinky a atmosférou, která vás vrátí v čase.

Tohle je festival pro všechny generace!!! Slezskoostravský hrad nabízí jedinečnou kulisu, kterou žádný jiný festival v Česku nemá.`,
    image: 'https://storage.googleapis.com/prod-ticketlive/2025/08/zvetsena/navrh-bez-nazvu-2025-08-29t083959-663.jpg',
    gallery: [],
    tickets: [
      {
        id: 't2-1',
        name: 'Standard',
        price: 999,
        features: ['Vstup na festival', 'Přístup ke všem stage', 'Food court'],
        available: 400,
        total: 800,
        purchaseUrl: 'https://www.ticketlive.cz/cs/event/hradni-oldies-festival-2026-slezskoostravsky-hrad-16-05-2026',
      },
      {
        id: 't2-2',
        name: 'VIP stání před pódiem',
        price: 1490,
        features: ['Vstup na festival', 'VIP stání přímo před pódiem', 'Nejlepší výhled na hlavní stage'],
        available: 150,
        total: 250,
        highlighted: true,
        purchaseUrl: 'https://www.ticketlive.cz/cs/event/hradni-oldies-festival-2026-slezskoostravsky-hrad-16-05-2026',
      },
      {
        id: 't2-3',
        name: 'VIP terasa',
        price: 2990,
        features: ['Vstup na festival', 'Exkluzivní VIP terasa', 'Prémiový výhled', 'VIP bar', 'Pohodlné sezení'],
        available: 40,
        total: 60,
        purchaseUrl: 'https://www.ticketlive.cz/cs/event/hradni-oldies-festival-2026-slezskoostravsky-hrad-16-05-2026',
      },
    ],
    lineup: [
      { name: 'Village People', genre: 'Disco', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/VillagePeople1978.jpg/960px-VillagePeople1978.jpg' },
      { name: 'Michal David & band', genre: 'Pop', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/DavidMic.jpg' },
      { name: 'East 17', genre: 'Pop / R&B', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/East-17-Band-2019-V2.jpg/960px-East-17-Band-2019-V2.jpg' },
      { name: 'Tublatanka', genre: 'Rock', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tublatanka.jpg/960px-Tublatanka.jpg' },
    ],
    status: 'on-sale',
    totalCapacity: 5000,
    ticketsSold: 2200,
    featured: true,
    faq: [
      { question: 'Je festival vhodný pro děti?', answer: 'Ano! Festival je vhodný pro všechny věkové kategorie.' },
      { question: 'Co si vzít s sebou?', answer: 'Doporučujeme pohodlné oblečení a obuv, pláštěnku (open-air), sluneční brýle. Vlastní jídlo a pití není povoleno.' },
    ],
  },
  {
    id: '3',
    slug: 'dj-bobo-adventure-ostrava-2026',
    title: 'DJ BoBo – Great Adventure / Arena Tour 2026',
    subtitle: 'Zažij show, která změní vše',
    category: 'show',
    date: '2026-10-17',
    time: '20:00',
    endTime: '23:00',
    venue: {
      name: 'Ostravar Aréna',
      address: 'Ruská 3077/135, 700 30 Ostrava-Vítkovice',
      city: 'Ostrava',
      mapQuery: 'Ostravar+Aréna+Ostrava',
      transport: 'Tramvaj č. 1, 2, 11 – zastávka Městský stadion. Parkování P1 (Cinstar) 200m od arény.',
    },
    description: `DJ BoBo se vrací do Ostravy s velkolepou Arena Tour 2026!!! Great Adventure přiveze do Ostravar Arény show, která změní vše. Připravte se na největší hity, ohňostroje, choreografie a mega-produkci, která z DJ BoBa udělala jednu z nejúspěšnějších evropských pop-dance ikon.

Everybody, Chihuahua, Freedom a desítky dalších hitů v novém velkolepém provedení. Laserová show, LED stěny, taneční ensemble — tohle není koncert, tohle je zážitek!!!

Ostrava je jednou z mála zastávek v České republice. Neváhejte s nákupem vstupenek!`,
    image: 'https://storage.googleapis.com/prod-ticketlive/2025/09/zvetsena/600x300-483.jpg',
    gallery: [],
    tickets: [
      {
        id: 't3-1',
        name: 'Tribuna',
        price: 975,
        features: ['Vstup na show', 'Sedadlo na tribuně', 'Přístup k barům'],
        available: 500,
        total: 1200,
        purchaseUrl: 'https://vstupenky.sixartticket.cz/site/event/dj-bobo-adventure-ostrava-17-10-2026#event-detail',
      },
      {
        id: 't3-2',
        name: 'VIP Tribuna',
        price: 2490,
        features: ['Vstup na show', 'Prémiové sedadlo', 'VIP bar', 'Lepší výhled'],
        available: 180,
        total: 300,
        highlighted: true,
        purchaseUrl: 'https://vstupenky.sixartticket.cz/site/event/dj-bobo-adventure-ostrava-17-10-2026#event-detail',
      },
      {
        id: 't3-3',
        name: 'Golden Seating',
        price: 3990,
        features: ['Vstup na show', 'Nejlepší sedadla v hale', 'Privátní vchod', 'Welcome drink', 'VIP bar'],
        available: 40,
        total: 60,
        purchaseUrl: 'https://vstupenky.sixartticket.cz/site/event/dj-bobo-adventure-ostrava-17-10-2026#event-detail',
      },
    ],
    status: 'on-sale',
    totalCapacity: 8000,
    ticketsSold: 3500,
    featured: false,
    faq: [
      { question: 'Od kolika let je vstup?', answer: 'Akce je přístupná od 12 let. Děti do 15 let musí být v doprovodu dospělé osoby.' },
      { question: 'Mohu si přinést vlastní nápoje?', answer: 'Ne, vlastní nápoje nejsou povoleny. V aréně jsou k dispozici bary s širokou nabídkou.' },
      { question: 'Kdy se otevírají brány?', answer: 'Brány arény se otevírají v 18:30, tedy 90 minut před začátkem show.' },
    ],
  },
  {
    id: '4',
    slug: 'festacek-ostrava-2026',
    title: 'Fesťáček Ostrava 2026',
    subtitle: 'Největší dětský festival plný hudby, zábavy a nezapomenutelných zážitků pro celou rodinu',
    category: 'festival',
    date: '2026-07-11',
    time: '08:30',
    endTime: '18:00',
    venue: {
      name: 'Výukové centrum Bělský les',
      address: 'Bělský les, Ostrava',
      city: 'Ostrava',
      mapQuery: 'Výukové+centrum+Bělský+les+Ostrava',
      transport: 'MHD zastávka Bělský les. Parkování v okolí areálu.',
    },
    description: `Fesťáček přijíždí do Ostravy!!! Jeden z největších dětských festivalů v Česku, který každoročně přitahuje tisíce dětí a rodin. Živé koncerty oblíbených dětských interpretů, interaktivní aktivity, vzdělávací zóny a zábavní atrakce.

Skákací hrady, malování na obličej, jízdy vláčkem, balónkové aktivity, klauni, maskoti, kolotoče, kontaktní zoo, pěnové party, trampolíny a mnoho dalšího!!!

Organizátoři kladou důraz na vytváření nezapomenutelných rodinných zážitků prostřednictvím hudby, zábavy a vzdělávání. Stáhněte si aplikaci Fesťáček pro aktuální informace o festivalu.`,
    image: 'https://tvujticket.cz/wp-content/uploads/2026/02/ostrava-26.jpg',
    gallery: [],
    tickets: [
      {
        id: 't4-1',
        name: '3. vlna',
        price: 599,
        originalPrice: 299,
        features: ['Vstup na festival', 'Přístup ke všem zónám', 'Všechny atrakce v ceně'],
        available: 200,
        total: 800,
        purchaseUrl: 'https://tvujticket.cz/festacek-ostrava-2026',
      },
      {
        id: 't4-2',
        name: 'Na místě',
        price: 650,
        features: ['Vstup na festival', 'Přístup ke všem zónám', 'Všechny atrakce v ceně'],
        available: 300,
        total: 300,
        purchaseUrl: 'https://tvujticket.cz/festacek-ostrava-2026',
      },
    ],
    lineup: [
      { name: 'Karol a Kvído', genre: 'Dětský program', image: 'https://festacekfestival.cz/wp-content/uploads/2024/08/karolkvido-1024x1024.png' },
      { name: 'Štístko a Poupěnka', genre: 'Dětský program', image: 'https://festacekfestival.cz/wp-content/uploads/2024/08/stistkopoupenka-min-1024x1024.png' },
      { name: 'Bibi Bum', genre: 'Dětský program', image: 'https://festacekfestival.cz/wp-content/uploads/2025/10/bibibum-1024x1024.png' },
      { name: 'Míša Růžičková', genre: 'Dětský program', image: 'https://festacekfestival.cz/wp-content/uploads/2025/03/misa-ruzuickova-1.png' },
    ],
    status: 'on-sale',
    totalCapacity: 3000,
    ticketsSold: 2130,
    featured: false,
    faq: [
      { question: 'Je festival vhodný pro malé děti?', answer: 'Ano! Festival je určen pro děti všech věkových kategorií. Nejmenší děti do 3 let mají vstup zdarma.' },
      { question: 'Co je v ceně vstupenky?', answer: 'Vstupenka zahrnuje vstup na festival, přístup ke všem zónám a atrakcím včetně skákacích hradů, trampolín, kolotočů a dalších aktivit.' },
      { question: 'Mohu přinést vlastní jídlo?', answer: 'Vlastní jídlo a pití není povoleno. Na festivalu je k dispozici food court s nabídkou pro děti i dospělé.' },
    ],
  },
];

export function getEventBySlug(slug: string): EventData | undefined {
  return events.find((e) => e.slug === slug);
}

export function getFeaturedEvent(): EventData {
  return events.find((e) => e.featured) || events[0];
}

export function getUpcomingEvents(): EventData[] {
  return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getRelatedEvents(currentId: string, limit = 3): EventData[] {
  return events.filter((e) => e.id !== currentId).slice(0, limit);
}
