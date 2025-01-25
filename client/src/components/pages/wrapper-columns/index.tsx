import { IBoardTaskColumn } from '@/types';
import { BoardTitle, Columns } from '@/components';

interface IWrapperColumnsProps {
  id: string;
  title: string;
  columns: IBoardTaskColumn[];
}

export const WrapperColumns = ({ id, title, columns }: IWrapperColumnsProps) => {
  return (
    <div className="relative flex h-[calc(100dvh-64px)] flex-col overflow-hidden bg-white desktop:h-[calc(100dvh-96px)]">
      <BoardTitle title={title} />

      <Columns boardId={id} columns={columns} />
    </div>
  );
};
