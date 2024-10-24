import { queryOptions } from '@tanstack/react-query';

import { IBoardData } from '@/components';
import { getParsedJsonData } from '@/modules';
import { createBoardAction, deleteBoardAction, editBoardAction, getBoardsAction, moveBoardsAction } from '@/actions';

import { generateColumns } from './helpers';

export const boardApi = {
  queryKey: ['boards', 'all'],
  getBoardsList: function () {
    return queryOptions({
      queryKey: this.queryKey,
      queryFn: getParsedJsonData<IBoardData[]>(getBoardsAction),
      select: (data) => ({ boards: data || [], columns: generateColumns(data || []) }),
    });
  },
  createBoard: (text: string) => {
    return getParsedJsonData<[], { text: string }>(createBoardAction, { text });
  },
  moveBoards: (boards: IBoardData[]) => {
    return getParsedJsonData<IBoardData[], IBoardData[]>(moveBoardsAction, boards);
  },
  editBoard: (id: string, text: string) => {
    return getParsedJsonData<[], { id: string; text: string }>(editBoardAction, { id, text });
  },
  deleteBoard: (id: string) => {
    return getParsedJsonData<IBoardData[], { id: string }>(deleteBoardAction, { id });
  },
};
