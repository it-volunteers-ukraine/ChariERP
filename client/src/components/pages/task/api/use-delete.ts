import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { ResponseGetType } from '@/types';
import { showMessage } from '@/components';
import { deleteTaskPageAction } from '@/actions';

export const useDeleteTask = (taskId: string) => {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  const deleteTask = async () => {
    try {
      setIsPending(true);

      const res: ResponseGetType = await deleteTaskPageAction({
        taskId,
      });

      if (res.success && res.data) {
        const data = JSON.parse(res.data);

        router.push(`${routes.managerDashboard}/${data.boardId}`);
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
        throw new Error(res.message);
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsPending(false);
    }
  };

  return { deleteTask, isPending };
};
