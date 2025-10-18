import bcrypt from 'bcrypt';

import { getPaginate } from '@/utils';
import { IAdmin, IUsers, IUsersByOrganizationProps, Roles, UserStatus } from '@/types';
import { BucketFolders, deleteFileFromBucket, uploadFileToBucket } from '@/services';
import logger from '@/utils/logger/logger';

import { Admin, Organizations, Users } from '..';
import { ImageService } from '../image/image.service';
import { BaseService } from '../database/base.service';

import { getErrors, requiredUsers, requiredUsersUpdate } from './helpers';
import { ObjectId } from 'mongoose';

class UserService extends BaseService {
  imageService: ImageService;

  constructor() {
    super();
    this.imageService = new ImageService();
  }

  async createAdmin(email: string, password: string) {
    await this.connect();
    const adminsNumber = await Admin.countDocuments();

    if (adminsNumber > 0) {
      const sanitizedEmail = email.replace(/[\r\n]/g, "");
      logger.info(`An attempt to create an admin with email: '${sanitizedEmail}'`);

      return { message: 'Admin already exists', success: false };
    }

    const hash = await bcrypt.hash(password, 10);

    await new Admin({ email, password: hash }).save();

    return { success: true };
  }

  async login(email: string, password: string) {
    await this.connect();

    const [user, admin] = await Promise.all([Users.findOne({ email }), Admin.findOne({ email })]);

    if (admin || user) {
      let foundUser = admin || user;

      if (foundUser.status === UserStatus.BLOCKED) {
        logger.info(`Attempt to sign in with blocked account for user: ${foundUser?._id}`);

        return { success: false, message: 'blockedAccount' };
      }

      const compare = await bcrypt.compare(password, foundUser.password);

      if (!compare) {
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
      logger.info(`User '${foundUser?._id}' successfully signed in`);

      return { success: true, user: JSON.stringify(foundUser) };
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
    const [admin, user] = await Promise.all([Admin.findById(id), Users.findById(id)]);

    const foundUser: IAdmin | IUsers = admin || user;

    return foundUser
      ? { success: true, user: JSON.stringify(foundUser) }
      : { success: false, message: 'User not found' };
  }

  async getOrganizationMemberById(userId: string, organizationId: string) {
    await this.connect();

    const [organizationExists, user] = await Promise.all([
      Organizations.exists({ _id: organizationId }),
      Users.findOne({ _id: userId, organizationId }).lean() as Promise<IUsers | null>,
    ]);

    if (!organizationExists) {
      return { success: false, message: 'Organization was not found' };
    }

    if (!user) {
      return { success: false, message: 'User not found' };
    }
    let imageName;

    if (user.avatarUrl) {
      const response = await this.imageService.getImage(user.avatarUrl);

      user.avatarUrl = response.success ? response.image : '';
      imageName = response.imageName;
    }
    logger.info(`User '${userId}' from organization '${organizationId}' is extracted from DB`);

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

    const [isUserEmailExist, isAdminEmailExist, organization] = await Promise.all([
      Users.exists({ email: data.email }).lean(),
      Admin.exists({ email: data.email }).lean(),
      Organizations.findOne({ _id: organizationId }).lean(),
    ]);

    if (isAdminEmailExist || isUserEmailExist) {
      return { success: false, message: 'Email already exists' };
    }
    if (!organization) {
      return { success: false, message: `Organization doesn't exist` };
    }

    const hash = await bcrypt.hash(data.password, 10);

    const body = {
      ...data,
      password: hash,
      status: UserStatus.ACTIVE,
      avatarUrl: '',
      organizationId,
    };

    if (avatarUrl) {
      const uploadedFileUrl = await uploadFileToBucket(organizationId, BucketFolders.Avatar, avatarUrl);

      if (!uploadedFileUrl) {
        return { success: false, message: 'Image error update' };
      }
      body.avatarUrl = uploadedFileUrl;
    }

    const newUser = await Users.create(body);

    await Organizations.findByIdAndUpdate(organizationId, { $push: { users: newUser._id } });
    logger.info(`New user ${newUser.id} was created in organization '${organizationId}'`);

    return { success: true, message: 'User created', userId: newUser.id };
  }

  async updateMemberById(formData: FormData) {
    await this.connect();

    const avatarUrl = formData.get('avatarUrl') as File;
    const id = formData.get('id') as string;
    const data = JSON.parse(formData.get('data') as string) || '';

    const errors = getErrors(data, requiredUsersUpdate);

    if (errors) {
      return { success: false, message: errors };
    }

    const user = (await Users.findById(id)) as IUsers;

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const conflictingUsers = await Users.countDocuments({
      email: data.email,
      _id: { $ne: id },
    });

    if (conflictingUsers > 0) {
      return { success: false, message: 'Email already exists' };
    }

    const body = {
      ...data,
      avatarUrl: user.avatarUrl,
    };

    if (!avatarUrl || avatarUrl?.size > 1) {
      body.avatarUrl = await this.updateUserAvatar(user.avatarUrl, avatarUrl, user.organizationId);
    }

    if (body.avatarUrl === false) {
      return { success: false, message: 'Image error update' };
    }

    const response = await Users.findByIdAndUpdate(id, { $set: body }, { new: true });

    logger.info(`User '${user.id}' was successfully updated`);

    return { success: true, message: 'User updated', user: JSON.stringify(response) };
  }

  async updateUserAvatar(existingAvatarUrl: string | undefined, newAvatar: File | undefined, organizationId: ObjectId) {
    let isPreviousOperationSuccessful = true;

    if (existingAvatarUrl) {
      isPreviousOperationSuccessful = await deleteFileFromBucket(existingAvatarUrl);
    }

    if (isPreviousOperationSuccessful) {
      return await this.imageService.uploadAvatar(newAvatar, organizationId as unknown as string);
    }

    return false;
  }
}

export const userService = new UserService();
