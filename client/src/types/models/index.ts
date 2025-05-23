export { type IAdmin } from './admin';
export { type IBoard } from './board';
export { type IBoardColumn, type IBoardColumnTasks, type IBoardServerColumns } from './board-column';
export {
  type ITask,
  type IComment,
  type IEditTask,
  type ICreateTask,
  type ITaskResponse,
  type IAttachmentFile,
  type ICommentResponse,
  type LeanTaskComments,
  type IAttachmentFileResponse,
} from './task';
export { type IResetToken } from './reset-token';
export { type IUsersBoards } from './users-boards';
export { type IUsers, type IUsersNormalizeResponse } from './users';
export * from './organization';

export interface PaginationResult<T> {
  results: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}
