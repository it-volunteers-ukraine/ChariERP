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
  text: string;
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
  id: string;
  title: string;
  createdAt: Date;
  attachment: File[];
  boardTitle: string;
  description: string;
  dateEnd: Date | null;
  status: string | null;
  dateStart: Date | null;
  priority: string | null;
  comments: ICommentResponse[];
  boardColumnId: Schema.Types.ObjectId;
  columnsList: { title: string; _id: string }[];
  users: {
    id: string;
    role?: string;
    phone?: string;
    email?: string;
    notes?: string;
    status?: string;
    address?: string;
    lastLogin?: Date;
    lastName?: string;
    position?: string;
    avatarUrl?: string;
    firstName?: string;
    dateOfBirth?: Date;
    middleName?: string;
  }[];
}

export interface ICommentResponse {
  id: string;
  text: string;
  updatedAt: Date;
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
  created_at: Date;
  updated_at: Date;
  author: {
    _id: string;
    lastName: string;
    firstName: string;
    avatarUrl?: string;
  };
};

export type LeanTaskComments = {
  _id: string;
  comments: LeanComment[];
};
