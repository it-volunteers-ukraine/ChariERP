import { ChildrenProps } from '@/types';
import { Footer, Header } from '@/components';

export default async function Layout({ children }: ChildrenProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
