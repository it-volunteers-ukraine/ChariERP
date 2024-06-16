'use client';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { routes } from '@/constants';
import { Header, AuthLinks } from '@/components';
import { ChildrenProps, LocalizationProps } from '@/types';

export default function Layout({ children }: ChildrenProps<LocalizationProps>) {
  const pathname = usePathname();

  const styles = clsx(
    'flex flex-col justify-center items-center w-full bg-white pt-9 desktop:pt-14 pb-14 desktop:pb-16 px-4 tablet:px-10 desktopXl:px-8 tablet:rounded-b-3xl shadow-auth',
    {
      'tablet:rounded-tl-3xl': pathname === routes.login,
    },
    {
      'tablet:rounded-tr-3xl': pathname === routes.registration,
    },
  );

  return (
    <>
      <Header />

      <main className="bg-bgAuthGradient pt-10 tablet:p-[40px_0_50px] desktopXl:p-[40px_0_112px] tablet:px-8 min-h-[calc(100vh-61px)] desktop:min-h-[calc(100vh-68px)]">
        <div className="max-w-[1168px] mx-auto">
          <AuthLinks />

          <div className={styles}>{children}</div>
        </div>
      </main>
    </>
  );
}
