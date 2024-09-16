'use server';

import { organizationService } from '@/lib';

export async function declineOrganizationAction(id: string, reason: string) {
  try {
    return await organizationService.declineAdminOrganization(id, reason);
  } catch (error) {
    return Promise.reject(error);
  }
}
