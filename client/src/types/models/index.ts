export { type IAdmin } from './admin';
export { type IBoard } from './board';
export { type IBoardColumn, type IBoardColumnTasks, type IBoardServerColumns } from './board-column';
export { type IEditTask, type ICreateTask, type ITask, type ITaskResponse } from './task';
export { type IResetToken } from './reset-token';
export { type IUsers } from './users';
export { type IUsersBoards } from './users-boards';
export * from './organization';

export interface PaginationResult<T> {
  results: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}
