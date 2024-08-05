import { useMemo, useState } from 'react';

import { TableSortDirection } from '@/types';

interface SortConfig<T> {
  key: keyof T;
  direction: TableSortDirection;
}

interface ReturnType<T> {
  items: T[];
  requestSort(key: keyof T): void;
  sortConfig: SortConfig<T> | null;
}

const useSortableData = <T>(items: T[], config: SortConfig<T> | null = null): ReturnType<T> => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];

    if (sortConfig) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === TableSortDirection.Ascending ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === TableSortDirection.Ascending ? 1 : -1;
        }

        return 0;
      });
    }

    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction = TableSortDirection.Ascending;

    if (sortConfig && sortConfig.key === key && sortConfig.direction === TableSortDirection.Ascending) {
      direction = TableSortDirection.Descending;
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export { useSortableData };
