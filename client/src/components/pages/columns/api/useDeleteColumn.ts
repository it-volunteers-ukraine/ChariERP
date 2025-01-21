import { showMessage } from '@/components';
import { deleteColumnAction } from '@/actions';
import { IUseColumns, ResponseGetType } from '@/types';

import { IUseStateBoardColumns } from './types';

interface ICreateColumnProps extends IUseStateBoardColumns {
  columnId: string;
}
export const useDeleteColumn = ({ boardId, userId }: IUseColumns) => {
  const onDeleteColumn = async ({ columnId, response, setColumns }: ICreateColumnProps) => {
    const oldResponse = [...response];

    setColumns(response.filter((column) => column.id !== columnId));

    try {
      const res: ResponseGetType = await deleteColumnAction({ columnId, boardId, userId });

      if (res.success) {
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
