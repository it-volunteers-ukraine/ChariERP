import { Schema, model, models } from 'mongoose';

import { ITask } from '@/types';

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String },
    date_end: { type: Date },
    priority: { type: String },
    date_start: { type: Date },
    attachment: {
      type: [
        new Schema({
          name: { type: String, required: true },
          type: { type: String, required: true },
          keyFromBucket: { type: String, required: true },
        }),
      ],
      default: [],
    },
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
      ref: 'Board_Column',
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default models.Task || model<ITask>('Task', TaskSchema);
