'use client';

import { queryOptions } from '@tanstack/react-query';

import { ICreateColumnProps, IGetColumns } from '@/types';
import { getParsedJsonData, ResponseGetType } from '@/modules';
import { createBoardColumn, getBoardColumns } from '@/actions';

export const columnApi = {
  queryKey: ['columns', 'all'],
  getColumnsList: function ({ boardId, userId }: IGetColumns) {
    return queryOptions({
      queryKey: this.queryKey,
      queryFn: () => getParsedJsonData<ResponseGetType<unknown>, IGetColumns>(getBoardColumns, { boardId, userId }),
    });
  },
  addColumn: ({ title, boardId, userId }: ICreateColumnProps) =>
    getParsedJsonData(createBoardColumn, { title, boardId, userId }),
};
