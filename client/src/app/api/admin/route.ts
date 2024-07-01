import { NextResponse } from 'next/server';

import { Admin, connectDB } from '@/lib';

export async function POST(request: Request) {
  try {
    connectDB();
    const body = await request.json();
    const admins = await Admin.find();

    if (admins.length > 0) {
      return NextResponse.json({ message: 'Admin already exists' }, { status: 403 });
    }

    const newAdmin = new Admin(body);
    const response = await newAdmin.save();

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
}
