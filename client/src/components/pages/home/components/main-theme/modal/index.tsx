import { useTranslations } from 'next-intl';

import { routes } from '@/constants';
import { Button } from '@/components';
import { useRouter } from 'next/navigation';

export const Modal = () => {
  const router = useRouter();
  const btn = useTranslations('button');
  const modal = useTranslations('modal');
  const projectName = useTranslations('projectName');

  return (
    <div className="flex h-[180px] w-[286px] flex-col items-center justify-between rounded-[40px] border border-ebb/[.46] bg-ebb/[.63] p-[16px_24px] shadow-dashboard backdrop-blur-md tablet:h-[234px] tablet:w-[579px] tablet:p-[24px_32px] laptop:h-[282px] laptop:w-[643px] laptop:p-[32px_64px] desktop:h-[320px] desktop:w-[900px] desktop:p-[42.5px_80px]">
      <div className="flex flex-col justify-between gap-2 tablet:gap-6">
        <h1 className="text-center font-scada text-[24px] font-bold uppercase leading-[120%] text-dark-blue tablet:text-[32px] laptop:text-[50px] desktop:text-[64px]">
          {projectName('CHARIeRp')}
        </h1>

        <p className="text-center font-scada text-[14px] font-bold leading-[120%] text-darkGray tablet:text-[20px] laptop:text-[24px]">
          {modal('homePageModal.text')}
        </p>
      </div>
      <Button onClick={() => router.push(routes.aboutService)} text={btn('learnMore')} className="uppercase" />
    </div>
  );
};
