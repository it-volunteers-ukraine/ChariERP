import { useQuery } from '@tanstack/react-query';

import { boardApi } from './api';

export const useBoards = () => {
  const { data, isLoading } = useQuery({
    ...boardApi.getBoardsList(),
  });

  return { boards: data?.boards ?? [], columns: data?.columns ?? {}, isLoading };
};
