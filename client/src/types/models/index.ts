export { type IAdmin } from './admin';
export { type IBoard } from './board';
export { type IBoardColumn, type IBoardColumnTasks, type IBoardServerColumns } from './board-column';
export {
  type ITask,
  type IComment,
  type IEditTask,
  type ICreateTask,
  type ITaskResponse,
  type ICommentResponse,
  type LeanTaskComments,
} from './task';
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
