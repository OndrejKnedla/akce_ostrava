import { useNavigate, useLocation } from 'react-router-dom';
import { SUPPORTED_LANGS, LANG_LABELS, type Lang } from '@/i18n/config';
import { langFromPath, switchLangPath } from '@/i18n/routes';
import { cn } from '@/utils/cn';

interface LanguageSwitcherProps {
  scrolled?: boolean;
  mobile?: boolean;
}

/** Inline SVG flags — render identically on Windows, Linux, macOS */
function Flag({ lang, className }: { lang: Lang; className?: string }) {
  const size = 24;
  const cls = cn('inline-block rounded-[3px] shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]', className);

  switch (lang) {
    // Czech Republic 🇨🇿
    case 'cs':
      return (
        <svg viewBox="0 0 640 480" width={size} height={size * 0.75} className={cls} aria-hidden="true">
          <path fill="#fff" d="M0 0h640v240H0z" />
          <path fill="#d7141a" d="M0 240h640v240H0z" />
          <path fill="#11457e" d="M0 0l320 240L0 480z" />
        </svg>
      );
    // United Kingdom 🇬🇧
    case 'en':
      return (
        <svg viewBox="0 0 640 480" width={size} height={size * 0.75} className={cls} aria-hidden="true">
          <path fill="#012169" d="M0 0h640v480H0z" />
          <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
          <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
          <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
          <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
        </svg>
      );
    // Ukraine 🇺🇦
    case 'uk':
      return (
        <svg viewBox="0 0 640 480" width={size} height={size * 0.75} className={cls} aria-hidden="true">
          <path fill="#0057B7" d="M0 0h640v240H0z" />
          <path fill="#FFD700" d="M0 240h640v240H0z" />
        </svg>
      );
    // Slovakia 🇸🇰
    case 'sk':
      return (
        <svg viewBox="0 0 640 480" width={size} height={size * 0.75} className={cls} aria-hidden="true">
          <path fill="#fff" d="M0 0h640v160H0z" />
          <path fill="#0b4ea2" d="M0 160h640v160H0z" />
          <path fill="#ee1c25" d="M0 320h640v160H0z" />
          <path fill="#fff" d="M233 370.8c-43-20.7-104.6-61.9-104.6-143.2 0-81.4 3.2-114.8 3.2-114.8h202.8s3.2 33.4 3.2 114.8c0 81.3-61.6 122.5-104.6 143.2z" />
          <path fill="#ee1c25" d="M233 360c-39.2-18.9-95.4-56.4-95.4-130.5 0-74.2 2.9-104.7 2.9-104.7h185s2.9 30.5 2.9 104.7c0 74.1-56.2 111.6-95.4 130.5z" />
          <path fill="#fff" d="M233 263.4c-12.8 0-27.5-25.5-45.5-25.5-18 0-24.8 15.8-24.8 15.8s10.7-7 22.7-7c12 0 26 18.5 47.6 18.5s35.6-18.5 47.6-18.5c12 0 22.7 7 22.7 7s-6.8-15.8-24.8-15.8c-18 0-32.7 25.5-45.5 25.5z" />
          <path fill="#0b4ea2" d="M203.5 193.4h59v16h-59z" />
          <path fill="#0b4ea2" d="M225 171.9h16v59h-16z" />
          <path fill="#fff" d="M233 303c-12.8 0-27.5-25.5-45.5-25.5-18 0-24.8 15.8-24.8 15.8s10.7-7 22.7-7c12 0 26 18.5 47.6 18.5s35.6-18.5 47.6-18.5c12 0 22.7 7 22.7 7s-6.8-15.8-24.8-15.8c-18 0-32.7 25.5-45.5 25.5z" />
        </svg>
      );
  }
}

export function LanguageSwitcher({ scrolled = false, mobile = false }: LanguageSwitcherProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLang = langFromPath(location.pathname);

  const handleSwitch = (lang: Lang) => {
    if (lang === currentLang) return;
    const newPath = switchLangPath(location.pathname, lang);
    navigate(newPath);
  };

  return (
    <div className={cn('flex items-center', mobile ? 'gap-3' : 'gap-1.5')}>
      {SUPPORTED_LANGS.map((lang) => (
        <button
          key={lang}
          onClick={() => handleSwitch(lang)}
          className={cn(
            'flex items-center gap-1.5 transition-all rounded-md',
            mobile ? 'px-3 py-2' : 'px-1.5 py-1',
            currentLang === lang
              ? 'opacity-100 ring-2 ring-ostrava-cyan/50 scale-110'
              : 'opacity-60 hover:opacity-100 hover:scale-105',
          )}
          aria-label={`Switch to ${LANG_LABELS[lang]}`}
        >
          <Flag lang={lang} />
          {mobile && (
            <span className={cn(
              'font-heading text-sm uppercase tracking-wider',
              currentLang === lang ? 'text-ostrava-cyan' : 'text-white/70'
            )}>
              {LANG_LABELS[lang]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
