import { queryOptions } from '@tanstack/react-query';

import { IBoardData } from '@/components';
import { getParsedJsonData } from '@/modules';
import { createBoardAction, deleteBoardAction, editBoardAction, getBoardsAction, moveBoardsAction } from '@/actions';

import { IMoveBoardsProps, ResponseCreate, ResponseDeleteEdit, ResponseGet } from './types';

export const boardApi = {
  queryKey: ['boards', 'all'],
  getBoardsList: function (id: string) {
    return queryOptions({
      enabled: !!id,
      queryKey: this.queryKey,
      queryFn: getParsedJsonData<ResponseGet, { id: string }>(getBoardsAction, { id }),
      select: (response) => {
        return { ...response, data: response.data.sort((a, b) => a.order - b.order) };
      },
    });
  },
  createBoard: (text: string, userId: string) => {
    return getParsedJsonData<ResponseCreate, { text: string; userId: string }>(createBoardAction, { text, userId });
  },
  moveBoards: (boards: IBoardData[], userId: string) => {
    return getParsedJsonData<ResponseDeleteEdit, IMoveBoardsProps>(moveBoardsAction, { boards, userId });
  },
  editBoard: (id: string, text: string, userId: string) => {
    return getParsedJsonData<ResponseDeleteEdit, { id: string; text: string; userId: string }>(editBoardAction, {
      id,
      text,
      userId,
    });
  },
  deleteBoard: (id: string, userId: string) => {
    return getParsedJsonData<ResponseDeleteEdit, { id: string; userId: string }>(deleteBoardAction, { id, userId });
  },
};
