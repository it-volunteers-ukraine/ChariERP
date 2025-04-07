import React from 'react';

import { getStyles } from './styles';

interface ITitle {
  title: string;
  className?: string;
  icon?: React.ElementType;
}

export const TitleTaskSection = ({ icon: Icon, title, className }: ITitle) => {
  const styles = getStyles(className);

  return (
    <div className={styles.wrapper}>
      {Icon && <Icon className={styles.icon} />}
      <p className={styles.title}>{title}</p>
    </div>
  );
};
