import { showMessage } from '@/components';
import { ResponseGetType } from '@/modules';
import { deleteColumnAction } from '@/actions';
import { IBoardColumnTasks, IUseColumns } from '@/types';

import { IUseStateBoardColumns } from './types';

interface ICreateColumnProps extends IUseStateBoardColumns {
  columnId: string;
}
export const useDeleteColumn = ({ boardId, userId }: IUseColumns) => {
  const onDeleteColumn = async ({ columnId, response, setColumns }: ICreateColumnProps) => {
    const oldResponse = [...response];

    setColumns(response.filter((column) => column.id !== columnId));

    try {
      const res: ResponseGetType<IBoardColumnTasks> | string = await deleteColumnAction({ columnId, boardId, userId });

      if (typeof res === 'string') {
        return;
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
        setColumns(oldResponse);
      }
    } catch (error) {
      console.log(error);
      setColumns(oldResponse);
    }
  };

  return { onDeleteColumn };
};
