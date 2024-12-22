export { type IAdmin } from './admin';
export { type IBoard } from './board';
export { type IBoardColumn } from './board-column';
export { type ICreateTask } from './task';
export { type IEditTask } from './task';
export { type ITask } from './task';
export { type IUsers } from './users';
export { type IUsersBoards } from './users-boards';
export * from './organization';

export interface PaginationResult<T> {
  results: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}
