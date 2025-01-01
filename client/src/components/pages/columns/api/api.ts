'use client';

import { queryOptions } from '@tanstack/react-query';

import { showMessage } from '@/components';
import { boardColumnsNormalizer } from '@/utils';
import { getParsedJsonData, ResponseGetType } from '@/modules';
import { changeColumnTitleAction, createBoardColumnAction, deleteColumnAction, getBoardColumnsAction } from '@/actions';
import {
  IGetColumns,
  IBoardColumnTasks,
  ICreateColumnProps,
  IDeleteColumnProps,
  IChangeColumnTitleProps,
} from '@/types';

export const columnApi = {
  queryKey: ['columns', 'all'],
  getColumnsList: function ({ boardId, userId }: IGetColumns) {
    return queryOptions({
      queryKey: this.queryKey,
      queryFn: () =>
        getParsedJsonData<ResponseGetType<IBoardColumnTasks[]>, IGetColumns>(getBoardColumnsAction, {
          boardId,
          userId,
        }),
      select: (response) => {
        if (!response?.success && response?.message) {
          showMessage.error(response.message);
        }

        return { ...response, data: boardColumnsNormalizer(response?.data) };
      },
    });
  },

  addColumn: ({ title, boardId, userId }: ICreateColumnProps) =>
    getParsedJsonData(createBoardColumnAction, { title, boardId, userId }),

  editTitleColumn: ({ title, boardId, userId, columnId }: IChangeColumnTitleProps) =>
    getParsedJsonData(changeColumnTitleAction, { title, boardId, userId, columnId }),
  deleteColumn: ({ columnId, boardId, userId }: IDeleteColumnProps) =>
    getParsedJsonData(deleteColumnAction, { columnId, boardId, userId }),
};
