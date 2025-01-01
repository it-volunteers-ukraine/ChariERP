import { useQuery } from '@tanstack/react-query';

import { boardApi } from './api';

export const useBoards = (userId: string | undefined) => {
  const { data, isLoading } = useQuery({
    ...boardApi.getBoardsList(userId),
    enabled: !!userId,
  });

  return { response: data, isLoading };
};
