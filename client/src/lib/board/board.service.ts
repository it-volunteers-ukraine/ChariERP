import { IBoardData } from '@/components';

import { boardsMock } from './mock';
import { BaseService } from '../database/base.service';

class BoardService extends BaseService {
  async getBoards() {
    await this.connect();

    const newBoards = boardsMock.map((item, index) => ({ ...item, order: index + 1 }));

    return new Promise<string>((resolve) => resolve(JSON.stringify(newBoards)));
  }

  async createBoard(text: string) {
    await this.connect();

    const newBoard = { id: Date.now().toString(), title: text, order: boardsMock.length + 1 };

    boardsMock.push(newBoard);

    console.log({ boardsMock });

    return new Promise<string>((resolve) => resolve(JSON.stringify([])));
  }

  async editBoard(id: string, text: string) {
    await this.connect();

    boardsMock.splice(
      boardsMock.findIndex((board) => board.id === id),
      1,
      { ...boardsMock[boardsMock.findIndex((board) => board.id === id)], title: text },
    );

    return new Promise<string>((resolve) => resolve(JSON.stringify([])));
  }

  async moveBoards(boards: IBoardData[]) {
    await this.connect();

    boardsMock.length = 0;
    boardsMock.push(...boards);

    return new Promise<string>((resolve) => resolve(JSON.stringify(boardsMock)));
  }

  async deleteBoard(id: string) {
    await this.connect();

    boardsMock.splice(
      boardsMock.findIndex((board) => board.id === id),
      1,
    );

    return new Promise<string>((resolve) => resolve(JSON.stringify([])));
  }
}

export const boardService = new BoardService();
