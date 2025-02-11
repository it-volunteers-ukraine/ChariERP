import { Schema, model, models } from 'mongoose';

import { Task } from '@/lib';
import { IBoardColumn, ITask, IUsersBoards } from '@/types';

const UsersBoardsSchema = new Schema<IUsersBoards>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    board_id: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    organization_id: {
      type: Schema.Types.ObjectId,
      ref: 'Organizations',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

UsersBoardsSchema.pre('findOneAndDelete', async function (next) {
  const filter = this.getFilter();

  const usersBoard = await this.model.findOne(filter).populate('board_id');

  if (!usersBoard) {
    return next();
  }

  const revokeUserId = String(usersBoard.user_id);

  const tasks = await Task.find({
    boardColumn_id: { $in: usersBoard.board_id.boardColumns.map((boardColumn: IBoardColumn) => boardColumn._id) },
  });

  if (!tasks) {
    return next();
  }

  const taskIds = tasks.map((task: ITask) => task._id);

  await Task.updateMany({ _id: { $in: taskIds } }, { $pull: { users: revokeUserId } });

  next();
});

export default models.Users_Boards || model<IUsersBoards>('Users_Boards', UsersBoardsSchema);
