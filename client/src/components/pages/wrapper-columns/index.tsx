'use client';

import { IBoardTaskColumn } from '@/types';
import { BoardTitle, Columns, useSearch } from '@/components';

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

  return (
    <div className="relative flex h-[calc(100dvh-64px)] flex-col overflow-hidden bg-white desktop:h-[calc(100dvh-96px)]">
      <BoardTitle title={title} paramValue={search} onChange={onChange} boardId={id} />

      <Columns boardId={id} columns={filteredColumns} />
    </div>
  );
};
