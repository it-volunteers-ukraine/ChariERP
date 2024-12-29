import { useQuery } from '@tanstack/react-query';

import { IGetColumns } from '@/types';

import { columnApi } from '../api';

export const useColumns = ({ boardId, userId }: IGetColumns) => {
  const { data: response, isLoading } = useQuery({
    ...columnApi.getColumnsList({ boardId, userId }),
  });

  return { response: response?.data, isLoading };
};
