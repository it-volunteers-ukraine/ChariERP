/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { queryOptions } from '@tanstack/react-query';

import { getParsedJsonData } from '@/modules';
import { columns } from './mock';

const getColumnsAction = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: columns });
    }, 1000);
  });
};

export const columnApi = {
  queryKey: ['columns', 'all'],
  getColumnsList: function () {
    return queryOptions({
      queryKey: this.queryKey,
      queryFn: getParsedJsonData<any, {}>(getColumnsAction),
    });
  },
};
