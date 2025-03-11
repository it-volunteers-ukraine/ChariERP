'use client';

import { List } from './List';
import { Heading } from './Heading';
import { History } from './History';
import { ImageButton } from './Image';
import { ColorButton } from './Color';
import { TextAlign } from './TextAlign';
import { TextDecoration } from './TextDecoration';

interface IToolBarProps {
  className?: string;
  buttonClassName?: string;
}

export const ToolBar = ({ className, buttonClassName }: IToolBarProps) => {
  return (
    <div className={className}>
      <TextDecoration className={buttonClassName} />
      <ColorButton className={buttonClassName} type="text" />
      <ColorButton className={buttonClassName} type="background" />
      <TextAlign className={buttonClassName} />
      <List className={buttonClassName} />
      <Heading className={buttonClassName} />
      <ImageButton className={buttonClassName} />
      <History className={buttonClassName} />
    </div>
  );
};
