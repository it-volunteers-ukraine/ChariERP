import { cookies } from 'next/headers';

import { ChildrenProps } from '@/types';
import { Footer, Header } from '@/components';
import { isValidObjectId } from '@/middleware';

export default async function Layout({ children }: ChildrenProps) {
  const cookieStore = cookies();
  const id = cookieStore.get('id')?.value || '';
  const isLoggedIn = isValidObjectId(id);

  return (
    <div className="scroll-blue flex h-screen flex-col overflow-y-auto">
      <Header isLoggedIn={isLoggedIn} />
      <main className="flex-grow">{children}</main>
      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
}
