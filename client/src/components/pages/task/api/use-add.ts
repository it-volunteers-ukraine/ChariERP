import { ICreateTask } from '@/types';
import { ResponseGetType } from '@/types';
import { showMessage } from '@/components';
import { createTaskAction } from '@/actions';

export const useAddTask = ({ userId, boardId, columnId }: { userId: string; boardId: string; columnId: string }) => {
  const addTask = async (task: ICreateTask) => {
    try {
      const res: ResponseGetType = await createTaskAction({
        task,
        userId,
        boardId,
        columnId,
      });

      if (res.success) {
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
