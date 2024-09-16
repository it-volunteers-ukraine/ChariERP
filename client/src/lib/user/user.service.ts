import bcrypt from 'bcrypt';

import { getPaginate } from '@/utils';
import { IUsers, IUsersByOrganizationProps } from '@/types';

import { Admin, Users } from '..';
import { BaseService } from '../database/base.service';

class UserService extends BaseService {
  async createAdmin(email: string, password: string) {
    await this.connect();
    const admins = await Admin.find();

    if (admins.length > 0) {
      return { message: 'Admin already exists', success: false };
    }

    const hash = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ email, password: hash });
    const response = await newAdmin.save();

    return { success: true, data: response };
  }

  async login(email: string, password: string) {
    await this.connect();

    const user = await Users.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (user || admin) {
      const foundUser = user || admin;
      const compare = await bcrypt.compare(password, foundUser.password);

      if (compare) {
        return { success: true, user: JSON.stringify(foundUser) };
      }

      return { success: false, message: 'userIncorrect' };
    }

    return { success: false, message: 'userNotFound' };
  }

  async getAllByOrganizationId({ id, page, limit = 10 }: IUsersByOrganizationProps) {
    await this.connect();

    const { results, totalPages, currentPage, totalItems } = await getPaginate<IUsers>({
      page,
      limit,
      model: Users,
      filter: { organizationId: id },
    });

    return {
      totalPages,
      totalItems,
      currentPage,
      success: true,
      results: results,
    };
  }

  async getUserById(id: string) {
    await this.connect();

    const admin = await Admin.findById(id);

    if (admin) {
      return { success: true, user: JSON.stringify(admin) };
    }

    const user = await Users.findById(id);

    if (user) {
      return { success: true, user: JSON.stringify(user) };
    }

    return { success: false, message: 'User not found' };
  }
}

export const userService = new UserService();
