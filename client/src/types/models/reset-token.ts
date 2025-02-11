import { Document, Schema } from 'mongoose';

export interface IResetToken extends Document {
  token: string;
  createdAt: Date;
  userId: Schema.Types.ObjectId;
}
