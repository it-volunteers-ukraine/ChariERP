import { DropResult } from '@hello-pangea/dnd';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IBoardData } from '@/components';

import { boardApi } from './api';
import { ResponseGet } from './types';
import { generateColumns, reorder } from './helpers';

type IBoardMove = ResponseGet | undefined;

export const useMoveBoards = (id: string) => {
  const queryClient = useQueryClient();

  const moveMutation = useMutation({
    mutationFn: ({ newBoards }: { newBoards: IBoardData[] }) => {
      const abortController = new AbortController();

      return boardApi.moveBoards(newBoards, id)({ signal: abortController.signal });
    },

    onMutate: async ({ newBoards }) => {
      await queryClient.cancelQueries({ queryKey: boardApi.queryKey });

      const previousBoards = queryClient.getQueryData(boardApi.queryKey);

      queryClient.setQueryData(boardApi.queryKey, (old: IBoardMove) => ({ ...old, data: newBoards }));

      return { previousBoards };
    },

    onError: (_, __, context) => {
      if (context?.previousBoards) {
        queryClient.setQueryData(boardApi.queryKey, context.previousBoards);
      }
    },

    onSettled: (data) => {
      if (!data?.success && data?.message) {
        throw new Error(data.message);
      }

      queryClient.invalidateQueries({
        queryKey: boardApi.queryKey,
      });
    },
  });

  const onMoveDragEndSmall = (result: DropResult) => {
    if (!result.destination) return;

    const boards: IBoardMove = queryClient.getQueryData(boardApi.queryKey);

    const newBoards = reorder(boards?.data as IBoardData[], result.source.index, result.destination.index);

    moveMutation.mutate({ newBoards });
  };

  const onMoveDragEndLarge = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const boards: IBoardMove = queryClient.getQueryData(boardApi.queryKey);

    const columns = generateColumns(boards?.data as IBoardData[]);

    const sourceCol = source.droppableId as `column-${number}`;
    const destCol = destination.droppableId as `column-${number}`;
    const length = columns[destCol].length;

    if (destination.index >= length) {
      return;
    }

    const sourceBoardIndex = columns[sourceCol][source.index][sourceCol][source.index];
    const destinationBoardIndex = columns[destCol][destination.index][destCol][destination.index];

    const newBoards = reorder(boards?.data as IBoardData[], sourceBoardIndex, destinationBoardIndex);

    moveMutation.mutate({ newBoards });
  };

  return { onMoveDragEndSmall, onMoveDragEndLarge, isLoadingMove: moveMutation.isPending };
};
