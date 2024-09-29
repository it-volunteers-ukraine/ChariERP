export interface IBoardData {
  id: string;
  title: string;
  order: number;
}

export interface IBoardCardProps {
  sumBoards?: number;
  className?: string;
  limitOfCard?: number;
  cardInfo?: IBoardData;
  placeholder?: boolean;
}
