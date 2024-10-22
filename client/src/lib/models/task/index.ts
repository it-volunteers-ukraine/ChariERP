import { Schema, model, models } from 'mongoose';

import { ITask } from '@/types';

const TaskSchema = new Schema<ITask>({
  title: { type: String },
  status: { type: String },
  order: { type: Number, required: true },
  date_end: { type: Date, required: true },
  priority: { type: String },
  date_start: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  attachment: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  description: { type: String },
  _id: Schema.Types.ObjectId,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
  ],
  boardColumn_id: {
    type: Schema.Types.ObjectId,
    ref: 'BoardColumn',
    required: true,
  },
});

export default models.Task || model<ITask>('Task', TaskSchema);
