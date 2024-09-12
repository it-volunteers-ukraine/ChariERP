import { IBoardData } from '../types';

export interface IBoardInfoProps {
  number?: number;
  boardData?: IBoardData;
  isRoleAccess?: boolean;
  setIsEdit?: (isEdit: boolean) => void;
  setIsGoRoute?: (isGoRoute: boolean) => void;
}
