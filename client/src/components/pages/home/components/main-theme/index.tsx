import React from 'react';
import Image from 'next/image';

import { MainThemeBg } from '@/assets/img';

import { Modal } from './modal';

export const MainTheme = () => {
  return (
    <div className="relative mb-[96px] overflow-hidden tablet:mb-[88px] laptop:mb-[96px] desktop:mb-[106px] desktopXl:mb-[120px]">
      <Image
        alt="bg"
        priority={true}
        src={MainThemeBg}
        className="min-h-[248px] tablet:min-h-[323px] tablet:min-w-full laptop:min-h-[416px] desktop:min-h-[calc(100vh-64px)]"
      />

      <div className="absolute inset-0 flex h-full items-center justify-center">
        <Modal />
      </div>
    </div>
  );
};
