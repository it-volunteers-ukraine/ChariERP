import { Schema } from 'mongoose';

export interface IBoard extends Document {
  title: string;
  order: number;
  created_at: Date;
  boardColumns: Schema.Types.ObjectId[];
}
