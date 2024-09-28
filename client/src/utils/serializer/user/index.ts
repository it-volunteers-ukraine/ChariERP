import { Schema } from 'mongoose';

import { renameFile } from '@/utils/helpers';

export interface ICreateUser {
  email: string;
  notes: string;
  phone: string;
  address: string;
  lastName: string;
  password: string;
  position: string;
  firstName: string;
  middleName: string;
  dateOfBirth: number;
  dateOfEntry: number;
  avatarUrl: File | string;
  organizationId: Schema.Types.ObjectId | undefined;
}

export const createUserSerializer = (data: ICreateUser) => {
  const { avatarUrl, organizationId, ...rest } = data;

  return {
    avatarUrl: avatarUrl instanceof File ? renameFile(avatarUrl) : '',
    data: { ...rest },
    organizationId,
  };
};
