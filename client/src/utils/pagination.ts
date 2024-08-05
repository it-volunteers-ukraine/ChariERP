import { Model, Document } from 'mongoose';

import { PaginationResult } from '@/types';

export async function getPaginate<T extends Document>(
  model: Model<T>,
  page: number,
  limit: number,
  filter = {},
  populate: string | null,
): Promise<PaginationResult<T>> {
  const skip = (page - 1) * limit;

  let query = model.find(filter).limit(limit).skip(skip);

  if (populate) {
    query = query.populate(populate);
  }

  const results = await query.exec();
  const count = await model.countDocuments(filter);
  const totalPages = Math.ceil(count / limit);

  return {
    results,
    totalPages,
    currentPage: page,
    totalItems: count,
  };
}
