import { useState } from 'react';

import { ResponseGetType } from '@/types';
import { showMessage } from '@/components';
import { updateDateStartAction } from '@/actions';

interface IUseDateUpdateStartProps {
  taskId: string;
  initialDate: Date | null;
}

export const useDateUpdateStart = ({ taskId, initialDate }: IUseDateUpdateStartProps) => {
  const [isPendingStart, setIsPendingStart] = useState(false);
  const [dateStart, setDateStart] = useState(initialDate ? initialDate : '');

  const updateDateStart = async (date: Date) => {
    try {
      setIsPendingStart(true);
      const res: ResponseGetType = await updateDateStartAction({
        date,
        taskId,
      });

      if (res.success && res.data) {
        const newData = JSON.parse(res.data);

        setDateStart(newData);
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
        throw new Error(res.message);
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsPendingStart(false);
    }
  };

  return { updateDateStart, isPendingStart, dateStart };
};
