'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { Roles } from '@/types';
import { routes } from '@/constants';
import { Exit } from '@/assets/icons';
import { useUserInfo } from '@/context';
import { useWindowWidth } from '@/hooks';
import { clearUserCookies } from '@/utils';
import { LanguageSwitcher } from '@/components';

import { Avatar } from '../avatar';
import { getLinksByRole } from '../dashboard-aside/config';

export const DashboardHeader = () => {
  const router = useRouter();
  const path = usePathname();
  const userInfo = useUserInfo();
  const { isLaptop } = useWindowWidth();
  const linkText = useTranslations('sidebar');

  const links = getLinksByRole((key, params) => linkText(key, params), userInfo.role);

  const onExit = () => {
    clearUserCookies();
    router.push(routes.home);
  };

  const isActiveLink = (link: { href: string }) => path.includes(link.href);

  const titleNav = links.find(isActiveLink) || links.flatMap((link) => link.children || []).find(isActiveLink);

  const getUserTitle = () => {
    if (userInfo.role === Roles.ADMIN) {
      return Roles.ADMIN;
    }

    if (userInfo.role === Roles.MANAGER || userInfo.role === Roles.USER) {
      const firstName = userInfo.firstName || 'Manager';
      const lastNameInitial = userInfo.lastName?.[0] || '';

      return `${firstName} ${lastNameInitial}.`;
    }

    return '';
  };

  return (
    <header className="bg-white-second desktopXl:px-0 w-full px-[16px] pl-[60px]">
      <div className="desktop:h-24 desktopXl:mx-8 flex h-[64px] items-center justify-between">
        <span className="font-scada text-light-blue text-[20px] font-normal">{titleNav?.title}</span>

        <div className="flex gap-6">
          <Avatar img={null} name={isLaptop ? getUserTitle() : ''} />

          {isLaptop && (
            <>
              <Exit
                onClick={onExit}
                className="text-light-blue h-6 w-6 cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-md"
              />

              <LanguageSwitcher isNarrow />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
