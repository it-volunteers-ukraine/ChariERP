import bcrypt from 'bcrypt';
import { SortOrder } from 'mongoose';

import {
  approveOrganizationsNormalizer,
  checkFieldsToUniqueOfOrganization,
  generatePassword,
  getHtmlCodeForPassword,
  getPaginate,
  pendingDeclineNormalizer,
} from '@/utils';
import {
  AdminOrganizationProps,
  IOrganizations,
  IOrganizationsUpdate,
  IUpdateOrganizationByManager,
  IUsers,
  OrganizationCreateValues,
  OrganizationUpdateValues,
  RequestOrganizationStatus,
  Roles,
  UserStatus,
} from '@/types';
import { BucketFolders, deleteFileFromBucket, deleteFolderFromBucket, sendEmail, uploadFileToBucket } from '@/services';
import logger from '@/utils/logger/logger';

import { Admin, Organizations, Users } from '..';
import { BaseService } from '../database/base.service';

const sort = {
  [RequestOrganizationStatus.PENDING]: { requestDate: -1 } as { [key: string]: SortOrder },
  [RequestOrganizationStatus.DECLINED]: { declinedDate: -1 } as { [key: string]: SortOrder },
  [RequestOrganizationStatus.APPROVED]: { approvalDate: -1 } as { [key: string]: SortOrder },
};

