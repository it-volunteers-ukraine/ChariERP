import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import { Admin, Users, connectDB } from '@/lib';

export async function GET() {
  try {
    await connectDB();
    const users = await Users.find();

    return NextResponse.json(users, {
      status: 200,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(err, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const user = await Users.findOne({ email: body.email });
    const admin = await Admin.findOne({ email: body.email });

    if (user || admin) {
      const foundUser = user || admin;

      const compare = await bcrypt.compare(body.password, foundUser.password);

      if (compare) {
        return NextResponse.json(foundUser, { status: 201 });
      }

      return NextResponse.json({ message: 'userIncorrect' }, { status: 403 });
    }

    return NextResponse.json({ message: 'userNotFound' }, { status: 404 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
