'use client';
import Image from 'next/image';

import { MainThemeBg } from '@/assets/img';

import { scrollItemsData } from './mock';
import { Modal, ScrollItem } from './components';

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

      <div className="flex flex-col gap-[96px] tablet:gap-[120px] laptop:gap-[168px] desktop:gap-[216px] desktopXl:gap-[288px]">
        <div className="flex w-full flex-col gap-6 overflow-hidden px-4 tablet:gap-[56px] tablet:px-8 laptop:gap-16 desktop:px-[136px] desktopXl:gap-24 desktopXl:px-[86px]">
          <h1 className="mx-auto text-center font-scada text-[24px] font-bold uppercase leading-[120%] text-dark-blue tablet:text-[32px] laptop:text-[36px] desktop:text-[50px]">
            Наша ERP система спеціально розроблена для потреб громадських організацій
          </h1>

          {scrollItemsData.map((item, index) => (
            <ScrollItem key={item.id} text={item.text} number={item.id} isEven={index % 2 === 1} />
          ))}
        </div>
      </div>
    </>
  );
};
