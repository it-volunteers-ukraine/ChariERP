import { RoleService } from './role.service';

class RoleController {
  constructor(private roleService: RoleService) {}

  async getRole(id: string) {
    return await this.roleService.getRole(id);
  }
}

export const roleController = new RoleController(new RoleService());
