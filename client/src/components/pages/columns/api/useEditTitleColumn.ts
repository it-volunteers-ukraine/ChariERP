import { showMessage } from '@/components';
import { changeColumnTitleAction } from '@/actions';
import { IUseColumns, ResponseGetType } from '@/types';

import { IUseStateBoardColumns } from './types';

interface onEditTitleColumnProps extends IUseStateBoardColumns {
  title: string;
  columnId: string;
}

export const useEditTitleColumn = ({ boardId, userId }: IUseColumns) => {
  const onEditTitleColumn = async ({ title, columnId, response, setColumns }: onEditTitleColumnProps) => {
    const oldResponse = [...response];

    setColumns(
      response.map((column) => {
        if (column.id === columnId) {
          return { ...column, title };
        }

        return column;
      }),
    );

    try {
      const res: ResponseGetType = await changeColumnTitleAction({
        title,
        userId,
        boardId,
        columnId,
      });

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

  return {
    onEditTitleColumn,
  };
};
