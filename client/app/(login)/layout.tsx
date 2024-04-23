import { ChildrenProps } from '@/types';
import { Header, AuthLinks } from '@/components';

export default async function Layout({ children }: ChildrenProps) {
  return (
    <>
      <Header />

      <main className="bg-bgAuthGradient py-10 tablet:px-8 h-[calc(100vh-61px)] desktop:h-[calc(100vh-64px)]">
        <div className="max-w-[1168px] mx-auto">
          <AuthLinks />

          <div className="bg-white py-16 px-4 tablet:rounded-b-3xl shadow-auth">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
