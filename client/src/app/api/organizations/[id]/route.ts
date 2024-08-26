import { NextResponse } from 'next/server';

import { connectDB, Organizations } from '@/lib';

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

    return NextResponse.json(organization, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
