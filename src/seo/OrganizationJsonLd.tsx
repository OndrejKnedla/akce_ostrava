import { Helmet } from 'react-helmet-async';

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RESTARTSTAGE PRODUCTION - FZCO, odštěpný závod',
    alternateName: 'AKCE OSTRAVA!!!',
    url: 'https://akceostrava.cz',
    logo: 'https://akceostrava.cz/favicon.svg',
    taxID: 'IČO: 22161104',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Žitná 562/10, Nové Město',
      addressLocality: 'Praha',
      postalCode: '120 00',
      addressCountry: 'CZ',
    },
    sameAs: [
      'https://www.instagram.com/restartstage_production/',
      'https://www.facebook.com/profile.php?id=61569886395898',
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
