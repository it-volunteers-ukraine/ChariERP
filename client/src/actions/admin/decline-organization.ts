'use server';

import { organizationController } from '@/lib';

export async function declineOrganizationAction(id: string, reason: string) {
  try {
    return await organizationController.declineOrganization(id, reason);
  } catch (error) {
    return Promise.reject(error);
  }
}
