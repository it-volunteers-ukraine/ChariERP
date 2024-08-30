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

  async getOrganizationById(id: string) {
    return await this.organizationService.getOrganizationById(id);
  }

  async confirmOrganization(id: string) {
    return await await this.organizationService.confirmOrganization(id);
  }

  async declineOrganization(id: string, reason: string) {
    return await await this.organizationService.declineOrganization(id, reason);
  }

  async updateOrganization(id: string, formData: FormData) {
    return await await this.organizationService.updateOrganization(id, formData);
  }

  async deleteOrganization(id: string) {
    return await await this.organizationService.deleteOrganization(id);
  }
}

export const organizationController = new OrganizationController(new OrganizationService());
