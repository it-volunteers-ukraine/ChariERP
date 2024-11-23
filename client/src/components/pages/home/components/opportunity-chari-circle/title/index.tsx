import { getStyles } from './styles';
import { TitleProps } from './types';

export const Title = ({ text, className }: TitleProps) => {
  const styles = getStyles({ className });

  return <h1 className={styles.title}>{text}</h1>;
};
