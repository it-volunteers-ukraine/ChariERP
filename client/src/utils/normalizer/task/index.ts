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
    status: data.status || null,
    dateEnd: data.date_end || null,
    priority: data.priority || null,
    boardTitle: data.boardTitle || '',
    dateStart: data.date_start || null,
    boardColumnId: data.boardColumn_id,
    description: data.description || '',
    columnsList: data.columnsList || [],
    comments: await commentsNormalizer(data.comments || []),
    attachment: data.attachment.map((file) => ({
      name: file.name,
      type: file.type,
      id: file._id.toString(),
    })),
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
