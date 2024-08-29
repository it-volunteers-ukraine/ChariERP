import { OrganizationCreateValues, RequestOrganizationStatus } from '@/types';

import { BucketFolders, uploadFileToBucket } from '@/services';

import { Organizations } from '..';
import { BaseService } from '../database/base.service';

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
    const response = await newOrganization.save();

    return { data: response, success: true };
  }
}

export { OrganizationService };
