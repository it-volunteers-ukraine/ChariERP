'use client';

import { useTranslations } from 'next-intl';

import { ChildrenProps } from '@/types';
import { Loader } from '@/assets/icons';

import { getStyles } from './style';
import clsx from 'clsx';

export const LoaderPage = ({
  isLoading,
  children,
  className,
}: ChildrenProps<{ isLoading: boolean; className?: string }>) => {
  const loader = useTranslations('loader');

  const { wrapper, spinner, textWrapper, text } = getStyles();

  const wrapperClassName = clsx('relative scroll-blue', className, {
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
