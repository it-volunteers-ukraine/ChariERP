import { Schema, model, models } from 'mongoose';

import { ITask } from '@/types';

const TaskSchema = new Schema<ITask>({
  title: { type: String },
  status: { type: String },
  date_end: { type: Date, required: true },
  priority: { type: String },
  date_start: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  attachment: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  description: { type: String },
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
