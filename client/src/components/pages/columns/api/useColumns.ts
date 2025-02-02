import { useEffect, useState } from 'react';

import { IBoardTaskColumn } from '@/types';
import { getBoardColumnsAction } from '@/actions';
import { boardColumnsNormalizer } from '@/utils';
import { useRouter } from 'next/navigation';

interface IColumnsProps {
  id: string;
  boardId: string;
  boardColumns: IBoardTaskColumn[];
}

export const useColumns = ({ boardColumns, boardId, id }: IColumnsProps) => {
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
        throw new Error('Error data');
      }

      const parsedResponse = JSON.parse(response.data as string);

      const columns = boardColumnsNormalizer(parsedResponse?.boardColumns);

      setColumns(columns);
    } catch (e) {
      console.log({ e });
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
