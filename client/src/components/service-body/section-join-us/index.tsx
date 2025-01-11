import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { routes } from '@/constants';
import { Button } from '@/components';

import { getStyles } from './style';

export const JoinUs = () => {
  const route = useRouter();
  const messages = useTranslations(`aboutService.joinUs`);

  const style = getStyles();

  return (
    <section className={style.section}>
      <div className={style.wrapper}>
        <p className={style.text}>{messages('contactMessage')}</p>
        <Button
          styleType="primary"
          className={style.button}
          text={messages('buttonContacts')}
          onClick={() => route.push(routes.contacts)}
        />
      </div>
    </section>
  );
};
