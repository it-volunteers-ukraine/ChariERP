import { Schema, model, models } from 'mongoose';

import { ITask } from '@/types';

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String },
    status: { type: String },
    date_end: { type: Date, required: true },
    priority: { type: String },
    date_start: { type: Date, required: true },
    attachment: { type: [String], default: [] },
    comments: {
      type: [
        new Schema(
          {
            text: { type: String, required: true },
            author: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
          },
          { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
        ),
      ],
      default: [],
    },
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
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default models.Task || model<ITask>('Task', TaskSchema);
