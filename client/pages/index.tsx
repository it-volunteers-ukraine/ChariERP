import { Header, Input } from '@/components';

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex w-full h-full flex-col items-center justify-center p-10">
        <Input label="Логин" error="1" />
        <Input label="Login" error="" />
      </div>
    </>
  );
}
