import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import { sendEmail } from '@/services';
import { connectDB, Organizations, Users } from '@/lib';
import { generatePassword, getHtmlCodeForPassword } from '@/utils';
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

    return NextResponse.json({ message: 'User created' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
