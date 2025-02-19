import { Heading } from './heading';
import { History } from './history';
import { List } from './list';
import { TextAlign } from './textAlign';
import { TextDecoration } from './textDecoration';

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
      <History />
    </div>
  );
};
