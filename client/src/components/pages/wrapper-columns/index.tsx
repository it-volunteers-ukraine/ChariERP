'use client';

import { useSearch } from '@/hooks';
import { IBoardTaskColumn } from '@/types';
import { BoardTitle, Columns } from '@/components';

import { filterData } from './config';

interface IWrapperColumnsProps {
  id: string;
  title: string;
  columns: IBoardTaskColumn[];
}

export const WrapperColumns = ({ id, title, columns }: IWrapperColumnsProps) => {
  const { onChange, params } = useSearch();

  const search = params.search || '';

  const filteredColumns = filterData(columns, search);

  const userIds = columns.flatMap((item) => item.tasks.flatMap((task) => task.users.map((user) => user.id)));

  return (
    <div className="relative flex h-[calc(100dvh-64px)] flex-col overflow-hidden bg-white desktop:h-[calc(100dvh-96px)]">
      <BoardTitle title={title} paramValue={search} onChange={onChange} boardId={id} usersInTasks={userIds} />

      <Columns boardId={id} columns={filteredColumns} />
    </div>
  );
};
