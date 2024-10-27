import { useQuery } from '@tanstack/react-query';

import { boardApi } from './api';

export const useBoards = (userId: string) => {
  const { data, isLoading } = useQuery({
    ...boardApi.getBoardsList(userId),
  });

  return { response: data, isLoading };
};
