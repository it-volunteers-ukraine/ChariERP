import { ChildrenProps } from '@/types';
import { DashboardAside, DashboardHeader } from '@/components';
import { LoaderAdminProvider, UserProvider, BoardsProvider } from '@/context';

export default async function Layout({ children }: ChildrenProps) {
  return (
    <UserProvider>
      <BoardsProvider>
        <div className="flex h-dvh overflow-hidden">
          <DashboardAside />

          <div className="flex max-w-full flex-1 flex-col bg-whiteSecond desktop:max-w-[calc(100%-290px)]">
            <DashboardHeader />

            <LoaderAdminProvider>{children}</LoaderAdminProvider>
          </div>
        </div>
      </BoardsProvider>
    </UserProvider>
  );
}
