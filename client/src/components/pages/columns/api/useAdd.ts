'use client';

import { showMessage } from '@/components';
import { ResponseGetType } from '@/modules';
import { oneBoardColumnNormalizer } from '@/utils';
import { createBoardColumnAction } from '@/actions';
import { IBoardColumnTasks, IUseColumns } from '@/types';

import { IUseStateBoardColumns } from './types';
interface ICreateColumnProps extends IUseStateBoardColumns {
  title: string;
}

export const useAddColumn = ({ boardId, userId }: IUseColumns) => {
  const onAddColumn = async ({ title, response, setColumns }: ICreateColumnProps) => {
    try {
      const res: ResponseGetType<IBoardColumnTasks> | string = await createBoardColumnAction({
        title,
        boardId,
        userId,
      });

      if (typeof res === 'string') {
        const parsedResponse = JSON.parse(res);

        setColumns([...response, oneBoardColumnNormalizer(parsedResponse.data)]);

        return;
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
        setColumns(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onAddColumn,
  };
};
