import { List } from './List';
import { Heading } from './Heading';
import { History } from './History';
import { TextAlign } from './TextAlign';
import { TextDecoration } from './TextDecoration';
import { ImageButton } from './Image';
import { ColorButton } from './Color';

interface IToolBarProps {
  className?: string;
}

export const ToolBar = ({ className }: IToolBarProps) => {
  return (
    <div className={className}>
      <TextDecoration />
      <TextAlign />
      <List />
      <Heading />
      <ImageButton />
      <ColorButton />
      <History />
    </div>
  );
};
