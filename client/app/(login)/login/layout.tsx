import { Header } from '@/components';
import { ChildrenProps } from '@/types';

export default async function Layout({ children }: ChildrenProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
