import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showMessage } from '@/components';

import { columnApi } from './api';

export const useDeleteColumn = ({ boardId, userId }: { boardId: string; userId: string }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (columnId: string) => columnApi.deleteColumn({ columnId, boardId, userId }),
  });

  const onDeleteColumn = (columnId: string) => {
    deleteMutation.mutate(columnId, {
      onSuccess: (response) => {
        if (!response.success && response.message) {
          showMessage.error(response.message);
        }

        queryClient.invalidateQueries({
          queryKey: columnApi.queryKey,
        });
      },
    });
  };

  return { onDeleteColumn, isLoadingDelete: deleteMutation.isPending };
};
