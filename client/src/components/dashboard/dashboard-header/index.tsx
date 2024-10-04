'use client';

import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { Exit } from '@/assets/icons';
import { useUserInfo } from '@/context';
import { useWindowWidth } from '@/hooks';
import { LanguageSwitcher } from '@/components';

import { Avatar } from '../avatar';
import { getLinksByRole } from '../dashboard-aside/config';

export const DashboardHeader = () => {
  const router = useRouter();
  const path = usePathname();
  const { role } = useUserInfo();
  const { isTablet } = useWindowWidth();
  const linkText = useTranslations('sidebar');

  const links = getLinksByRole((key, params) => linkText(key, params), role);

  const onExit = () => {
    Cookies.remove('id');
    router.push('/');
  };

  const titleNav = links.find(({ href }) => path.includes(href));

  return (
    <header className="w-full bg-whiteSecond px-[16px] pl-[60px] desktopXl:px-0">
      <div className="flex h-[64px] items-center justify-between desktop:h-24 desktopXl:mx-8">
        <span className="font-scada text-[20px] font-normal text-lightBlue">{titleNav?.text}</span>

        <div className="flex gap-6">
          <Avatar img={null} name="Super_admin1" />

          {isTablet && (
            <>
              <Exit
                onClick={onExit}
                className="h-6 w-6 cursor-pointer text-lightBlue transition-all duration-300 hover:scale-110 hover:drop-shadow-md"
              />

              <LanguageSwitcher isNarrow />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
