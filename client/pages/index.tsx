import { Header, Input } from '@/components';

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center w-full h-full p-10">
        <Input label="Логин" error="1" />
        <Input label="Login" error="" />
      </div>
    </>
  );
}
