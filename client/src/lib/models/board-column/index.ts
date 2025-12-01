import { Schema, model, models } from 'mongoose';

import { Task } from '@/lib';
import { IBoardColumn } from '@/types';

const BoardColumnSchema = new Schema<IBoardColumn>({
  title: { type: String },
  created_at: { type: Date, default: Date.now },
  board_id: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
  task_ids: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

BoardColumnSchema.pre('findOneAndDelete', async function () {
  const filter = this.getFilter();

  const boardColumn = await this.model.findOne(filter);

  if (!boardColumn) {
    return;
  }

  if (boardColumn.task_ids && boardColumn.task_ids.length > 0) {
    await Task.deleteMany({ _id: { $in: boardColumn.task_ids } });
  }
});

export default models.Board_Column || model<IBoardColumn>('Board_Column', BoardColumnSchema);
