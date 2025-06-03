import { useState } from 'react';

import { ResponseGetType } from '@/types';
import { showMessage } from '@/components';
import { updateDateEndAction } from '@/actions';

interface IUseDateUpdateEndProps {
  taskId: string;
  initialDate: Date | null;
}

export const useDateUpdateEnd = ({ taskId, initialDate }: IUseDateUpdateEndProps) => {
  const [isPendingEnd, setIsPendingEnd] = useState(false);
  const [dateEnd, setDateEnd] = useState(initialDate ? initialDate : '');

  const updateDateEnd = async (date: Date) => {
    try {
      setIsPendingEnd(true);
      const res: ResponseGetType = await updateDateEndAction({
        date,
        taskId,
      });

      if (res.success && res.data) {
        const newData = JSON.parse(res.data);

        setDateEnd(newData);
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
        throw new Error(res.message);
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsPendingEnd(false);
    }
  };

  return { updateDateEnd, isPendingEnd, dateEnd };
};
