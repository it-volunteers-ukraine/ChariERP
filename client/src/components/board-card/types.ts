export interface IBoardData {
  id: string;
  title: string;
  number: number;
}

export interface IBoardCardProps {
  sumBoards: number;
  className?: string;
  limitOfCard?: number;
  boardData?: IBoardData;
}
