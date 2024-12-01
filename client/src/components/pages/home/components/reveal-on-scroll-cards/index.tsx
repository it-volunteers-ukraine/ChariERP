import { useTranslations } from 'next-intl';

import { getStyles } from './styles';
import { scrollItemsData } from './mock';
import { ScrollCard } from './scroll-card';

export const RevealOnScroll = () => {
  const styles = getStyles();
  const text = useTranslations('homePage.revealOnScroll');

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <span className={styles.titleText}>{text('title.firstPart')}</span>
        <span className={styles.titleText}>{text('title.secondPart')}</span>
        <span className={styles.titleText}>{text('title.thirdPart')}</span>
      </div>

      {scrollItemsData(text).map((item, index) => (
        <ScrollCard key={item.id + item.text} text={item.text} number={item.id} isEven={index % 2 === 1} />
      ))}
    </div>
  );
};
