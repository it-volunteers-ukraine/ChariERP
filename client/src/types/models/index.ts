export { type IAdmin } from './admin';
export { type IOrganizations } from './organization';
export { type IUsers } from './users';

export interface PaginationResult<T> {
  results: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}