class OrganizationService extends BaseService {
  async createOrganization(formData: FormData) {
    await this.connect();
    const certificate = formData.get('certificate') as File;
    const data = JSON.parse(formData.get('data') as string) as OrganizationCreateValues;

    const isUserEmailExist = await Users.findOne({
      email: data.email,
    });

    const isAdminEmailReceived = await Admin.findOne({ email: data.email });

    if (isUserEmailExist || isAdminEmailReceived) {
      const email = isAdminEmailReceived?.email || isUserEmailExist?.email;

      return { message: [email], success: false };
    }

    const organizationExist = await Organizations.find({
      $or: [{ 'organizationData.edrpou': data.edrpou }, { 'contactData.email': data.email }],
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

    const body = {
      request: RequestOrganizationStatus.PENDING,
      organizationData: {
        edrpou: data.edrpou,
        organizationName: data.organizationName,
        dateOfRegistration: data.dateOfRegistration,
      },
      contactData: {
        phone: data.phone,
        email: data.email,
        position: data.position,
        lastName: data.lastName,
        firstName: data.firstName,
        middleName: data.middleName,
      },
      mediaData: {
        site: data.site,
        social: data.social,
      },
    };
    const newOrganization = new Organizations(body);

    const savedOrganization = await newOrganization.save();

    const uploadedFileUrl = await uploadFileToBucket(
      savedOrganization._id,
      BucketFolders.CertificateOfRegister,
      certificate,
    );

    if (!uploadedFileUrl) {
      return { message: 'error-upload', success: false };
    }

    await savedOrganization.updateOne({ $set: { 'organizationData.certificate': uploadedFileUrl } });

    return { success: true };
  }

  async getAdminOrganizations({ page, limit = 9, filterStatus, populate }: AdminOrganizationProps) {
    await this.connect();

    const { results, totalPages, currentPage, totalItems } = await getPaginate<IOrganizations>({
      page,
      limit,
      populate,
      model: Organizations,
      sort: sort[filterStatus],
      filter: { request: filterStatus },
    });

    return {
      totalPages,
      totalItems,
      currentPage,
      results:
        filterStatus === RequestOrganizationStatus.APPROVED
          ? approveOrganizationsNormalizer(results)
          : pendingDeclineNormalizer(results),
    };
  }

  async getAdminOrganizationById(id: string) {
    await this.connect();
    const organization = await Organizations.findOne({ _id: id });

    return JSON.stringify(organization);
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
      uploadedFileUrl = await uploadFileToBucket(organization.id, BucketFolders.CertificateOfRegister, certificate);

      if (!uploadedFileUrl) {
        return { message: 'error-upload', success: false };
      }

      const isDeleted = await deleteFileFromBucket(organization.organizationData.certificate);

      if (!isDeleted) {
        return { message: 'error-delete', success: false };
      }
    }

    const body: IOrganizationsUpdate = {
      request: data.request ?? organization.request,
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

  async declineAdminOrganization(id: string, reason: string) {
    await this.connect();
    const organization = await Organizations.findOne({ _id: id });

    if (!organization) {
      return { message: 'Organization not found', success: false };
    }

    const updateOrganization = {
      declineReason: reason,
      declinedDate: new Date(),
      request: RequestOrganizationStatus.DECLINED,
    };

    await Organizations.findByIdAndUpdate(id, { $set: updateOrganization });

    const htmlCode = `<div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2 style="color: #333;">Відмовлено в реєстрації</h2>
    <p style="color: #333;">Шановний(а) ${organization.contactData.firstName} ${organization.contactData.lastName},</p>
    <p style="color: #333;">На жаль, ваша заявка на реєстрацію була відхилена з наступної причини:</p>
    <p style="color: #d9534f; font-weight: bold;">${reason}</p>
    <p style="color: #333;">Якщо у вас є будь-які питання, будь ласка, зв'яжіться з нашою службою підтримки.</p>
    <p style="color: #333;">З повагою,<br/>Команда підтримки Chari ERP</p>
</div>`;

    await sendEmail({
      html: htmlCode,
      text: 'Відмовлено в реєстрації',
      subject: 'Відмовлено в реєстрації',
      to: organization.contactData.email,
    });

    return { success: true };
  }

  async updateAdminOrganization({ organizationId, userId, formData }: IUpdateOrganizationByManager) {
    await this.connect();

    if (!organizationId || !userId) {
      return { message: 'organizationId and userId are required', success: false };
    }

    const admin = await Admin.findById(userId);

    if (!admin) {
      return { message: 'User not found or access denied', success: false };
    }

    const organization = await Organizations.findOne({ _id: organizationId });

    if (!organization) {
      return { message: 'Organization not found', success: false };
    }

    const data = JSON.parse(formData.get('data') as string) as OrganizationUpdateValues;
    const certificate = formData.get('certificate') as File;
    const isNewCertificate = certificate && certificate?.size !== 1;

    const isApproved = data.request === RequestOrganizationStatus.APPROVED && organization.users.length === 0;

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
      uploadedFileUrl = await uploadFileToBucket(organization.id, BucketFolders.CertificateOfRegister, certificate);

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

    if (isApproved) {
      const password = generatePassword(8, 10);
      const hash = await bcrypt.hash(password, 10);

      const newUser = new Users({
        ...body.contactData,
        status: UserStatus.ACTIVE,
        role: Roles.MANAGER,
        password: hash,
        organizationId: organization.id,
      });

      const response = await newUser.save();

      if (!response) {
        return { success: false, message: 'User not created' };
      }

      body.users = [response._id];
      body.approvalDate = new Date();
      try {
        await sendEmail({
          html: getHtmlCodeForPassword({ email: body.contactData.email, password }),
          text: 'Ваші дані для входу',
          subject: 'Ваші дані для входу',
          to: body.contactData.email,
        });
      } catch (error) {
        logger.error('Error while sending email with login credentials to new organization manager', error);
      }
    }

    const response = await Organizations.findByIdAndUpdate(organizationId, { $set: body }, { new: true });

    if (!response) {
      return { success: false, message: 'Organization not updated' };
    }

    return { success: true, message: 'Organization updated', organization: JSON.stringify(response) };
  }

  async deleteAdminOrganization(id: string) {
    await this.connect();
    const organization = await Organizations.findOne({ _id: id });

    if (!organization) {
      return { message: 'Organization not found', success: false };
    }

    const name = organization.organizationData.certificate?.split('/').shift();

    await deleteFolderFromBucket(name);

    await Organizations.findByIdAndDelete(id);

    return { success: true };
  }
}

export const organizationService = new OrganizationService();
