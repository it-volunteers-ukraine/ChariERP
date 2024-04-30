'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Locale } from '@/types';
import { Helpers } from '@/utils';

import { getStyles } from './styles';

interface ILinks {
  text: string;
  href: string;
  locale: Locale;
}

// TODO: Add hover animation
export const Links = ({ text, href, locale }: ILinks) => {
  const pathname = usePathname();

  const active = pathname === Helpers.getPathname(locale, href);

  const styles = getStyles({
    active,
  });

  return (
    <Link href={href} className={`${styles.link}`}>
      <span className="z-20 text-inherit">{text}</span>
      <div className={styles.overlay} />
    </Link>
  );
};
