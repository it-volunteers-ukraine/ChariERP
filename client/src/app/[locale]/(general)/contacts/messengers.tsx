import Link from 'next/link';
import Image from 'next/image';

import { Cube } from '@/assets/img';

import { contactLinks, IMessengerMock } from './messengerMock';

export const Messenger = ({ title, link, icon: IconSVG }: IMessengerMock) => {
  const finalLink = Object.keys(contactLinks).find((key) => contactLinks[key] === contactLinks[title])
    ? `${contactLinks[title]}`
    : `https://www.${link}`;

  return (
    <div className="tablet:w-[48%] desktop:w-auto">
      <div className="flex gap-2">
        <div className="relative">
          <Image src={Cube} alt="cubeImg" className="pointer-events-none block w-20 select-none laptop:w-24" />

          <div className="absolute right-[23px] top-[28px] laptop:right-7 laptop:top-9">
            <IconSVG className="pointer-events-none select-none laptop:scale-[120%]" />
          </div>
        </div>
        <div>
          <h3 className="pointer-events-none pb-4 font-scada text-[18px] font-bold uppercase first-line:select-none laptop:text-2xl">
            {title}
          </h3>

          <Link
            href={finalLink}
            target="_blank"
            className="easy-in-out font-scada text-[14px] font-[400] uppercase leading-[17px] text-[#1D1B20] underline transition-all duration-300 hover:text-[#2C73AC] laptop:text-xl"
          >
            {link}
          </Link>
        </div>
      </div>
    </div>
  );
};
