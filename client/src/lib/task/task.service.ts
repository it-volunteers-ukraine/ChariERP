import { cookies } from 'next/headers';

import { BoardColumn } from '@/lib';
import { IBoardColumn, ICreateTaskProps, IDeleteTaskProps, IGetTaskProps, IMoveTaskProps, Roles } from '@/types';

import { Task, UsersBoards } from '..';
import { BaseService } from '../database/base.service';

class TaskService extends BaseService {
  async getTask({ userId, boardId, columnId, taskId }: IGetTaskProps) {
    if (!columnId || !userId || !boardId || !taskId) {
      return {
        success: false,
        message: 'User ID, Board ID, Column ID, and Task ID must be entered to retrieve a task',
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

    const columns = userBoard.board_id.boardColumns;

    const boardColumn = columns.find((el: IBoardColumn) => String(el._id) === columnId);

    if (!boardColumn) {
      return {
        success: false,
        message: 'Column does not exist.',
      };
    }

    const task = await Task.findById(taskId).populate('users');

    if (!task) {
      return {
        success: false,
        message: 'Task does not exist.',
      };
    }

    return { success: true, data: JSON.stringify({ ...task.toObject(), boardTitle: userBoard.board_id.title }) };
  }

  async createTask({ userId, boardId, columnId }: ICreateTaskProps) {
    if (!columnId || !userId || !boardId) {
      return {
        success: false,
        message: 'user Id , board Id, column Id, object task and boardId are required for create a task',
      };
    }
    // TODO Validation of object task when we know all func of task
    await this.connect();

    const cookieStore = await cookies();
    const language = cookieStore.get('NEXT_LOCALE')?.value;

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

    const newTask = {
      comments: [],
      attachment: [],
      description: '',
      priority: 'high',
      date_end: new Date(),
      status: 'in_progress',
      date_start: new Date(),
      title: language === 'en' ? 'New task' : 'Новая задача',
    };

    const preparedTask = { ...newTask, boardColumn_id: columnId };

    const createdTask = await Task.create(preparedTask);

    await BoardColumn.findByIdAndUpdate(columnId, { $push: { task_ids: createdTask._id } });

    return { success: true, data: JSON.stringify(createdTask) };
  }

  async deleteTask({ boardId, userId, taskId }: IDeleteTaskProps) {
    if (!boardId || !userId || !taskId) {
      return {
        success: false,
        message: 'BoardId, userId and taskId are required for deleting a task',
      };
    }

    await this.connect();

    const userBoard = await UsersBoards.findOne({
      user_id: userId,
      board_id: boardId,
    }).populate('user_id');

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
        message: 'Only manager can delete a task',
      };
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return {
        success: false,
        message: 'Task not found',
      };
    }

    await BoardColumn.findByIdAndUpdate(task.boardColumn_id, { $pull: { task_ids: taskId } }, { new: true });

    await task.deleteOne();

    return {
      success: true,
      message: 'Task successfully deleted',
    };
  }

  async moveTask({ boardId, userId, taskId, columnId, destinationIndex, destinationColumnId }: IMoveTaskProps) {
    if (!boardId || !userId || !taskId || !columnId || destinationIndex === undefined) {
      return {
        success: false,
        message: 'BoardId, userId, taskId, columnId, destinationIndex are required for moving a task',
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
    ]);

    if (!userBoard) {
      return {
        success: false,
        message: 'The board is missing or the user does not have access.',
      };
    }

    const columns = userBoard.board_id.boardColumns;

    const sourceColumn = columns.find((col: IBoardColumn) => String(col._id) === columnId);

    if (!sourceColumn) {
      return {
        success: false,
        message: 'Source column not found in this board',
      };
    }

    if (destinationColumnId) {
      const destinationColumn = columns.find((col: IBoardColumn) => String(col._id) === destinationColumnId);

      if (!destinationColumn) {
        return {
          success: false,
          message: 'Destination column not found in this board',
        };
      }
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return {
        success: false,
        message: 'Task not found',
      };
    }

    if (String(task.boardColumn_id) !== columnId) {
      return {
        success: false,
        message: 'Task does not belong to the specified source column',
      };
    }

    if (destinationColumnId && destinationColumnId !== columnId) {
      await BoardColumn.findByIdAndUpdate(columnId, { $pull: { task_ids: taskId } });

      await BoardColumn.findByIdAndUpdate(destinationColumnId, {
        $push: {
          task_ids: {
            $each: [taskId],
            $position: Number(destinationIndex),
          },
        },
      });

      await Task.findByIdAndUpdate(taskId, { boardColumn_id: destinationColumnId });
    } else {
      await BoardColumn.findByIdAndUpdate(columnId, {
        $pull: { task_ids: taskId },
      });

      await BoardColumn.findByIdAndUpdate(columnId, {
        $push: {
          task_ids: {
            $each: [taskId],
            $position: Number(destinationIndex),
          },
        },
      });
    }

    return {
      success: true,
      message: 'Task successfully moved',
    };
  }
}

export const taskService = new TaskService();
