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

interface IToolBarProps {
  className?: string;
  buttonClassName?: string;
  isEditing?: boolean;
}

export const ToolBar = ({ className, buttonClassName, isEditing }: IToolBarProps) => {
  return (
    <div className={className}>
      <TextDecoration className={buttonClassName} />
      <ColorButton className={buttonClassName} type="text" />
      <ColorButton className={buttonClassName} type="background" />
      <Heading className={buttonClassName} />
      <FontSize className={buttonClassName} isEditing={isEditing} />
      <TextAlign className={buttonClassName} />
      <List className={buttonClassName} />
      <Link className={buttonClassName} />
      <ImageButton className={buttonClassName} />
      <History className={buttonClassName} />
    </div>
  );
};
