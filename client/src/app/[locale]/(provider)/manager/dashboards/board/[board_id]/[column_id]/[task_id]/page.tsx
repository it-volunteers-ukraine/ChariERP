import { Metadata } from 'next';

import { Task } from '@/components';
import { taskNormalizer } from '@/utils';
import { getTaskAction } from '@/actions';
import { IGetTaskProps, TaskPageParamsProps } from '@/types';

export const getData = async ({ columnId, boardId, taskId, userId }: IGetTaskProps) => {
  try {
    const response = await getTaskAction({
      taskId,
      userId,
      boardId,
      columnId,
    });

    if (!response.success || !response.data) {
      throw new Error('Error data');
    }

    const parsedResponse = JSON.parse(response.data as string);

    return parsedResponse;
  } catch (e) {
    console.log({ e });
  }
};

export async function generateMetadata({ params }: TaskPageParamsProps): Promise<Metadata> {
  const { task_id, board_id, column_id } = await params;

  const response = await getData({ columnId: column_id, boardId: board_id, taskId: task_id });

  return {
    title: `Task - ${response?.title || ''}`,
    description: `This is the task page for ${response?.title || ''}`,
  };
}

const TaskId = async ({ params }: TaskPageParamsProps) => {
  const { task_id, board_id, column_id } = await params;

  const response = await getData({ columnId: column_id, boardId: board_id, taskId: task_id });

  const task = taskNormalizer(response);

  console.log({ task });

  return <Task />;
};

export default TaskId;
