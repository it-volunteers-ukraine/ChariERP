'use client';

import { useTranslations } from 'next-intl';

import { EllipsisText } from '@/components';

import { Select } from './select';
import { getStyles } from './styles';
import { IInfoProps } from './types';

export const Info = ({ label, data, status, fieldName, setFieldValue, isStatusSelect }: IInfoProps) => {
  const styles = getStyles({ status, isStatusSelect });
  const cardTranslate = useTranslations('employeeCard');

  const statusText = status ? cardTranslate(status) : undefined;

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{label}</p>
      {isStatusSelect ? (
        <Select status={status} fieldName={fieldName} setFieldValue={setFieldValue} />
      ) : (
        <EllipsisText content={statusText || (data as string)}>
          <p className={styles.data}>{statusText || (data as string)}</p>
        </EllipsisText>
      )}
    </div>
  );
};
