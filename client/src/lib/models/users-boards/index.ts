import { Schema, model, models } from 'mongoose';

import { IUsersBoards } from '@/types';

const UsersBoardsSchema = new Schema<IUsersBoards>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

export default models.Users_Boards || model<IUsersBoards>('Users_Boards', UsersBoardsSchema);
