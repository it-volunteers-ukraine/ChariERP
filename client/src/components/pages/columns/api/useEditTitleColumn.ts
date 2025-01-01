import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showMessage } from '@/components';

import { columnApi } from './api';

export const useEditTitleColumn = ({ boardId, userId }: { boardId: string; userId: string }) => {
  const queryClient = useQueryClient();

  const editTitleColumnMutation = useMutation({
    mutationFn: ({ title, columnId }: { title: string; columnId: string }) =>
      columnApi.editTitleColumn({ title, boardId, userId, columnId }),
  });

  const onEditTitleColumn = ({ title, columnId }: { title: string; columnId: string }) => {
    editTitleColumnMutation.mutate(
      { title, columnId },
      {
        onSuccess: (response) => {
          if (!response?.success && response?.message) {
            showMessage.error(response.message);

            return;
          }

          queryClient.invalidateQueries({
            queryKey: columnApi.queryKey,
          });
        },
      },
    );
  };

  return {
    onEditTitleColumn,
    isLoadingEditTitle: editTitleColumnMutation.isPending,
  };
};
