import { useState } from 'react';

import { ResponseGetType } from '@/types';
import { showMessage } from '@/components';
import { updateDescriptionAction } from '@/actions';

interface IUseUpdateDescription {
  taskId: string;
}

export const useUpdateDescription = ({ taskId }: IUseUpdateDescription) => {
  const [isPending, setIsPending] = useState(false);

  const updateDescription = async (description: string) => {
    try {
      setIsPending(true);
      const res: ResponseGetType = await updateDescriptionAction({
        taskId,
        description,
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
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, updateDescription };
};
