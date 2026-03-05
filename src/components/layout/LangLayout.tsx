import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { langFromPath } from '@/i18n/routes';
import App from '@/App';

export function LangLayout() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const lang = langFromPath(location.pathname);

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
  }, [lang, i18n]);

  return <App />;
}
