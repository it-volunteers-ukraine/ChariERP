import { Header, Input } from '@/components';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex w-full h-full flex-col items-center justify-center p-10">
        <Input
          label="Довідка про внесення в реєстр"
          error="1"
          placeholder="Placeholder"
          placeholderItalic
        />
        <Input label="Login" error="" placeholder="Placeholder" />
        <Input
          label="Login"
          error=""
          placeholder="Placeholder"
          type="password"
        />
        <Input
          label="Login"
          error=""
          placeholder="Placeholder"
          disabled
          info="adfasdfasdf asdfas ad fsdaf"
        />
      </div>
    </div>
  );
}
