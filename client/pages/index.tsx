import { DashboardAside, DashboardHeader, Header, Input } from '@/components';

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center w-full h-full p-10">
        <Input label="Логин" error="1" />
        <Input label="Login" error="" />
      </div>

      <div className="flex h-dvh">
        <DashboardAside />
        <div className="flex flex-col w-[calc(100vw-290px)]">
          <DashboardHeader />
          <div className="w-full h-full overflow-y-auto"></div>
        </div>
      </div>
    </>
  );
}
