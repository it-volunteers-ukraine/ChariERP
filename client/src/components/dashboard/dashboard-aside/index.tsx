'use client';
import { NavItem } from './item';

import { Logo } from '@/components';
import { Tablet } from '@/assets/icons';

export const DashboardAside = () => {
  return (
    <aside className="h-full bg-boardAside max-w-[290px] w-full">
      <div className="flex items-center w-full h-24 border-b border-b-white pl-[40px]">
        <Logo logoClass="!w-[124px] h-[34px]" />
      </div>

      <nav className="p-[44px_36px] flex flex-col">
        <NavItem href="/" text="Заявки" Icon={Tablet} />

        <NavItem href="/asd" text="Заявки" Icon={Tablet} />

        <NavItem disabled href="/" text="Заявки" Icon={Tablet} />
      </nav>
    </aside>
  );
};
