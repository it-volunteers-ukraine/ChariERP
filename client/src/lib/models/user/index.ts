import { Schema, model, models } from 'mongoose';

import { Roles } from '@/types';

interface IUser {
  role: Roles;
  email: string;
  password: string;
  _id?: Schema.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  _id: { type: Schema.Types.ObjectId },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: Roles.USER },
});

export default models.User || model('User', userSchema);
