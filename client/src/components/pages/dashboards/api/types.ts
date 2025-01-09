import { IBoardData } from '@/components';

export interface IMoveBoardsProps {
  boards: IBoardData[];
  userId: string;
}

export interface IUseStateBoards {
  boards: IBoardData[];
  setBoards: React.Dispatch<React.SetStateAction<IBoardData[]>>;
}
