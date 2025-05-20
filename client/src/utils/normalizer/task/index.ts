import { IComment, ITask, IUsers } from '@/types';

import { normalizeUsers } from '../users';
import { fetchAvatarUrl } from '../columns/fetch-avatar-url';

interface ITaskNormalizer extends Omit<ITask, 'users'> {
  users: IUsers[];
}

export const taskNormalizer = async (data: ITaskNormalizer) => {
  return {
    id: data._id.toString(),
    createdAt: data.created_at,
    title: data.title || 'Task',
    dateEnd: data.date_end || null,
    priority: data.priority || null,
    boardTitle: data.boardTitle || '',
    dateStart: data.date_start || null,
    description: data.description || '',
    comments: await commentsNormalizer(data.comments || []),
    boardColumnId: { id: data.boardColumn_id._id.toString(), title: data.boardColumn_id.title },
    columnsList: data.columnsList.map((column) => ({ id: column.id, title: column.title })) || [],
    attachment: data.attachment.map((file) => ({
      name: file.name,
      type: file.type,
      id: file._id.toString(),
    })),
    users: data.users ? await normalizeUsers(data.users) : [],
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
