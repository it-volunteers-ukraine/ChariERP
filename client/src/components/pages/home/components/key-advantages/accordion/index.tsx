import { ArrowUp } from '@/assets/icons';

import { getStyles } from './styles';
import { IAccordionProps } from './types';

export const Accordion = ({ title, isOpen, description, disabled, onClick }: IAccordionProps) => {
  const styles = getStyles({ isOpen, disabled });

  return (
    <div onClick={() => !disabled && onClick()} className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.arrowWrapper}>
          <ArrowUp className={styles.arrow} />
        </div>
      </div>

      <div className={styles.descriptionWrapper}>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};
