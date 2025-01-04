import { useEffect, useState } from 'react';

import { showMessage } from '@/components';
import { boardColumnsNormalizer } from '@/utils';
import { getBoardColumnsAction } from '@/actions';
import { IBoardColumnTasks, IUseColumns, ResponseGetType } from '@/types';

import { IBoardColumn } from './types';

export const useColumns = ({ boardId, userId }: IUseColumns) => {
  const [columns, setColumns] = useState<IBoardColumn[]>([]);

  const getColumns = async () => {
    try {
      const response: ResponseGetType<IBoardColumnTasks[]> | string = (await getBoardColumnsAction({
        boardId,
        userId,
      })) as ResponseGetType<IBoardColumnTasks[]>;

      if (!response?.success && response?.message && !response?.data) {
        showMessage.error(response.message);

        return;
      }

      if (typeof response === 'string') {
        const parsedResponse = JSON.parse(response);

        setColumns(boardColumnsNormalizer(parsedResponse?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getColumns();
    }
  }, [userId]);

  return { response: columns, setColumns };
};
