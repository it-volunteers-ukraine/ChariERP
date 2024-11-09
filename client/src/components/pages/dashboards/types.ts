import { IBoardData } from '@/components';

export type ResponseGet = { success: boolean; data: IBoardData[] };
export type ResponseDeleteEdit = { success: boolean; message: string };
export type ResponseCreate = { success: boolean; data?: IBoardData; message?: string };
export interface IMoveBoardsProps {
  boards: IBoardData[];
  userId: string;
}
