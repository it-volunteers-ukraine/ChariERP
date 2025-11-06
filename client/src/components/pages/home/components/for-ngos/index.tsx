import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';

import { cardsData } from './mock';

export const ForNGOs = () => {
  const projectName = useTranslations('projectName');
  const text = useTranslations('homePage.forNGOs');
  const cards = cardsData(text);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="tablet:px-8 desktop:px-[136px] desktopXl:px-[86px]">
      <div className="bg-bgNGOs tablet:p-[40px_32px] laptop:p-[56px_72px] desktop:p-[64px_96px] desktopXl:flex-row desktopXl:gap-x-[160px] desktopXl:p-[80px_92px] flex max-w-[1737px] flex-col gap-10 rounded-[40px] p-[32px_16px]">
        <div className="desktopXl:min-w-[457px]">
          <h2 className="font-scada tablet:text-[32px] laptop:text-4xl desktop:text-[50px] text-2xl leading-[130%] font-bold text-white">
            {projectName('CHARIEPR')}
          </h2>

          <p className="font-scada text-super-blue tablet:w-[50%] tablet:text-[20px] laptop:text-2xl desktop:w-[60%] desktop:text-4xl desktopXl:w-full leading-[100%] uppercase">
            {text('title')}
          </p>
        </div>

        <div
          ref={ref}
          className="tablet:grid-cols-2 tablet:gap-x-[32px] tablet:gap-y-6 laptop:gap-x-[42px] laptop:gap-y-8 desktop:laptop:gap-x-[80px] desktopXl:gap-x-10 grid grid-cols-1 gap-y-10"
        >
          {cards.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: index * 0.7, duration: 0.6 }}
                className="rounded-[20px] border border-white p-4"
              >
                <div className="mb-4">
                  <item.icon className="text-white" />
                </div>

                <div className="font-scada tablet:h-[58px] tablet:text-2xl laptop:h-fit desktop:text-[32px] mb-2 h-12 text-xl leading-[120%] font-bold text-white">
                  {item.title}
                </div>

                <div className="font-roboto text-super-blue tablet:text-xl desktop:text-2xl w-full">{item.text}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
