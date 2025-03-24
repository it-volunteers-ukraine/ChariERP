import { ResponseGetType } from '@/types';
import { showMessage } from '@/components';
import { createTaskAction } from '@/actions';

export const useAddTask = ({ userId, boardId, columnId }: { userId: string; boardId: string; columnId: string }) => {
  const addTask = async () => {
    try {
      const res: ResponseGetType = await createTaskAction({
        userId,
        boardId,
        columnId,
      });

      if (res.success && res.data) {
        const data = JSON.parse(res.data);

        return data;
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
        throw new Error(res.message);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { addTask };
};
