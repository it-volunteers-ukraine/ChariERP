import Link from 'next/link';
import Image from 'next/image';

import { Cube } from '@/assets/img';

import { IMessengerMock } from './messengerMock';

export const Messenger = ({ title, link, icon: IconSVG }: IMessengerMock) => {
  return (
    <div className="tablet:w-[48%] desktop:w-auto">
      <div className="flex gap-2">
        <div className="relative">
          <Image src={Cube} alt="cubeImg" className="block w-20 laptop:w-24" />

          <div className="absolute right-[23px] top-[28px] laptop:right-7 laptop:top-9">
            <IconSVG className="laptop:scale-[120%]" />
          </div>
        </div>
        <div>
          <h3 className="pb-4 font-scada text-[18px] font-bold uppercase laptop:text-2xl">{title}</h3>

          <Link
            href={link}
            className="easy-in-out font-scada text-[14px] font-[400] uppercase leading-[17px] text-[#1D1B20] underline transition-all duration-300 hover:text-[#2C73AC] laptop:text-xl"
          >
            {link}
          </Link>
        </div>
      </div>
    </div>
  );
};
