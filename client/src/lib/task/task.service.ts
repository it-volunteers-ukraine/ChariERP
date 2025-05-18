import { Readable } from 'stream';
import { cookies } from 'next/headers';

import { BoardColumn } from '@/lib';
import { streamToBase64 } from '@/utils';
import { fileConfigAttachment } from '@/constants';
import {
  Roles,
  ITask,
  IUsers,
  IUploadFile,
  IDeleteFile,
  IBoardColumn,
  IGetTaskProps,
  IHasTaskAccess,
  IMoveTaskProps,
  IDeleteTaskPage,
  IAttachmentFile,
  IAddCommentProps,
  ICreateTaskProps,
  IDeleteTaskProps,
  LeanTaskComments,
  IUpdateDateProps,
  IUpdateTaskTitle,
  IDeleteCommentProps,
  IUpdateCommentProps,
  IUpdatePriorityProps,
  IUpdateTaskDescription,
  IUpdateBoardColumnIdProps,
} from '@/types';
import { BucketFolders, deleteFileFromBucket, downloadFileFromBucket, uploadFileToBucket } from '@/services';

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

    const columnsList = userBoard.board_id.boardColumns.map((column: IBoardColumn) => ({
      title: column.title,
      id: column._id.toString(),
    }));

    if (!boardColumn) {
      return {
        success: false,
        message: 'Column does not exist.',
      };
    }

    const task = await Task.findById(taskId)
      .populate('users')
      .populate('boardColumn_id', 'title')
      .populate('comments.author', 'lastName firstName avatarUrl');

    if (!task) {
      return {
        success: false,
        message: 'Task does not exist.',
      };
    }

    return {
      success: true,
      data: JSON.stringify({
        ...task.toObject(),
        boardTitle: userBoard.board_id.title,
        columnsList,
      }),
    };
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
      users: [userId],
      priority: '',
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

  async hasTaskAccess({ userId, taskId, role }: IHasTaskAccess) {
    const task = await Task.findById(taskId).populate('users', 'role');

    if (!task) {
      return {
        error: {
          success: false,
          message: 'Task not found',
        },
      };
    }

    const user = task.users.find((user: IUsers) => String(user._id) === userId);

    if (!user) {
      return {
        error: {
          success: false,
          message: 'User not found',
        },
      };
    }

    if (role && user.role !== role) {
      return {
        error: {
          success: false,
          message: 'You are not allowed to add a comment to this task',
        },
      };
    }

    return {
      task,
    };
  }

  async getComments(taskId: string) {
    const task = await Task.findById(taskId)
      .select('comments')
      .populate('comments.author', 'firstName lastName avatarUrl')
      .lean<LeanTaskComments>();

    return task?.comments ? task.comments : [];
  }

  async addComment({ taskId, userId, text }: IAddCommentProps) {
    if (!taskId || !userId || !text) {
      return {
        success: false,
        message: 'Task ID, User ID, and comment text are required',
      };
    }

    await this.connect();

    const access = await this.hasTaskAccess({ userId, taskId });

    if (access.error) {
      return access.error;
    }

    const { task } = access;

    task.comments.push({ author: userId, text: text });
    await task.save();

    const newComments = await this.getComments(taskId);

    if (!newComments) {
      return {
        success: false,
        message: 'Could not create a new comment',
      };
    }

    return {
      success: true,
      data: JSON.stringify(newComments),
      message: 'Comment added successfully',
    };
  }

  async deleteComment({ taskId, commentId, userId }: IDeleteCommentProps) {
    if (!taskId || !userId || !commentId) {
      return {
        success: false,
        message: 'Task ID, User ID, and Comment ID are required',
      };
    }

    await this.connect();

    const access = await this.hasTaskAccess({ userId, taskId });

    if (access.error) {
      return access.error;
    }

    const { task } = access;

    const comment = task.comments.id(commentId);

    if (!comment) {
      return {
        success: false,
        message: 'Comment not found',
      };
    }

    if (comment.author.toString() !== userId) {
      return {
        success: false,
        message: 'You are not allowed to delete this comment',
      };
    }

    comment.deleteOne();
    await task.save();

    const updatedComments = await this.getComments(taskId);

    return {
      success: true,
      data: JSON.stringify(updatedComments),
      message: 'Comment deleted successfully',
    };
  }

  async updateComment({ taskId, commentId, text, userId }: IUpdateCommentProps) {
    if (!taskId || !userId || !commentId || !text) {
      return {
        success: false,
        message: 'Task ID, User ID, Text, and Comment ID are required',
      };
    }

    await this.connect();

    const access = await this.hasTaskAccess({ userId, taskId });

    if (access.error) {
      return access.error;
    }

    const { task } = access;

    const comment = task.comments.id(commentId);

    if (!comment) {
      return {
        success: false,
        message: 'Comment not found',
      };
    }

    if (comment.author.toString() !== userId) {
      return {
        success: false,
        message: 'You are not allowed to update this comment',
      };
    }

    comment.text = text;
    await task.save();

    const updatedComments = await this.getComments(taskId);

    return {
      success: true,
      data: JSON.stringify(updatedComments),
      message: 'Comment updated successfully',
    };
  }

  async updateDescription({ taskId, description, userId }: IUpdateTaskDescription) {
    if (!taskId || !userId || !description) {
      return {
        success: false,
        message: 'Task ID, User ID, and Description are required',
      };
    }

    await this.connect();

    const access = await this.hasTaskAccess({ userId, taskId, role: Roles.MANAGER });

    if (access.error) {
      return access.error;
    }

    const { task } = access;

    task.description = description;
    await task.save();

    return {
      success: true,
      data: JSON.stringify(task.description),
      message: 'Comment updated successfully',
    };
  }
  async updateDateStart({ taskId, userId, date }: IUpdateDateProps) {
    if (!taskId || !userId || !date) {
      return {
        success: false,
        message: 'Task ID, User ID, and Date are required',
      };
    }

    await this.connect();

    const access = await this.hasTaskAccess({ userId, taskId, role: Roles.MANAGER });

    if (access.error) {
      return access.error;
    }

    const { task } = access;

    task.date_start = date;
    await task.save();

    return {
      success: true,
      data: JSON.stringify(date),
      message: 'Task updated successfully',
    };
  }
  async updateDateEnd({ taskId, userId, date }: IUpdateDateProps) {
    if (!taskId || !userId || !date) {
      return {
        success: false,
        message: 'Task ID, User ID, and Date are required',
      };
    }

    await this.connect();

    const access = await this.hasTaskAccess({ userId, taskId, role: Roles.MANAGER });

    if (access.error) {
      return access.error;
    }

    const { task } = access;

    task.date_end = date;
    await task.save();

    return {
      success: true,
      data: JSON.stringify(date),
      message: 'Task updated successfully',
    };
  }

  async updateBoardColumnId({ taskId, userId, newColumnId }: IUpdateBoardColumnIdProps) {
    if (!taskId || !userId || !newColumnId) {
      return {
        success: false,
        message: 'Task ID, User ID, and newColumnId are required',
      };
    }

    await this.connect();

    const access = await this.hasTaskAccess({ userId, taskId });

    if (access.error) {
      return access.error;
    }

    const { task } = access;

    const updateColumn = await BoardColumn.findByIdAndUpdate(
      newColumnId,
      {
        $push: {
          task_ids: taskId,
        },
      },
      {
        new: true,
      },
    );

    if (!updateColumn) {
      return {
        success: false,
        message: 'Column not found',
      };
    }

    await BoardColumn.findByIdAndUpdate(task.boardColumn_id, { $pull: { task_ids: taskId } });

    task.boardColumn_id = newColumnId;

    await task.save();

    return {
      success: true,
      data: JSON.stringify({ id: updateColumn._id, title: updateColumn.title }),
      message: 'Task updated successfully',
    };
  }
  async updatePriority({ taskId, userId, priority }: IUpdatePriorityProps) {
    if (!taskId || !userId || !priority) {
      return {
        success: false,
        message: 'Task ID, User ID, and priority are required',
      };
    }

    await this.connect();

    const access = await this.hasTaskAccess({ userId, taskId, role: Roles.MANAGER });

    if (access.error) {
      return access.error;
    }

    const { task } = access;

    task.priority = priority;
    await task.save();

    return {
      success: true,
      data: JSON.stringify(priority),
      message: 'Task updated successfully',
    };
  }
  async deleteTaskPage({ taskId, userId }: IDeleteTaskPage) {
    if (!taskId || !userId) {
      return {
        success: false,
        message: 'Task ID abd User ID are required',
      };
    }

    await this.connect();

    const access = await this.hasTaskAccess({ userId, taskId, role: Roles.MANAGER });

    if (access.error) {
      return access.error;
    }

    const { task } = access;

    const boardColumn = await BoardColumn.findByIdAndUpdate(
      task.boardColumn_id,
      { $pull: { task_ids: taskId } },
      { new: true },
    );

    if (!boardColumn) {
      return {
        success: false,
        message: 'Board column not found',
      };
    }

    await task.deleteOne();

    return {
      success: true,
      message: 'Task successfully deleted',
      data: JSON.stringify({ boardId: boardColumn.board_id }),
    };
  }
  async updateTitle({ taskId, title, userId }: IUpdateTaskTitle) {
    if (!taskId || !userId || !title) {
      return {
        success: false,
        message: 'Task ID, User ID and Title are required',
      };
    }

    await this.connect();

    const access = await this.hasTaskAccess({ userId, taskId, role: Roles.MANAGER });

    if (access.error) {
      return access.error;
    }

    const { task } = access;

    task.title = title;
    await task.save();

    return {
      success: true,
      message: 'Task title updated successfully',
    };
  }

  async uploadFile({ taskId, userId, formData }: IUploadFile) {
    if (!taskId || !userId || !formData) {
      return {
        success: false,
        message: 'Task ID, User ID and file are required',
      };
    }

    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return {
        success: false,
        message: 'File is required',
      };
    }

    let isLimit = files.length > fileConfigAttachment.limit;

    if (isLimit) {
      return {
        success: false,
        message: `You can upload only ${fileConfigAttachment.limit} files`,
      };
    }

    const invalidFiles = files.reduce((acc: string[], file) => {
      const extension = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase();

      const isTooLarge = file.size > fileConfigAttachment.size;
      const isInvalidExtension = !fileConfigAttachment.extensions.includes(extension);

      if (isTooLarge || isInvalidExtension) {
        const reasons = [];

        if (isTooLarge) reasons.push(`too large more ${fileConfigAttachment.size / (1024 * 1024)} MB,`);

        if (isInvalidExtension) reasons.push(`invalid extension: .${extension}`);

        acc.push(`"${file.name}" ${reasons.join(', ')}`);
      }

      return acc;
    }, []);

    if (invalidFiles.length > 0) {
      const message =
        invalidFiles.length === 1
          ? `The file ${invalidFiles[0]} is not allowed.`
          : `The following files are not allowed: ${invalidFiles.join('\n ')}`;

      return {
        success: false,
        message,
      };
    }

    const access = await this.hasTaskAccess({ userId, taskId, role: Roles.MANAGER });

    if (access.error) {
      return access.error;
    }

    const { task } = access;

    isLimit = task.attachment.length + files.length > fileConfigAttachment.limit;

    if (isLimit) {
      return {
        success: false,
        message: `You can upload only ${fileConfigAttachment.limit} files`,
      };
    }

    const filesExist = files.reduce((acc: IAttachmentFile[], newFile) => {
      const isFileExist = task.attachment.find((file: IAttachmentFile) => file.name === newFile.name);

      if (isFileExist) {
        acc.push(isFileExist.name);
      }

      return acc;
    }, []);

    if (filesExist.length > 0) {
      const fileList = filesExist.join(', ');

      const message =
        filesExist.length === 1
          ? `The file "${fileList}" already exists.`
          : `The following files already exist: ${fileList}.`;

      return {
        message,
        success: false,
      };
    }

    const uploadFiles = await Promise.all(
      files.map(async (file) => {
        const key = await uploadFileToBucket(taskId, BucketFolders.Task, file);

        return { name: file.name, type: file.type, keyFromBucket: key };
      }),
    );

    if (!uploadFiles.length) {
      return {
        success: false,
        message: 'Error uploading file',
      };
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $push: { attachment: { $each: uploadFiles } } },
      { new: true },
    ).lean<ITask>();

    return {
      success: true,
      message: 'Files uploaded successfully',
      data: JSON.stringify(
        updatedTask?.attachment.map((file) => ({
          id: file._id,
          name: file.name,
        })),
      ),
    };
  }

  async downloadFile({ taskId }: { taskId: string }) {
    if (!taskId) {
      return {
        success: false,
        message: 'Task ID is required',
      };
    }

    const task = await Task.findById(taskId).lean<ITask>();

    if (!task) {
      return {
        success: false,
        message: 'Task not found',
      };
    }

    if (task.attachment.length === 0) {
      return {
        success: true,
        message: 'No files to download',
      };
    }

    const filesStream = await Promise.all(
      task.attachment.map(async (file) => {
        const stream = await downloadFileFromBucket(file.keyFromBucket);
        const fileBase64 = await streamToBase64(stream as Readable);

        return {
          name: file.name,
          type: file.type,
          body: fileBase64,
          id: file._id.toString(),
        };
      }),
    );

    if (!filesStream || filesStream.length === 0) {
      return {
        success: false,
        message: 'Error download file',
      };
    }

    return {
      success: true,
      message: 'Files downloaded successfully',
      data: JSON.stringify(filesStream),
    };
  }

  async deleteFile({ taskId, userId, id }: IDeleteFile) {
    if (!taskId || !id || !userId) {
      return {
        success: false,
        message: 'Task ID, user Id and file Id are required',
      };
    }

    const access = await this.hasTaskAccess({ userId, taskId, role: Roles.MANAGER });

    if (access.error) {
      return access.error;
    }

    const { task } = access;

    const fileDelete = task.attachment.find((file: IAttachmentFile) => file._id.toString() === id);

    if (!fileDelete) {
      return {
        success: false,
        message: 'File not found in task',
      };
    }

    const isDeleted = await deleteFileFromBucket(fileDelete.keyFromBucket);

    if (!isDeleted) {
      return {
        success: false,
        message: 'Error deleting file from storage',
      };
    }

    task.attachment = task.attachment.filter((file: IAttachmentFile) => file._id.toString() !== id);

    await task.save();

    return {
      success: true,
      message: 'File deleted successfully',
    };
  }
}

export const taskService = new TaskService();
