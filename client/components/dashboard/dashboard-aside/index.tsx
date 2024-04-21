import { NavItem } from './item';

import { Logo } from '@/components';
import { DashboardIcon } from '@/assets/icons';

export const DashboardAside = ({}) => {
  return (
    <aside className="h-full bg-boardAside max-w-[290px] w-full">
      <div className="flex items-center w-full h-24 border-b border-b-white pl-[40px]">
        <Logo className="!w-[124px] h-[34px]" />
      </div>

      <nav className="p-[44px_36px] flex flex-col">
        <NavItem
          text="Заявки"
          Icon={DashboardIcon.NavBarIcon.Tablet}
          href="/"
        />
        <NavItem
          text="Заявки"
          Icon={DashboardIcon.NavBarIcon.Tablet}
          href="/asd"
        />
        <NavItem
          disabled
          href="/"
          text="Заявки"
          Icon={DashboardIcon.NavBarIcon.Tablet}
        />
      </nav>
    </aside>
  );
};
