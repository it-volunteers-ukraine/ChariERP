import { Input } from '@/components';

export default function Home() {
  return (
    <>
      <div className="flex w-full h-full flex-col items-center justify-center p-10">
        <Input label="Логин" error="1" name="Input1" />
        <Input label="Login" error="" name="Input1" />
      </div>
    </>
  );
}
