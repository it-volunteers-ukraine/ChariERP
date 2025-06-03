'use client';

import { showMessage } from '@/components';
import { oneBoardColumnNormalizer } from '@/utils';
import { createBoardColumnAction } from '@/actions';
import { IUseColumns, ResponseGetType } from '@/types';

import { IUseStateBoardColumns } from './types';
interface ICreateColumnProps extends IUseStateBoardColumns {
  title: string;
}

export const useAddColumn = ({ boardId, userId }: IUseColumns) => {
  const onAddColumn = async ({ title, response, setColumns }: ICreateColumnProps) => {
    try {
      const res: ResponseGetType = await createBoardColumnAction({
        title,
        boardId,
        userId,
      });

      if (res?.success && res?.data) {
        const parsedResponse = JSON.parse(res.data);

        const normalizeUsers = await oneBoardColumnNormalizer(parsedResponse);

        setColumns([...response, normalizeUsers]);

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
