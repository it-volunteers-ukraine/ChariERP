import { ITask, ITaskResponse, IUsers } from '@/types';

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
    comments:
      data.comments.map((comment) => ({
        editAt: comment.edit_at,
        comment: comment.comment,
        id: comment._id.toString(),
        createdAt: comment.created_at,
        authorId: comment.authorId.toString(),
      })) || [],
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
