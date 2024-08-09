import { Model, Document, SortOrder } from 'mongoose';

import { PaginationResult } from '@/types';

interface GetPaginateParams<T extends Document> {
  page: number;
  limit: number;
  model: Model<T>;
  filter?: object;
  populate?: string | null;
  sort?: string | { [key: string]: SortOrder | { $meta: string } } | [string, SortOrder][];
}

export async function getPaginate<T extends Document>({
  page,
  model,
  limit,
  sort = {},
  filter = {},
  populate = null,
}: GetPaginateParams<T>): Promise<PaginationResult<T>> {
  const skip = (page - 1) * limit;

  let query = model.find(filter).sort(sort).limit(limit).skip(skip);

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
