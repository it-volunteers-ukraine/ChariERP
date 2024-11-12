import { getStyles } from './styles';
import { scrollItemsData } from './mock';
import { ScrollCard } from './scroll-card';

export const RevealOnScroll = () => {
  const styles = getStyles();

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <span className={styles.titleText}>Наша ERP система</span>
        <span className={styles.titleText}>спеціально розроблена</span>
        <span className={styles.titleText}>для потреб громадських організацій</span>
      </div>

      {scrollItemsData.map((item, index) => (
        <ScrollCard key={item.id} text={item.text} number={item.id} isEven={index % 2 === 1} />
      ))}
    </div>
  );
};
