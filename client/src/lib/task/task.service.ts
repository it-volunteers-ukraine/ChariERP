import { BoardColumn } from '@/lib';
import { IBoardColumn, ICreateTaskProps, Roles } from '@/types';

import { Task, UsersBoards } from '..';
import { BaseService } from '../database/base.service';

class TaskService extends BaseService {
  //Толя! бесишь, линивая жопа
  async createTask({ userId, boardId, columnId, task }: ICreateTaskProps) {
    if (!columnId || !userId || !boardId || !task) {
      return {
        success: false,
        message: 'user Id , board Id, column Id, object task and boardId are required for create a task',
      };
    }
    // TODO Validation of object task when we know all func of task
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
        message: 'Only manager can create a ticket',
      };
    }

    const columns = userBoard.board_id.boardColumns;

    const boardColumn = columns.find((el: IBoardColumn) => String(el._id) === columnId);

    if (!boardColumn) {
      return {
        success: false,
        message: 'Column does not exist.',
      };
    }
    const taskUsers = task.users || [];

    const preparedTask = { ...task, users: taskUsers, boardColumn_id: columnId };

    const newTask = await Task.create(preparedTask);

    await BoardColumn.findByIdAndUpdate(columnId, { $push: { task_ids: newTask._id } });

    return JSON.stringify({ success: true, data: newTask });
  }
}

export const taskService = new TaskService();
