import { ICreateUser, IEditUser } from '@/types';
import { cleanSpaces, renameFile } from '@/utils/helpers';

export const createUserSerializer = (data: ICreateUser) => {
  const { avatarUrl, organizationId, ...rest } = data;

  const trimData = {
    phone: rest.phone,
    password: rest.password,
    email: cleanSpaces(rest.email),
    notes: cleanSpaces(rest.notes),
    address: cleanSpaces(rest.address),
    lastName: cleanSpaces(rest.lastName),
    position: cleanSpaces(rest.position),
    firstName: cleanSpaces(rest.firstName),
    middleName: cleanSpaces(rest.middleName),
  };

  return {
    organizationId,
    avatarUrl: avatarUrl instanceof File ? renameFile(avatarUrl) : '',
    data: { ...rest, ...trimData },
  };
};

export const updateUserSerializer = (data: IEditUser) => {
  const { avatarUrl, ...rest } = data;

  const trimData = {
    phone: rest.phone,
    email: cleanSpaces(rest.email),
    notes: cleanSpaces(rest.notes),
    address: cleanSpaces(rest.address),
    lastName: cleanSpaces(rest.lastName),
    position: cleanSpaces(rest.position),
    firstName: cleanSpaces(rest.firstName),
    middleName: cleanSpaces(rest.middleName),
  };

  return {
    data: { ...rest, ...trimData },
    avatarUrl: avatarUrl instanceof File ? renameFile(avatarUrl) : '',
  };
};
