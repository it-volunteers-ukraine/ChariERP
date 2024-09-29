import bcrypt from 'bcrypt';
import { SortOrder } from 'mongoose';

import { BucketFolders, deleteFolderFromBucket, sendEmail, uploadFileToBucket } from '@/services';
import {
  getPaginate,
  generatePassword,
  getHtmlCodeForPassword,
  pendingDeclineNormalizer,
  approveOrganizationsNormalizer,
  checkFieldsToUniqueOfOrganization,
} from '@/utils';
import {
  Roles,
  UserStatus,
  IOrganizations,
  IOrganizationsUpdate,
  AdminOrganizationProps,
  OrganizationUpdateValues,
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

    const organizationExist = await Organizations.findOne({
      $or: [{ 'organizationData.edrpou': data.edrpou }, { 'contactData.email': data.email }],
    });

    if (organizationExist) {
      const matches = checkFieldsToUniqueOfOrganization(
        { email: data.email, edrpou: Number(data.edrpou) },
        { email: organizationExist.contactData.email, edrpou: organizationExist.organizationData.edrpou },
      );

      if (matches.length > 0) {
        return { message: matches, success: false };
      }
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

  async getAdminOrganizationById(id: string) {
    await this.connect();
    const organization = await Organizations.findOne({ _id: id });

    return JSON.stringify(organization);
  }

  async declineAdminOrganization(id: string, reason: string) {
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

  async updateAdminOrganization(id: string, formData: FormData) {
    await this.connect();

    if (!id) {
      return { message: 'Id is required', success: false };
    }

    const organization = await Organizations.findOne({ _id: id });

    if (!organization) {
      return { message: 'Organization not found', success: false };
    }

    const data = JSON.parse(formData.get('data') as string) as OrganizationUpdateValues;

    const certificate = formData.get('certificate') as File;
    const isNewCertificate = certificate && certificate?.size !== 1;
    const isApproved = data.request === RequestOrganizationStatus.APPROVED && organization.users.length === 0;

    let uploadedFileUrl;

    if (isNewCertificate) {
      uploadedFileUrl = await uploadFileToBucket(
        data.organizationName,
        BucketFolders.CertificateOfRegister,
        certificate,
      );
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

    const organizationExist = await Organizations.findOne({
      $or: [{ 'organizationData.edrpou': data.edrpou }, { 'contactData.email': data.email }],
    });

    if (organizationExist && organizationExist._id.toString() !== id) {
      const matches = checkFieldsToUniqueOfOrganization(
        { email: data.email, edrpou: Number(data.edrpou) },
        { email: organizationExist.contactData.email, edrpou: organizationExist.organizationData.edrpou },
      );

      if (matches.length > 0) {
        return { message: matches, success: false };
      }
    }

    if (isApproved) {
      const password = generatePassword(8, 10);
      const hash = await bcrypt.hash(password, 10);

      const newUser = new Users({
        ...body.contactData,
        status: UserStatus.ACTIVE,
        role: Roles.MANAGER,
        password: hash,
        organizationId: organization._id,
      });

      const response = await newUser.save();

      if (!response) {
        return { success: false, message: 'User not created' };
      }

      body.users = [response._id];
      body.approvalDate = new Date();

      await sendEmail({
        html: getHtmlCodeForPassword({ email: body.contactData.email, password }),
        text: 'Ваші дані для входу',
        subject: 'Ваші дані для входу',
        to: body.contactData.email,
      });
    }

    const response = await Organizations.findByIdAndUpdate(id, { $set: body }, { new: true });

    if (!response) {
      return { success: false, message: 'Organization not updated' };
    }

    return { success: true, message: 'Organization updated', organization: JSON.stringify(response) };
  }

  async deleteAdminOrganization(id: string) {
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

export const organizationService = new OrganizationService();
