import { IBoardColumnTasks } from '@/types';
import { fetchAvatarUrl } from './fetch-avatar-url';

export const oneBoardColumnNormalizer = async (data: IBoardColumnTasks) => {
  return {
    id: data._id!.toString(),
    title: data.title,
    tasks: await Promise.all(
      data.task_ids.map(async (task) => ({
        id: task._id!.toString(),
        title: task.title,
        users: await Promise.all(
          task.users.map(async (user) => ({
            id: user._id!.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            avatarUrl: await fetchAvatarUrl(user._id!.toString(), user.avatarUrl || ''),
          })),
        ),
      })),
    ),
  };
};

export const boardColumnsNormalizer = async (data?: IBoardColumnTasks[]) => {
  if (!data) return [];

  return await Promise.all(data.map(oneBoardColumnNormalizer));
};

export { fetchAvatarUrl } from './fetch-avatar-url';
