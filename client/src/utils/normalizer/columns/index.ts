import { IBoardColumnTasks } from '@/types';

export const oneBoardColumnNormalizer = (data: IBoardColumnTasks) => {
  return {
    id: data._id!.toString(),
    title: data.title,
    tasks: data.task_ids.map((task) => ({
      id: task._id!.toString(),
      title: task.title,
      users: task.users.map((user) => ({
        id: user._id!.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl || '',
      })),
    })),
  };
};

export const boardColumnsNormalizer = (data?: IBoardColumnTasks[]) => {
  if (!data) return [];

  return data.map(oneBoardColumnNormalizer);
};
