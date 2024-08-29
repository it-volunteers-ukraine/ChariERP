import { OrganizationService } from './organization.service';

class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  async createOrganization(data: FormData) {
    return await this.organizationService.createOrganization(data);
  }
}

export const organizationController = new OrganizationController(new OrganizationService());
