import { Roles } from '@/types';

export interface IBoardData {
  id: string;
  title: string;
  order: number;
  isLast?: boolean;
}

export interface IBoardCardProps {
  role?: Roles;
  idx: number;
  boardLength: number;
  limitOfCard: number;
  board: MergeBoard | IBoardData;
}

export interface MergeBoard {
  id: string;
  title: string;
  order: number;
  isLast?: boolean;
  [key: `column-${number}`]: { [index: number]: number };
}

export interface IIndexesForBoards {
  [key: string]: { [key: number]: number };
}

export interface IColumns {
  [key: string]: MergeBoard[];
}
