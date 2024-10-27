import { Schema, model, models } from 'mongoose';

import { IBoard } from '@/types';
import { BoardColumn, UsersBoards } from '@/lib';

const BoardSchema = new Schema<IBoard>({
  title: { type: String },
  order: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  boardColumns: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Board_Column',
    },
  ],
});

BoardSchema.pre('findOneAndDelete', async function (next) {
  const board = await this.model.findOne(this.getFilter()).populate('boardColumns');

  const usersBoard = await UsersBoards.find({ board_id: this.getFilter() });

  if (usersBoard) {
    await UsersBoards.deleteMany({ board_id: board._id });
  }

  if (board) {
    await BoardColumn.deleteMany({ _id: { $in: board.board_columns } });
  }

  next();
});

export default models.Board || model<IBoard>('Board', BoardSchema);
