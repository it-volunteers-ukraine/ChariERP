'use client';

import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

import { getBoardsAction } from '@/actions';
import { IBoardData, showMessage } from '@/components';
import { ChildrenProps, ResponseGetType } from '@/types';

interface IBoardsState {
  isLoading: boolean;
  boards: IBoardData[];
  getBoards: (id: string) => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  setBoards: Dispatch<SetStateAction<IBoardData[]>>;
}

const BoardsContext = createContext<IBoardsState | undefined>(undefined);

export const BoardsProvider = ({ children }: ChildrenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [boards, setBoards] = useState<IBoardData[]>([]);

  const getBoards = async (id: string) => {
    try {
      setIsLoading(true);

      const response = (await getBoardsAction({ id })) as ResponseGetType;

      if (response.success && response.data) {
        const parsedResponse = JSON.parse(response.data);
        const sortedBoards = (parsedResponse as IBoardData[]).sort((a, b) => a.order - b.order);

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

  return (
    <BoardsContext.Provider
      value={{
        boards,
        getBoards,
        isLoading,
        setBoards,
        setIsLoading,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
};

export const useBoards = (userId: string | undefined, path?: string | undefined) => {
  const context = useContext(BoardsContext);

  if (!context) {
    throw new Error('useBoards must be used within a BoardsProvider');
  }

  const { boards, isLoading, setBoards, getBoards } = context;

  useEffect(() => {
    if (userId) {
      getBoards(userId);
    }
  }, [userId, path]);

  return {
    setBoards,
    response: boards,
    isLoading: isLoading || !userId,
  };
};
