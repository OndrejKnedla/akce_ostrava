import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'AKCE OSTRAVA!!!';
const SITE_URL = 'https://akceostrava.cz';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;
const DEFAULT_LOCALE = 'cs_CZ';

interface SeoHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noindex?: boolean;
  // Article-specific
  article?: {
    publishedTime: string;
    section: string;
    tags: string[];
  };
  // Extra meta
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
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical || undefined;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={DEFAULT_LOCALE} />

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
