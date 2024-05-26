import { Header } from '@/components';
import { ChildrenProps } from '@/types';

export default async function Layout({ children }: ChildrenProps) {
  return (
    <>
      <Header />
      <main className="mt-[61px] desktop:mt-[68px]">{children}</main>
    </>
  );
}
