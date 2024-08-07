'use client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { Exit } from '@/assets/icons';
import { useWindowWidth } from '@/hooks';
import { LanguageSwitcher } from '@/components';

import { Avatar } from '../avatar';

export const DashboardHeader = () => {
  const router = useRouter();
  const { isMobile } = useWindowWidth();

  const onExit = () => {
    Cookies.remove('id');
    router.push('/');
  };

  return (
    <header className="w-full bg-whiteSecond px-[32px] desktopXl:px-0">
      <div className="h-[96px] desktopXl:mx-8 flex items-center justify-between ">
        <span className="font-scada text-lightBlue text-[20px] font-normal">Main Page</span>

        <div className="flex gap-6">
          {!isMobile && <Avatar img={null} name="Super_admin1" />}

          <Exit
            onClick={onExit}
            className="w-6 h-6 transition-all duration-300 cursor-pointer text-lightBlue hover:scale-110 hover:drop-shadow-md"
          />

          <LanguageSwitcher isNarrow className="flex" />
        </div>
      </div>
    </header>
  );
};
