'use client';
import { Exit } from '@/assets/icons';

import { Avatar } from '../avatar';

export const DashboardHeader = () => {
  const onExit = () => {
    console.log('Exit');
  };

  return (
    <header className="w-full bg-boardHeader px-[32px] desktopXl:px-0">
      <div className="h-[96px] desktopXl:mx-8 flex items-center justify-between ">
        <span className="font-scada text-lightBlue text-[20px] font-normal">
          Main Page
        </span>

        <div className="flex gap-6">
          <Avatar img={null} name="Super_admin1" />

          <Exit
            onClick={onExit}
            className="w-6 h-6 transition-all duration-300 cursor-pointer text-lightBlue hover:scale-110 hover:drop-shadow-md"
          />
        </div>
      </div>
    </header>
  );
};
