import { queryOptions } from '@tanstack/react-query';

import { ICreateTaskProps } from '@/types';
import { createTaskAction } from '@/actions';
import { getParsedJsonData } from '@/modules';

import { ResponseGetTask } from '../types';

const task = {
  title: 'Some Task',
  status: 'in_progress',
  priority: 'high',
  attachment: [],
  comments: [],
  date_end: new Date(),
  date_start: new Date(),
  description: 'Task description',
};

const getTaskById = (): Promise<ResponseGetTask> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: task });
    }, 1000);
  });
};

export const taskApi = {
  queryKey: ['task', 'all'],
  getTaskById: function () {
    return queryOptions({
      queryKey: this.queryKey,
      queryFn: () => getParsedJsonData<ResponseGetTask, undefined>(getTaskById),
    });
  },
  createTask: ({ userId, boardId, columnId, task }: ICreateTaskProps) => {
    return getParsedJsonData<ResponseGetTask, ICreateTaskProps>(createTaskAction, {
      task,
      userId,
      boardId,
      columnId,
    });
  },
};
