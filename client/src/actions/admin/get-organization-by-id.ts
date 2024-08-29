'use server';

import { organizationController } from '@/lib';

export async function getOrganizationByIdAction(id: string) {
  try {
    return await organizationController.getOrganizationById(id);
  } catch (error) {
    return Promise.reject(error);
  }
}
