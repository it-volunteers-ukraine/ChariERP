import { IBoardColumnTasks } from '@/types';

export const boardColumnsNormalizer = (data?: IBoardColumnTasks[]) => {
  if (!data) return [];

  return data.map((item) => {
    return {
      id: item._id!.toString(),
      title: item.title,
      tasks: item.task_ids.map((task) => ({
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
  });
};
