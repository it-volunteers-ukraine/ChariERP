import { useState } from 'react';

import { ResponseGetType } from '@/types';
import { showMessage } from '@/components';
import { updatePriorityAction } from '@/actions';

interface IUsePriorityUpdateProps {
  taskId: string;
  initialPriority: string | null;
}

export const usePriorityUpdate = ({ taskId, initialPriority }: IUsePriorityUpdateProps) => {
  const [isPendingPriority, setIsPendingPriority] = useState(false);
  const [newPriority, setNewPriority] = useState(initialPriority ? initialPriority : '');

  const updatePriority = async (priority: string) => {
    try {
      setIsPendingPriority(true);
      const res: ResponseGetType = await updatePriorityAction({
        taskId,
        priority,
      });

      if (res.success && res.data) {
        const newData = JSON.parse(res.data);

        setNewPriority(newData);
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
        throw new Error(res.message);
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsPendingPriority(false);
    }
  };

  return { updatePriority, isPendingPriority, newPriority };
};
