'use server';

import { userService } from '@/lib';
import { IUsersByOrganizationProps } from '@/types';

export async function getAllUsersByOrganizationIdActions({ id, page, limit }: IUsersByOrganizationProps) {
  try {
    return await userService.getAllByOrganizationId({ id, page, limit });
  } catch (error) {
    return Promise.reject(error);
  }
}
