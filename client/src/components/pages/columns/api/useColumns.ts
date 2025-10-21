import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import logger from '@/utils/logger/logger';

import { IBoardTaskColumn } from '@/types';
import { boardColumnsNormalizer } from '@/utils';
import { getBoardColumnsAction } from '@/actions';

interface IColumnsProps {
  id: string;
  boardId: string;
  onReject?: () => void;
  boardColumns: IBoardTaskColumn[];
}

export const useColumns = ({ boardColumns, boardId, id, onReject }: IColumnsProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState<IBoardTaskColumn[]>([]);

  const getData = async () => {
    try {
      const response = await getBoardColumnsAction({
        boardId,
        userId: id,
      });

      if (!response.success || !response.data) {
        if (onReject) {
          onReject();
        }

        throw new Error('Error data');
      }

      const parsedResponse = JSON.parse(response.data as string);
      const columns = await boardColumnsNormalizer(parsedResponse?.boardColumns);

      setColumns(columns);
    } catch (e) {
      logger.error({ e });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (boardColumns) {
      setColumns(boardColumns);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [boardColumns]);

  useEffect(() => {
    getData();
  }, [router]);

  return { response: columns, setColumns, isLoading };
};
