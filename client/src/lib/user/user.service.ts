import bcrypt from 'bcrypt';

import { checkFieldsToUniqueOfOrganization, getPaginate } from '@/utils';
import {
  IOrganizationsUpdate,
  IUpdateOrganizationByManager,
  IUsers,
  IUsersByOrganizationProps,
  OrganizationUpdateValues,
  Roles,
  UserStatus,
} from '@/types';
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
      const uploadedFileUrl = await uploadFileToBucket(organization._id, BucketFolders.Avatar, avatarUrl);

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

  async updateOrganizationByManager({ organizationId, userId, formData }: IUpdateOrganizationByManager) {
    await this.connect();

    if (!organizationId || !userId) {
      return { success: false, message: 'organizationId and userId are required' };
    }

    const organization = await Organizations.findOne({
      _id: organizationId,
    }).populate('users');

    if (!organization) {
      return { success: false, message: 'Organization not found' };
    }
    const users = organization?.users || [];

    const isAccessDenied = !users.some(
      (user: IUsers) => String(user._id) === String(userId) && user.role === Roles.MANAGER,
    );

    if (isAccessDenied) {
      return { success: false, message: 'User not found or access denied' };
    }

    const data = JSON.parse(formData.get('data') as string) as OrganizationUpdateValues;
    const certificate = formData.get('certificate') as File;
    const isNewCertificate = certificate && certificate?.size !== 1;

    const isUserEmailExist = await Users.findOne({
      email: data.email,
      organizationId: { $ne: organizationId },
    });

    const isAdminEmailOccupied = await Admin.findOne({ email: data.email });

    if (isUserEmailExist || isAdminEmailOccupied) {
      const email = isAdminEmailOccupied?.email || isUserEmailExist?.email;

      return { message: [email], success: false };
    }

    const organizationExist = await Organizations.find({
      $or: [
        { 'organizationData.edrpou': data.edrpou, _id: { $ne: organizationId } },
        { 'contactData.email': data.email },
      ],
      _id: { $ne: organizationId },
    });

    if (organizationExist.length > 0) {
      const matches = checkFieldsToUniqueOfOrganization(
        {
          email: data.email,
          edrpou: data.edrpou,
        },
        organizationExist,
      );

      return { message: matches, success: false };
    }

    let uploadedFileUrl;

    if (isNewCertificate) {
      uploadedFileUrl = await uploadFileToBucket(organization._id, BucketFolders.CertificateOfRegister, certificate);

      if (!uploadedFileUrl) {
        return { message: 'error-upload', success: false };
      }

      const isDeleted = await deleteFileFromBucket(organization.organizationData.certificate);

      if (!isDeleted) {
        return { message: 'error-delete', success: false };
      }
    }

    const body: IOrganizationsUpdate = {
      request: data.request || organization.request,
      organizationData: {
        edrpou: data.edrpou || organization.organizationData.edrpou,
        organizationName: data.organizationName || organization.organizationData.organizationName,
        dateOfRegistration: data.dateOfRegistration || organization.organizationData.dateOfRegistration,
        certificate: isNewCertificate ? (uploadedFileUrl as string) : organization.organizationData.certificate,
      },
      contactData: {
        phone: data.phone || organization.contactData.phone,
        email: data.email || organization.contactData.email,
        position: data.position || organization.contactData.position,
        lastName: data.lastName || organization.contactData.lastName,
        firstName: data.firstName || organization.contactData.firstName,
        middleName: data.middleName || organization.contactData.middleName,
      },
      mediaData: {
        site: data.site || organization.mediaData.site,
        social: data.social || organization.mediaData.social,
      },
    };

    const response = await Organizations.findByIdAndUpdate(organizationId, { $set: body }, { new: true });

    if (!response) {
      return { success: false, message: 'Organization not updated' };
    }

    return { success: true, message: 'Organization updated', organization: JSON.stringify(response) };
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
