import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { Users, connectDB, Admin } from '@/lib';

export async function GET() {
  const cookieStore = cookies();
  const id = cookieStore.get('id');

  try {
    await connectDB();

    const admin = await Admin.findById(id?.value);

    if (admin) {
      return NextResponse.json(admin);
    }

    const user = await Users.findById(id?.value);

    if (user) {
      return NextResponse.json(user);
    }

    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
