import { IUsers } from '@/types';

export const normalizeUsers = (users: IUsers[]) => {
  return users.map((user) => ({
    id: user._id?.toString() || '',
    email: user.email,
    status: user.status,
    lastName: user.lastName,
    position: user.position,
    avatarUrl: user.avatarUrl || '',
    firstName: user.firstName,
    middleName: user.middleName || '',
    lastLogin: user?.lastLogin?.toISOString() || 'error',
  }));
};
