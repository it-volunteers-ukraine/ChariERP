import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Title } from '@/components/title';
import { AboutUsMain } from '@/assets/img';

import { getStyles } from './styles';

export const MainSection = () => {
  const text = useTranslations('aboutUsPage');

  const styles = getStyles();

  return (
    <section className={styles.section}>
      <div className={styles.wrapperPhoto}>
        <Image alt="bg" priority={true} src={AboutUsMain} className={styles.img} />
        <div className={styles.circleOne}></div>
        <div className={styles.circleTwo}></div>
        <div className={styles.circleThree}></div>
      </div>
      <div className={styles.wrapperHistory}>
        <Title title={text('historyTitle')} className={styles.title} />
        <p className={styles.history}>{text('history')}</p>
      </div>
    </section>
  );
};
