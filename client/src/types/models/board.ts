import { Schema } from 'mongoose';

export interface IBoard extends Document {
  title: string;
  order: number;
  created_at: Date;
  _id: Schema.Types.ObjectId;
  boardColumns: Schema.Types.ObjectId[];
}
