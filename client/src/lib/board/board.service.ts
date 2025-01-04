import { IUsersBoards, Roles } from '@/types';
import { IBoardData } from '@/components';

import { Board, Users, UsersBoards } from '..';
import { BaseService } from '../database/base.service';

class BoardService extends BaseService {
  async getBoards(userId: string) {
    await this.connect();

    const boards: IUsersBoards[] = await UsersBoards.find({ user_id: userId }).populate('board_id').exec();

    const response = boards.map((board) => board.board_id);

    return JSON.stringify({ success: true, data: response });
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
    //TODO: Check if userBoards already exists
    //TODO: Error if boards more than 5

    const boards = await UsersBoards.find({ organization_id: user.organizationId });

    const body = { title, order: boards.length + 1 };

    const newBoard = new Board(body);

    await newBoard.save();

    const userBoards = new UsersBoards({
      user_id: user._id,
      board_id: newBoard._id,
      organization_id: user.organizationId,
    });

    await userBoards.save();

    return JSON.stringify({ success: true, data: newBoard });
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

    await Board.findByIdAndUpdate(id, { $set: { title: text } });

    return JSON.stringify({ success: true, message: 'Board updated' });
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

    return JSON.stringify({ success: true, message: 'Boards moved' });
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

    return JSON.stringify({ success: true, message: 'Board deleted' });
  }
}

export const boardService = new BoardService();
