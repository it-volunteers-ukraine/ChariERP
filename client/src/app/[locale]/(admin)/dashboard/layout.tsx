import { DashboardAside, DashboardHeader } from '@/components';

import { ChildrenProps } from '@/types';

export default async function Layout({ children }: ChildrenProps) {
  return (
    <div className="flex h-dvh bg-boardHeader overflow-hidden">
      <DashboardAside />

      <div className="flex flex-col flex-1">
        <DashboardHeader />

        {children}
      </div>
    </div>
  );
}
