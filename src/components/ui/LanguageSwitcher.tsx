import { useNavigate, useLocation } from 'react-router-dom';
import { SUPPORTED_LANGS, LANG_LABELS, type Lang } from '@/i18n/config';
import { langFromPath, switchLangPath } from '@/i18n/routes';
import { cn } from '@/utils/cn';

interface LanguageSwitcherProps {
  scrolled?: boolean;
  mobile?: boolean;
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
    <div className={cn('flex items-center', mobile ? 'gap-3' : 'gap-1')}>
      {SUPPORTED_LANGS.map((lang, i) => (
        <span key={lang} className="flex items-center">
          <button
            onClick={() => handleSwitch(lang)}
            className={cn(
              'font-heading text-xs uppercase tracking-wider transition-colors',
              mobile ? 'px-3 py-2 rounded-lg text-sm' : 'px-1.5 py-0.5',
              currentLang === lang
                ? mobile
                  ? 'text-ostrava-cyan bg-white/10'
                  : 'text-ostrava-cyan'
                : mobile
                  ? 'text-white/60 hover:text-white'
                  : scrolled
                    ? 'text-ostrava-blue/40 hover:text-ostrava-blue'
                    : 'text-white/40 hover:text-white'
            )}
            aria-label={`Switch to ${LANG_LABELS[lang]}`}
          >
            {LANG_LABELS[lang]}
          </button>
          {!mobile && i < SUPPORTED_LANGS.length - 1 && (
            <span className={cn('text-xs mx-0.5', scrolled ? 'text-ostrava-blue/20' : 'text-white/20')}>|</span>
          )}
        </span>
      ))}
    </div>
  );
}
