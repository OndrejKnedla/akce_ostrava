#!/usr/bin/env python3
"""
Czech to Slovak automatic translation for blog articles.
Czech and Slovak are mutually intelligible, so word-level substitutions work well.
"""
import json
import re

# Czech -> Slovak word/phrase replacements (ordered by length to avoid partial matches)
REPLACEMENTS = [
    # Common phrases first
    ("v Ostravě", "v Ostrave"),
    ("v České republice", "v Českej republike"),
    ("na koncertě", "na koncerte"),
    ("na festivale", "na festivale"),
    ("na hradě", "na hrade"),
    ("ve městě", "v meste"),
    ("v centru", "v centre"),
    ("v okolí", "v okolí"),
    ("v historii", "v histórii"),
    ("se těšit", "sa tešiť"),
    ("se blíží", "sa blíži"),
    ("se koná", "sa koná"),
    ("se stala", "sa stala"),
    ("se stal", "sa stal"),
    ("se vrací", "sa vracia"),
    ("se může", "sa môže"),
    ("se dá", "sa dá"),
    ("se vyplatí", "sa vyplatí"),
    ("si užít", "si užiť"),
    ("si nenechat", "si nenechať"),
    ("je to", "je to"),

    # Verb endings and forms
    ("nabízí", "ponúka"),
    ("nabídka", "ponuka"),
    ("nabídku", "ponuku"),
    ("potřebujete", "potrebujete"),
    ("potřebuje", "potrebuje"),
    ("doporučujeme", "odporúčame"),
    ("doporučení", "odporúčanie"),
    ("představujeme", "predstavujeme"),
    ("najdete", "nájdete"),
    ("můžete", "môžete"),
    ("získáte", "získate"),
    ("zjistíte", "zistíte"),
    ("přinášíme", "prinášame"),
    ("přináší", "prináša"),
    ("vybírat", "vyberať"),
    ("vyberte", "vyberte"),
    ("podívejte", "pozrite"),
    ("podívat", "pozrieť"),
    ("připravili", "pripravili"),
    ("připravit", "pripraviť"),
    ("připravte", "pripravte"),
    ("nezapomeňte", "nezabudnite"),
    ("kupovat", "kupovať"),
    ("koupit", "kúpiť"),
    ("kupte", "kúpte"),
    ("stojí", "stojí"),
    ("patří", "patrí"),
    ("přijet", "prísť"),
    ("přijít", "prísť"),
    ("navštívit", "navštíviť"),

    # Nouns
    ("průvodce", "sprievodca"),
    ("Průvodce", "Sprievodca"),
    ("přehled", "prehľad"),
    ("Přehled", "Prehľad"),
    ("vstupenky", "vstupenky"),
    ("vstupenka", "vstupenka"),
    ("vstupenek", "vstupeniek"),
    ("vstupenkách", "vstupenkách"),
    ("návštěvník", "návštevník"),
    ("návštěvníků", "návštevníkov"),
    ("návštěvníky", "návštevníkov"),
    ("zážitek", "zážitok"),
    ("zážitky", "zážitky"),
    ("zážitků", "zážitkov"),
    ("koncertů", "koncertov"),
    ("koncerty", "koncerty"),
    ("koncert", "koncert"),
    ("festivalů", "festivalov"),
    ("festivalech", "festivaloch"),
    ("festivaly", "festivaly"),
    ("festival", "festival"),
    ("vystoupení", "vystúpenie"),
    ("vystoupil", "vystúpil"),
    ("umělec", "umelec"),
    ("umělců", "umelcov"),
    ("umělci", "umelci"),
    ("umělce", "umelcov"),
    ("kapela", "kapela"),
    ("kapely", "kapely"),
    ("kapel", "kapiel"),
    ("příběh", "príbeh"),
    ("Příběh", "Príbeh"),
    ("historie", "história"),
    ("Historie", "História"),
    ("sezóna", "sezóna"),
    ("sezóny", "sezóny"),
    ("léto", "leto"),
    ("letní", "letné"),
    ("podzimní", "jesenné"),
    ("podzim", "jeseň"),
    ("zimní", "zimné"),
    ("jarní", "jarné"),
    ("místo", "miesto"),
    ("místě", "mieste"),
    ("místa", "miesta"),
    ("místech", "miestach"),
    ("budoucnost", "budúcnosť"),
    ("Budoucnost", "Budúcnosť"),
    ("tradice", "tradícia"),
    ("Tradice", "Tradícia"),

    # Adjectives
    ("nejlepší", "najlepší"),
    ("největší", "najväčší"),
    ("nejoblíbenější", "najobľúbenejší"),
    ("nejkrásnější", "najkrajší"),
    ("nejznámější", "najznámejší"),
    ("nejnavštěvovanější", "najnavštevovanejší"),
    ("kompletní", "kompletný"),
    ("Kompletní", "Kompletný"),
    ("kulturní", "kultúrny"),
    ("Kulturní", "Kultúrny"),
    ("kulturního", "kultúrneho"),
    ("kulturním", "kultúrnym"),
    ("živé", "živej"),
    ("živou", "živú"),
    ("české", "české"),
    ("českých", "českých"),
    ("český", "český"),
    ("slovenské", "slovenské"),
    ("slovenský", "slovenský"),
    ("unikátní", "unikátny"),
    ("industriální", "industriálny"),
    ("rodinné", "rodinné"),

    # Pronouns and prepositions
    ("který", "ktorý"),
    ("která", "ktorá"),
    ("které", "ktoré"),
    ("kterou", "ktorú"),
    ("kterým", "ktorým"),
    ("kterých", "ktorých"),
    ("proč", "prečo"),
    ("Proč", "Prečo"),
    ("protože", "pretože"),
    ("také", "tiež"),
    ("Také", "Tiež"),
    ("ještě", "ešte"),
    ("Ještě", "Ešte"),
    ("právě", "práve"),
    ("pouze", "iba"),
    ("Pouze", "Iba"),
    ("přímo", "priamo"),
    ("opravdu", "naozaj"),
    ("samozřejmě", "samozrejme"),
    ("většinou", "väčšinou"),
    ("během", "počas"),
    ("Během", "Počas"),
    ("kromě", "okrem"),
    ("Kromě", "Okrem"),
    ("například", "napríklad"),
    ("Například", "Napríklad"),
    ("zejména", "najmä"),
    ("Zejména", "Najmä"),

    # Common word endings (careful with these)
    ("ční ", "čný "),
    ("ální ", "álny "),

    # Conjunctions
    ("a také", "a tiež"),
    ("ale", "ale"),
    ("nebo", "alebo"),
    ("Nebo", "Alebo"),
    ("takže", "takže"),
    ("pokud", "ak"),
    ("Pokud", "Ak"),
    ("jestli", "ak"),
    ("zda", "či"),

    # Time expressions
    ("dnes", "dnes"),
    ("včera", "včera"),
    ("zítra", "zajtra"),
    ("letos", "tento rok"),
    ("příští rok", "budúci rok"),
    ("každý rok", "každý rok"),

    # Common verbs
    ("říká", "hovorí"),
    ("říci", "povedať"),
    ("oznámit", "oznámiť"),
    ("začíná", "začína"),
    ("končí", "končí"),
    ("probíhá", "prebieha"),
    ("existuje", "existuje"),
    ("vznikla", "vznikla"),
    ("vznikl", "vznikol"),
    ("vydal", "vydal"),
    ("vydala", "vydala"),
    ("zpívá", "spieva"),
    ("zpívat", "spievať"),
    ("hrát", "hrať"),
    ("hraje", "hrá"),
    ("tančit", "tancovať"),
    ("tančí", "tancuje"),

    # Blog-specific
    ("Čtěte dále", "Čítajte ďalej"),
    ("čtěte dále", "čítajte ďalej"),
    ("Přečtěte si", "Prečítajte si"),
    ("přečtěte si", "prečítajte si"),
    ("Tip:", "Tip:"),
    ("klíčová slova", "kľúčové slová"),
    ("Klíčová slova", "Kľúčové slová"),
    ("související články", "súvisiace články"),
    ("Související články", "Súvisiace články"),
    ("článek", "článok"),
    ("článku", "článku"),
    ("článků", "článkov"),
    ("články", "články"),
]

def translate_text(text):
    """Apply Czech->Slovak replacements to text."""
    result = text
    for cz, sk in REPLACEMENTS:
        result = result.replace(cz, sk)
    return result

def translate_article(article):
    """Translate a single article from Czech to Slovak."""
    translated = dict(article)
    translated['title'] = translate_text(article['title'])
    translated['metaDescription'] = translate_text(article['metaDescription'])
    translated['excerpt'] = translate_text(article['excerpt'])
    translated['keywords'] = [translate_text(kw) for kw in article['keywords']]
    translated['body'] = translate_text(article['body'])
    return translated

def main():
    with open('src/data/blog-articles.json', 'r', encoding='utf-8') as f:
        articles = json.load(f)

    translated = [translate_article(a) for a in articles]

    with open('src/data/blog-articles-sk.json', 'w', encoding='utf-8') as f:
        json.dump(translated, f, ensure_ascii=False, indent=2)

    print(f"Translated {len(translated)} articles to Slovak")

    # Show some examples
    for a in translated[:3]:
        print(f"  {a['id']}: {a['title'][:60]}...")

if __name__ == '__main__':
    main()
