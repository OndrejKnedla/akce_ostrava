#!/usr/bin/env python3
"""
Czech to Ukrainian translation for blog articles.
Uses a comprehensive phrase/word dictionary for the most common blog terms.
"""
import json
import re

# Czech -> Ukrainian dictionary
PHRASES = [
    # Section headers and common blog phrases
    ("## Závěr", "## Висновок"),
    ("## Shrnutí", "## Підсумок"),
    ("## Co čekat", "## Чого очікувати"),
    ("## Kde koupit vstupenky", "## Де купити квитки"),
    ("## Jak se dostat", "## Як дістатися"),
    ("## Program", "## Програма"),
    ("## Line-up", "## Лайн-ап"),
    ("## Historie", "## Історія"),
    ("## Tipy", "## Поради"),
    ("## FAQ", "## FAQ"),
    ("## Praktické informace", "## Практична інформація"),

    # Common phrases
    ("v Ostravě", "в Остраві"),
    ("v České republice", "у Чеській республіці"),
    ("na koncertě", "на концерті"),
    ("na festivale", "на фестивалі"),
    ("ve městě", "у місті"),
    ("v centru", "у центрі"),
    ("v okolí", "в околицях"),
    ("v historii", "в історії"),
    ("na hradě", "на замку"),
    ("na Slezskoostravském hradě", "на Slezskoostravský hrad"),

    # Verbs and verb phrases
    ("se těšit", "чекати з нетерпінням"),
    ("se koná", "відбувається"),
    ("se vrací", "повертається"),
    ("nabízí", "пропонує"),
    ("nabídka", "пропозиція"),
    ("potřebujete", "потрібно"),
    ("doporučujeme", "рекомендуємо"),
    ("najdete", "знайдете"),
    ("můžete", "можете"),
    ("získáte", "отримаєте"),
    ("přinášíme", "представляємо"),
    ("přináší", "приносить"),
    ("nezapomeňte", "не забудьте"),
    ("koupit", "купити"),
    ("navštívit", "відвідати"),
    ("začíná", "починається"),
    ("končí", "закінчується"),
    ("probíhá", "проходить"),
    ("zpívá", "співає"),
    ("zpívat", "співати"),
    ("hraje", "грає"),
    ("hrát", "грати"),
    ("tančí", "танцює"),
    ("tančit", "танцювати"),
    ("říká", "каже"),
    ("existuje", "існує"),
    ("patří", "належить"),

    # Nouns
    ("průvodce", "путівник"),
    ("Průvodce", "Путівник"),
    ("přehled", "огляд"),
    ("Přehled", "Огляд"),
    ("vstupenky", "квитки"),
    ("vstupenka", "квиток"),
    ("vstupenek", "квитків"),
    ("návštěvník", "відвідувач"),
    ("návštěvníků", "відвідувачів"),
    ("zážitek", "враження"),
    ("zážitky", "враження"),
    ("koncertů", "концертів"),
    ("koncerty", "концерти"),
    ("koncert", "концерт"),
    ("Koncert", "Концерт"),
    ("festivalů", "фестивалів"),
    ("festivaly", "фестивалі"),
    ("festival", "фестиваль"),
    ("Festival", "Фестиваль"),
    ("vystoupení", "виступ"),
    ("umělec", "артист"),
    ("umělců", "артистів"),
    ("umělci", "артисти"),
    ("kapela", "гурт"),
    ("kapely", "гурти"),
    ("kapel", "гуртів"),
    ("příběh", "історія"),
    ("Příběh", "Історія"),
    ("historie", "історія"),
    ("Historie", "Історія"),
    ("sezóna", "сезон"),
    ("sezóny", "сезону"),
    ("léto", "літо"),
    ("letní", "літній"),
    ("podzimní", "осінній"),
    ("podzim", "осінь"),
    ("zimní", "зимовий"),
    ("jarní", "весняний"),
    ("místo", "місце"),
    ("místa", "місця"),
    ("hudba", "музика"),
    ("Hudba", "Музика"),
    ("hudbu", "музику"),
    ("hudby", "музики"),
    ("píseň", "пісня"),
    ("písně", "пісні"),
    ("písničky", "пісеньки"),
    ("hity", "хіти"),
    ("hit", "хіт"),
    ("hitů", "хітів"),
    ("show", "шоу"),
    ("scéna", "сцена"),
    ("scéně", "сцені"),
    ("pódium", "сцена"),
    ("zvuk", "звук"),
    ("světlo", "світло"),
    ("světla", "світло"),
    ("diváků", "глядачів"),
    ("diváci", "глядачі"),
    ("divák", "глядач"),
    ("fanoušků", "фанатів"),
    ("fanoušci", "фанати"),
    ("fanoušek", "фанат"),
    ("tradice", "традиція"),
    ("budoucnost", "майбутнє"),
    ("Budoucnost", "Майбутнє"),
    ("článek", "стаття"),
    ("článku", "статті"),
    ("články", "статті"),

    # Adjectives
    ("nejlepší", "найкращий"),
    ("největší", "найбільший"),
    ("nejoblíbenější", "найпопулярніший"),
    ("nejkrásnější", "найкрасивіший"),
    ("nejznámější", "найвідоміший"),
    ("kompletní", "повний"),
    ("Kompletní", "Повний"),
    ("kulturní", "культурний"),
    ("Kulturní", "Культурний"),
    ("živé", "живої"),
    ("živou", "живу"),
    ("unikátní", "унікальний"),
    ("rodinné", "сімейні"),

    # Pronouns and prepositions
    ("který", "який"),
    ("která", "яка"),
    ("které", "які"),
    ("kterou", "яку"),
    ("proč", "чому"),
    ("Proč", "Чому"),
    ("protože", "тому що"),
    ("také", "також"),
    ("Také", "Також"),
    ("ještě", "ще"),
    ("pouze", "лише"),
    ("Pouze", "Лише"),
    ("přímo", "прямо"),
    ("například", "наприклад"),
    ("Například", "Наприклад"),
    ("zejména", "особливо"),
    ("Zejména", "Особливо"),
    ("během", "під час"),
    ("Během", "Під час"),
    ("kromě", "крім"),
    ("Kromě", "Крім"),
    ("nebo", "або"),
    ("Nebo", "Або"),
    ("pokud", "якщо"),
    ("Pokud", "Якщо"),
    ("ale", "але"),
    ("Ale", "Але"),
    ("takže", "тому"),
    ("dnes", "сьогодні"),
    ("Dnes", "Сьогодні"),

    # Numbers and time
    ("rok", "рік"),
    ("roku", "року"),
    ("let", "років"),
    ("měsíc", "місяць"),
    ("den", "день"),
    ("dní", "днів"),
    ("hodina", "година"),
    ("minut", "хвилин"),
    ("cena", "ціна"),
    ("ceny", "ціни"),
    ("cen", "цін"),
    ("Kč", "Kč"),

    # Blog UI
    ("Čtěte dále", "Читайте далі"),
    ("čtěte dále", "читайте далі"),
    ("Přečtěte si", "Прочитайте"),
    ("přečtěte si", "прочитайте"),
    ("Tip:", "Порада:"),
    ("klíčová slova", "ключові слова"),
    ("související články", "пов'язані статті"),
]

def translate_text(text):
    """Apply Czech->Ukrainian replacements to text."""
    result = text
    for cz, uk in PHRASES:
        result = result.replace(cz, uk)
    return result

def translate_article(article):
    """Translate a single article from Czech to Ukrainian."""
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

    with open('src/data/blog-articles-uk.json', 'w', encoding='utf-8') as f:
        json.dump(translated, f, ensure_ascii=False, indent=2)

    print(f"Translated {len(translated)} articles to Ukrainian")
    for a in translated[:3]:
        print(f"  {a['id']}: {a['title'][:60]}...")

if __name__ == '__main__':
    main()
