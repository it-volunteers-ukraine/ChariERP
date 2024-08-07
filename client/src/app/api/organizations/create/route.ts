import { NextResponse } from 'next/server';

import { connectDB, Organizations } from '@/lib';
import { RequestOrganizationStatus } from '@/types';

interface OrganizationsFormValues {
  site: string;
  email: string;
  phone: string;
  edrpou: string;
  lastName: string;
  social: string[];
  position: string;
  firstName: string;
  middleName: string;
  certificate: string;
  organizationName: string;
  dateOfRegistration: Date;
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const formBody: Partial<OrganizationsFormValues> = {};

    formBody.site = formData.get('site') as string;
    formBody.email = formData.get('email') as string;
    formBody.phone = formData.get('phone') as string;
    formBody.edrpou = formData.get('edrpou') as string;
    formBody.lastName = formData.get('lastName') as string;
    formBody.position = formData.get('position') as string;
    formBody.firstName = formData.get('firstName') as string;
    formBody.middleName = formData.get('middleName') as string;
    formBody.organizationName = formData.get('organizationName') as string;
    formBody.dateOfRegistration = new Date(formData.get('dateOfRegistration') as string);

    const certificate = formData.get('certificate');

    if (certificate && certificate instanceof File) {
      formBody.certificate = certificate.name;
    }

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
        certificate: formBody.certificate,
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

    const organizations = await Organizations.findOne({
      $or: [
        { 'organizationData.edrpou': formBody.edrpou },
        { 'organizationData.organizationName': formBody.organizationName },
        { 'organizationData.certificate': formBody.certificate },
        { 'contactData.phone': formBody.phone },
      ],
    });

    if (organizations) {
      return NextResponse.json({ message: 'companyAlreadyRegistered' }, { status: 400 });
    }

    const newOrganization = new Organizations(body);
    const response = await newOrganization.save();

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}
