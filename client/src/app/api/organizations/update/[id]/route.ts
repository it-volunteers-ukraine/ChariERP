import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import { generatePassword } from '@/utils';
import { connectDB, Organizations, Users } from '@/lib';
import { BucketFolders, sendEmail, uploadFileToBucket } from '@/services';
import { IOrganizationsUpdate, RequestOrganizationStatus, Roles, UserStatus } from '@/types';

import { getHtmlCode } from './helpers';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const organization = await Organizations.findOne({ _id: id });

    if (!organization) {
      return NextResponse.json({ message: 'Organization not found' }, { status: 404 });
    }

    const formData = await request.formData();

    const certificate = formData.get('certificate') as File;
    const data = JSON.parse(formData.get('data') as string);

    const isNewCertificate = certificate.size !== 1;

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

      body.users = [response._id];

      await sendEmail({
        html: getHtmlCode({ email: organization.contactData.email, password }),
        text: 'Ваші дані для входу',
        subject: 'Ваші дані для входу',
        to: organization.contactData.email,
      });
    }

    const response = await Organizations.findByIdAndUpdate(id, { $set: body });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: 'somethingWrong' }, { status: 500 });
  }
}
