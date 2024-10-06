import { Schema, model, models } from 'mongoose';

import { IBoard } from '@/types';
import { BoardColumn } from '@/lib';

const BoardSchema = new Schema<IBoard>({
  title: { type: String },
  order: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  boardColumns: [
    {
      type: Schema.Types.ObjectId,
      ref: 'BoardColumn',
    },
  ],
});

BoardSchema.pre('findOneAndDelete', async function (next) {
  const board = await this.model.findOne(this.getFilter()).populate('boardColumns');

  if (board) {
    await BoardColumn.deleteMany({ _id: { $in: board.boardColumns } });
  }

  next();
});

export default models.Board || model<IBoard>('Board', BoardSchema);
