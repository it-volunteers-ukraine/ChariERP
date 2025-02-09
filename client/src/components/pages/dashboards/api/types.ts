import { IBoardData } from '@/components';
import { StateProps } from '@/types';

export interface IMoveBoardsProps {
  boards: IBoardData[];
  userId: string;
}

export interface IUseStateBoards {
  boards: IBoardData[];
  setBoards: StateProps<IBoardData[]>;
}
