'use client';

import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

import { getBoardsAction } from '@/actions';
import { IBoardData, showMessage } from '@/components';
import { ChildrenProps, ResponseGetType } from '@/types';

interface IBoardsState {
  isLoading: boolean;
  boards: IBoardData[];
  setIsLoading: (isLoading: boolean) => void;
  setBoards: Dispatch<SetStateAction<IBoardData[]>>;
}

const BoardsContext = createContext<IBoardsState | undefined>(undefined);

export const BoardsProvider = ({ children }: ChildrenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [boards, setBoards] = useState<IBoardData[]>([]);

  return (
    <BoardsContext.Provider value={{ boards, isLoading, setBoards, setIsLoading }}>{children}</BoardsContext.Provider>
  );
};

export const useBoards = (userId: string | undefined, path?: string | undefined) => {
  const context = useContext(BoardsContext);

  if (!context) {
    throw new Error('useBoards must be used within a BoardsProvider');
  }

  const { setIsLoading, boards, setBoards, isLoading } = context;

  const getBoards = async (id: string) => {
    try {
      setIsLoading(true);
      const response = (await getBoardsAction({ id })) as ResponseGetType<IBoardData[]> | string;

      if (typeof response === 'string') {
        const parsedResponse = JSON.parse(response);
        const sortedBoards = (parsedResponse.data as IBoardData[]).sort((a, b) => a.order - b.order);

        setBoards(sortedBoards);

        return;
      }

      if (!response?.success && response?.message && !response?.data) {
        showMessage.error(response.message);

        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getBoards(userId);
      console.log({ text: 'useBoards', path });
    }
  }, [userId, path]);

  return { response: boards, isLoading, setBoards };
};
