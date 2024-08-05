import { NextResponse } from 'next/server';

import { getPaginate } from '@/utils';
import { IOrganizations } from '@/types';
import { connectDB, Organizations } from '@/lib';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const { results, totalPages, currentPage, totalItems } = await getPaginate<IOrganizations>(
      Organizations,
      page,
      limit,
    );

    return NextResponse.json(
      {
        results,
        totalPages,
        totalItems,
        currentPage,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}
