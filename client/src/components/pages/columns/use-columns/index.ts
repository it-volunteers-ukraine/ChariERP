import { useQuery } from '@tanstack/react-query';

import { IGetColumns } from '@/types';
import { boardColumnsNormalizer } from '@/utils';

import { columnApi } from '../api';

export const useColumns = ({ boardId, userId }: IGetColumns) => {
  const { data: response, isLoading } = useQuery({
    ...columnApi.getColumnsList({ boardId, userId }),
  });

  const columns = boardColumnsNormalizer(response?.data);

  return { response: columns, isLoading };
};
