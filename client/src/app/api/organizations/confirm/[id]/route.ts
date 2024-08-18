import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import { sendEmail } from '@/services';
import { generatePassword } from '@/utils';
import { connectDB, Organizations, Users } from '@/lib';
import { RequestOrganizationStatus, Roles, UserStatus } from '@/types';

export async function GET(request: Request, { params }: { params: { id: string } }) {
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

    const user = await Users.findOne({ email: organization.contactData.email });

    if (user) {
      return NextResponse.json({ message: 'User already exists' }, { status: 403 });
    }

    const password = generatePassword(8, 10);
    const hash = await bcrypt.hash(password, 10);

    const newUser = new Users({
      lastName: organization.contactData.lastName,
      position: organization.contactData.position,
      firstName: organization.contactData.firstName,
      middleName: organization.contactData.middleName,
      phone: organization.contactData.phone,
      email: organization.contactData.email,
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

    const htmlCode = `<div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2 style="color: #333;">Ваші дані для входу</h2>
    <p style="margin-bottom: 20px;">
    <strong>Email</strong>:
    <span style="font-weight: bold; color: #1a73e8; background-color: #f1f1f1; padding: 10px; border-radius: 5px;">${organization.contactData.email}</span>
    </p>
    <p>
    <strong>Пароль</strong>:
    <span style="font-weight: bold; color: #333; background-color: #f1f1f1; padding: 10px; border-radius: 5px;">${password}</span>
    </p>
    </div>`;

    await sendEmail({
      html: htmlCode,
      text: 'Ваші дані для входу',
      subject: 'Ваші дані для входу',
      to: organization.contactData.email,
    });

    return NextResponse.json({ message: 'User created' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
