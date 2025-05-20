import { useState } from 'react';

import { ResponseGetType } from '@/types';
import { showMessage } from '@/components';
import { updateStatusAction } from '@/actions';

interface IUseUpdateStatusProps {
  taskId: string;
  column: { title: string; id: string };
}

export const useStatusUpdate = ({ taskId, column }: IUseUpdateStatusProps) => {
  const [status, setStatus] = useState(column);
  const [isPendingStatus, setIsPendingStatus] = useState(false);

  const updateStatus = async (newColumnId: string) => {
    try {
      setIsPendingStatus(true);
      const res: ResponseGetType = await updateStatusAction({
        taskId,
        newColumnId,
      });

      if (res.success && res.data) {
        const newStatus = JSON.parse(res.data);

        setStatus(newStatus);
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
        throw new Error(res.message);
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsPendingStatus(false);
    }
  };

  return { updateStatus, isPendingStatus, status };
};
