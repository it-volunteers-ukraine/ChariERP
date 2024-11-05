'use client';

import { useTranslations } from 'next-intl';

import { Title } from '@/components';

import { getStyles } from './styles';

const PrivacyPage = () => {
  const styles = getStyles();

  const text = useTranslations('privacyPage');

  return (
    <section className={styles.wrapper}>
      <Title title={text('title')} className={styles.title} />
      <p className={styles.subTitle}>{text('subTitle')}</p>
      <p className={styles.text}>{text('introText')}</p>
      <p
        className={styles.text}
        dangerouslySetInnerHTML={{
          __html: text('list'),
        }}
      />
      <p
        className={styles.text}
        dangerouslySetInnerHTML={{
          __html: text('informationDetails', {
            link: `<a href="https://www.facebook.com/it.volunteers.ukraine" target="_blank" class="${styles.link}">facebook.com/it.volunteers.ukraine</a>`,
          }),
        }}
      />
    </section>
  );
};

export { PrivacyPage };
