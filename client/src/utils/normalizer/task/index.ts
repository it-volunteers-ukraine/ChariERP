import { IComment, ITask, IUsers } from '@/types';

import { fetchAvatarUrl } from '../columns/fetch-avatar-url';

interface ITaskNormalizer extends Omit<ITask, 'users'> {
  id: string;
  title: string;
  users: IUsers[];
}

export const taskNormalizer = async (data: ITaskNormalizer) => {
  return {
    id: data._id.toString(),
    createdAt: data.created_at,
    title: data.title || 'Task',
    dateEnd: data.date_end || null,
    priority: data.priority || null,
    attachment: data.attachment || [],
    boardTitle: data.boardTitle || '',
    dateStart: data.date_start || null,
    description: data.description || '',
    comments: await commentsNormalizer(data.comments || []),
    boardColumnId: { id: data.boardColumn_id._id.toString(), title: data.boardColumn_id.title },
    columnsList: data.columnsList.map((column) => ({ id: column._id, title: column.title })) || [],
    users: data.users?.map((user) => ({
      role: user.role,
      phone: user.phone,
      email: user.email,
      notes: user.notes,
      status: user.status,
      address: user.address,
      lastName: user.lastName,
      position: user.position,
      id: user._id!.toString(),
      firstName: user.firstName,
      lastLogin: user.lastLogin,
      middleName: user.middleName,
      dateOfBirth: user.dateOfBirth,
      avatarUrl: user.avatarUrl || '',
    })),
  };
};

export const commentsNormalizer = async (comments: IComment[]) => {
  return await Promise.all(
    comments.map(async (comment) => ({
      text: comment.text,
      id: comment._id.toString(),
      updatedAt: comment.updated_at,
      createdAt: comment.created_at,
      author: {
        id: comment.author._id.toString(),
        lastName: comment.author.lastName,
        firstName: comment.author.firstName,
        avatarUrl: await fetchAvatarUrl(comment.author._id.toString(), comment.author.avatarUrl || ''),
      },
    })),
  );
};
