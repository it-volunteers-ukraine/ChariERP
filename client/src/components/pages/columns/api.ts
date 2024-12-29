'use client';

import { queryOptions } from '@tanstack/react-query';

import { getParsedJsonData, ResponseGetType } from '@/modules';
import { createBoardColumn, getBoardColumns } from '@/actions';
import { IBoardColumnTasks, ICreateColumnProps, IGetColumns } from '@/types';

export const columnApi = {
  queryKey: ['columns', 'all'],
  getColumnsList: function ({ boardId, userId }: IGetColumns) {
    return queryOptions({
      queryKey: this.queryKey,
      queryFn: () =>
        getParsedJsonData<ResponseGetType<IBoardColumnTasks[]>, IGetColumns>(getBoardColumns, { boardId, userId }),
    });
  },
  addColumn: ({ title, boardId, userId }: ICreateColumnProps) =>
    getParsedJsonData(createBoardColumn, { title, boardId, userId }),
};
