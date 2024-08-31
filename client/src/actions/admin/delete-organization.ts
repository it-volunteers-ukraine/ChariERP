'use server';

import { organizationController } from '@/lib';

export async function deleteOrganizationAction(id: string) {
  try {
    return await organizationController.deleteAdminOrganization(id);
  } catch (error) {
    return Promise.reject(error);
  }
}
