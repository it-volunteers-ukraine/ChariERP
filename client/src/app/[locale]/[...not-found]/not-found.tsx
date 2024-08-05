'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components';

import { getStyles } from './style';

export default function NotFound() {
  const router = useRouter();
  const errorMessage = useTranslations('notFound');

  const { wrapper, text, error, lastText, textWrapper } = getStyles();

  return (
    <div className={wrapper}>
      <p className={error}>404</p>

      <div className={textWrapper}>
        <p className={text}>{errorMessage('sorry')}</p>
        <p className={`${text} ${lastText}`}>{errorMessage('notFound')}</p>

        <Button
          styleType="primary"
          className="uppercase"
          onClick={() => router.push('/')}
          text={errorMessage('backToMain')}
        />
      </div>
    </div>
  );
}
