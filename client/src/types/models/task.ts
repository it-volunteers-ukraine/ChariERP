import { Schema } from 'mongoose';

import { IUsers, IUsersNormalizeResponse } from './users';

export interface ITask {
  title: string;
  status: string;
  date_end: Date;
  priority: string;
  date_start: Date;
  created_at: Date;
  boardTitle: string;
  description: string;
  comments: IComment[];
  _id: Schema.Types.ObjectId;
  attachment: IAttachmentFile[];
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

export interface IAttachmentFile {
  name: string;
  type: string;
  keyFromBucket: string;
  _id: Schema.Types.ObjectId;
}

export interface IAttachmentFileResponse {
  id: string;
  name: string;
  type: string;
}

export interface ITaskResponse {
  id: string;
  title: string;
  createdAt: Date;
  boardTitle: string;
  description: string;
  dateEnd: Date | null;
  status: string | null;
  dateStart: Date | null;
  priority: string | null;
  comments: ICommentResponse[];
  users: IUsersNormalizeResponse[];
  boardColumnId: Schema.Types.ObjectId;
  attachment: IAttachmentFileResponse[];
  columnsList: { title: string; _id: string }[];
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
