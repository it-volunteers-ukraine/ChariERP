import { showMessage } from '@/components';
import { deleteTaskAction } from '@/actions';
import { IUseColumns, ResponseGetType } from '@/types';
import logger from '@/utils/logger/logger';

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
      const res: ResponseGetType = await deleteTaskAction({ taskId, boardId, userId });

      if (res.success) {
        return;
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
        setColumns(oldResponse);
      }
    } catch (error) {
      logger.error(error);
      setColumns(oldResponse);
    }
  };

  return { onDeleteTask };
};
