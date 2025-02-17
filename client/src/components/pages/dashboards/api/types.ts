import { StateProps } from '@/types';
import { IBoardData } from '@/components';

export interface IMoveBoardsProps {
  userId: string;
  boards: IBoardData[];
}

export interface IUseStateBoards {
  boards: IBoardData[];
  setBoards: StateProps<IBoardData[]>;
}
