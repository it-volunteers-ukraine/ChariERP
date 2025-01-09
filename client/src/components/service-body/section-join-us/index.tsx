import { useTranslations } from 'next-intl';

import { Button } from '@/components/button';

import { getStyles } from './style';

export const JoinUs = () => {
  const messages = useTranslations(`aboutService.joinUs`);
  const style = getStyles();

  return (
    <section className={style.section}>
      <div className={style.wrapper}>
        <p className={style.text}>{messages('contactMessage')}</p>
        <Button styleType="primary" text={messages('buttonContacts')} className={style.button} />
      </div>
    </section>
  );
};
