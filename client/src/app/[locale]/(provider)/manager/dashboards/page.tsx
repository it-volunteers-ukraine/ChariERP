'use client';
// import { Metadata } from 'next';

import { useEffect, useState } from 'react';
import { BoardCard } from '@/components';
import { useLoaderAdminPage } from '@/context';
import { EmptyBoard } from './empty-board';

// export const metadata: Metadata = {
//   title: 'Dashboards',
//   description: 'Dashboards page',
// };

export interface IBoardData {
  id: string;
  title: string;
  order: number;
}

const boardsMock = [
  { id: '1', title: 'Dashboard 1', order: 1 },
  { id: '2', title: 'Dashboard 2', order: 2 },
  { id: '3', title: 'Dashboard 3', order: 3 },
  { id: '4', title: 'Dashboard 4', order: 4 },
  { id: '5', title: 'Dashboard 5', order: 5 },
  // { id: '6', title: 'Dashboard 6', order: 6 },
];

const Dashboards = () => {
  const { setIsLoading } = useLoaderAdminPage();
  const [boards, setBoards] = useState<IBoardData[] | null>();

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setBoards(boardsMock);
    }, 1000);
  }, []);

  return (
    <div className="scroll-blue h-full overflow-y-auto bg-white px-8 py-10">
      {boards && (
        <div className="flex w-full flex-wrap gap-6 desktop:max-w-[1088px]">
          {boards.map((board, index) => (
            <BoardCard key={board.id} cardInfo={board} sumBoards={boards.length} idx={index} />
          ))}

          {boards.length === 0 && <BoardCard sumBoards={boards.length} />}
        </div>
      )}

      {!boards && <EmptyBoard />}
    </div>
  );
};

export default Dashboards;
