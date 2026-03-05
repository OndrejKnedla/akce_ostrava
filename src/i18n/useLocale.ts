import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { langFromPath, localePath as lp } from './routes';
import type { Lang } from './config';

export function useLocale() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const lang = langFromPath(location.pathname) as Lang;

  const locPath = (routeKey: string, params?: Record<string, string>) =>
    lp(routeKey, lang, params);

  return { t, i18n, lang, localePath: locPath };
}
