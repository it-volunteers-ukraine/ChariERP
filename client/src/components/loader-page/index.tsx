'use client';

import { useTranslations } from 'next-intl';

import { ChildrenProps } from '@/types';
import { Loader } from '@/assets/icons';

import { getStyles } from './style';

export const LoaderPage = ({ isLoading, children }: ChildrenProps<{ isLoading: boolean }>) => {
  const loader = useTranslations('loader');

  const { wrapper, spinner, textWrapper, text } = getStyles();

  if (!isLoading && !children) return null;

  if (!isLoading && children) return children;

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
