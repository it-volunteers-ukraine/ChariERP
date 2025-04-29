import { useState } from 'react';

import { ResponseGetType } from '@/types';
import { showMessage } from '@/components';
import { updateTaskTitleAction } from '@/actions';

export const useUpdateTitle = (taskId: string) => {
  const [isPending, setIsPending] = useState(false);

  const updateTitle = async (title: string) => {
    try {
      setIsPending(true);
      const res: ResponseGetType = await updateTaskTitleAction({
        title,
        taskId,
      });

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

  return { isPending, updateTitle };
};
