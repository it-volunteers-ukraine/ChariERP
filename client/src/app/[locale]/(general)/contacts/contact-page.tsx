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
    <div className="bg-bgAuthGradient">
      <div className="container-chari pb-8 pt-10 tablet:pb-12 [&>*]:text-lightBlue">
        <div className="m-auto mb-12 flex px-2 tablet:px-4 laptop:mb-16 laptop:max-w-[1168px] laptop:p-0 xl:max-w-[1440px] desktop:mb-[72px] desktopXl:mb-[88px]">
          <Image
            src={BannerContacts}
            alt="bannerContacts"
            className="aspect-[1.3] h-fit object-cover object-30-left tablet:aspect-[1.5] laptop:aspect-[2.06] laptop:object-contain"
          />
        </div>

        <div className="mb-24 flex flex-col tablet:mb-[120px] laptop:mb-[168px] xl:max-w-[1440px] desktop:mb-[216px] desktop:flex-row desktop:justify-between desktopXl:m-auto desktopXl:mb-[288px]">
          <div>
            <h2 className="mb-8 text-center font-scada text-2xl font-bold uppercase tablet:mb-[54px] tablet:text-[32px] desktop:mb-12">
              {contactPageTranslation('title')}
            </h2>

            <div className="mb-16 flex flex-col justify-between gap-8 tablet:mb-20 tablet:flex-row tablet:flex-wrap tablet:gap-6 tablet:px-0 laptop:mb-24 laptop:gap-y-12 desktop:flex-col desktop:gap-y-8 [&>:nth-child(3)>div>div>div]:right-[25px] laptop:[&>:nth-child(3)>div>div>div]:right-8">
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
