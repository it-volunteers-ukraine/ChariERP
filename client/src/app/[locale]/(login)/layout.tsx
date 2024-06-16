'use client';
import { usePathname } from 'next/navigation';

import { routes } from '@/constants';
import { Header, AuthLinks } from '@/components';
import { ChildrenProps, LocalizationProps } from '@/types';

import { getStyles } from './styles';

export default function Layout({ children }: ChildrenProps<LocalizationProps>) {
  const pathname = usePathname();
  const styles = getStyles(
    pathname === routes.login,
    pathname === routes.registration,
  );

  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className={styles.wrapper}>
          <AuthLinks />

          <div className={styles.children}>{children}</div>
        </div>
      </main>
    </>
  );
}
