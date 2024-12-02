import bcrypt from 'bcrypt';

import { getPaginate } from '@/utils';
import { IUsers, IUsersByOrganizationProps, Roles, UserStatus } from '@/types';
import { BucketFolders, deleteFileFromBucket, uploadFileToBucket } from '@/services';

import { Admin, Organizations, Users } from '..';
import { ImageService } from '../image/image.service';
import { BaseService } from '../database/base.service';
import { getErrors, requiredUsers, requiredUsersUpdate } from './helpers';

class UserService extends BaseService {
  imageService: ImageService;

  constructor() {
    super();
    this.imageService = new ImageService();
  }

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

    let foundUser = await Users.findOne({ email });

    if (!foundUser) {
      foundUser = await Admin.findOne({ email });
    }

    if (!foundUser) {
      return { success: false, message: 'userNotFound' };
    }

    if (foundUser.status === UserStatus.BLOCKED) {
      return { success: false, message: 'blockedAccount' };
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      return { success: false, message: 'userIncorrect' };
    }

    if (foundUser.role !== Roles.ADMIN) {
      foundUser = await Users.findByIdAndUpdate(
        foundUser._id,
        {
          $set: { lastLogin: new Date() },
        },
        {
          new: true,
        },
      );
    }

    return { success: true, user: JSON.stringify(foundUser) };
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

  async getOrganizationMemberById(id: string, organizationId: string) {
    await this.connect();

    const user = await Users.findById(id);

    if (organizationId !== String(user?.organizationId) || !user) {
      return { success: false, message: 'User not found' };
    }
    let imageName;

    if (user.avatarUrl) {
      const response = await this.imageService.getImage(user.avatarUrl);

      user.avatarUrl = response.success ? response.image : '';
      imageName = response.imageName;
    }

    return { success: true, user: JSON.stringify(user), imageName };
  }

  async createUserByCompanyId(formData: FormData) {
    await this.connect();

    const avatarUrl = formData.get('avatarUrl') as File;
    const organizationId = formData.get('organizationId') as string;
    const data = JSON.parse(formData.get('data') as string);

    const errors = getErrors(data, requiredUsers);

    if (errors) {
      return { success: false, message: errors };
    }

    const isEmailExist = await Users.findOne({
      email: data.email,
    });

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
      const uploadedFileUrl = await uploadFileToBucket(organizationId, BucketFolders.Avatar, avatarUrl);

      if (!uploadedFileUrl) {
        return { success: false, message: 'Image error update' };
      }

      body.avatarUrl = uploadedFileUrl;
    }
    const user = new Users(body);

    const newUser = await user.save();

    await Organizations.findByIdAndUpdate(organizationId, {
      $push: { users: newUser._id },
    });

    return { success: true, message: 'User created' };
  }

  async updateMemberById(formData: FormData) {
    await this.connect();

    const avatarUrl = formData.get('avatarUrl') as File;
    const id = formData.get('id') as string;
    const data = JSON.parse(formData.get('data') as string);

    const user = await Users.findById(id);

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const errors = getErrors(data, requiredUsersUpdate);

    if (errors) {
      return { success: false, message: errors };
    }

    const emails = await Users.find({
      email: data.email,
      _id: { $ne: id },
    });

    if (emails.length > 0) {
      return { success: false, message: 'Email already exists' };
    }

    const body = {
      ...data,
      avatarUrl: user.avatarUrl,
    };

    if (typeof avatarUrl === 'string' && !avatarUrl) {
      const res = await deleteFileFromBucket(user.avatarUrl);

      if (res) {
        body.avatarUrl = '';
      } else {
        return { success: false, message: 'Image error update' };
      }
    }

    if (avatarUrl) {
      if (user.avatarUrl) {
        const res = await deleteFileFromBucket(user.avatarUrl);

        if (!res) {
          return { success: false, message: 'Image error update' };
        }
      }

      const uploadedFileUrl = await uploadFileToBucket(user.organizationId, BucketFolders.Avatar, avatarUrl);

      if (!uploadedFileUrl) {
        return { success: false, message: 'Image error update' };
      }

      body.avatarUrl = uploadedFileUrl;
    }

    const response = await Users.findByIdAndUpdate(id, { $set: body }, { new: true });

    return { success: true, message: 'User updated', user: JSON.stringify(response) };
  }
}

export const userService = new UserService();
