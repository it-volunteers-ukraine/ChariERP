import { Roles } from '@/types';
import { Admin, Users } from '..';
import { BaseService } from '../database/base.service';

class RoleService extends BaseService {
  async getRole(id: string) {
    await this.connect();

    const admin = await Admin.findById(id);

    if (admin) {
      return { success: true, role: admin.role as Roles };
    }

    const user = await Users.findById(id);

    if (user) {
      return { success: true, role: user.role as Roles };
    }

    return { success: false, message: 'User not found' };
  }
}

export const roleService = new RoleService();
