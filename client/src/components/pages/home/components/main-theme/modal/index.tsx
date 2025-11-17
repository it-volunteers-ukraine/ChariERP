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
    <div className="border-ebb/46 bg-ebb/63 shadow-dashboard tablet:h-[234px] tablet:w-[579px] tablet:p-[24px_32px] laptop:h-[282px] laptop:w-[643px] laptop:p-[32px_64px] desktop:h-[320px] desktop:w-[900px] desktop:p-[42.5px_80px] flex h-[180px] w-[286px] flex-col items-center justify-between rounded-[40px] border p-[16px_24px] backdrop-blur-md">
      <div className="tablet:gap-6 flex flex-col justify-between gap-2">
        <h1 className="font-scada text-dark-blue tablet:text-[32px] laptop:text-[50px] desktop:text-[64px] text-center text-2xl leading-[120%] font-bold uppercase">
          {projectName('CHARIeRp')}
        </h1>

        <p className="font-scada text-dark-gray tablet:text-[20px] laptop:text-2xl text-center text-sm leading-[120%] font-bold">
          {modal('homePageModal.text')}
        </p>
      </div>

      <Button onClick={() => router.push(routes.aboutService)} text={btn('learnMore')} className="uppercase" />
    </div>
  );
};
