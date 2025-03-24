import { ITask, ITaskResponse, IUsers } from '@/types';

interface ITaskNormalizer extends Omit<ITask, 'users'> {
  id: string;
  title: string;
  users: IUsers[];
}

export const taskNormalizer = (data?: ITaskNormalizer): ITaskResponse | null => {
  if (!data) return null;

  return {
    id: data._id!.toString(),
    title: data.title,
    status: data.status,
    dateEnd: data.date_end,
    priority: data.priority,
    dateStart: data.date_start,
    attachment: data.attachment,
    comments: data.comments,
    description: data.description,
    createdAt: data.created_at,
    boardColumn_id: data.boardColumn_id,
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
