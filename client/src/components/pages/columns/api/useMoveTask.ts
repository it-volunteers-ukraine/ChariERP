import { showMessage } from '@/components';
import { moveTaskAction } from '@/actions';
import { ResponseGetType } from '@/modules';
import { IBoardColumnTasks, IUseColumns } from '@/types';

import { IUseStateBoardColumns } from './types';

interface IMoveTaskProps extends IUseStateBoardColumns {
  sourceIndex: number;
  columnStartIndex: number;
  destinationIndex: number;
  columnFinishIndex: number;
}

export const useMoveTask = ({ boardId, userId }: IUseColumns) => {
  const onMoveTask = async ({
    response,
    setColumns,
    sourceIndex,
    columnStartIndex,
    destinationIndex,
    columnFinishIndex,
  }: IMoveTaskProps) => {
    const oldResponse = response;
    const newColumns = [...response];
    const task = newColumns[columnStartIndex].tasks[sourceIndex];
    const columnId = newColumns[columnStartIndex].id;
    const destinationColumnId = newColumns[columnFinishIndex].id;

    newColumns[columnStartIndex].tasks.splice(sourceIndex, 1);
    newColumns[columnFinishIndex].tasks.splice(destinationIndex, 0, task);

    setColumns(newColumns);

    try {
      const res: ResponseGetType<IBoardColumnTasks[]> | string = await moveTaskAction({
        userId,
        boardId,
        columnId,
        taskId: task.id,
        destinationIndex,
        destinationColumnId,
      });

      if (typeof res === 'string') {
        return;
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
        setColumns(oldResponse);
      }
    } catch (error) {
      console.log({ error });
      setColumns(oldResponse);
    }
  };

  return { onMoveTask };
};
