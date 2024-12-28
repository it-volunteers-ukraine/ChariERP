import { useQuery } from '@tanstack/react-query';

import { columnApi } from '../api';

export const useColumns = () => {
  const { data: response, isLoading } = useQuery({
    ...columnApi.getColumnsList(),
  });

  return { response: response?.data, isLoading };
};
