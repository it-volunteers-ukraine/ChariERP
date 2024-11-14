'use client';
import Image from 'next/image';

import { MainThemeBg } from '@/assets/img';

import { ForNGOs, Modal, OpportunityChariCircle, RevealOnScroll } from './components';

export const HomePage = () => {
  return (
    <>
      <div className="relative mb-[96px] overflow-hidden tablet:mb-[88px] laptop:mb-[96px] desktop:mb-[106px] desktopXl:mb-[120px]">
        <Image
          alt="bg"
          priority={true}
          src={MainThemeBg}
          className="laptop::min-h-[416px] min-h-[248px] min-w-[490px] object-cover tablet:min-h-[323px] tablet:min-w-full desktop:min-h-[604px] desktopXl:min-h-[740px]"
        />

        <div className="absolute inset-0 flex h-full items-center justify-center">
          <Modal onClick={() => {}} />
        </div>
      </div>

      <div className="m-auto flex max-w-[1920px] flex-col gap-[96px] overflow-hidden">
        <RevealOnScroll />

        <OpportunityChariCircle />

        <ForNGOs />
      </div>
    </>
  );
};
