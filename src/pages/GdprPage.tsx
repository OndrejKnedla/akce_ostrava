import { SeoHead } from '@/seo/SeoHead';
import { SplitText } from '@/components/ui/SplitText';
import { PageTransition } from '@/components/layout/PageTransition';
import { useLocale } from '@/i18n/useLocale';

export default function GdprPage() {
  const { t } = useLocale();

  return (
    <PageTransition>
      <SeoHead
        title={t('gdprPage.seoTitle')}
        description={t('gdprPage.seoDesc')}
        canonical="https://akceostrava.cz/gdpr"
      />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-ostrava-blue to-ostrava-blue/80 text-center">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase text-white">
          <SplitText text={t('gdprPage.title')} />
          <span className="text-ostrava-cyan">!!!</span>
        </h1>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 prose-ostrava">
          <p className="text-ostrava-blue/50 text-sm mb-8">{t('gdprPage.lastUpdated')}</p>

          <h2>1. Správce osobních údajů</h2>
          <p>
            Správcem osobních údajů je společnost RESTARTSTAGE PRODUCTION - FZCO, odštěpný závod, IČO: 22161104,
            se sídlem Žitná 562/10, Nové Město, 120 00 Praha 2 (dále jen „správce"). Správce zpracovává osobní údaje v souladu
            s Nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR) a zákonem č. 110/2019 Sb.,
            o zpracování osobních údajů.
          </p>

          <h2>2. Jaké údaje zpracováváme</h2>
          <p>Zpracováváme následující kategorie osobních údajů:</p>
          <ul>
            <li><strong>Identifikační údaje:</strong> jméno, příjmení</li>
            <li><strong>Kontaktní údaje:</strong> e-mailová adresa, telefonní číslo</li>
            <li><strong>Údaje o nákupu:</strong> informace o zakoupených vstupenkách, platební údaje</li>
            <li><strong>Technické údaje:</strong> IP adresa, typ prohlížeče, cookies (viz sekce Cookies)</li>
          </ul>

          <h2>3. Účel zpracování</h2>
          <p>Osobní údaje zpracováváme pro tyto účely:</p>
          <ul>
            <li><strong>Plnění smlouvy:</strong> zpracování objednávek vstupenek, komunikace ohledně zakoupených akcí</li>
            <li><strong>Oprávněný zájem:</strong> zasílání informací o podobných akcích, zlepšování služeb, prevence podvodů</li>
            <li><strong>Právní povinnost:</strong> vedení účetní a daňové evidence</li>
            <li><strong>Souhlas:</strong> zasílání marketingových sdělení (pouze s výslovným souhlasem)</li>
          </ul>

          <h2>4. Doba uchovávání</h2>
          <p>
            Osobní údaje uchováváme pouze po dobu nezbytně nutnou k naplnění účelu zpracování:
          </p>
          <ul>
            <li>Údaje o nákupu: 10 let (zákonná povinnost)</li>
            <li>Kontaktní údaje pro marketing: do odvolání souhlasu</li>
            <li>Údaje z kontaktního formuláře: 1 rok od posledního kontaktu</li>
            <li>Technické údaje (cookies): dle nastavení cookies</li>
          </ul>

          <h2>5. Příjemci údajů</h2>
          <p>
            Osobní údaje mohou být sdíleny s těmito kategoriemi příjemců:
          </p>
          <ul>
            <li>Prodejci vstupenek (TicketLive, RestarTicket)</li>
            <li>Poskytovatelé platebních služeb</li>
            <li>Poskytovatelé analytických nástrojů (Vercel Analytics)</li>
            <li>Orgány veřejné moci (pokud to vyžaduje zákon)</li>
          </ul>

          <h2>6. Vaše práva</h2>
          <p>Jako subjekt údajů máte právo:</p>
          <ul>
            <li><strong>Právo na přístup:</strong> získat informace o zpracování svých údajů</li>
            <li><strong>Právo na opravu:</strong> požádat o opravu nepřesných údajů</li>
            <li><strong>Právo na výmaz:</strong> požádat o smazání údajů (pokud není zpracování nezbytné)</li>
            <li><strong>Právo na omezení zpracování:</strong> požádat o omezení zpracování</li>
            <li><strong>Právo na přenositelnost:</strong> získat údaje ve strukturovaném formátu</li>
            <li><strong>Právo vznést námitku:</strong> proti zpracování na základě oprávněného zájmu</li>
            <li><strong>Právo odvolat souhlas:</strong> kdykoliv, bez dopadu na zákonnost předchozího zpracování</li>
          </ul>
          <p>
            Svá práva můžete uplatnit prostřednictvím kontaktního formuláře na stránce akceostrava.cz/kontakt.
          </p>

          <h2>7. Cookies</h2>
          <p>
            Webové stránky akceostrava.cz používají cookies pro zajištění správné funkčnosti webu
            a analýzu návštěvnosti. Používáme:
          </p>
          <ul>
            <li><strong>Nezbytné cookies:</strong> zajišťují základní funkce webu (nelze deaktivovat)</li>
            <li><strong>Analytické cookies:</strong> pomáhají nám porozumět, jak návštěvníci web používají (Vercel Analytics)</li>
          </ul>
          <p>
            Nastavení cookies můžete změnit v nastavení svého prohlížeče.
          </p>

          <h2>8. Zabezpečení údajů</h2>
          <p>
            Přijímáme přiměřená technická a organizační opatření k ochraně osobních údajů před
            neoprávněným přístupem, ztrátou, zničením nebo poškozením. Webové stránky používají
            šifrované připojení (HTTPS).
          </p>

          <h2>9. Dozorový úřad</h2>
          <p>
            V případě, že se domníváte, že zpracování vašich osobních údajů porušuje vaše práva,
            máte právo podat stížnost u Úřadu pro ochranu osobních údajů (www.uoou.cz).
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
