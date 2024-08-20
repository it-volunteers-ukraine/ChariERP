import { NextResponse } from 'next/server';

import { connectDB, Organizations } from '@/lib';
import { deleteFolderFromBucket } from '@/services';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const organization = await Organizations.findOne({ _id: id });

    const name = organization.organizationData.certificate?.split('/').shift();

    await deleteFolderFromBucket(name);

    const response = await Organizations.deleteOne({ _id: id });

    if (response.deletedCount === 0) {
      return NextResponse.json({ message: 'Organization not found' }, { status: 404 });
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
