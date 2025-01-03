import { showMessage } from '@/components';
import { ResponseGetType } from '@/modules';
import { deleteTaskAction } from '@/actions';
import { IBoardColumnTasks, IUseColumns } from '@/types';

import { IUseStateBoardColumns } from './types';

interface IDeleteTaskProps extends IUseStateBoardColumns {
  taskId: string;
}

export const useDeleteTask = ({ boardId, userId }: IUseColumns) => {
  const onDeleteTask = async ({ taskId, response, setColumns }: IDeleteTaskProps) => {
    const oldResponse = [...response];

    setColumns(
      response.map((column) => {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        };
      }),
    );

    try {
      const res: ResponseGetType<IBoardColumnTasks> | string = await deleteTaskAction({ taskId, boardId, userId });

      if (typeof res === 'string') {
        return;
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
        setColumns(oldResponse);
      }
    } catch (error) {
      console.log(error);
      setColumns(oldResponse);
    }
  };

  return { onDeleteTask };
};
