import { renameFile } from '@/utils/helpers';
import { ICreateUser, IEditUser } from '@/types';

export const createUserSerializer = (data: ICreateUser) => {
  const { avatarUrl, organizationId, ...rest } = data;

  return {
    avatarUrl: avatarUrl instanceof File ? renameFile(avatarUrl) : '',
    data: { ...rest },
    organizationId,
  };
};

export const updateUserSerializer = (data: IEditUser) => {
  const { avatarUrl, ...rest } = data;

  return {
    avatarUrl: avatarUrl instanceof File ? renameFile(avatarUrl) : '',
    data: { ...rest },
  };
};
