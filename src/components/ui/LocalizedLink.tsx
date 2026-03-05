import { Link, type LinkProps } from 'react-router-dom';
import { useLocale } from '@/i18n/useLocale';
import { DEFAULT_LANG } from '@/i18n/config';

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
}

/**
 * A Link that automatically prepends the current language prefix.
 * Paths starting with http/https or # are passed through unchanged.
 * For cs (default), no prefix is added.
 */
export function LocalizedLink({ to, ...rest }: LocalizedLinkProps) {
  const { lang } = useLocale();

  let href = to;
  if (!to.startsWith('http') && !to.startsWith('#') && !to.startsWith('mailto:')) {
    if (lang !== DEFAULT_LANG) {
      // Avoid double prefixing
      if (!to.startsWith(`/${lang}/`) && to !== `/${lang}`) {
        href = `/${lang}${to.startsWith('/') ? '' : '/'}${to}`;
      }
    }
  }

  return <Link to={href} {...rest} />;
}
