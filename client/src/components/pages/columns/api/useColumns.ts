import { useEffect, useState } from 'react';

import { IBoardTaskColumn } from '@/types';

export const useColumns = (boardColumns: IBoardTaskColumn[]) => {
  const [columns, setColumns] = useState<IBoardTaskColumn[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (boardColumns) {
      setColumns(boardColumns);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [boardColumns]);

  return { response: columns, setColumns, isLoading };
};
