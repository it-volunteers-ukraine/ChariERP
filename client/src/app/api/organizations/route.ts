import { NextResponse } from 'next/server';

import { connectDB, Organization } from '@/lib';

export async function GET() {
  try {
    await connectDB();
    const organizations = await Organization.find();

    return NextResponse.json(organizations, {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newOrganization = new Organization(body);
    const response = await newOrganization.save();

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}
