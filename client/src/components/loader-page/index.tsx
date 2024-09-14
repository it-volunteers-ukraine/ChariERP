'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { ChildrenProps } from '@/types';
import { Loader } from '@/assets/icons';
import { useLoaderAdminPage } from '@/context';

import { getStyles } from './style';

export const LoaderPage = ({ children }: ChildrenProps) => {
  const loader = useTranslations('loader');
  const { isLoading } = useLoaderAdminPage();

  const { wrapper, spinner, textWrapper, text } = getStyles();

  const wrapperClassName = clsx('relative scroll-blue min-h-[calc(100dvh-64px)]  desktop:min-h-[calc(100dvh-96px)]', {
    'overflow-y-auto': !isLoading,
    'overflow-hidden': isLoading,
  });

  return (
    <div className={wrapperClassName}>
      {isLoading && (
        <div className={wrapper}>
          <Loader className={spinner} />

          <p className={textWrapper}>
            <span className={text}>{loader('top')}</span>
            <span className={text}>{loader('bottom')}</span>
          </p>
        </div>
      )}

      {children}
    </div>
  );
};
