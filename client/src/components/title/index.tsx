import React from 'react';

interface ITitle {
  title: string;
  className?: string;
}

import { getStyles } from './styles';

export const Title = ({ title, className }: ITitle) => {
  const styles = getStyles({
    className,
  });

  return <div className={styles.titleWrapper}>{title}</div>;
};
