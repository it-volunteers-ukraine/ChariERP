import { IBoardTaskColumn, ITaskColumns } from '@/types';

const doesTitleMatch = (task: ITaskColumns, search: string) => task.title.toLowerCase().includes(search.toLowerCase());

const doesUserMatch = (task: ITaskColumns, search: string) =>
  (task.users || []).some(
    (user) =>
      (user.firstName || '').toLowerCase().includes(search.toLowerCase()) ||
      (user.lastName || '').toLowerCase().includes(search.toLowerCase()),
  );

const doesTaskMatch = (task: ITaskColumns, search: string) =>
  doesTitleMatch(task, search) || doesUserMatch(task, search);

export function filterData(data: IBoardTaskColumn[], search: string) {
  if (!search) return data;

  const searchLower = search.toLowerCase();

  return data
    .map((item) => {
      const newItem: IBoardTaskColumn = { ...item };

      const filteredTasks = (newItem.tasks || []).filter((task) => doesTaskMatch(task, search));

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
