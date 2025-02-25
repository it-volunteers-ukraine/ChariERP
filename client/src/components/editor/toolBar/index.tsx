import { List } from './List';
import { Heading } from './Heading';
import { History } from './History';
import { TextAlign } from './TextAlign';
import { ImagePlugin } from '../plugins';
import { TextDecoration } from './TextDecoration';
import { ImageButton } from './Image';

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
      <ImagePlugin />
      <History />
    </div>
  );
};
