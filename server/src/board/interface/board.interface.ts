import { Types } from 'mongoose';

export interface IBoard {
  _id: Types.ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
