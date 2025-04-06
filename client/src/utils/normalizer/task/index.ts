import { IComment, ICommentResponse, ITask, ITaskResponse, IUsers } from '@/types';

interface ITaskNormalizer extends Omit<ITask, 'users'> {
  id: string;
  title: string;
  users: IUsers[];
}

export const taskNormalizer = (data: ITaskNormalizer): ITaskResponse => {
  return {
    id: data._id.toString(),
    title: data.title || 'Task',
    status: data.status || null,
    dateEnd: data.date_end || null,
    priority: data.priority || null,
    dateStart: data.date_start || null,
    attachment: data.attachment || [],
    comments: data.comments.map((comment) => commentNormalizer(comment)) || [],
    description: data.description || '',
    createdAt: data.created_at,
    boardColumnId: data.boardColumn_id,
    boardTitle: data.boardTitle || '',
    columnsList: data.columnsList || [],
    users: data.users?.map((user) => ({
      id: user._id!.toString(),
      avatarUrl: user.avatarUrl || '',
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      phone: user.phone,
      position: user.position,
      email: user.email,
      status: user.status,
      role: user.role,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      notes: user.notes,
      lastLogin: user.lastLogin,
    })),
  };
};

export const commentNormalizer = (comment: IComment): ICommentResponse => {
  return {
    comment: comment.comment,
    id: comment._id.toString(),
    updatedAt: comment.updated_at,
    createdAt: comment.created_at,
    author: {
      id: comment.author._id.toString(),
      lastName: comment.author.lastName,
      firstName: comment.author.firstName,
      avatarUrl: comment.author.avatarUrl || '',
    },
  };
};
