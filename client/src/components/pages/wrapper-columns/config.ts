import { IBoardTaskColumn } from '@/types';

export function filterData(data: IBoardTaskColumn[], search: string) {
  if (!search) return data;

  const searchLower = search.toLowerCase();

  return data
    .map((item) => {
      const newItem: IBoardTaskColumn = { ...item };

      const filteredTasks = (newItem.tasks || []).filter((task) => {
        const taskMatches = task.title.toLowerCase().includes(searchLower);

        const hasUserMatch = (task.users || []).some(
          (user) =>
            user.firstName.toLowerCase().includes(searchLower) || user.lastName.toLowerCase().includes(searchLower),
        );

        return taskMatches || hasUserMatch;
      });

      if (filteredTasks.length > 0) {
        newItem.tasks = filteredTasks.map((task) => ({
          ...task,
          users: task.users,
        }));

        return newItem;
      }

      if (newItem.title.toLowerCase().includes(searchLower)) {
        newItem.tasks = [];

        return newItem;
      }

      return null;
    })
    .filter((column): column is IBoardTaskColumn => column !== null);
}
