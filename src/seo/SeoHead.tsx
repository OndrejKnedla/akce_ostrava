import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SUPPORTED_LANGS, LOCALE_MAP, HTML_LANG_MAP, DEFAULT_LANG } from '@/i18n/config';
import { langFromPath, switchLangPath } from '@/i18n/routes';

const SITE_NAME = 'AKCE OSTRAVA!!!';
const SITE_URL = 'https://akceostrava.cz';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;

interface SeoHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noindex?: boolean;
  article?: {
    publishedTime: string;
    section: string;
    tags: string[];
  };
  keywords?: string;
}

export function SeoHead({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage,
  noindex,
  article,
  keywords,
}: SeoHeadProps) {
  const location = useLocation();
  const lang = langFromPath(location.pathname);
  const locale = LOCALE_MAP[lang];
  const htmlLang = HTML_LANG_MAP[lang];

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical || `${SITE_URL}${location.pathname}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />

      {/* Hreflang alternates */}
      {SUPPORTED_LANGS.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={HTML_LANG_MAP[l]}
          href={`${SITE_URL}${switchLangPath(location.pathname, l)}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${switchLangPath(location.pathname, DEFAULT_LANG)}`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article OG */}
      {article && <meta property="article:published_time" content={article.publishedTime} />}
      {article && <meta property="article:section" content={article.section} />}
      {article?.tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
    </Helmet>
  );
}
