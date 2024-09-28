import bcrypt from 'bcrypt';

import { getPaginate } from '@/utils';
import { BucketFolders, uploadFileToBucket } from '@/services';
import { IUsers, IUsersByOrganizationProps, UserStatus } from '@/types';

import { requiredUsers } from './helpers';
import { Admin, Organizations, Users } from '..';
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

      if (foundUser.status === UserStatus.BLOCKED) {
        return { success: false, message: 'blockedAccount' };
      }

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
      success: true,
      users: JSON.stringify({
        totalPages,
        totalItems,
        currentPage,
        success: true,
        results: results,
      }),
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

  async createUserByCompanyId(formData: FormData) {
    await this.connect();

    const avatarUrl = formData.get('avatarUrl') as File;
    const organizationId = formData.get('organizationId') as string;
    const data = JSON.parse(formData.get('data') as string);

    const errors = Object.entries(requiredUsers).reduce((acc, [key, value], idx) => {
      if (idx !== 0 && !data[key] && acc) {
        acc += ',';
      }

      if (!data[key]) {
        acc += value;
      }

      return acc;
    }, '');

    if (errors) {
      return { success: false, message: errors };
    }

    const isEmailExist = await Users.findOne({
      email: data.email,
    });

    console.log({ email: isEmailExist });

    if (isEmailExist) {
      return { success: false, message: 'Email already exists' };
    }

    const organization = await Organizations.findOne({
      _id: organizationId,
    });

    if (!organization) {
      return { success: false, message: `Organization  doesn't exist` };
    }

    const body = {
      ...data,
      status: UserStatus.ACTIVE,
      avatarUrl: '',
      organizationId: organizationId,
    };

    if (avatarUrl) {
      const uploadedFileUrl = await uploadFileToBucket(data.firstName, BucketFolders.CertificateOfRegister, avatarUrl);

      body.avatarUrl = uploadedFileUrl;
    }

    const user = await Users.create(body);

    await Organizations.findByIdAndUpdate(organizationId, {
      $push: { users: user._id },
    });

    return { success: true, message: 'User created' };
  }
}

export const userService = new UserService();
