import { AboutUsMain } from '@/assets/img';
import Image from 'next/image';

export const Card = () => {
  return (
    <div className="relative h-[208px] w-[156px] overflow-hidden rounded-bl-[28px] rounded-br-[36px] rounded-tl-[20px] rounded-tr-[20px] bg-bgSubCardTeam pl-2 pt-2 tablet:h-[286px] tablet:w-[218px] tablet:rounded-bl-[42px] tablet:rounded-tl-[32px] tablet:rounded-tr-[32px] tablet:pl-3 tablet:pt-3 desktop:h-[338px] desktop:w-[256px]">
      <div className="clip-angled absolute left-[7px] top-0 h-[27px] w-[150px] bg-bgDecorCardTeam tablet:left-[10px] tablet:h-[38px] tablet:w-[209px] desktop:h-[45px] desktop:w-[245px]"></div>
      <div className="relative h-full w-full rounded-2xl bg-bgCardTeam px-3 py-4 text-center tablet:rounded-3xl tablet:p-5 desktop:py-6">
        <Image
          alt="Photo"
          src={AboutUsMain}
          className="mx-auto mb-3 h-[68px] w-[68px] rounded-full object-cover tablet:mb-6 tablet:h-[102px] tablet:w-[102px] desktop:mb-9 desktop:h-[142] desktop:w-[142]"
        />
        <p className="mb-3 font-scada text-[13px] font-bold uppercase leading-4 text-dark-blue tablet:mb-4 tablet:text-[16px] tablet:leading-[20px] desktop:text-[20px] desktop:leading-[24px]">
          роман <br /> Кириченко
        </p>
        <p className="text-[14px] leading-4 text-midGray tablet:text-[16px] tablet:leading-[20px] desktop:text-[20px] desktop:leading-[24px]">
          Головний нероба та пригнічувач новачків
        </p>
      </div>
    </div>
  );
};
