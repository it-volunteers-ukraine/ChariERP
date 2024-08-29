import bcrypt from 'bcrypt';
import { SortOrder } from 'mongoose';

import { BucketFolders, deleteFolderFromBucket, sendEmail, uploadFileToBucket } from '@/services';
import {
  getPaginate,
  generatePassword,
  getHtmlCodeForPassword,
  pendingDeclineNormalizer,
  approveOrganizationsNormalizer,
} from '@/utils';
import {
  Roles,
  UserStatus,
  IOrganizations,
  AdminOrganizationProps,
  OrganizationCreateValues,
  RequestOrganizationStatus,
} from '@/types';

import { Organizations, Users } from '..';
import { BaseService } from '../database/base.service';

const sortOfDate = { 'organizationData.dateOfRegistration': 1 } as { [key: string]: SortOrder };

class OrganizationService extends BaseService {
  async createOrganization(formData: FormData) {
    await this.connect();
    const certificate = formData.get('certificate') as File;
    const data = JSON.parse(formData.get('data') as string) as OrganizationCreateValues;

    const organizationExist = await Organizations.findOne({ 'organizationData.edrpou': data.edrpou });

    if (organizationExist) {
      return { success: false, message: 'companyAlreadyRegistered' };
    }

    const uploadedFileUrl = await uploadFileToBucket(
      data.organizationName,
      BucketFolders.CertificateOfRegister,
      certificate,
    );

    const body = {
      request: RequestOrganizationStatus.PENDING,
      organizationData: {
        edrpou: data.edrpou,
        certificate: uploadedFileUrl,
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

    await newOrganization.save();

    return { success: true };
  }

  async getAdminOrganizations({ page, limit = 9, filterStatus, populate }: AdminOrganizationProps) {
    await this.connect();

    const { results, totalPages, currentPage, totalItems } = await getPaginate<IOrganizations>({
      page,
      limit,
      populate,
      sort: sortOfDate,
      model: Organizations,
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

  async getOrganizationById(id: string) {
    await this.connect();
    const organization = await Organizations.findOne({ _id: id });

    return JSON.stringify(organization);
  }

  async confirmOrganization(id: string) {
    await this.connect();
    const organization = await Organizations.findOne({ _id: id });

    if (!organization) {
      return { message: 'Organization not found', success: false };
    }

    const user = await Users.findOne({ email: organization.contactData.email });

    if (user) {
      return { message: 'User already exists', success: false };
    }

    const password = generatePassword(8, 10);
    const hash = await bcrypt.hash(password, 10);

    const newUser = new Users({
      ...organization.contactData,
      password: hash,
      status: UserStatus.ACTIVE,
      role: Roles.MANAGER,
      organizationId: organization._id,
    });

    const response = await newUser.save();

    const updateOrganization = {
      request: RequestOrganizationStatus.APPROVED,
      users: [response._id],
    };

    await Organizations.findByIdAndUpdate(id, { $set: updateOrganization });

    await sendEmail({
      text: 'Ваші дані для входу',
      subject: 'Ваші дані для входу',
      to: organization.contactData.email,
      html: getHtmlCodeForPassword({ password, email: organization.contactData.email }),
    });

    return { success: true };
  }

  async declineOrganization(id: string, reason: string) {
    await this.connect();
    const organization = await Organizations.findOne({ _id: id });

    if (!organization) {
      return { message: 'Organization not found', success: false };
    }

    const updateOrganization = {
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

  async deleteOrganization(id: string) {
    await this.connect();
    const organization = await Organizations.findOne({ _id: id });

    const name = organization.organizationData.certificate?.split('/').shift();

    await deleteFolderFromBucket(name);

    const response = await Organizations.deleteOne({ _id: id });

    if (response.deletedCount === 0) {
      return { message: 'Organization not found', success: false };
    }

    return { success: true };
  }
}

export { OrganizationService };
