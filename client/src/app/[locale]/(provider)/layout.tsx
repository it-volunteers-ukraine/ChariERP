import { ChildrenProps } from '@/types';
import { DashboardAside, DashboardHeader } from '@/components';
import { LoaderAdminProvider, UserProvider, BoardsProvider } from '@/context';

export default async function Layout({ children }: ChildrenProps) {
  return (
    <UserProvider>
      <BoardsProvider>
        <div className="flex h-dvh overflow-hidden">
          <DashboardAside />

          <div className="bg-white-second desktop:max-w-[calc(100%-290px)] flex max-w-full flex-1 flex-col">
            <DashboardHeader />

            <LoaderAdminProvider>{children}</LoaderAdminProvider>
          </div>
        </div>
      </BoardsProvider>
    </UserProvider>
  );
}
