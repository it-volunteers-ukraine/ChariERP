'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getStyles } from './styles';

interface ILinks {
  text: string;
  href: string;
}
export const Links = ({ text, href }: ILinks) => {
  const pathname = usePathname();

  const active = pathname === href;

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
