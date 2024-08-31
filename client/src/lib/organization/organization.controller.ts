import { AdminOrganizationProps } from '@/types';

import { OrganizationService } from './organization.service';

class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  async createOrganization(data: FormData) {
    return await this.organizationService.createOrganization(data);
  }

  async getAdminOrganizations({ page, limit, filterStatus, populate }: AdminOrganizationProps) {
    return await this.organizationService.getAdminOrganizations({ page, limit, filterStatus, populate });
  }

  async getAdminOrganizationById(id: string) {
    return await this.organizationService.getAdminOrganizationById(id);
  }

  async declineAdminOrganization(id: string, reason: string) {
    return await await this.organizationService.declineAdminOrganization(id, reason);
  }

  async updateAdminOrganization(id: string, formData: FormData) {
    return await await this.organizationService.updateAdminOrganization(id, formData);
  }

  async deleteAdminOrganization(id: string) {
    return await await this.organizationService.deleteAdminOrganization(id);
  }
}

export const organizationController = new OrganizationController(new OrganizationService());
