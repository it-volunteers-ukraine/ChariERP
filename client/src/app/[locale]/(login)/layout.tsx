'use client';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { routes } from '@/constants';
import { Header, AuthLinks } from '@/components';
import { ChildrenProps, LocalizationProps } from '@/types';

export default function Layout({
  children,
  params: { locale },
}: ChildrenProps<LocalizationProps>) {
  const pathname = usePathname();

  const styles = clsx(
    'flex flex-col justify-center items-center w-full bg-white py-16 px-4 tablet:rounded-b-3xl shadow-auth',
    { 'tablet:rounded-tl-3xl': pathname === routes.login },
    { 'tablet:rounded-tr-3xl': pathname === routes.registration },
  );

  return (
    <>
      <Header />

      <main className="bg-bgAuthGradient py-10 tablet:px-8 h-[calc(100vh-61px)] desktop:h-[calc(100vh-64px)]">
        <div className="max-w-[1168px] mx-auto">
          <AuthLinks locale={locale} />

          <div className={styles}>{children}</div>
        </div>
      </main>
    </>
  );
}