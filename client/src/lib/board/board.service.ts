import { IUsersBoards, Roles } from '@/types';
import { IBoardData } from '@/components';

import { Board, Users, UsersBoards } from '..';
import { BaseService } from '../database/base.service';

class BoardService extends BaseService {
  async getBoards(userId: string) {
    await this.connect();

    const boards: IUsersBoards[] = await UsersBoards.find({ user_id: userId }).populate('board_id').exec();

    const response = boards.map((board) => board.board_id);

    return { success: true, data: JSON.stringify(response) };
  }

  async createBoard(title: string, userId?: string) {
    if (!title || !userId) {
      return {
        success: false,
        message: 'Title and userId are required for creating a board app',
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

    const boards = await UsersBoards.find({ organization_id: user.organizationId });

    if (boards.length >= 5) {
      return {
        success: false,
        message: 'Maximum number of boards (5) reached for this organization',
      };
    }

    const existingBoard = await Board.findOne({
      _id: { $in: boards.map((b) => b.board_id) },
      title: title,
    });

    if (existingBoard) {
      return {
        success: false,
        message: 'Board with this title already exists',
      };
    }

    const body = { title, order: boards.length + 1 };

    const newBoard = new Board(body);

    await newBoard.save();

    const userBoards = new UsersBoards({
      user_id: user._id,
      board_id: newBoard._id,
      organization_id: user.organizationId,
    });

    await userBoards.save();

    return { success: true, data: JSON.stringify(newBoard) };
  }

  async editBoard(id: string, text: string, userId: string) {
    if (!id || !text || !userId) {
      return {
        success: false,
        message: 'Id, title and userId are required for editing a board app',
      };
    }

    await this.connect();

    const user = await Users.findById(userId);

    if (!user || user.role !== Roles.MANAGER) {
      return { success: false, message: 'User not found, or access denied' };
    }

    const boards = await UsersBoards.find({ organization_id: user.organizationId });

    const existingBoard = await Board.findOne({
      _id: { $in: boards.map((b) => b.board_id), $ne: id },
      title: text,
    });

    if (existingBoard) {
      return {
        success: false,
        message: 'Board with this title already exists',
      };
    }

    await Board.findByIdAndUpdate(id, { $set: { title: text } });

    return { success: true, message: 'Board updated' };
  }

  async moveBoards(boards: IBoardData[], userId: string) {
    if (!boards || !userId) {
      return {
        success: false,
        message: 'Boards and userId are required for moving a board app',
      };
    }
    await this.connect();

    const user = await Users.findById(userId);

    if (!user || user.role !== Roles.MANAGER) {
      return { success: false, message: 'User not found, or access denied' };
    }

    const bulkOperations = boards.map((board) => ({
      updateOne: {
        filter: { _id: board._id },
        update: { $set: { order: board.order } },
      },
    }));

    await Board.bulkWrite(bulkOperations);

    return { success: true, message: 'Boards moved' };
  }

  async deleteBoard(id: string, userId: string) {
    if (!id || !userId) {
      return {
        success: false,
        message: 'Id and userId are required for deleting a board app',
      };
    }
    await this.connect();

    const user = await Users.findById(userId);

    if (!user || user.role !== Roles.MANAGER) {
      return { success: false, message: 'User not found, or access denied' };
    }
    const board = await Board.findById(id);

    await Board.findByIdAndDelete(id);

    const boards = await UsersBoards.find({ organization_id: user.organizationId });

    const boardIds = boards.map((board) => String(board.board_id));

    await Board.updateMany({ _id: { $in: boardIds }, order: { $gt: board.order } }, { $inc: { order: -1 } });

    return { success: true, message: 'Board deleted' };
  }
}

export const boardService = new BoardService();
