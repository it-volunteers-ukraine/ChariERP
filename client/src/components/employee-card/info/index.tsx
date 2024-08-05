'use client';

import { useTranslations } from 'next-intl';

import { getStyles } from './styles';
import { IInfoProps } from './types';

export const Info = ({ label, data, status }: IInfoProps) => {
  const styles = getStyles({ status });
  const cardTranslate = useTranslations('employeeCard');

  const statusText = status ? cardTranslate(status) : undefined;

  return (
    <div className="flex gap-2">
      <p className={styles.label}>{label}</p>
      <p className={styles.data}>{statusText || data}</p>
    </div>
  );
};
