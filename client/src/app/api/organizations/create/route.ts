import { NextResponse } from 'next/server';

import { connectDB, Organizations } from '@/lib';
import { RequestOrganizationStatus } from '@/types';
import { BucketFolders, uploadFileToBucket } from '@/services';

interface OrganizationsFormValues {
  site: string;
  email: string;
  phone: string;
  edrpou: number;
  lastName: string;
  social: string[];
  position: string;
  firstName: string;
  certificate: File;
  middleName: string;
  organizationName: string;
  dateOfRegistration: Date;
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const formBody: Partial<OrganizationsFormValues> = {};

    const certificate = formData.get('certificate') as File;

    formBody.site = formData.get('site') as string;
    formBody.email = formData.get('email') as string;
    formBody.phone = formData.get('phone') as string;
    formBody.edrpou = Number(formData.get('edrpou'));
    formBody.lastName = formData.get('lastName') as string;
    formBody.position = formData.get('position') as string;
    formBody.firstName = formData.get('firstName') as string;
    formBody.middleName = formData.get('middleName') as string;
    formBody.organizationName = formData.get('organizationName') as string;
    formBody.dateOfRegistration = new Date(formData.get('dateOfRegistration') as string);

    formData.forEach((value, key) => {
      if (key.includes('social')) {
        if (!formBody.social) {
          formBody.social = [];
        }
        formBody.social.push(value as string);
      }
    });

    const body = {
      request: RequestOrganizationStatus.PENDING,
      organizationData: {
        edrpou: formBody.edrpou,
        certificate: '',
        organizationName: formBody.organizationName,
        dateOfRegistration: formBody.dateOfRegistration,
      },
      contactData: {
        phone: formBody.phone,
        email: formBody.email,
        position: formBody.position,
        lastName: formBody.lastName,
        firstName: formBody.firstName,
        middleName: formBody.middleName,
      },
      mediaData: {
        site: formBody.site,
        social: formBody.social,
      },
    };

    const organizationExist = await Organizations.findOne({ 'organizationData.edrpou': formBody.edrpou });

    if (organizationExist) {
      return NextResponse.json({ message: 'companyAlreadyRegistered' }, { status: 400 });
    }

    const uploadedFileUrl = await uploadFileToBucket(
      formBody.organizationName,
      BucketFolders.CertificateOfRegister,
      certificate,
    );

    body.organizationData.certificate = uploadedFileUrl!;

    const newOrganization = new Organizations(body);
    const response = await newOrganization.save();

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: 'somethingWrong' }, { status: 500 });
  }
}
