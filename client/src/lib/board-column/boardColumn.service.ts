import { Roles } from '@/types';

import { BoardColumn, Users, UsersBoards } from '..';
import { BaseService } from '../database/base.service';

class BoardColumnService extends BaseService {
  async getBoardColumns(boardId: string, userId: string) {
    if (!boardId || !userId) {
      return {
        success: false,
        message: 'BoardId and userId are required for creating a board column app',
      };
    }

    await this.connect();

    const board = await UsersBoards.findOne({
      user_id: userId,
      board_id: boardId,
    }).populate({
      path: 'board_id',
      populate: {
        path: 'boardColumns',
        populate: {
          path: 'task_ids',
        },
      },
    });

    if (!board) {
      return {
        success: false,
        message: 'The board is missing or the user does not have access.',
      };
    }
    console.log({ data: board.board_id.boardColumns, board });

    return JSON.stringify({ success: true, data: board.board_id.boardColumns });
  }

  async createBoardColumn({ title, boardId, userId }: { title: string; boardId: string; userId: string }) {
    if (!title || !userId || !boardId) {
      return {
        success: false,
        message: 'Title, userId amd boardId are required for creating a board column app',
      };
    }

    await this.connect();

    const user = await Users.findById(userId);

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    if (user.role !== Roles.MANAGER) {
      return {
        success: false,
        message: 'Access denied',
      };
    }

    const board = await UsersBoards.findOne({
      user_id: userId,
      board_id: boardId,
    }).populate('board_id');

    if (!board) {
      return {
        success: false,
        message: 'Board not exist',
      };
    }

    const newColumn = await BoardColumn.create({
      title,
      board_id: board.board_id,
    });

    return JSON.stringify({ success: true, data: newColumn });
  }
}

export const boardColumnService = new BoardColumnService();
