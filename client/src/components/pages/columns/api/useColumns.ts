import { useEffect, useState } from 'react';

import { showMessage } from '@/components';
import { boardColumnsNormalizer } from '@/utils';
import { getBoardColumnsAction } from '@/actions';
import { IUseColumns, ResponseGetType } from '@/types';

import { IBoardColumn } from './types';

export const useColumns = ({ boardId, userId }: IUseColumns) => {
  const [columns, setColumns] = useState<IBoardColumn[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getColumns = async () => {
    try {
      const response: ResponseGetType = (await getBoardColumnsAction({
        boardId,
        userId,
      })) as ResponseGetType;

      if (!response?.success && response?.message && !response?.data) {
        showMessage.error(response.message);

        return;
      }

      if (response?.success && response.data) {
        const parsedResponse = JSON.parse(response.data);

        setColumns(boardColumnsNormalizer(parsedResponse));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getColumns();
    }
  }, [userId]);

  return { response: columns, setColumns, isLoadingColumns: isLoading };
};
