import { TaskPriority } from 'src/schemas/enums';

export interface IAttachment {
  name: string;
  type: string;
  keyFromBucket: string;
}

export interface IComment {
  text: string;
  author: string;
  dateCreated: Date;
  dateUpdated: Date;
}

export interface IStatus {
  _id: string;
  title: string;
  active?: boolean;
}

export interface ITask {
  _id: string;
  title: string;
  date_end?: Date;
  users: string[];
  date_start?: Date;
  createdAt: Date;
  updatedAt: Date;
  status: IStatus[];
  comments: IComment[];
  description?: string;
  priority: TaskPriority;
  attachment: IAttachment[];
}
