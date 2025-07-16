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
      return { task: null, error: response.message };
    }

    const parsedResponse = JSON.parse(response.data as string);

    return { task: parsedResponse, error: null };
  } catch {
    return { task: null, error: "I couldn't complete the task" };
  }
};

export async function generateMetadata({ params }: TaskPageParamsProps): Promise<Metadata> {
  const { task_id, board_id, column_id } = await params;

  const { task } = await getData({ columnId: column_id, boardId: board_id, taskId: task_id });

  return {
    title: `Task - ${task?.title || 'Not found'}`,
    description: `This is the task page for ${task?.title || 'an unknown task'}`,
  };
}

const TaskId = async ({ params }: TaskPageParamsProps) => {
  const { task_id, board_id, column_id } = await params;

  const { task, error } = await getData({ columnId: column_id, boardId: board_id, taskId: task_id });

  const taskNormalize = task ? await taskNormalizer(task) : null;

  return <Task task={taskNormalize} error={error} boardId={board_id} />;
};

export default TaskId;
