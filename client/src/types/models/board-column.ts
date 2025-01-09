import { Schema } from 'mongoose';

import { ITaskUsers } from './task';

export interface IBoardColumn {
  title: string;
  order: number;
  created_at: Date;
  _id: Schema.Types.ObjectId;
  board_id: Schema.Types.ObjectId;
  task_ids: Schema.Types.ObjectId[];
}
export interface IBoardColumnTasks extends Omit<IBoardColumn, 'task_ids'> {
  task_ids: ITaskUsers[];
}
