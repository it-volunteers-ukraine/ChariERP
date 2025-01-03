import { showMessage } from '@/components';
import { ResponseGetType } from '@/modules';
import { moveBoardColumnAction } from '@/actions';
import { IBoardColumnTasks, IUseColumns } from '@/types';

import { IUseStateBoardColumns } from './types';

interface IUseMoveColumnProps extends IUseStateBoardColumns {
  source: number;
  destination: number;
}

export const useMoveColumn = ({ boardId, userId }: IUseColumns) => {
  const onMoveColumn = async ({ source, response, setColumns, destination }: IUseMoveColumnProps) => {
    const oldResponse = response;
    const newResponse = [...response];
    const column = newResponse[source];

    newResponse.splice(source, 1);
    newResponse.splice(destination, 0, column);

    setColumns(newResponse);

    try {
      const res: ResponseGetType<IBoardColumnTasks[]> | string = await moveBoardColumnAction({
        boardId,
        userId,
        sourceIndex: source,
        destinationIndex: destination,
      });

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

  return { onMoveColumn };
};
