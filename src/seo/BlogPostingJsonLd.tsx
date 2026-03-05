import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { langFromPath } from '@/i18n/routes';

interface BlogPostingJsonLdProps {
  title: string;
  description: string;
  datePublished: string;
  image: string;
  url: string;
  keywords: string[];
  wordCount: number;
  section: string;
}

export function BlogPostingJsonLd({
  title,
  description,
  datePublished,
  image,
  url,
  keywords,
  wordCount,
  section,
}: BlogPostingJsonLdProps) {
  const location = useLocation();
  const lang = langFromPath(location.pathname);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished,
    image,
    url,
    keywords: keywords.join(', '),
    wordCount,
    articleSection: section,
    inLanguage: lang,
    author: {
      '@type': 'Organization',
      name: 'RESTARTSTAGE PRODUCTION - FZCO, odštěpný závod',
      url: 'https://akceostrava.cz',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AKCE OSTRAVA!!!',
      url: 'https://akceostrava.cz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://akceostrava.cz/favicon.svg',
      },
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
