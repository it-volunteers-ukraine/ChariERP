import { Plus } from '@/assets/icons';

import { getStyles } from './styles';
import { AccordionProps } from './types';

export const Accordion = ({ text, title, active, onClick }: AccordionProps) => {
  const styles = getStyles(active);

  return (
    <div className={styles.wrapper}>
      <div onClick={onClick} className={styles.titleWrapper}>
        <span className={styles.title}>{title}</span>

        <span className={styles.plusWrapper}>
          <Plus className={styles.plus} />
        </span>
      </div>

      <div className={styles.textWrapper}>{text}</div>
    </div>
  );
};
