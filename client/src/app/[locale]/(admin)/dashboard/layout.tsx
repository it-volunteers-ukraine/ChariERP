import { DashboardAside, DashboardHeader } from '@/components';

import { ChildrenProps } from '@/types';

export default async function Layout({ children }: ChildrenProps) {
  return (
    <div className="flex h-dvh">
      <DashboardAside />

      <div className="flex flex-col w-[calc(100vw-290px)]">
        <DashboardHeader />

        <div className="w-full h-full overflow-y-auto bg-boardHeader">{children}</div>
      </div>
    </div>
  );
}
