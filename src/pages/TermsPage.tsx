import { Helmet } from 'react-helmet-async';
import { SplitText } from '@/components/ui/SplitText';
import { PageTransition } from '@/components/layout/PageTransition';

export default function TermsPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Obchodní podmínky | AKCE OSTRAVA!!!</title>
        <meta name="description" content="Obchodní podmínky RESTARTSTAGE PRODUCTION s.r.o. pro nákup vstupenek na akce v Ostravě." />
      </Helmet>

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-ostrava-blue to-ostrava-blue/80 text-center">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase text-white">
          <SplitText text="Obchodní podmínky" />
          <span className="text-ostrava-cyan">!!!</span>
        </h1>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 prose-ostrava">
          <p className="text-ostrava-blue/50 text-sm mb-8">Poslední aktualizace: 1. 3. 2026</p>

          <h2>1. Úvodní ustanovení</h2>
          <p>
            Tyto obchodní podmínky (dále jen „podmínky") upravují práva a povinnosti mezi společností
            RESTARTSTAGE PRODUCTION - FZCO, odštěpný závod, IČO: 22161104, se sídlem Žitná 562/10, Nové Město, 120 00 Praha 2 (dále jen „pořadatel"),
            a kupujícím vstupenek na kulturní akce organizované pořadatelem (dále jen „zákazník").
          </p>
          <p>
            Zakoupením vstupenky zákazník potvrzuje, že se s těmito podmínkami seznámil a souhlasí s nimi.
          </p>

          <h2>2. Vstupenky a nákup</h2>
          <p>
            Vstupenky jsou prodávány prostřednictvím autorizovaných prodejních kanálů uvedených na webových stránkách akceostrava.cz.
            Každá vstupenka je platná pouze pro konkrétní akci, datum a místo uvedené na vstupence.
          </p>
          <p>
            Cena vstupenky je uvedena včetně DPH. Pořadatel si vyhrazuje právo měnit ceny vstupenek
            do okamžiku jejich zakoupení zákazníkem.
          </p>

          <h2>3. Platební podmínky</h2>
          <p>
            Platbu za vstupenky je možné provést online platební kartou, bankovním převodem nebo
            dalšími způsoby uvedenými v nákupním procesu. Vstupenka je platná po připsání platby.
          </p>

          <h2>4. Storno a vrácení vstupenek</h2>
          <p>
            Zakoupené vstupenky nelze vrátit ani vyměnit, pokud není uvedeno jinak. V případě zrušení
            akce ze strany pořadatele bude zákazníkům vrácena plná cena vstupenky.
          </p>
          <p>
            Při změně termínu akce zůstávají vstupenky platné pro nový termín. Zákazník, který se
            nemůže nového termínu zúčastnit, má právo požádat o vrácení vstupného do 14 dnů od
            oznámení změny.
          </p>

          <h2>5. Podmínky účasti na akci</h2>
          <p>
            Zákazník je povinen dodržovat pokyny pořadatele a bezpečnostní pravidla místa konání.
            Pořadatel si vyhrazuje právo odmítnout vstup osobám pod vlivem alkoholu nebo návykových
            látek, osobám s nebezpečnými předměty nebo osobám, které narušují průběh akce.
          </p>
          <p>
            Na akci může být pořizován obrazový a zvukový záznam. Účastí na akci zákazník souhlasí
            s případným použitím záznamu pro propagační účely pořadatele.
          </p>

          <h2>6. Odpovědnost</h2>
          <p>
            Pořadatel nenese odpovědnost za škody na majetku či zdraví účastníků způsobené jejich
            vlastním zaviněním nebo zaviněním třetích osob. Pořadatel doporučuje nepřinášet na akci
            cenné předměty.
          </p>

          <h2>7. Změna programu</h2>
          <p>
            Pořadatel si vyhrazuje právo na změnu programu, vystupujících nebo časového harmonogramu
            akce. O podstatných změnách bude zákazník informován prostřednictvím e-mailu nebo
            webových stránek.
          </p>

          <h2>8. Reklamace</h2>
          <p>
            Reklamace je možné uplatnit prostřednictvím kontaktního formuláře na stránce
            akceostrava.cz/kontakt nebo e-mailem. Reklamace bude vyřízena do 30 dnů od jejího obdržení.
          </p>

          <h2>9. Závěrečná ustanovení</h2>
          <p>
            Tyto podmínky se řídí právním řádem České republiky. Pořadatel si vyhrazuje právo
            tyto podmínky kdykoliv změnit. Aktuální znění je vždy dostupné na webových stránkách
            akceostrava.cz.
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
