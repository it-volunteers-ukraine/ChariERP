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
      <div className="relative h-full w-full overflow-hidden bg-white">
        <div className="fixed blur-[7px]">
          <Image src={NoAccessBG} priority={true} alt="bg" className="min-w-[1630px]" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-[16px] flex w-full max-w-[416px] flex-col gap-8 rounded-[8px] bg-white p-[32px_20px] drop-shadow-modal">
            <Lock width={48} height={48} className="m-auto" />

            <span className="text-center">{text('modalUserWithoutAccess.text')}</span>

            <Button
              text={btn('goToAllBoards')}
              className="m-auto w-[221px] uppercase"
              onClick={() => router.push(routes.managerDashboards)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
