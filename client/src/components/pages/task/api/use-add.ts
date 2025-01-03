import { ICreateTask } from '@/types';
import { showMessage } from '@/components';
import { ResponseGetType } from '@/modules';
import { createTaskAction } from '@/actions';

export const useAddTask = ({ userId, boardId, columnId }: { userId: string; boardId: string; columnId: string }) => {
  const addTask = async (task: ICreateTask) => {
    try {
      const res: ResponseGetType<ICreateTask> | string = await createTaskAction({
        task,
        userId,
        boardId,
        columnId,
      });

      if (typeof res === 'string') {
        return;
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { addTask };
};
