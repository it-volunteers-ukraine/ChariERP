'use client';

import { List } from './List';
import { Link } from './Link';
import { Heading } from './Heading';
import { History } from './History';
import { ImageButton } from './Image';
import { ColorButton } from './Color';
import { TextAlign } from './TextAlign';
import { TextDecoration } from './TextDecoration';
import { FontSize } from './FontSize';
import { getStyle } from './style';

interface IToolBarProps {
  isEditing: boolean;
}

export const ToolBar = ({ isEditing }: IToolBarProps) => {
  const styles = getStyle(isEditing);

  return (
    <div className={styles.wrapper}>
      <FontSize className={styles.button} isEditing={isEditing} />
      <div className={styles.decorateLine}></div>
      <TextDecoration className={styles.button} />
      <ColorButton className={styles.button} type="text" />
      <ColorButton className={styles.button} type="background" />
      <Heading className={styles.button} />
      <div className={styles.decorateLine}></div>
      <TextAlign className={styles.button} />
      <div className={styles.decorateLine}></div>
      <List className={styles.button} />
      <div className={styles.decorateLine}></div>
      <Link className={styles.button} />
      <ImageButton className={styles.button} />
      <div className={styles.decorateLine}></div>
      <History className={styles.button} />
    </div>
  );
};
