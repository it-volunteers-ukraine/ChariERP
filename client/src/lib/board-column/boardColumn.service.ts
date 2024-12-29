import { ICreateColumnProps, IDeleteColumnProps, IGetColumnsProps, Roles } from '@/types';

import { BaseService } from '../database/base.service';
import { Board, BoardColumn, UsersBoards } from '..';

class BoardColumnService extends BaseService {
  async getBoardColumns({ boardId, userId }: IGetColumnsProps) {
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

  async createBoardColumn({ title, boardId, userId }: ICreateColumnProps) {
    if (!title || !userId || !boardId) {
      return {
        success: false,
        message: 'Title, userId amd boardId are required for creating a board column app',
      };
    }

    await this.connect();

    const userBoard = await UsersBoards.findOne({
      user_id: userId,
      board_id: boardId,
    }).populate([
      {
        path: 'board_id',
        populate: {
          path: 'boardColumns',
        },
      },
      {
        path: 'user_id',
      },
    ]);

    if (!userBoard) {
      return {
        success: false,
        message: 'The board is missing or the user does not have access.',
      };
    }

    const isManager = userBoard.user_id.role === Roles.MANAGER;

    if (!isManager) {
      return {
        success: false,
        message: 'Only manager can create a column',
      };
    }

    const newColumn = await BoardColumn.create({
      title,
      board_id: boardId,
    });

    await Board.findByIdAndUpdate(boardId, { $push: { boardColumns: newColumn._id } });

    return JSON.stringify({
      success: true,
      data: newColumn,
    });
  }

  async deleteColumn({ boardId, userId, columnId }: IDeleteColumnProps) {
    if (!boardId || !userId || !columnId) {
      return {
        success: false,
        message: 'BoardId, columnId and userId are required for deleting a board column',
      };
    }

    await this.connect();

    const userBoard = await UsersBoards.findOne({
      user_id: userId,
      board_id: boardId,
    }).populate([
      {
        path: 'board_id',
        populate: {
          path: 'boardColumns',
        },
      },
      {
        path: 'user_id',
      },
    ]);

    if (!userBoard) {
      return {
        success: false,
        message: 'The board is missing or the user does not have access.',
      };
    }

    const isManager = userBoard.user_id.role === Roles.MANAGER;

    if (!isManager) {
      return {
        success: false,
        message: 'Only manager can delete a column',
      };
    }

    await BoardColumn.findByIdAndDelete(columnId);

    await Board.findByIdAndUpdate(boardId, {
      $pull: { boardColumns: columnId },
    });

    return { success: true, message: 'Column deleted' };
  }
}

export const boardColumnService = new BoardColumnService();
