export interface IBoardData {
  id: string;
  title: string;
  number: number;
}

export interface IBoardCardProps {
  sumBoards: number;
  limitOfCard?: number;
  boardData?: IBoardData;
}
