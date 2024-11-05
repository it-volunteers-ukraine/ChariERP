import { Schema } from 'mongoose';

export interface ITask {
  title: string;
  status: string;
  order: number;
  date_end: Date;
  priority: string;
  date_start: Date;
  created_at: Date;
  attachment: File[];
  comments: string[];
  description: string;
  _id: Schema.Types.ObjectId;
  users: Schema.Types.ObjectId[];
  boardColumn_id: Schema.Types.ObjectId;
}
