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
  comments: {
    comment: string;
    created_at: Date;
    edit_at: Date | null;
    _id: Schema.Types.ObjectId;
    authorId: Schema.Types.ObjectId;
  }[];
  description: string;
  boardTitle: string;
  _id: Schema.Types.ObjectId;
  users?: Schema.Types.ObjectId[];
  boardColumn_id: Schema.Types.ObjectId;
  columnsList: { title: string; _id: string }[];
}

export interface ITaskResponse {
  title: string;
  status: string | null;
  dateEnd: Date | null;
  priority: string | null;
  dateStart: Date | null;
  createdAt: Date;
  attachment: File[];
  comments: {
    id: string;
    comment: string;
    createdAt: Date;
    authorId: string;
    editAt: Date | null;
  }[];
  boardTitle: string;
  description: string;
  id: string;
  users: {
    id: string;
    avatarUrl?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    phone?: string;
    position?: string;
    email?: string;
    status?: string;
    role?: string;
    dateOfBirth?: Date;
    address?: string;
    notes?: string;
    lastLogin?: Date;
  }[];
  boardColumnId: Schema.Types.ObjectId;
  columnsList: { title: string; _id: string }[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICreateTask extends Omit<ITask, 'boardColumn_id' | '_id' | 'created_at'> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IEditTask extends Partial<Omit<ITask, 'boardColumn_id' | 'users' | '_id' | 'created_at'>> {}

export interface ITaskUsers extends Omit<ITask, 'users'> {
  users: IUsers[];
}
