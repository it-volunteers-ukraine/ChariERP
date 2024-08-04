import { ChildrenProps } from '@/types';
import { RoleProvider } from '@/context';
import { DashboardAside, DashboardHeader } from '@/components';

export default async function Layout({ children }: ChildrenProps) {
  return (
    <RoleProvider>
      <div className="flex h-dvh bg-boardHeader overflow-hidden">
        <DashboardAside />

        <div className="flex flex-col flex-1 bg-white scroll-blue overflow-y-auto">
          <DashboardHeader />

          {children}
        </div>
      </div>
    </RoleProvider>
  );
}
