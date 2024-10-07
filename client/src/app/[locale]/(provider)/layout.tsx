import { ChildrenProps } from '@/types';
import { LoaderAdminProvider, UserProvider } from '@/context';
import { DashboardAside, DashboardHeader } from '@/components';

export default async function Layout({ children }: ChildrenProps) {
  return (
    <UserProvider>
      <div className="flex h-dvh overflow-hidden">
        <DashboardAside />

        <div className="flex max-w-full flex-1 flex-col bg-whiteSecond desktop:max-w-[calc(100%-290px)]">
          <DashboardHeader />

          <LoaderAdminProvider>{children}</LoaderAdminProvider>
        </div>
      </div>
    </UserProvider>
  );
}
