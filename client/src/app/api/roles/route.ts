import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { User, connectDB, Admin } from '@/lib';

export async function GET() {
  const cookieStore = cookies();
  const id = cookieStore.get('id');

  try {
    await connectDB();

    const admin = await Admin.findById(id?.value);
    const user = await User.findById(id?.value);

    const foundUser = user || admin;

    if (foundUser) {
      return NextResponse.json(foundUser);
    }

    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
