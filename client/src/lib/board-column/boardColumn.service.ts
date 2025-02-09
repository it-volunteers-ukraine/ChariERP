import {
  Roles,
  IGetColumnsProps,
  ICreateColumnProps,
  IDeleteColumnProps,
  IMoveBoardColumnProps,
  IChangeColumnTitleProps,
} from '@/types';

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
          populate: {
            path: 'users',
            model: 'Users',
          },
        },
      },
    });

    if (!board) {
      return {
        success: false,
        message: 'The board is missing or the user does not have access.',
      };
    }

    return { success: true, data: JSON.stringify(board.board_id) };
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

    const existingColumn = await BoardColumn.findOne({
      board_id: boardId,
      title: title,
    });

    if (existingColumn) {
      return {
        success: false,
        message: 'A column by that name already exists on this board',
      };
    }

    const newColumn = await BoardColumn.create({
      title,
      board_id: boardId,
    });

    await Board.findByIdAndUpdate(boardId, { $push: { boardColumns: newColumn._id } });

    return {
      success: true,
      data: JSON.stringify(newColumn),
    };
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

  async changeColumnTitle({ boardId, userId, columnId, title }: IChangeColumnTitleProps) {
    if (!boardId || !userId || !columnId || !title) {
      return {
        success: false,
        message: 'BoardId, columnId, title and userId are required for changing a board column title',
      };
    }

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
        message: 'Only manager can change column title',
      };
    }

    const existingColumn = await BoardColumn.findOne({
      board_id: boardId,
      title: title,
      _id: { $ne: columnId },
    });

    if (existingColumn) {
      return {
        success: false,
        message: 'A column by that name already exists on this board',
      };
    }

    const updatedColumn = await BoardColumn.findByIdAndUpdate(columnId, { $set: { title } });

    return { success: true, data: updatedColumn };
  }

  async moveBoardColumn({ boardId, userId, sourceIndex, destinationIndex }: IMoveBoardColumnProps) {
    if (!boardId || !userId || sourceIndex === undefined || destinationIndex === undefined) {
      return {
        success: false,
        message: 'BoardId, userId, sourceIndex or destinationIndex are mandatory to move a column',
      };
    }

    await this.connect();

    const board = await Board.findById(boardId);

    if (!board) {
      return {
        success: false,
        message: 'Board not found',
      };
    }

    const userBoard = await UsersBoards.findOne({
      user_id: userId,
      board_id: boardId,
    });

    if (!userBoard) {
      return {
        success: false,
        message: 'The user does not have access to this board',
      };
    }

    const columns = [...board.boardColumns];
    const [removedColumn] = columns.splice(sourceIndex, 1);

    columns.splice(destinationIndex, 0, removedColumn);

    board.boardColumns = columns;

    await Board.findByIdAndUpdate(boardId, { $set: { boardColumns: columns } });

    return {
      success: true,
      message: 'Column successfully moved',
    };
  }
}

export const boardColumnService = new BoardColumnService();
