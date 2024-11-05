import { ChildrenProps } from '@/types';
import { Footer, Header } from '@/components';

export default async function Layout({ children }: ChildrenProps) {
  return (
    <div className="scroll-blue flex h-screen flex-col overflow-y-auto">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
