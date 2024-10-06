import { Schema } from 'mongoose';

export interface IUsersBoards {
  user_id: Schema.Types.ObjectId;
  board_id: Schema.Types.ObjectId;
}
