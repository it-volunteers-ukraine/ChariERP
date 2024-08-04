'use client';
import { useTranslations } from 'next-intl';

import { Loader } from '@/assets/icons';

import { getStyles } from './style';

export const LoaderComponent = ({ isLoading }: { isLoading: boolean }) => {
  const loader = useTranslations('loader');

  const { wrapper, spinner, textWrapper, text } = getStyles();

  if (!isLoading) return null;

  return (
    <div className={wrapper}>
      <Loader className={spinner} />

      <p className={textWrapper}>
        <span className={text}>{loader('top')}</span>
        <span className={text}>{loader('bottom')}</span>
      </p>
    </div>
  );
};
