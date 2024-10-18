import { IBoardData, MergeBoard } from '../types';

export interface IBoardInfoProps {
  number?: number;
  board?: IBoardData | MergeBoard;
  isRoleAccess?: boolean;
  setIsEdit?: (isEdit: boolean) => void;
  setIsGoRoute?: (isGoRoute: boolean) => void;
}
