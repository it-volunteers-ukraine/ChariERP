import { format } from 'date-fns';

import { IUsers } from '@/types';
import { dateFormat } from '@/constants';

import { fetchAvatarUrl } from './../columns/fetch-avatar-url';

export const normalizeUsers = async (users: IUsers[]) => {
  return await Promise.all(
    users.map(async (user) => {
      const lastLogin = user?.lastLogin ? format(new Date(user.lastLogin), dateFormat) : 'lastLogin';

      return {
        lastLogin,
        email: user.email,
        status: user.status,
        lastName: user.lastName,
        position: user.position,
        firstName: user.firstName,
        id: user._id?.toString() || '',
        middleName: user.middleName || '',
        avatarUrl: await fetchAvatarUrl(user._id!.toString(), user.avatarUrl || ''),
      };
    }),
  );
};

export const normalizeUsersWithoutAvatar = (users: IUsers[]) => {
  return users.map((user) => {
    const lastLogin = user?.lastLogin ? format(new Date(user.lastLogin), dateFormat) : 'lastLogin';

    return {
      lastLogin,
      email: user.email,
      status: user.status,
      lastName: user.lastName,
      position: user.position,
      firstName: user.firstName,
      id: user._id?.toString() || '',
      middleName: user.middleName || '',
      avatarUrl: user.avatarUrl || '',
    };
  });
};

export const editUserNormalizer = (user: IUsers) => {
  const avatar = user.avatarUrl ? user.avatarUrl : '';

  return {
    email: user.email,
    avatarUrl: avatar,
    status: user.status,
    lastName: user.lastName,
    position: user.position,
    notes: user.notes || '',
    firstName: user.firstName,
    address: user.address || '',
    id: user._id?.toString() || '',
    middleName: user.middleName || '',
    dateOfBirth: user.dateOfBirth || '',
    dateOfEntry: user.dateOfEntry || '',
    lastLogin: user?.lastLogin?.toISOString() || 'error',
  };
};
