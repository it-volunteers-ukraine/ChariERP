'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { BannerContacts } from '@/assets/img';

import { Messenger } from './messengers';
import { MessengerMock } from './messengerMock';
import { FeedbackForm } from './form/feedback-form';

const ContactPage = () => {
  const contactPageTranslation = useTranslations('contactPageTranslation');

  return (
    <div className="bg-bg-auth-gradient">
      <div className="container-chari tablet:pb-12 *:text-light-blue pt-10 pb-8">
        <div className="tablet:mb-16 tablet:px-4 laptop:mb-20 laptop:max-w-[1168px] laptop:p-0 desktop:mb-[72px] desktopXl:mb-[88px] m-auto mb-12 flex px-2 xl:max-w-[1440px]">
          <Image
            src={BannerContacts}
            alt="bannerContacts"
            className="object-30-left tablet:aspect-[1.5] laptop:aspect-[2.06] laptop:object-contain pointer-events-none aspect-[1.3] h-fit object-cover select-none"
          />
        </div>

        <div className="tablet:mb-[120px] laptop:mb-[168px] desktop:mb-[216px] desktop:flex-row desktop:justify-between desktopXl:m-auto desktopXl:mb-[288px] mb-24 flex flex-col xl:max-w-[1440px]">
          <div className="tablet:px-4 desktop:mt-9 desktop:px-0">
            <h2 className="font-scada tablet:mb-[54px] tablet:text-[32px] desktop:mb-12 pointer-events-none mb-8 text-center text-2xl font-bold uppercase select-none">
              {contactPageTranslation('title')}
            </h2>

            <div className="tablet:mb-20 tablet:flex-row tablet:flex-wrap tablet:gap-x-1 tablet:gap-y-6 laptop:mb-24 laptop:gap-y-12 desktop:mb-0 desktop:flex-col desktop:gap-y-8 laptop:[&>:nth-child(3)>div>div>div]:right-8 mb-16 flex flex-col justify-between gap-8 [&>:nth-child(3)>div>div>div]:right-[25px]">
              {MessengerMock.map((props, idx) => (
                <Messenger key={idx} {...props} />
              ))}
            </div>
          </div>
          <div>
            <FeedbackForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
