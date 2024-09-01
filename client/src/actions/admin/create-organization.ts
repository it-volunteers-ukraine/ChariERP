'use server';

import { organizationService } from '@/lib';

export async function createOrganizationAction(data: FormData) {
  try {
    return await organizationService.createOrganization(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
