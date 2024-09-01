'use server';

import { organizationService } from '@/lib';

export async function deleteOrganizationAction(id: string) {
  try {
    return await organizationService.deleteAdminOrganization(id);
  } catch (error) {
    return Promise.reject(error);
  }
}
