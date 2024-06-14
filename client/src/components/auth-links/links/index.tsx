'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getStyles } from './styles';

interface ILinks {
  text: string;
  href: string;
}

// TODO: Add hover animation
export const Links = ({ text, href }: ILinks) => {
  const pathname = usePathname();

  const styles = getStyles({
    active: pathname === href,
  });

  return (
    <Link href={href} className={`${styles.link}`}>
      <span className="z-20 text-inherit">{text}</span>
      <div className={styles.overlay} />
    </Link>
  );
};
