import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import cs from './locales/cs.json';
import en from './locales/en.json';
import pl from './locales/pl.json';
import uk from './locales/uk.json';
import sk from './locales/sk.json';

i18n.use(initReactI18next).init({
  resources: {
    cs: { translation: cs },
    en: { translation: en },
    pl: { translation: pl },
    uk: { translation: uk },
    sk: { translation: sk },
  },
  lng: 'cs',
  fallbackLng: 'cs',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
