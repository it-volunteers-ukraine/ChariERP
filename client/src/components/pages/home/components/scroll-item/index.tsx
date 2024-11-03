import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { ScrollItemProps } from './types';

export const ScrollItem = ({ text, isEven, number }: ScrollItemProps) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <div className={`flex ${isEven ? 'justify-end' : 'justify-start'}`}>
      <motion.div
        ref={ref}
        transition={{ duration: 0.6 }}
        initial={{ opacity: 0, x: isEven ? 200 : -200 }}
        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : isEven ? 200 : -200 }}
        className="flex w-full flex-col gap-4 rounded-[40px] bg-scrollItemBg p-[24px_32px] tablet:w-[582px] tablet:p-[32px] laptop:w-[739px] desktop:w-[911px] desktop:p-[48px] desktopXl:w-[943px] desktopXl:p-[48px_64px]"
      >
        <h1 className="font-scada text-[20px] font-bold text-dark-blue tablet:text-[24px] desktop:text-[40px]">
          #{number}
        </h1>

        <p className="font-roboto uppercase leading-[150%] text-superBlue tablet:text-[20px] desktop:text-[24px]">
          {text}
        </p>
      </motion.div>
    </div>
  );
};
