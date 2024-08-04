'use client';
import { getStyles } from './styles';
import { IInfoProps } from './types';

export const Info = ({ label, data, status }: IInfoProps) => {
  const styles = getStyles({ status });

  return (
    <div className="flex gap-2">
      <p className={styles.label}>{label}</p>
      <p className={styles.data}>{status || data}</p>
    </div>
  );
};
