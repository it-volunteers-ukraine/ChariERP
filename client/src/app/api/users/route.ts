import { NextResponse } from 'next/server';

import { User, connectDB } from '@/lib';

export async function GET() {
  try {
    await connectDB();
    const users = await User.find();

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

    const newUser = new User(body);
    const response = await newUser.save();

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}
