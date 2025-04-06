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
  comments: IComment[];
  description: string;
  boardTitle: string;
  _id: Schema.Types.ObjectId;
  users?: Schema.Types.ObjectId[];
  boardColumn_id: Schema.Types.ObjectId;
  columnsList: { title: string; _id: string }[];
}
export interface IComment {
  comment: string;
  created_at: Date;
  updated_at: Date;
  _id: Schema.Types.ObjectId;
  author: {
    _id: Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
}

export interface ITaskResponse {
  title: string;
  status: string | null;
  dateEnd: Date | null;
  priority: string | null;
  dateStart: Date | null;
  createdAt: Date;
  attachment: File[];
  comments: ICommentResponse[];
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

export interface ICommentResponse {
  id: string;
  updatedAt: Date;
  comment: string;
  createdAt: Date;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICreateTask extends Omit<ITask, 'boardColumn_id' | '_id' | 'created_at'> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IEditTask extends Partial<Omit<ITask, 'boardColumn_id' | 'users' | '_id' | 'created_at'>> {}

export interface ITaskUsers extends Omit<ITask, 'users'> {
  users: IUsers[];
}

type LeanComment = {
  comment: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
  created_at: Date;
  updated_at: Date;
};

export type LeanTaskComments = {
  _id: string;
  comments: LeanComment[];
};
