import { Schema } from 'mongoose';
import { IUsers } from './users';

export interface ITask {
  title: string;
  status: string;
  date_end: Date;
  priority: string;
  date_start: Date;
  created_at: Date;
  attachment: File[];
  comments: string[];
  description: string;
  _id: Schema.Types.ObjectId;
  users?: Schema.Types.ObjectId[];
  boardColumn_id: Schema.Types.ObjectId;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICreateTask extends Omit<ITask, 'boardColumn_id' | '_id' | 'created_at'> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IEditTask extends Partial<Omit<ITask, 'boardColumn_id' | 'users' | '_id' | 'created_at'>> {}

export interface ITaskUsers extends Omit<ITask, 'users'> {
  users: IUsers[];
}
