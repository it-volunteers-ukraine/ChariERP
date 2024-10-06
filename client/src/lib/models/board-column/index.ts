import { Schema, model, models } from 'mongoose';

import { Task } from '@/lib';
import { IBoardColumn } from '@/types';

const BoardColumnSchema = new Schema<IBoardColumn>({
  title: { type: String },
  order: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  board_id: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
  task_ids: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

BoardColumnSchema.pre('findOneAndDelete', async function (next) {
  const boardColumn = await this.model.findOne(this.getFilter()).populate('task_ids');

  if (boardColumn) {
    await Task.deleteMany({ _id: { $in: boardColumn.task_ids } });
  }

  next();
});

export default models.BoardColumn || model<IBoardColumn>('BoardColumn', BoardColumnSchema);
