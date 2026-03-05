export const SUPPORTED_LANGS = ['cs', 'en', 'uk', 'sk'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: Lang = 'cs';

export const LANG_LABELS: Record<Lang, string> = {
  cs: 'CZ',
  en: 'EN',
  uk: 'UA',
  sk: 'SK',
};

export const LOCALE_MAP: Record<Lang, string> = {
  cs: 'cs_CZ',
  en: 'en_US',
  uk: 'uk_UA',
  sk: 'sk_SK',
};

export const HTML_LANG_MAP: Record<Lang, string> = {
  cs: 'cs',
  en: 'en',
  uk: 'uk',
  sk: 'sk',
};

/** Route path segments per language */
export const ROUTE_MAP: Record<Lang, Record<string, string>> = {
  cs: {
    home: '',
    events: 'akce',
    event: 'akce/:slug',
    blog: 'blog',
    blogPost: 'blog/:slug',
    contact: 'kontakt',
    terms: 'obchodni-podminky',
    gdpr: 'gdpr',
    about: 'o-nas',
    faq: 'faq',
  },
  en: {
    home: '',
    events: 'events',
    event: 'events/:slug',
    blog: 'blog',
    blogPost: 'blog/:slug',
    contact: 'contact',
    terms: 'terms',
    gdpr: 'gdpr',
    about: 'about',
    faq: 'faq',
  },
  uk: {
    home: '',
    events: 'akce',
    event: 'akce/:slug',
    blog: 'blog',
    blogPost: 'blog/:slug',
    contact: 'kontakt',
    terms: 'gdpr',
    gdpr: 'gdpr',
    about: 'pro-nas',
    faq: 'faq',
  },
  sk: {
    home: '',
    events: 'akcie',
    event: 'akcie/:slug',
    blog: 'blog',
    blogPost: 'blog/:slug',
    contact: 'kontakt',
    terms: 'obchodne-podmienky',
    gdpr: 'gdpr',
    about: 'o-nas',
    faq: 'faq',
  },
};
