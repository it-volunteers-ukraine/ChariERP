'use server';

import { organizationService } from '@/lib';

export async function getOrganizationByIdAction(id: string) {
  try {
    return await organizationService.getAdminOrganizationById(id);
  } catch (error) {
    return Promise.reject(error);
  }
}
