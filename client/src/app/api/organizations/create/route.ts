import { NextResponse } from 'next/server';

import { connectDB, Organizations } from '@/lib';
import { BucketFolders, uploadFileToBucket } from '@/services';
import { OrganizationCreateValues, RequestOrganizationStatus } from '@/types';

export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();

    const certificate = formData.get('certificate') as File;
    const data = JSON.parse(formData.get('data') as string) as OrganizationCreateValues;

    const organizationExist = await Organizations.findOne({ 'organizationData.edrpou': data.edrpou });

    if (organizationExist) {
      return NextResponse.json({ message: 'companyAlreadyRegistered' }, { status: 400 });
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

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: 'somethingWrong' }, { status: 500 });
  }
}
