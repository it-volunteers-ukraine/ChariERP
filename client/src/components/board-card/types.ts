export interface IBoardData {
  id: string;
  title: string;
  order: number;
}

export interface IBoardCardProps {
  idx?: number;
  isRoleAccess?: boolean;
  onDelete: (id: string) => void;
  board: MergeBoard | IBoardData;
  onReset: (text: string) => void;
  onEdit: (id: string, text: string) => void;
}

export interface MergeBoard {
  id: string;
  title: string;
  order: number;
  [key: `column-${number}`]: { [index: number]: number };
}

export interface IIndexesForBoards {
  [key: string]: { [key: number]: number };
}

export interface IColumns {
  [key: string]: MergeBoard[];
}
