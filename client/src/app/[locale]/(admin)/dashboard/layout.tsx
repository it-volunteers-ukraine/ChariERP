import { ChildrenProps } from '@/types';
import { RoleProvider } from '@/context';
import { DashboardAside, DashboardHeader } from '@/components';

export default async function Layout({ children }: ChildrenProps) {
  return (
    <RoleProvider>
      <div className="flex h-dvh">
        <DashboardAside />

        <div className="flex flex-col w-[calc(100vw-290px)]">
          <DashboardHeader />

          <div className="w-full h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </RoleProvider>
  );
}
