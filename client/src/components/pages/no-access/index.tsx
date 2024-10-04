'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { Button } from '@/components';
import { Lock } from '@/assets/icons';
import { NoAccessBG } from '@/assets/img';

export const NoAccess = () => {
  const router = useRouter();
  const text = useTranslations('modal');
  const btn = useTranslations('button');

  return (
    <>
      <div className="fixed h-full w-full blur-sm bg-white overflow-hidden">
        <Image src={NoAccessBG} alt="bg" objectFit="none" className="min-w-[1630px]" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col gap-8 p-[32px_20px] mx-[16px] w-full max-w-[416px] bg-white drop-shadow-modal rounded-[8px]">
          <Lock width={48} height={48} className="m-auto" />

          <span className="text-center">{text('modalUserWithoutAccess.text')}</span>

          <Button
            text={btn('goToAllBoards')}
            className="w-[221px] uppercase m-auto"
            onClick={() => router.push(routes.managerDashboards)}
          />
        </div>
      </div>
    </>
  );
};
