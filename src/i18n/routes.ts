import { ROUTE_MAP, DEFAULT_LANG, SUPPORTED_LANGS, type Lang } from './config';

/**
 * Build a localized path for a given route key.
 * e.g. localePath('events', 'en') → '/en/events'
 *      localePath('events', 'cs') → '/akce'
 *      localePath('event', 'en', { slug: 'foo' }) → '/en/events/foo'
 */
export function localePath(
  routeKey: string,
  lang: Lang,
  params?: Record<string, string>,
): string {
  const segment = ROUTE_MAP[lang]?.[routeKey] ?? ROUTE_MAP[DEFAULT_LANG][routeKey] ?? routeKey;
  let path = segment;

  // Replace :slug etc with actual params
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, value);
    }
  }

  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  return `${prefix}/${path}`;
}

/**
 * Detect the lang from a pathname.
 * /en/events → 'en', /akce → 'cs'
 */
export function langFromPath(pathname: string): Lang {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first && SUPPORTED_LANGS.includes(first as Lang) && first !== DEFAULT_LANG) {
    return first as Lang;
  }
  return DEFAULT_LANG;
}

/**
 * Given a current pathname, find the equivalent path in the target language.
 */
export function switchLangPath(pathname: string, targetLang: Lang): string {
  const currentLang = langFromPath(pathname);

  // Strip lang prefix to get the "bare" path
  let bare = pathname;
  if (currentLang !== DEFAULT_LANG) {
    bare = pathname.replace(new RegExp(`^/${currentLang}`), '') || '/';
  }

  // Find which route key matches in the current language
  const currentRoutes = ROUTE_MAP[currentLang];
  const targetRoutes = ROUTE_MAP[targetLang];

  for (const [key, pattern] of Object.entries(currentRoutes)) {
    const regexStr = '^/' + pattern.replace(':slug', '([^/]+)') + '$';
    const match = bare.match(new RegExp(regexStr));
    if (match) {
      let targetPath = targetRoutes[key] || pattern;
      // Replace :slug with captured value
      if (match[1]) {
        targetPath = targetPath.replace(':slug', match[1]);
      }
      const prefix = targetLang === DEFAULT_LANG ? '' : `/${targetLang}`;
      return `${prefix}/${targetPath}`;
    }
  }

  // Homepage check
  if (bare === '/' || bare === '') {
    return targetLang === DEFAULT_LANG ? '/' : `/${targetLang}`;
  }

  // Fallback — just swap prefix
  const prefix = targetLang === DEFAULT_LANG ? '' : `/${targetLang}`;
  return `${prefix}${bare}`;
}
