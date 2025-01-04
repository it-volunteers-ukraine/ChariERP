import { IUseStateBoards } from './types';

interface IAddBoard extends IUseStateBoards {
  length: number;
}

interface IResetBoard extends IUseStateBoards {
  id: string;
}

export const useAddBoard = () => {
  const addBoard = ({ length, boards, setBoards }: IAddBoard) => {
    const newBoard = { title: '', order: length + 1, _id: 'new' };

    setBoards([...boards, newBoard]);
  };

  const onReset = ({ id, boards, setBoards }: IResetBoard) => {
    setBoards(boards.filter((board) => board._id !== id));
  };

  return { addBoard, onReset };
};
