import Link from 'next/link';
import Image from 'next/image';

import { Cube } from '@/assets/img';

import { contactLinks, IMessengerMock } from './messengerMock';

export const Messenger = ({ title, link, icon: IconSVG }: IMessengerMock) => {
  const finalLink = Object.keys(contactLinks).find((key) => contactLinks[key] === contactLinks[title])
    ? `${contactLinks[title]}`
    : `https://www.${link}`;

  return (
    <div className="tablet:w-[49%] desktop:w-auto">
      <div className="flex gap-2">
        <div className="relative">
          <Image src={Cube} alt="cubeImg" className="laptop:w-24 pointer-events-none block w-20 select-none" />

          <div className="laptop:right-7 laptop:top-9 absolute top-[28px] right-[22px]">
            <IconSVG className="laptop:scale-[120%] pointer-events-none select-none" />
          </div>
        </div>
        <div>
          <h3 className="font-scada laptop:text-2xl pointer-events-none pt-2 pb-4 text-[18px] font-bold uppercase first-line:select-none">
            {title}
          </h3>

          <Link
            href={finalLink}
            target="_blank"
            className="easy-in-out font-scada laptop:text-[18px] text-[14px] leading-[17px] font-normal text-[#1D1B20] uppercase underline transition-all duration-300 hover:text-[#2C73AC]"
          >
            {link}
          </Link>
        </div>
      </div>
    </div>
  );
};
