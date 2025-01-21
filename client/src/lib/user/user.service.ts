import bcrypt from 'bcrypt';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

import { getPaginate } from '@/utils';
import { IUsers, IUsersByOrganizationProps, Roles, UserStatus } from '@/types';
import { BucketFolders, deleteFileFromBucket, sendEmail, uploadFileToBucket } from '@/services';

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

    const user = await Users.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (admin || user) {
      const foundUser = admin || user;

      if (foundUser.status === UserStatus.BLOCKED) {
        return { success: false, message: 'blockedAccount' };
      }

      const compare = await bcrypt.compare(password, foundUser.password);

      if (compare) {
        let updatedUser;

        if (foundUser.role !== Roles.ADMIN) {
          updatedUser = await Users.findByIdAndUpdate(
            foundUser._id,
            {
              $set: { lastLogin: new Date() },
            },
            {
              new: true,
            },
          );

          return { success: true, user: JSON.stringify(updatedUser) };
        }

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

    const isUserEmailExist = await Users.findOne({
      email: data.email,
    });

    const isAdminEmailReceived = await Admin.findOne({ email: data.email });

    if (isAdminEmailReceived || isUserEmailExist) {
      return { success: false, message: 'Email already exists' };
    }

    const organization = await Organizations.findOne({
      _id: organizationId,
    });

    if (!organization) {
      return { success: false, message: `Organization  doesn't exist` };
    }

    const hash = await bcrypt.hash(data.password, 10);

    const body = {
      ...data,
      password: hash,
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

  async sendResetEmail(email: string, baseUrl: string) {
    await this.connect();

    const admin = await Admin.findOne({ email });
    const user = await Users.findOne({ email });

    const targetUser = user || admin;

    if (!targetUser) {
      return { success: false, message: 'User not found' };
    }

    const jwtToken = jwt.sign({ userId: targetUser._id }, process.env.SPACES_KEY!, {
      expiresIn: '1h',
    });

    const passwordChangeLink = `${baseUrl}/password-change?token=${jwtToken}`;

    await sendEmail({
      to: email,
      subject: 'Запит на зміну пароля',
      text: `Ви надіслали запит на зміну пароля. Перейдіть за цим посиланням, щоб виконати зміну: ${passwordChangeLink}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #0056b3; text-align: center;">Запит на зміну пароля</h2>
          <p>Ви надіслали запит на зміну пароля. Натисніть кнопку нижче, щоб виконати зміну:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${passwordChangeLink}" target="_blank" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Змінити пароль
            </a>
          </div>
          <p style="font-size: 14px; color: #555;">Якщо ви не робили цей запит, просто ігноруйте цей лист або зверніться до служби підтримки.</p>
          <p style="font-size: 14px; color: #777; text-align: center;">Дякуємо!</p>
        </div>
      `,
    });

    return { success: true, message: 'Email sent successfully' };
  }

  async changePassword(token: string | null, newPassword: string) {
    await this.connect();

    if (!token) {
      return { success: false, message: 'Invalid or missing token' };
    }

    if (!newPassword) {
      return { success: false, message: 'Password is required' };
    }

    try {
      const decode = jwt.verify(token, process.env.SPACES_KEY!) as { userId: string };

      if (!decode.userId) {
        return { success: false, message: 'Invalid or missing token' };
      }

      const user = await Users.findById(decode.userId);
      const admin = await Admin.findById(decode.userId);

      if (!user && !admin) {
        return { success: false, message: 'User not found' };
      }

      const targetUser = user || admin;

      if (targetUser.passwordResetToken === token) {
        return { success: false, message: 'The link has expired' };
      }

      targetUser.password = await bcrypt.hash(newPassword, 10);
      targetUser.passwordResetToken = token;

      if (admin) {
        await Admin.findByIdAndUpdate(decode.userId, { $set: targetUser }, { new: true });
      } else {
        await Users.findByIdAndUpdate(decode.userId, { $set: targetUser }, { new: true });
      }

      return { success: true, message: 'Password change successfully' };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return { success: false, message: 'The link has expired' };
      }

      return { success: false, message: 'Error change password' };
    }
  }
}

export const userService = new UserService();
