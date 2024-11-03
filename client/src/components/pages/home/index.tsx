import React from 'react';
import Image from 'next/image';

import { MainThemeBg } from '@/assets/img';

import { Modal } from './components';

export const HomePage = () => {
  return (
    <>
      <div className="relative overflow-hidden">
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
    </>
  );
};
