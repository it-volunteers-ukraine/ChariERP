import { Schema } from 'mongoose';

export interface IBoardColumn {
  title: string;
  order: number;
  created_at: Date;
  _id: Schema.Types.ObjectId;
  board_id: Schema.Types.ObjectId;
  task_ids: Schema.Types.ObjectId[];
}
