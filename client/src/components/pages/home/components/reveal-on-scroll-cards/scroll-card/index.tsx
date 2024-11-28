import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { getStyles } from './styles';
import { ScrollItemProps } from './types';

export const ScrollCard = ({ text, isEven, number }: ScrollItemProps) => {
  const styles = getStyles(isEven);

  const { ref, inView } = useInView({
    threshold: 0.8,
    triggerOnce: true,
  });

  const xWithEven = isEven ? 200 : -200;
  const x = inView ? 0 : xWithEven;

  return (
    <div className={styles.wrapper}>
      <motion.div
        ref={ref}
        transition={{ duration: 1 }}
        initial={{ opacity: 0, x: xWithEven }}
        animate={{ opacity: inView ? 1 : 0, x }}
        className="flex w-full flex-col gap-4 rounded-[40px] bg-scrollItemBg p-[24px_32px] tablet:w-[582px] tablet:p-8 laptop:w-[739px] desktop:w-[911px] desktop:p-12 desktopXl:w-[943px] desktopXl:p-[48px_64px]"
      >
        <h1 className="font-scada text-xl font-bold text-dark-blue tablet:text-2xl desktop:text-[40px]">#{number}</h1>

        <p className={styles.text}>{text}</p>
      </motion.div>
    </div>
  );
};
