import { Model, Document } from 'mongoose';

interface PaginationResult<T> {
  results: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export async function getPaginate<T extends Document>(
  model: Model<T>,
  page = 1,
  limit = 10,
  filter = {},
): Promise<PaginationResult<T>> {
  const skip = (page - 1) * limit;

  const results = await model.find(filter).limit(limit).skip(skip).exec();

  const count = await model.countDocuments(filter);

  const totalPages = Math.ceil(count / limit);

  return {
    results,
    totalPages,
    currentPage: page,
    totalItems: count,
  };
}
